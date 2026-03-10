# Deployment Guide

This guide covers deploying AnonIntel to Vercel and testing locally.

## Table of Contents

1. [Local Testing](#local-testing)
2. [Deploy to Vercel](#deploy-to-vercel)
3. [Post-Deployment](#post-deployment)
4. [Custom Domains](#custom-domains)
5. [Environment Variables](#environment-variables)

---

## Local Testing

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Setup Steps

```bash
# Navigate to the project directory
cd /data/.openclaw/workspace/anonintel-saas

# Install dependencies
npm install

# Copy environment template (optional)
cp .env.example .env.local
# Edit .env.local if needed (not required for default setup)

# Start development server
npm run dev
```

Visit http://localhost:3000 to see the landing page.

### Testing the Waitlist API

1. Fill out the waitlist form on the landing page
2. Check the terminal for API response logs
3. Verify email stored in `data/waitlist.json`:
   ```bash
   cat data/waitlist.json
   ```
4. Test error cases:
   - Submit an invalid email (should return 400)
   - Submit the same email twice (should return 409)
   - Submit with empty email (should return 400)

### Build Testing

```bash
# Build the production bundle
npm run build

# Start production server locally
npm start
```

Visit http://localhost:3000 to verify the production build works.

---

## Deploy to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Initialize Git repository** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AnonIntel landing page"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

3. **Import project in Vercel**:
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

4. **Configure project**:
   - **Project Name**: `anonintel` (or your preferred name)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Framework Preset**: Next.js (auto-detected)

5. **Environment Variables** (optional):
   - Currently none required
   - Add `NEXT_PUBLIC_FORMSPREE_ID` if using Formspree backend

6. **Click Deploy**:
   - Vercel will build and deploy automatically
   - Wait for the build to complete (usually 1-2 minutes)
   - Your site will be live at `https://anonintel.vercel.app` (or your repo name)

7. **Test deployment**:
   - Visit your Vercel URL
   - Test the waitlist form
   - Check Vercel serverless function logs for any errors

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

   This will:
   - Build your project
   - Ask for project configuration
   - Deploy to production

---

## Post-Deployment

### Verify Waitlist API

1. **Test the deployed API endpoint**:
   ```bash
   curl -X POST https://your-app.vercel.app/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

2. **Check response**:
   Should return:
   ```json
   {
     "success": true,
     "message": "Successfully joined the waitlist",
     "data": {...}
   }
   ```

3. **View stored data**:
   - Emails are stored in `data/waitlist.json`
   - Access via Vercel's file system (temporary)
   - For persistence: Connect to external database (Supabase, Firebase, etc.)

### Set Up Analytics (Optional)

Add to `_app.tsx` or `pages/index.tsx`:
- Google Analytics
- Vercel Analytics (automatic)

### Configure Custom Domain (See below)

---

## Custom Domains

1. **Go to your project dashboard** in Vercel
2. **Click "Domains"** in the left sidebar
3. **Add Domain**:
   - Enter your custom domain (e.g., `anonintel.com`)
   - Follow DNS verification instructions
4. **Update canonical URLs** in `pages/index.tsx` if needed

---

## Environment Variables

### Current Setup

The app uses local JSON file storage by default (no external dependencies).

### Optional: Formspree Backend

If you prefer Formspree over local JSON:

1. **Create a Formspree account** (free tier available)
2. **Create a new form** and get your form ID
3. **Add to Vercel environment variables**:
   - `NEXT_PUBLIC_FORMSPREE_ID=your_form_id`
4. **Modify `pages/api/waitlist.ts`** to proxy to Formspree

### Optional: External Database

For production persistence, consider:

- **Supabase** (free tier): PostgreSQL with REST API
- **Firebase Firestore**: NoSQL with SDK
- **Airtable**: Spreadsheet-like database
- **Notion API**: Use a Notion database

Example modification to `pages/api/waitlist.ts`:
```typescript
// Replace local file storage with Supabase
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Insert into database instead of waitlist.json
const { data, error } = await supabase
  .from('waitlist')
  .insert([{ email: trimmedEmail, created_at: new Date().toISOString() }]);
```

---

## Troubleshooting

### Build Fails

- Check Node.js version (18+ required)
- Delete `.next` folder and reinstall dependencies
- Ensure all TypeScript types are correct

### API Returns 500

- Check Vercel function logs
- Verify `data/` directory has write permissions (serverless functions have ephemeral storage)
- Consider using external database for production

### CSS/Assets Not Loading

- Verify `public/` folder structure
- Check file paths (use absolute paths from `public/`)
- Clear Vercel cache and redeploy

### Form Submissions Not Working

- Check API endpoint URL (correct when deployed)
- Verify CORS headers (already configured)
- Test with `curl` or Postman to isolate browser issues

---

## Updating Your Site

1. **Make changes** to code
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update landing page"
   git push
   ```
3. **Vercel auto-deploys** on new commits to main branch
4. **Test the new version** at your deployment URL

---

## Maintenance

### Monitor Performance

- Use Vercel Analytics (built-in)
- Set up error tracking (Sentry, LogRocket)
- Monitor waitlist submissions (export regularly if using local JSON)

### Redeploy

- Automatic on git push
- Manual via Vercel dashboard or CLI:
  ```bash
  vercel --prod --force
  ```

### Scale Considerations

- **High Traffic**: Vercel scales automatically
- **Waitlist Storage**: Switch from file-based to database for >10k entries
- **API Rate Limits**: Vercel serverless functions have generous limits (100k free requests/month)
- **CDN**: Vercel provides global CDN automatically

---

## Support

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Your AnonIntel SaaS application is now ready for production!**
