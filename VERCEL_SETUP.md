# Vercel deployment setup

1. **Create a free Postgres database**
   - Go to [neon.tech](https://neon.tech) and sign up.
   - Create a project and copy the **connection string** (looks like `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`).

2. **Add Environment Variables in Vercel**
   - Open your project on Vercel → **Settings** → **Environment Variables**.
   - Add:
     - `DATABASE_URL` = your Neon connection string
     - `NEXTAUTH_URL` = `https://ak-project-tracker.vercel.app` (or your actual Vercel URL)
     - `NEXTAUTH_SECRET` = run in terminal: `openssl rand -base64 32` and paste the result
   - Save.

3. **Create the database tables**
   - On your computer, in the project folder, set `DATABASE_URL` in `.env` to the same Neon connection string.
   - Run:
     ```bash
     npx prisma generate
     npx prisma db push
     ```

4. **Redeploy**
   - In Vercel, go to **Deployments** → open the **...** menu on the latest deployment → **Redeploy** (so it picks up the new env vars).

After that, the app should load without the application error.
