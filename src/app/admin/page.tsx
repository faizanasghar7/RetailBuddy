'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Sales', value: '$24,500', change: '+12.5%', trend: 'up', icon: TrendingUp },
        { label: 'Total Orders', value: '156', change: '+8.2%', trend: 'up', icon: ShoppingBag },
        { label: 'Active Customers', value: '1,240', change: '-2.4%', trend: 'down', icon: Users },
        { label: 'Low Stock Items', value: '12', change: 'Critical', trend: 'neutral', icon: AlertCircle },
    ];

    const recentOrders = [
        { id: '#ORD-7281', customer: 'Sarah Johnson', date: '2 mins ago', amount: '$129.00', status: 'Processing' },
        { id: '#ORD-7280', customer: 'Michael Chen', date: '15 mins ago', amount: '$89.00', status: 'Shipped' },
        { id: '#ORD-7279', customer: 'Emma Wilson', date: '1 hour ago', amount: '$210.00', status: 'Delivered' },
        { id: '#ORD-7278', customer: 'James Miller', date: '3 hours ago', amount: '$45.00', status: 'Pending' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">Download Report</button>
                    <Link href="/admin/products" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm">Add Product</Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-gray-50 rounded-xl text-gray-600">
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-600' :
                                    stat.trend === 'down' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'
                                }`}>
                                {stat.change}
                                {stat.trend === 'up' && <ArrowUpRight size={12} />}
                                {stat.trend === 'down' && <ArrowDownRight size={12} />}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h3 className="font-bold text-lg">Recent Orders</h3>
                        <Link href="/admin/orders" className="text-sm font-bold text-gray-400 hover:text-black transition-colors">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-xs uppercase tracking-widest text-gray-400">
                                    <th className="px-6 py-4 font-bold">Order ID</th>
                                    <th className="px-6 py-4 font-bold">Customer</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-sm">{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold">{order.customer}</div>
                                            <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                <Clock size={12} /> {order.date}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                                    order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                                                        order.status === 'Processing' ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-600'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-sm">{order.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions / Inventory Alert */}
                <div className="space-y-8">
                    <div className="bg-black text-white p-8 rounded-3xl space-y-6">
                        <h3 className="text-xl font-bold">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <Link href="/admin/products" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                                <Package size={20} />
                                <span className="font-medium">Manage Products</span>
                            </Link>
                            <Link href="/admin/inventory" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                                <LayoutDashboard size={20} />
                                <span className="font-medium">Update Inventory</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                        <h3 className="font-bold">Inventory Alerts</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-3 items-center">
                                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <AlertCircle size={20} />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="text-sm font-bold">Gold Silk Scarf</div>
                                        <div className="text-xs text-gray-400">Only 2 units left in stock</div>
                                    </div>
                                    <Link href="/admin/inventory" className="text-xs font-bold underline">Restock</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
