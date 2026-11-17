import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { renderContactNotification } from '../../../emails/contact-notification';

const MAX_LENGTHS = {
  name: 100,
  email: 200,
  number: 50,
  message: 5000,
} as const;

type ContactField = keyof typeof MAX_LENGTHS;

type ContactPayload = Record<ContactField, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The notification recipient and sender can be overridden with env vars. `from`
// must use a domain verified in Resend (yellowlizard.com — DNS for
// africanexpressions.co.za is not available).
const DEFAULT_TO = 'cayly@samil.co.za';
const DEFAULT_FROM = 'African Expressions <dev@yellowlizard.com>';

const CONTACT_FALLBACK_HINT =
  'Please email us directly at cayly@samil.co.za.';

function readField(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

// Accepts either `email@example.com` or `Name <email@example.com>`.
const PLAIN_ADDRESS_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const NAMED_ADDRESS_PATTERN = /^[^<>]+<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/;

// Dashboard UIs (Vercel included) keep surrounding quotes as part of the value,
// unlike `.env` files where they are stripped. Resend rejects quoted addresses,
// so normalise before use.
function stripQuotes(value: string): string {
  const trimmed = value.trim();
  const first = trimmed[0];
  if (
    trimmed.length >= 2 &&
    (first === '"' || first === "'") &&
    trimmed[trimmed.length - 1] === first
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function resolveFrom(raw: string | undefined): string {
  const value = stripQuotes(raw ?? '');
  if (!value) return DEFAULT_FROM;
  if (PLAIN_ADDRESS_PATTERN.test(value) || NAMED_ADDRESS_PATTERN.test(value)) {
    return value;
  }

  console.warn(
    'Contact form: CONTACT_FROM_EMAIL is not a valid address, using the default.',
    value
  );
  return DEFAULT_FROM;
}

function resolveTo(raw: string | undefined): string {
  const value = stripQuotes(raw ?? '');
  return PLAIN_ADDRESS_PATTERN.test(value) ? value : DEFAULT_TO;
}

function validate(fields: ContactPayload): string | null {
  if (!fields.name) return 'Please enter your full name.';
  if (fields.name.length > MAX_LENGTHS.name) return 'Please use a shorter name.';

  if (!fields.email || !EMAIL_PATTERN.test(fields.email)) {
    return 'Please enter a valid email address.';
  }
  if (fields.email.length > MAX_LENGTHS.email) return 'Please use a shorter email address.';

  if (!fields.number) return 'Please enter a contact number.';
  if (fields.number.length > MAX_LENGTHS.number) return 'Please use a shorter contact number.';

  if (!fields.message) return 'Please enter a message.';
  if (fields.message.length > MAX_LENGTHS.message) {
    return `Your message is too long (maximum ${MAX_LENGTHS.message} characters).`;
  }

  return null;
}

// Header values cannot contain line breaks.
function stripNewlines(value: string): string {
  return value.replace(/[\r\n]+/g, ' ');
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // Honeypot: the field is hidden, so only bots fill it in. Pretend it worked.
  if (readField(raw.botcheck) !== '') {
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent.',
    });
  }

  const fields: ContactPayload = {
    name: readField(raw.name),
    email: readField(raw.email),
    number: readField(raw.number),
    message: readField(raw.message),
  };

  const validationError = validate(fields);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set.');
    return NextResponse.json(
      { error: `The contact form is not available right now. ${CONTACT_FALLBACK_HINT}` },
      { status: 503 }
    );
  }

  const to = resolveTo(process.env.CONTACT_TO_EMAIL);
  const from = resolveFrom(process.env.CONTACT_FROM_EMAIL);
  const subject = `New contact message from ${stripNewlines(fields.name)}`;
  const submittedAt = new Date().toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
  });

  try {
    const { html, text } = await renderContactNotification({
      ...fields,
      submittedAt,
    });

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
      replyTo: fields.email,
    });

    if (error) {
      console.error(
        'Contact form: Resend rejected the message:',
        error.name,
        error.message,
        { from, to }
      );
      return NextResponse.json(
        { error: `We could not send your message. Please try again. ${CONTACT_FALLBACK_HINT}` },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('Contact form: Resend request failed:', error);
    return NextResponse.json(
      { error: `We could not send your message. Please try again. ${CONTACT_FALLBACK_HINT}` },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Thank you! Your message has been sent.',
  });
}
