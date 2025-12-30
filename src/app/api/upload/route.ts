import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const context = getRequestContext();
        const env = (context?.env || process.env) as any;

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const cloudName = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || (env as any).CLOUDINARY_CLOUD_NAME;
        const apiKey = env.NEXT_PUBLIC_CLOUDINARY_API_KEY || (env as any).CLOUDINARY_API_KEY;
        const apiSecret = env.CLOUDINARY_API_SECRET || (env as any).CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
            const missing = [];
            if (!cloudName) missing.push('CLOUD_NAME');
            if (!apiKey) missing.push('API_KEY');
            if (!apiSecret) missing.push('API_SECRET');

            return NextResponse.json({
                error: 'Cloudinary credentials missing',
                details: `Missing: ${missing.join(', ')}. Please set them in Cloudflare Pages Dashboard.`
            }, { status: 500 });
        }

        const timestamp = Math.round(new Date().getTime() / 1000);
        const folder = 'retail-buddy';

        // Create signature
        // Parameters must be in alphabetical order
        const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;

        const encoder = new TextEncoder();
        const data = encoder.encode(signatureString);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append('file', file);
        cloudinaryFormData.append('api_key', apiKey);
        cloudinaryFormData.append('timestamp', timestamp.toString());
        cloudinaryFormData.append('folder', folder);
        cloudinaryFormData.append('signature', signature);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: cloudinaryFormData,
            }
        );

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: result.error?.message || 'Upload failed' }, { status: response.status });
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Upload error details:', {
            message: error.message,
            stack: error.stack,
            env: {
                hasCloudName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                hasApiKey: !!process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
                hasApiSecret: !!process.env.CLOUDINARY_API_SECRET
            }
        });
        return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
    }
}
