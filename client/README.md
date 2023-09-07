This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Env variables


| Variable name                              | Description                                                                                                                                                                                                 |           Default value |
|--------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------:|
| NEXT_PUBLIC_ENVIRONMENT                    | `'develop', 'staging', 'production'`. There are many times where you want to do things on specific environments. Load a third party library only in production, enable search engines only in production... |                 develop |
| NEXT_PUBLIC_URL                            | canonical URL                                                                                                                                                                                               |  http://localhost:$PORT |
| NEXT_PUBLIC_API_URL                        | URL of the API.                                                                                                                                                                                             | http://0.0.0.0:1337/api |
| NEXT_PUBLIC_GA_TRACKING_ID                 | Google Analytics tracking ID. If you're working with an Google Analytics 4 property, you have a Measurement ID instead of a Tracking ID.                                                                    |                         |
| RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED | If you use recoil and you want to avoid weird errors due to hotreload                                                                                                                                       |                   false |
| NEXTAUTH_URL                               | Required by next-auth                                                                                                                                                                                       |  http://localhost:$PORT |
| NEXTAUTH_SECRET                            | Required by next-auth                                                                                                                                                                                       |                     cat |
