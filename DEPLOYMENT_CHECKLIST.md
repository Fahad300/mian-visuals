# Pre-Deployment Checklist

## Environment Variables

- [ ] `GMAIL_USER` - Your Gmail address
- [ ] `GMAIL_APP_PASSWORD` - Gmail App Password (not regular password!)
- [ ] `GMAIL_FROM_NAME` - Display name for emails (e.g., "Mian Visuals")
- [ ] `CONTACT_EMAIL_TO` - Email address to receive form submissions
- [ ] `NEXT_PUBLIC_SITE_URL` - Your production domain (e.g., "https://mianvisuals.com")

### Optional Variables

- [ ] `NEXT_PUBLIC_GA_ID` - Google Analytics tracking ID
- [ ] `NEXT_PUBLIC_HOTJAR_ID` - Hotjar site ID
- [ ] `INSTAGRAM_ACCESS_TOKEN` - Instagram API access token
- [ ] `INSTAGRAM_USER_ID` - Instagram user ID

## Testing Before Deployment

### Functionality Tests

- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] Email is received after form submission
- [ ] All images load correctly
- [ ] Mobile menu opens/closes properly
- [ ] Smooth scrolling to footer form works
- [ ] All buttons navigate correctly

### Responsive Design Tests

- [ ] Mobile view (< 768px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (> 1024px)
- [ ] All text is readable
- [ ] Images scale properly
- [ ] Forms are usable on mobile

### Browser Compatibility

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Checks

- [ ] Page loads quickly (< 3 seconds)
- [ ] Images are optimized
- [ ] No console errors
- [ ] No 404 errors in network tab

## Content Review

- [ ] All text is correct and spell-checked
- [ ] Contact information is accurate
- [ ] Social media links are correct
- [ ] Pricing information is up to date
- [ ] Images are high quality and relevant

## Security

- [ ] Environment variables are not committed to Git
- [ ] `.env` file is in `.gitignore`
- [ ] API routes are protected (if needed)
- [ ] No sensitive data in client-side code

## SEO

- [ ] Meta titles and descriptions are set
- [ ] Open Graph images are configured
- [ ] Sitemap is generated (if using)
- [ ] Robots.txt is configured (if needed)

## Post-Deployment

- [ ] Test contact form on live site
- [ ] Verify email delivery
- [ ] Check Google Analytics is tracking
- [ ] Test on mobile devices
- [ ] Monitor error logs
- [ ] Set up uptime monitoring (optional)

## Quick Deploy Commands

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Test production build locally
npm start

# 4. If using Vercel, just push to Git
git add .
git commit -m "Ready for deployment"
git push

# 5. If deploying manually, upload files and run:
npm install --production
npm run build
npm start
```

