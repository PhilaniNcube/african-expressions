'use server';

import { auth } from '../../../lib/auth';
import { headers } from 'next/headers';

export interface ActionState {
  error?: string;
  success?: string;
}

export async function authenticateAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const actionType = formData.get('actionType') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    if (actionType === 'signUp') {
      const name = formData.get('name') as string;
      if (!name) {
        return { error: 'Name is required' };
      }

      await auth.api.signUpEmail({
        body: {
          email,
          password,
          name,
        },
        headers: await headers(),
      });

      return { success: 'Account created successfully! Redirecting...' };
    } else {
      await auth.api.signInEmail({
        body: {
          email,
          password,
        },
        headers: await headers(),
      });

      return { success: 'Signed in successfully! Redirecting...' };
    }
  } catch (err: any) {
    return { error: err.message || 'Authentication failed. Please check your details.' };
  }
}
