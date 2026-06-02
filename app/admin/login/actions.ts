'use server';

import { auth } from '../../../lib/auth';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function setCookiesFromResponse(res: Response) {
  const setCookieHeaders = res.headers.getSetCookie();
  console.log('Set-Cookie headers count:', setCookieHeaders.length);
  if (setCookieHeaders.length === 0) return;

  const cookieStore = await cookies();
  for (const cookieStr of setCookieHeaders) {
    const parts = cookieStr.split(';');
    const [nameValue, ...rest] = parts;
    const separatorIdx = nameValue.indexOf('=');
    if (separatorIdx === -1) continue;

    const name = nameValue.slice(0, separatorIdx).trim();
    const value = nameValue.slice(separatorIdx + 1).trim();

    const options: any = {};
    for (const option of rest) {
      const eqIdx = option.indexOf('=');
      const optName = eqIdx === -1 ? option.trim() : option.slice(0, eqIdx).trim();
      const optVal = eqIdx === -1 ? true : option.slice(eqIdx + 1).trim();
      const key = optName.toLowerCase();

      if (key === 'path') options.path = optVal;
      else if (key === 'domain') options.domain = optVal;
      else if (key === 'max-age') options.maxAge = parseInt(optVal as string, 10);
      else if (key === 'expires') options.expires = new Date(optVal as string);
      // Only apply Secure flag in production (not over HTTP localhost)
      else if (key === 'secure') options.secure = process.env.NODE_ENV === 'production';
      else if (key === 'httponly') options.httpOnly = true;
      else if (key === 'samesite') {
        const sameSiteVal = (optVal as string).toLowerCase();
        if (sameSiteVal === 'lax' || sameSiteVal === 'strict' || sameSiteVal === 'none') {
          options.sameSite = sameSiteVal;
        }
      }
    }
    console.log(`Setting cookie: ${name}=${value.slice(0, 20)}... (httpOnly: ${!!options.httpOnly}, sameSite: ${options.sameSite})`);
    cookieStore.set(name, value, options);
  }
}

export interface ActionState {
  error?: string;
}

export async function authenticateAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const actionType = formData.get('actionType') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const redirectTo = (formData.get('redirectTo') as string) || '/admin/patterns';

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    if (actionType === 'signUp') {
      const name = formData.get('name') as string;
      if (!name) {
        return { error: 'Name is required' };
      }

      console.log('Attempting sign up for:', email);
      const res = await auth.api.signUpEmail({
        body: { email, password, name },
        headers: await headers(),
        asResponse: true,
      });

      console.log('SignUp Response Status:', res.status);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to sign up');
      }

      await setCookiesFromResponse(res);
      console.log('Cookies set — redirecting to:', redirectTo);
    } else {
      console.log('Attempting sign in for:', email);
      const res = await auth.api.signInEmail({
        body: { email, password },
        headers: await headers(),
        asResponse: true,
      });

      console.log('SignIn Response Status:', res.status);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Invalid email or password.');
      }

      await setCookiesFromResponse(res);
      console.log('Cookies set — redirecting to:', redirectTo);
    }
  } catch (err: any) {
    // Don't catch NEXT_REDIRECT — rethrow it
    if (err?.digest?.startsWith('NEXT_REDIRECT')) throw err;
    return { error: err.message || 'Authentication failed. Please check your details.' };
  }

  // redirect() is called outside try/catch so Next.js can handle it correctly
  redirect(redirectTo);
}
