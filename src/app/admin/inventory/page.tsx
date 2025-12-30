'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Plus, Save, AlertCircle, ArrowUpDown, Edit2 } from 'lucide-react';

export default function InventoryManager() {
    const [inventory, setInventory] = useState([
        { id: '1', title: 'Gold Plated Necklace', sku: 'JW-GP-001', category: 'Jewelry', stock: 12, price: '$129.00', status: 'In Stock' },
        { id: '2', title: 'Silk Summer Dress', sku: 'CL-SS-002', category: 'Clothing', stock: 5, price: '$89.00', status: 'Low Stock' },
        { id: '3', title: 'Leather Sneakers', sku: 'SH-LS-003', category: 'Shoes', stock: 24, price: '$110.00', status: 'In Stock' },
        { id: '4', title: 'Ceramic Vase Set', sku: 'HH-CV-004', category: 'Household', stock: 0, price: '$45.00', status: 'Out of Stock' },
        { id: '5', title: 'Diamond Stud Earrings', sku: 'JW-DS-005', category: 'Jewelry', stock: 8, price: '$299.00', status: 'In Stock' },
        { id: '6', title: 'Linen Button-Up', sku: 'CL-LB-006', category: 'Clothing', stock: 15, price: '$65.00', status: 'In Stock' },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Stock': return 'text-green-600 bg-green-50';
            case 'Low Stock': return 'text-orange-600 bg-orange-50';
            case 'Out of Stock': return 'text-red-600 bg-red-50';
            default: return 'text-gray-500 bg-gray-50';
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Inventory Manager</h1>
                    <p className="text-gray-500 mt-1">Monitor and update your product stock levels.</p>
                </div>
                <button className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors font-medium">
                    <Save size={18} />
                    Save Changes
                </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        placeholder="Search by SKU or name..."
                        className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-black outline-none transition-all"
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        <ArrowUpDown size={18} />
                        Sort
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-xs uppercase tracking-widest text-gray-400">
                                <th className="px-6 py-4 font-bold">Product</th>
                                <th className="px-6 py-4 font-bold">SKU</th>
                                <th className="px-6 py-4 font-bold">Category</th>
                                <th className="px-6 py-4 font-bold">Stock Level</th>
                                <th className="px-6 py-4 font-bold">Price</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold text-center">Quick Edit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {inventory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold">{item.title}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{item.sku}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                defaultValue={item.stock}
                                                className="w-16 border px-2 py-1 rounded focus:ring-1 focus:ring-black outline-none text-sm font-bold"
                                            />
                                            {item.stock <= 5 && item.stock > 0 && (
                                                <AlertCircle size={14} className="text-orange-500" />
                                            )}
                                            {item.stock === 0 && (
                                                <AlertCircle size={14} className="text-red-500" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold">{item.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
                                                <Edit2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-dashed flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-3 bg-white rounded-full shadow-sm">
                    <Plus size={24} className="text-gray-400" />
                </div>
                <div>
                    <h4 className="font-bold">Add New Inventory Item</h4>
                    <p className="text-sm text-gray-500">Create a new product or variant to track its stock.</p>
                </div>
                <Link href="/admin/products" className="text-sm font-bold underline">Go to Product Importer</Link>
            </div>
        </div>
    );
}
