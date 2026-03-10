# AnonIntel - Threat Intelligence for Biotech

AnonIntel is a SaaS landing page and application for a threat intelligence service curated specifically for biotech companies. The service monitors dark web, GitHub, and paste sites for mentions of your company, trade secrets, leaked credentials, or research data, and sends alerts only on credible threats.

## Features

- **Modern Next.js 14** with TypeScript and Tailwind CSS
- **Dark cybersecurity theme** with blue/green color palette
- **Responsive design** - works on all devices
- **Complete landing page** with hero, features, pricing, and waitlist
- **Dashboard mockups** with interactive visualizations
- **API route** for waitlist email capture with JSON backend
- **SEO optimized** with OpenGraph and Twitter Cards
- **Production-ready code** with TypeScript and best practices

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the landing page.

4. **Test the waitlist form:**
   - Scroll to the "Join the Waitlist" section
   - Enter your email address
   - Submit the form
   - Check the console for API response
   - Emails are stored in `data/waitlist.json`

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
anonintel-saas/
├── pages/
│   ├── index.tsx          # Main landing page
│   ├── api/
│   │   └── waitlist.ts    # Waitlist email submission API
│   ├── _app.tsx           # Next.js app wrapper
│   └── _document.tsx      # Custom document
├── styles/
│   └── globals.css        # Tailwind and custom styles
├── public/                # Static assets (images, icons)
│   └── og-image.png       # OpenGraph image (you can add this)
├── data/
│   └── waitlist.json      # Email storage (auto-created)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
└── .env.example           # Environment variables template
```

## API Reference

### POST `/api/waitlist`

Submit an email to the waitlist.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Successfully joined the waitlist",
  "data": {
    "email": "user@example.com",
    "joinedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid email or missing email
- `409` - Email already exists
- `500` - Server error

**Storage:** Emails are stored in `data/waitlist.json` as an array of objects:
```json
[
  {
    "email": "user@example.com",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "ip": "192.168.1.1"
  }
]
```

## Configuration

### Environment Variables

Create a `.env.local` file in the project root. Currently, the app uses local JSON file storage by default. Optional configuration:

```bash
# Formspree integration (if you want to use Formspree instead of local JSON)
NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here
```

To use Formspree, modify `pages/api/waitlist.ts` to proxy to Formspree instead of local storage. The current implementation uses file-based storage which is free-tier friendly and requires no external APIs.

## Deployment to Vercel

One-click deployment to Vercel:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import project in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Import your GitHub repository
   - No additional build settings needed - Vercel auto-detects Next.js

3. **Deploy:**
   - Vercel will automatically build and deploy
   - Your site will be live at `your-project.vercel.app`

### Vercel Configuration Notes

- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Framework:** Next.js (auto-detected)
- **Environment Variables:** Add in Vercel dashboard if needed

The waitlist API will work out of the box using Vercel's serverless functions. The `data/waitlist.json` file will be created on first submission.

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme. Current theme uses:
- Primary greens: `#22c55e` (cyber-green)
- Accent blues: `#3b82f6` (cyber-blue)
- Dark backgrounds: `#020617` (dark-950)

### Content

- Update company name, descriptions, and pricing in `pages/index.tsx`
- Modify feature list, benefits, and how-it-works sections
- Replace placeholder mockups with actual dashboard designs

### Styling

- Global styles in `styles/globals.css`
- Components use Tailwind utility classes
- Custom animations and effects defined in CSS

## Technical Details

- **Framework:** Next.js 14 (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom theme
- **State Management:** React hooks (useState)
- **Form Handling:** Native fetch API
- **Storage:** File-based JSON (Node.js fs module)
- **No external dependencies** besides Next.js and Tailwind

## SEO

The landing page includes:
- Meta title and description
- OpenGraph tags for social sharing
- Twitter Card metadata
- Proper semantic HTML structure
- Responsive viewport settings

To customize the OpenGraph image, add a 1200x630px image to `/public/og-image.png`.

## License

This project is provided as-is for demonstration purposes.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

---

Built with ❤️ for biotech security. Stay safe out there.
