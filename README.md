This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contact form

The contact form posts to `app/api/contact/route.ts`, which sends the notification
email through [Resend](https://resend.com). The sender must use a domain verified
in the Resend dashboard; this project uses `yellowlizard.com` because DNS access
for `africanexpressions.co.za` is not available. The notification recipient does
not need to be on the verified domain.

Required environment variables:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-side Resend API key. Never exposed to the browser. |
| `CONTACT_TO_EMAIL` | Inbox that receives submissions. Defaults to `cayly@samil.co.za`. |
| `CONTACT_FROM_EMAIL` | Sender address. Must use the verified `yellowlizard.com` domain. Defaults to `African Expressions <dev@yellowlizard.com>`. |

Without `RESEND_API_KEY` the route returns a friendly "not available right now"
message instead of sending.

Set these values in Vercel **without surrounding quotes** — dashboard values keep
quotes literally, unlike `.env.local`. The route strips stray quotes and falls back
to the default sender if the value is not a valid address.

The Resend account is registered to `dev@yellowlizard.com`, and `yellowlizard.com`
must be verified under **Domains**. If no domain is verified, Resend only accepts
`onboarding@resend.dev` as the sender and only delivers to the account address
(`dev@yellowlizard.com`).

If DNS access to `africanexpressions.co.za` becomes available, verify that domain
too and point `CONTACT_FROM_EMAIL` at an address on it — no code change needed.
