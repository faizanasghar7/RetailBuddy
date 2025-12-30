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

**IMPORTANT**: These variables **must** be added manually in the Cloudflare Pages Dashboard under **Settings > Variables and Secrets** for the live site to work.

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `daskfwfho` |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | `421877397396513` |
| `CLOUDINARY_API_SECRET` | `DwzGYfcFtkJ1b648ocpy6JFxzp0` |
| `ADMIN_PIN` | `admin123` |

### Cloudflare Pages D1 Binding

To connect your live site to the database, you **must** add a D1 binding in the Cloudflare Dashboard:

1.  Go to **Workers & Pages** > **RetailBuddy** project.
2.  Navigate to **Settings** > **Functions**.
3.  Scroll down to **D1 database bindings**.
4.  Click **Add binding**.
5.  **Variable name**: `DB`
6.  **D1 database**: Select `retailbuddy`.
7.  **Save** and then click **Redeploy** on your latest deployment.

### Node.js Compatibility Flag

If you see a "Node.JS Compatibility Error", you must enable the compatibility flag:

1.  Go to **Settings** > **Functions**.
2.  Scroll down to **Compatibility Flags**.
3.  Add `nodejs_compat` to both **Production** and **Preview** environments.
4.  **Save** and redeploy.

## Local Development

1. Create `.env.local` with the variables above.
2. Run `npm install`.
3. Run `npm run dev`.
