'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '../../../lib/auth-client';

function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin/patterns';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await authClient.signUp.email({
          email,
          password,
          name,
        });
        if (signUpError) {
          setError(signUpError.message || 'Failed to sign up');
        } else {
          router.push(redirectTo);
          router.refresh();
        }
      } else {
        const { error: signInError } = await authClient.signIn.email({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message || 'Failed to sign in. Please check your credentials.');
        } else {
          router.push(redirectTo);
          router.refresh();
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200/50">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-georgiaBold text-stone-900 tracking-wide">
          African Expressions
        </h1>
        <p className="text-sm font-medium text-stone-500">
          Admin Portal Authentication
        </p>
      </div>

      <div className="flex border-b border-stone-200">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(false);
            setError('');
          }}
          className={`flex-1 pb-3 text-sm font-semibold transition-colors duration-200 ${
            !isSignUp
              ? 'border-b-2 border-stone-900 text-stone-900'
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSignUp(true);
            setError('');
          }}
          className={`flex-1 pb-3 text-sm font-semibold transition-colors duration-200 ${
            isSignUp
              ? 'border-b-2 border-stone-900 text-stone-900'
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          Create Admin
        </button>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 animate-pulse">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Admin User"
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all text-stone-900 placeholder-stone-400"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all text-stone-900 placeholder-stone-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all text-stone-900 placeholder-stone-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all duration-150 disabled:opacity-50 active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Please wait...</span>
            </span>
          ) : isSignUp ? (
            'Register Admin Account'
          ) : (
            'Sign In to Admin'
          )}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 via-stone-50 to-orange-50/30 px-4 py-12">
      <Suspense fallback={
        <div className="w-full max-w-md p-8 bg-white/90 rounded-2xl shadow-xl flex flex-col items-center justify-center space-y-4">
          <span className="w-8 h-8 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
          <p className="text-stone-500 font-medium">Loading form...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </main>
  );
}
