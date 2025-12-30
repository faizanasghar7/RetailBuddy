# Environment Variables Template

Since `.env` files are git-ignored, please create a file named `.env.local` in the root directory and add the following credentials:

```bash
# Cloudinary Credentials
# Get these from your Cloudinary Dashboard: https://cloudinary.com/console
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Admin Configuration
ADMIN_PIN=admin123
```
