'use client';

import { useState, Suspense, useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authenticateAction } from './actions';

function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin/patterns';

  const [state, formAction, isPending] = useActionState(authenticateAction, null);

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
          onClick={() => setIsSignUp(false)}
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
          onClick={() => setIsSignUp(true)}
          className={`flex-1 pb-3 text-sm font-semibold transition-colors duration-200 ${
            isSignUp
              ? 'border-b-2 border-stone-900 text-stone-900'
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          Create Admin
        </button>
      </div>

      {state?.error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
          {state.error}
        </div>
      )}

      <form action={formAction} key={isSignUp ? 'signup' : 'signin'} className="space-y-4">
        <input type="hidden" name="actionType" value={isSignUp ? 'signUp' : 'signIn'} />
        <input type="hidden" name="redirectTo" value={redirectTo} />

        {isSignUp && (
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
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
            name="email"
            required
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
            name="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all text-stone-900 placeholder-stone-400"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all duration-150 disabled:opacity-50 active:scale-[0.98]"
        >
          {isPending ? (
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
