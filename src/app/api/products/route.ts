import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        const context = getRequestContext();
        const env = (context?.env || process.env) as any;
        const db = env.DB || (globalThis as any).DB;

        if (!db) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        // Handle Single Product Fetch
        if (id) {
            const product = await db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();

            if (!product) {
                return NextResponse.json({ error: 'Product not found' }, { status: 404 });
            }

            const { results: variants } = await db.prepare('SELECT * FROM variants WHERE product_id = ?').bind(id).all();

            return NextResponse.json({
                product: {
                    ...product,
                    images: product.images ? JSON.parse(product.images as string) : [],
                    price: product.base_price,
                    variants: variants || []
                }
            });
        }

        // Handle List Fetch
        let query = `SELECT * FROM products WHERE 1=1`;
        const params: any[] = [];

        if (category && category !== 'All') {
            query += ` AND category = ?`;
            params.push(category);
        }

        if (search) {
            query += ` AND (title LIKE ? OR description LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`);
        }

        query += ` ORDER BY created_at DESC`;

        const { results } = await db.prepare(query).bind(...params).all();

        // Parse images JSON
        const products = results.map((p: any) => ({
            ...p,
            images: p.images ? JSON.parse(p.images) : [],
            price: p.base_price // Map base_price to price for frontend consistency
        }));

        return NextResponse.json({ products });
    } catch (error: any) {
        console.error('Product fetch error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const context = getRequestContext();
        const env = (context?.env || process.env) as any;
        const db = env.DB || (globalThis as any).DB;

        if (!db) {
            console.error('D1 Database binding (DB) not found. Context env keys:', context ? Object.keys(context.env) : 'no context');
            return NextResponse.json({
                error: 'Database connection failed',
                details: 'DB binding not found. Please ensure you have bound your D1 database with the name "DB" in the Cloudflare Pages dashboard.'
            }, { status: 500 });
        }

        const body = await request.json();
        const { id, title, slug, description, category, sub_category, base_price, images, supplier_origin, variants } = body;

        // 1. Insert Product
        await db.prepare(`
            INSERT INTO products (id, title, slug, description, category, sub_category, base_price, images, supplier_origin)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            id,
            title,
            slug,
            description,
            category,
            sub_category,
            base_price,
            JSON.stringify(images),
            supplier_origin
        ).run();

        // 2. Insert Variants
        if (variants && variants.length > 0) {
            const variantStmt = db.prepare(`
                INSERT INTO variants (id, product_id, sku, size, color, stock_quantity, price_override)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `);

            const batch = variants.map((v: any) =>
                variantStmt.bind(
                    crypto.randomUUID(),
                    id,
                    v.sku || `SKU-${Math.random().toString(36).toUpperCase().substring(2, 10)}`,
                    v.size || null,
                    v.color || null,
                    v.stock || 0,
                    v.price || null
                )
            );

            await db.batch(batch);
        }

        return NextResponse.json({ success: true, id });
    } catch (error: any) {
        console.error('Product save error:', error);
        return NextResponse.json({ error: error.message || 'Failed to save product' }, { status: 500 });
    }
}
