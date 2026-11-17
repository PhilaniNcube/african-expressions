'use client';

import React, { Fragment, useRef, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type ContactFormData = {
  name: string;
  email: string;
  number: string;
  message: string;
  botcheck?: string;
};

type SubmitResult = {
  type: 'success' | 'error';
  message: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({ mode: 'onTouched' });

  const [result, setResult] = useState<SubmitResult | null>(null);
  const inFlight = useRef(false);

  const onSubmit = async (data: ContactFormData) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setResult(null);

    try {
      // Sent server-side via Resend so the API key never reaches the browser.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string; error?: string }
        | null;

      if (!response.ok) {
        setResult({
          type: 'error',
          message: payload?.error ?? 'Something went wrong. Please try again.',
        });
        return;
      }

      setResult({
        type: 'success',
        message: payload?.message ?? 'Thank you! Your message has been sent.',
      });
      reset();
    } catch {
      setResult({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      inFlight.current = false;
    }
  };

  return (
    <Fragment>
      <div className="px-6 py-12 mx-auto max-w-7xl md:px-4">
        <h1 className="text-2xl font-georgiaBold md:text-4xl lg:text-5xl text-deep">
          Contact
        </h1>
        <h2 className="text-2xl text-deep font-georgia">Any Queries?</h2>
        <div className="grid w-full grid-cols-1 gap-6 mt-6 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-6">
            <div className="flex flex-col md:mr-16">
              <label
                htmlFor="name"
                className="mb-2 text-sm font-bold leading-tight tracking-normal text-deep"
              >
                Full Name
              </label>
              <input
                type="text"
                required
                {...register('name', { required: true })}
                id="name"
                className="flex items-center w-full h-10 pl-3 text-sm font-normal bg-white border border-gray-300 rounded shadow text-deep focus:outline-none"
                placeholder="Full Name"
              />
            </div>
            <div className="flex flex-col mt-4 md:mr-16">
              <label
                htmlFor="email"
                className="mb-2 text-sm font-bold leading-tight tracking-normal text-deep"
              >
                Email
              </label>
              <input
                type="email"
                required
                {...register('email', { required: true })}
                id="email"
                className="flex items-center w-full h-10 pl-3 text-sm font-normal bg-white border border-gray-300 rounded shadow text-deep focus:outline-none"
                placeholder="email@example.com"
              />
            </div>
            <div className="flex flex-col mt-4 md:mr-16">
              <label
                htmlFor="number"
                className="mb-2 text-sm font-bold leading-tight tracking-normal text-deep"
              >
                Contact Number
              </label>
              <input
                type="tel"
                required
                id="number"
                {...register('number', { required: true })}
                className="flex items-center w-full h-10 pl-3 text-sm font-normal bg-white border border-gray-300 rounded shadow text-deep focus:outline-none"
                placeholder="Contact Number"
              />
            </div>
            <div className="flex flex-col mt-4 md:mr-16">
              <label
                htmlFor="message"
                className="pb-2 text-sm font-bold text-deep"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                {...register('message', { required: true })}
                className="py-3 pl-3 text-sm placeholder-gray-500 bg-transparent border border-gray-300 rounded shadow-sm resize-none focus:outline-none text-deep"
                placeholder="Message"
                rows={5}
              />
            </div>
            {/* Honeypot: hidden from people, filled in by bots. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="botcheck">Leave this field empty</label>
              <input
                id="botcheck"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register('botcheck')}
              />
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="px-16 py-3 mt-4 text-lg font-medium text-white uppercase rounded shadow-lg cursor-pointer bg-accent hover:bg-yellow-800/80 hover:shadow-sm"
            >
              {isSubmitting ? 'Please Wait...' : 'Submit'}
            </button>
            {result && (
              <p
                role="status"
                aria-live="polite"
                className={`mt-4 text-lg ${
                  result.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {result.message}
              </p>
            )}
          </form>

          <div className="flex items-center">
            <div className="flex flex-col items-center w-full space-y-2">
              <p className="text-2xl text-deep font-georgia">Head Office</p>
              <span className="flex text-sm text-deep">
                <p className="font-bold">Address:</p>
                <p className="px-2">
                  79 Burman Road, Deal Party, Port Elizabeth, Eastern Cape, 6012
                </p>
              </span>
              <span className="flex text-sm text-deep">
                <p className="font-bold">Phone:</p>
                <p className="px-2">+27(0)41 486 2433</p>
              </span>
              <Link href="/stores" passHref>
                <button
                  type="button"
                  className="px-16 py-3 mt-4 text-lg font-medium text-white uppercase rounded shadow-lg cursor-pointer bg-accent hover:bg-yellow-800/80 hover:shadow-sm"
                >
                  View Stores
                </button>
              </Link>
              <p className="px-2 text-sm text-deep">
                to find your nearest African Expressions store
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
