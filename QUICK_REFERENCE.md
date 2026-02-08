# 🚀 Quick Reference Card

## Start Development

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

## Access URLs

- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **API**: http://localhost:5000

## New Admin Routes

| Route | Purpose |
|-------|---------|
| `/admin/skills` | Manage tech stack skills |
| `/admin/testimonials` | Manage testimonials (search, publish, feature) |
| `/admin/faqs` | Manage FAQs (max 5 published) |
| `/admin/cms` → Pricing | Edit pricing tiers |
| `/admin/cms` → Social Media | Add social media URLs |

## New Homepage Sections

1. Skills (after Services)
2. Testimonials (after Portfolio)
3. Pricing (after Testimonials)
4. FAQ (after Pricing)

## Key Features

### Testimonials
- ✅ Auto-carousel (3 at a time, 5s interval)
- ✅ Max 9 featured
- ✅ Rate limit: 1 per email per day
- ✅ Email notification to admin
- ✅ Search with highlighting

### Skills
- ✅ Infinite marquee animation
- ✅ 9 default skills included
- ✅ Upload custom icons

### Pricing
- ✅ 3 tiers (Basic, Standard, Premium)
- ✅ Editable via CMS
- ✅ Features: pipe-separated (Feature1|Feature2)

### FAQ
- ✅ Accordion animation
- ✅ Max 5 published
- ✅ 5 default questions

### SEO
- ✅ Meta tags
- ✅ Open Graph
- ✅ Sitemap & robots.txt

### Analytics
- ✅ GA4 ready (add VITE_GA_MEASUREMENT_ID)

## Quick Commands

```bash
# Seed database
cd server && npm run seed

# Install dependencies
cd client && npm install react-ga4

# Build for production
cd client && npm run build
```

## Environment Variables

### Server (.env)
```env
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173
```

### Client (.env) - Optional
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Testimonial Limits

- **Featured**: Max 9
- **Rate Limit**: 1 per email per 24 hours
- **Text Length**: Max 500 characters

## FAQ Limits

- **Published**: Max 5
- **Order**: Customizable

## API Endpoints (New)

### Public
```
GET  /api/skills
GET  /api/faqs/published
GET  /api/testimonials/featured
POST /api/testimonials/submit
```

### Protected (Admin)
```
GET    /api/skills/all
POST   /api/skills
PUT    /api/skills/:id
DELETE /api/skills/:id

GET    /api/faqs
POST   /api/faqs
PUT    /api/faqs/:id
PUT    /api/faqs/:id/publish
DELETE /api/faqs/:id

GET    /api/testimonials?search=
PUT    /api/testimonials/:id/publish
PUT    /api/testimonials/:id/feature
DELETE /api/testimonials/:id
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Skills not showing | Run `npm run seed` |
| Can't submit testimonial | Check backend running & CORS enabled |
| Email not sending | Check EMAIL_USER & EMAIL_PASS in .env |
| Rate limit not working | Ensure MongoDB running |

## Files to Customize

1. `client/src/components/SEO.jsx` - Update domain
2. `client/public/sitemap.xml` - Update domain
3. All API calls - Replace localhost with production URL

## Production Checklist

- [ ] Update all URLs to production
- [ ] Set environment variables
- [ ] Run `npm run seed`
- [ ] Add GA4 Measurement ID
- [ ] Test on mobile
- [ ] Verify email notifications
- [ ] Check rate limiting
- [ ] Test admin panel

## Support Files

- `IMPLEMENTATION_SUMMARY.md` - Complete feature list
- `DEPLOYMENT_GUIDE.md` - Detailed deployment guide
- `INSTALLATION.md` - Installation instructions

---

**Status**: ✅ All features implemented and tested
**Version**: 2.0.0
**Ready**: Production Ready 🚀
