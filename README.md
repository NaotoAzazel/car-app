# Fleet

Site for tracking mileage and personal spending relating to a car. This is a [Next.js](https://nextjs.org/) version 15 project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Tech stack

- Framework: [Next.js](https://nextjs.org)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Database: [Prisma](https://www.prisma.io/)
- Validation: [Zod](https://zod.dev)
- State management: [TanStack Query](https://tanstack.com/query/latest)

# Features

- Using [FSD architectural methodology](https://feature-sliced.design/)
- Prisma [JSON types generator](https://github.com/arthurfiorette/prisma-json-types-generator)
- Infinite scroll server side pagination
- Visualization of statistics on a graph

# Running localy

1. Clone the repository

   ```bash
   git clone https://github.com/NaotoAzazel/car-app
   ```

2. Install dependencies using npm
   ```bash
   npm install
   ```
3. [Configure](#customizing-env) environment file

4. Usage locally
   ```bash
   npm run dev # run the application in development mode
   npm run build # compile current version of the website
   npm run start # start the website in production mode
   ```

# Customizing .env

First, copy `.env.example` to `.env`.

```bash
cp .env.example .env
```

### Database

You can use any Postgres. Get the variables from your database environment and paste them into `.env`. When you've inserted all the variables associated with the database use the following command.

```bash
npm i -g prisma prisma-json-types-generator
prisma db push
```

# Code styling

Recommend to use the `Prettier` extension, `.prettierrc` file already configured.

# Package versions

- node: v20.16
- npm: v10.8
