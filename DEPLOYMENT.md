# Deployment Guide for Mian Visuals

## Important Note

This Next.js application **requires Node.js runtime** because it uses API routes (contact form, email sending). Standard WordPress hosting typically only supports PHP and cannot run Next.js applications.

## Deployment Options

### Option 1: Deploy on Vercel (Recommended - Free)

Vercel is the company behind Next.js and offers the best Next.js hosting experience.

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Add environment variables (see `.env.example`)
   - Click "Deploy"

3. **Configure Custom Domain**
   - In Vercel dashboard, go to Settings > Domains
   - Add your domain
   - Update DNS records as instructed

**Pros:**
- Free tier available
- Automatic deployments
- Built-in SSL
- Optimized for Next.js
- Global CDN

### Option 2: Deploy on Netlify (Alternative - Free)

1. **Push code to Git repository** (same as above)

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Click "New site from Git"
   - Connect repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variables
   - Deploy

**Note:** Netlify requires additional configuration for Next.js API routes (use Netlify Functions).

### Option 3: Deploy on Node.js-Compatible Hosting

If your hosting provider supports Node.js:

1. **Check Node.js Support**
   - Contact your hosting provider
   - Ask if they support Node.js applications
   - Required: Node.js 18+ and npm

2. **Deployment Steps**
   ```bash
   # Build the application
   npm run build
   
   # Start the production server
   npm start
   ```

3. **Configure PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "mian-visuals" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Reverse Proxy (if needed)**
   - Use Nginx or Apache to proxy requests to Next.js (port 3000)

### Option 4: Hybrid Approach (WordPress + Next.js)

If you must keep WordPress hosting:

1. **Deploy Next.js app on Vercel/Netlify** (free)
2. **Use subdomain** (e.g., `app.yourdomain.com`)
3. **Or use reverse proxy** to serve Next.js from a path (requires server access)

## Environment Variables Setup

Before deploying, you need to configure environment variables:

### Required Variables

1. **Gmail Configuration** (for contact form)
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   GMAIL_FROM_NAME=Mian Visuals
   CONTACT_EMAIL_TO=recipient@example.com
   ```

   **How to get Gmail App Password:**
   - Go to Google Account settings
   - Security > 2-Step Verification (enable if not enabled)
   - App passwords > Generate new app password
   - Use this password (not your regular Gmail password)

2. **Site URL**
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

### Optional Variables

- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_HOTJAR_ID` - Hotjar ID
- `INSTAGRAM_ACCESS_TOKEN` - Instagram API token
- `INSTAGRAM_USER_ID` - Instagram user ID

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Test contact form locally
- [ ] Test all pages and navigation
- [ ] Optimize images (already done)
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Verify all external links work
- [ ] Check Google Analytics (if using)
- [ ] Test email sending functionality

## Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server (local testing)
npm start

# Development server
npm run dev
```

## Troubleshooting

### Contact Form Not Working
- Check Gmail credentials are correct
- Verify `GMAIL_APP_PASSWORD` is an app password (not regular password)
- Check `CONTACT_EMAIL_TO` is set correctly

### Images Not Loading
- Verify image paths are correct
- Check `next.config.ts` remote patterns
- Ensure images are in `public/images/` folder

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires 18+)
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## Support

For deployment issues, check:
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

