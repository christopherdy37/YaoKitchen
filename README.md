# Yao's Kitchen — Wake Catering Platform

Premium wake catering website for Yao's Kitchen, Metro Manila. Inquiry-based booking with Viber confirmation and an admin dashboard.

## Local Development

### Prerequisites

- Node.js 18+
- PostgreSQL (local or Railway)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env and fill in values
cp .env .env.local
# Edit .env.local — set DATABASE_URL and SESSION_SECRET at minimum

# 3. Generate Prisma client
npm run db:generate

# 4. Run migrations
npm run db:migrate

# 5. Seed admin user
npm run db:seed

# 6. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Deploy to Railway

### First Deploy

1. Push repo to GitHub
2. Create a new Railway project → **Deploy from GitHub repo**
3. Add a **PostgreSQL** service inside the project
4. Copy the `DATABASE_URL` from the PostgreSQL service
5. Set environment variables in Railway **Variables** tab:

   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | *(from Railway PostgreSQL)* |
   | `SESSION_SECRET` | *(random 32+ char string)* |
   | `NEXT_PUBLIC_VIBER_NUMBER` | *(owner's Viber number)* |
   | `ADMIN_SEED_EMAIL` | *(admin login email)* |
   | `ADMIN_SEED_PASSWORD` | *(admin login password)* |

6. Railway auto-detects `railway.toml` and deploys with:
   ```
   npx prisma migrate deploy && npm start
   ```

### Seed Admin on First Deploy

Open the Railway shell for the app service and run:

```bash
npm run db:seed
```

Safe to re-run — upsert won't duplicate the admin user.

---

## Project Structure

See [CLAUDE.md](./CLAUDE.md) for full architecture reference.
