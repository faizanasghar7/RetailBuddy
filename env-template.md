# Environment Variables Template

Since `.env` files are git-ignored, please create a file named `.env.local` in the root directory and add the following credentials:

```bash
# Cloudinary Credentials
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=your_cloudinary_url

# Admin Configuration
ADMIN_PIN=admin123
```
