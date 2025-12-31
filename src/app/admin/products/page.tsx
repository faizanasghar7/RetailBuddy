'use client';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Upload, Plus, Trash2, Save, FileSpreadsheet, Globe, Database } from 'lucide-react';

// Helper: Cartesian Product for Variants
const cartesian = (...a: any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));

export default function AdminProductPage() {
    const [mode, setMode] = useState('manual');

    // Product State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Select Category');
    const [subCategory, setSubCategory] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Matrix State
    const [sizes, setSizes] = useState('');
    const [colors, setColors] = useState('');
    const [generatedVariants, setGeneratedVariants] = useState<any[]>([]);

    const generateMatrix = () => {
        const sizeArr = sizes.split(',').map(s => s.trim()).filter(s => s);
        const colorArr = colors.split(',').map(c => c.trim()).filter(c => c);

        // If we have both, mix them. If only one, just list them.
        let combos = [];
        if (sizeArr.length && colorArr.length) {
            combos = cartesian(sizeArr, colorArr);
        } else if (sizeArr.length || colorArr.length) {
            combos = sizeArr.length ? sizeArr : colorArr;
        }

        const variants = combos.map((combo: any) => ({
            name: Array.isArray(combo) ? combo.join(' / ') : combo,
            price: 0,
            stock: 10,
            sku: ''
        }));

        setGeneratedVariants(variants);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.secure_url) {
                setImages([...images, data.secure_url]);
            }
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (url: string) => {
        setImages(images.filter(img => img !== url));
    };

    const handleSave = async () => {
        if (!title || category === 'Select Category' || !basePrice) {
            alert('Please fill in required fields (Title, Category, Price)');
            return;
        }

        setSaving(true);
        const productId = crypto.randomUUID();
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Math.random().toString(36).substring(2, 7);

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: productId,
                    title,
                    slug,
                    description,
                    category,
                    sub_category: subCategory,
                    base_price: parseFloat(basePrice),
                    images,
                    supplier_origin: mode,
                    variants: generatedVariants
                }),
            });

            const data = await res.json();
            if (data.success) {
                alert('Product saved successfully!');
                // Reset form
                setTitle('');
                setBasePrice('');
                setImages([]);
                setGeneratedVariants([]);
            } else {
                throw new Error(data.error || 'Failed to save');
            }
        } catch (err: any) {
            console.error('Save failed:', err);
            alert('Error: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Universal Product Importer</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-black text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Product'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 mb-8 border-b">
                {[
                    { id: 'manual', icon: Plus, label: 'Manual Entry' },
                    { id: 'excel', icon: FileSpreadsheet, label: 'Excel/CSV' },
                    { id: 'scraper', icon: Globe, label: 'Web Scraper' },
                    { id: 'api', icon: Database, label: 'API Sync' }
                ].map(m => (
                    <button
                        key={m.id}
                        onClick={() => setMode(m.id)}
                        className={`pb-4 flex items-center gap-2 font-medium transition-all relative ${mode === m.id ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <m.icon size={18} />
                        {m.label}
                        {mode === m.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black animate-in fade-in slide-in-from-bottom-1" />
                        )}
                    </button>
                ))}
            </div>

            {/* MODE: MANUAL + MATRIX */}
            {mode === 'manual' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
                        <h2 className="text-xl font-bold">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Product Title</label>
                                <input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="e.g. Premium Silk Scarf"
                                    className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Category</label>
                                <select
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all appearance-none bg-white"
                                >
                                    <option>Select Category</option>
                                    <option>Jewelry</option>
                                    <option>Clothing</option>
                                    <option>Shoes</option>
                                    <option>Household</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Base Price ($)</label>
                                <input
                                    type="number"
                                    value={basePrice}
                                    onChange={e => setBasePrice(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Sub-Category</label>
                                <input
                                    value={subCategory}
                                    onChange={e => setSubCategory(e.target.value)}
                                    placeholder="e.g. Stitched"
                                    className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                rows={4}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Describe your product..."
                                className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Upload size={18} />
                            Product Images
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {images.map((url, idx) => (
                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border bg-white group">
                                    <img src={url} alt="Product" className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removeImage(url)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ))}
                            <label className={`aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black transition-all bg-white cursor-pointer ${uploading ? 'animate-pulse' : ''}`}>
                                <Plus size={24} />
                                <span className="text-xs mt-2">{uploading ? 'Uploading...' : 'Add Image'}</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                            </label>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-xl font-bold mb-6">Variant Matrix Generator</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Sizes (comma separated)</label>
                                <input
                                    placeholder="e.g. S, M, L, XL"
                                    value={sizes}
                                    onChange={e => setSizes(e.target.value)}
                                    className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Colors (comma separated)</label>
                                <input
                                    placeholder="e.g. Red, Blue, Black"
                                    value={colors}
                                    onChange={e => setColors(e.target.value)}
                                    className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                                />
                            </div>
                        </div>
                        <button
                            onClick={generateMatrix}
                            className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                        >
                            Generate Variants
                        </button>

                        {/* Generated Table */}
                        {generatedVariants.length > 0 && (
                            <div className="mt-8 overflow-hidden rounded-xl border">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="bg-gray-50 border-b">
                                            <th className="p-4 font-semibold text-gray-700">Variant</th>
                                            <th className="p-4 font-semibold text-gray-700">Price Override</th>
                                            <th className="p-4 font-semibold text-gray-700">Stock</th>
                                            <th className="p-4 font-semibold text-gray-700">SKU</th>
                                            <th className="p-4 font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {generatedVariants.map((v, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4 font-medium">{v.name}</td>
                                                <td className="p-4">
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                                        <input className="w-24 border pl-7 pr-3 py-1.5 rounded-md focus:ring-1 focus:ring-black outline-none" defaultValue={v.price} />
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <input className="w-20 border px-3 py-1.5 rounded-md focus:ring-1 focus:ring-black outline-none" defaultValue={v.stock} />
                                                </td>
                                                <td className="p-4">
                                                    <input className="w-full max-w-[160px] border px-3 py-1.5 rounded-md focus:ring-1 focus:ring-black outline-none" placeholder="AUTO-SKU" />
                                                </td>
                                                <td className="p-4">
                                                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MODE: EXCEL (Client Side) */}
            {mode === 'excel' && (
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center animate-in fade-in duration-500">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileSpreadsheet size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Upload Supplier Spreadsheet</h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Drag and drop your .xlsx or .csv files here. We'll automatically map the columns to our database.
                    </p>
                    <label className="bg-black text-white px-8 py-3 rounded-full cursor-pointer hover:bg-gray-800 transition-colors inline-block font-medium">
                        Browse Files
                        <input
                            type="file"
                            className="hidden"
                            accept=".xlsx, .xls, .csv"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                setUploading(true);
                                try {
                                    const buffer = await file.arrayBuffer();
                                    const wb = XLSX.read(buffer);
                                    const ws = wb.Sheets[wb.SheetNames[0]];
                                    const data: any[] = XLSX.utils.sheet_to_json(ws);

                                    let successCount = 0;

                                    for (const row of data) {
                                        // 1. Map Columns (Flexible matching)
                                        const title = row['Title'] || row['Product Name'] || row['Name'];
                                        if (!title) continue;

                                        const price = row['Price'] || row['Base Price'] || row['Cost'] || 0;
                                        const category = row['Category'] || 'Uncategorized';
                                        const description = row['Description'] || '';
                                        const image = row['Image'] || row['Image URL'] || '';

                                        // 2. Handle Variants (Size/Color columns)
                                        const sizeStr = row['Size'] || row['Sizes'] || '';
                                        const colorStr = row['Color'] || row['Colors'] || '';

                                        const sizeArr = sizeStr ? sizeStr.toString().split(',').map((s: string) => s.trim()) : [];
                                        const colorArr = colorStr ? colorStr.toString().split(',').map((c: string) => c.trim()) : [];

                                        let variants: any[] = [];
                                        if (sizeArr.length || colorArr.length) {
                                            // Generate combinations
                                            const combos = (sizeArr.length && colorArr.length)
                                                ? cartesian(sizeArr, colorArr)
                                                : (sizeArr.length ? sizeArr : colorArr);

                                            variants = combos.map((c: any) => {
                                                let size = null;
                                                let color = null;

                                                if (Array.isArray(c)) {
                                                    size = c[0];
                                                    color = c[1];
                                                } else {
                                                    if (sizeArr.length) size = c;
                                                    else color = c;
                                                }

                                                return {
                                                    name: Array.isArray(c) ? c.join(' / ') : c,
                                                    price: 0,
                                                    stock: 10,
                                                    sku: '',
                                                    size,
                                                    color
                                                };
                                            });
                                        }

                                        // 3. Create Product
                                        const productId = crypto.randomUUID();
                                        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Math.random().toString(36).substring(2, 7);

                                        await fetch('/api/products', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                id: productId,
                                                title,
                                                slug,
                                                description,
                                                category,
                                                sub_category: '',
                                                base_price: parseFloat(price),
                                                images: image ? [image] : [],
                                                variants,
                                                supplier_origin: 'excel'
                                            })
                                        });
                                        successCount++;
                                    }
                                    alert(`Successfully imported ${successCount} products!`);
                                } catch (err) {
                                    console.error('Excel import failed:', err);
                                    alert('Failed to import Excel file.');
                                } finally {
                                    setUploading(false);
                                }
                            }}
                        />
                    </label>
                </div>
            )}

            {/* Placeholder for other modes */}
            {(mode === 'scraper' || mode === 'api') && (
                <div className="bg-white p-12 rounded-2xl border text-center animate-in fade-in duration-500">
                    <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                    <p className="text-gray-500">This import method is currently under development.</p>
                </div>
            )}
        </div>
    );
}
