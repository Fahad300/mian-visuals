# Deployment on WordPress Hosting - Alternative Solutions

## ⚠️ Important Notice

**Standard WordPress hosting cannot run Next.js applications** because:
- WordPress hosting only supports PHP
- Next.js requires Node.js runtime
- Your app uses API routes (contact form) which need a server

## Recommended Solution: Deploy Next.js Separately

Since your hosting is WordPress-only, here are the best options:

### Option 1: Vercel (Recommended - FREE)

**Best for:** Easy deployment, automatic SSL, global CDN

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (free)

2. **Deploy Your App**
   ```bash
   # Push code to GitHub first
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/mian-visuals.git
   git push -u origin main
   ```

3. **Connect to Vercel**
   - In Vercel dashboard: "New Project"
   - Import your GitHub repository
   - Add environment variables (see `.env.example`)
   - Click "Deploy"

4. **Use Your Domain**
   - In Vercel: Settings > Domains
   - Add your domain (e.g., `mianvisuals.com`)
   - Update DNS records:
     - Add A record pointing to Vercel's IP
     - Or use CNAME to `cname.vercel-dns.com`

**Cost:** FREE (with limitations, but sufficient for most sites)

### Option 2: Netlify (Alternative - FREE)

Similar to Vercel but requires more configuration for API routes.

### Option 3: Keep WordPress + Use Subdomain

1. **Keep WordPress** on main domain (`yourdomain.com`)
2. **Deploy Next.js** on subdomain (`app.yourdomain.com` or `www.yourdomain.com`)
3. **Point subdomain** to Vercel/Netlify

### Option 4: Check if Your Hosting Supports Node.js

Some modern hosting providers offer Node.js support:

1. **Contact your hosting provider** and ask:
   - "Do you support Node.js applications?"
   - "Can I run a Next.js app?"
   - "What Node.js version do you support?"

2. **If yes**, follow these steps:
   ```bash
   # SSH into your server
   ssh user@yourdomain.com
   
   # Navigate to your domain directory
   cd public_html  # or www, or htdocs
   
   # Upload your Next.js files
   # Then:
   npm install --production
   npm run build
   
   # Use PM2 to keep it running
   npm install -g pm2
   pm2 start npm --name "mian-visuals" -- start
   pm2 save
   ```

## Quick Start: Vercel Deployment

### Step 1: Prepare Your Code

```bash
# Make sure .env is not committed
echo ".env" >> .gitignore

# Commit and push
git add .
git commit -m "Ready for deployment"
git push
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. **Add Environment Variables:**
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `GMAIL_FROM_NAME`
   - `CONTACT_EMAIL_TO`
   - `NEXT_PUBLIC_SITE_URL`
5. Click "Deploy"

### Step 3: Configure Domain

1. In Vercel dashboard: Settings > Domains
2. Add your domain
3. Follow DNS instructions
4. Wait for SSL certificate (automatic)

## Environment Variables for Production

Create these in your hosting platform (Vercel/Netlify):

```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
GMAIL_FROM_NAME=Mian Visuals
CONTACT_EMAIL_TO=info@yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Testing After Deployment

1. Visit your live site
2. Test contact form
3. Check email is received
4. Test on mobile
5. Verify all pages load

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- Contact your hosting provider for Node.js support

