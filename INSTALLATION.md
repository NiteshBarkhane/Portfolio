# Installation Instructions for New Features

## Backend Dependencies
No new backend dependencies needed (all features use existing packages)

## Frontend Dependencies
Run these commands in the `client` folder:

```bash
npm install react-ga4
```

## Environment Variables
Add to `server/.env`:

```env
# Optional: Google Analytics (add your GA4 Measurement ID)
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Client URL for email links
CLIENT_URL=http://localhost:5173
```

## Database Setup
Run the seed script to populate initial data:

```bash
cd server
npm run seed
```

This will add:
- 9 default skills (React, Node.js, MongoDB, etc.)
- 5 default FAQs
- Pricing section settings
- Social media settings

## Start Development Servers

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```

## New Features Added

1. **Skills Section** - Marquee animation with tech stack
2. **Pricing Section** - 3 pricing tiers (editable via CMS)
3. **FAQ Section** - Accordion with 5 published FAQs
4. **Testimonials** - Carousel with submission form and rate limiting
5. **Social Media** - Extended social media links
6. **SEO** - Meta tags, sitemap, robots.txt
7. **Analytics** - Google Analytics 4 integration

## Admin Panel Routes

- `/admin/skills` - Manage skills
- `/admin/faqs` - Manage FAQs
- `/admin/testimonials` - Manage testimonials (search, publish, feature)
- `/admin/cms` - Updated with Pricing & Social Media sections

## Testing Checklist

- [ ] Skills marquee scrolls smoothly
- [ ] Pricing cards display correctly
- [ ] FAQ accordion expands/collapses
- [ ] Testimonial form submits successfully
- [ ] Rate limiting prevents multiple submissions
- [ ] Admin can manage all new modules
- [ ] Search highlights text in testimonials
- [ ] SEO meta tags render correctly
- [ ] All sections are mobile responsive
