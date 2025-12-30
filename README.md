# RetailBuddy

Modern E-Commerce & Admin Suite built with Next.js 14, Cloudflare D1, and Cloudinary.

## Deployment to Cloudflare Pages

Based on the project structure, use the following settings in the Cloudflare Dashboard:

| Setting | Value |
|---------|-------|
| **Framework preset** | `Next.js` |
| **Build command** | `npx @cloudflare/next-on-pages@1` |
| **Build output directory** | `/.vercel/output/static` |

### Environment Variables

Add these variables in **Settings > Variables and Secrets**:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `your_cloud_name` |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | `your_api_key` |
| `CLOUDINARY_API_SECRET` | `your_api_secret` |
| `CLOUDINARY_URL` | `your_cloudinary_url` |
| `ADMIN_PIN` | `admin123` |

## Local Development

1. Create `.env.local` with the variables above.
2. Run `npm install`.
3. Run `npm run dev`.
