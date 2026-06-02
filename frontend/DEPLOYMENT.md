# Fishbiz Deployment Guide (Vercel + Render)

## 1) Deploy Backend on Render

1. Push this project to GitHub.
2. In Render, create a **Web Service** from your repo.
3. Set:
   - **Root Directory:** `frontend/backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables:
   - `PORT=5000`
   - `JWT_SECRET=<your-strong-secret>`
   - `ADMIN_EMAIL=<your-admin-email>`
   - `ADMIN_PASSWORD=<your-admin-password>`
5. Deploy and copy your backend URL, e.g.:
   - `https://fishbiz-backend.onrender.com`

## 2) Deploy Frontend on Vercel

1. In Vercel, import the same GitHub repository.
2. Set:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add environment variables:
   - `VITE_API_URL=https://fishbiz-backend.onrender.com/api`
   - `VITE_WHATSAPP_NUMBER=919999999999`
4. Deploy.

## 3) Important Notes

- SPA routing is already configured via `frontend/vercel.json`.
- Backend static uploads are served from `/uploads`.
- SQLite works, but on Render free tier data can reset on redeploy/restart.
  - For reliable production storage, use a persistent disk or move to PostgreSQL/Supabase.

## 4) Quick Test After Deployment

1. Open your Vercel site.
2. Verify fish listing loads.
3. Open `/admin` and login using Render env credentials.
4. Add a fish with image upload and refresh page.
5. Test WhatsApp inquiry button from a fish card.
