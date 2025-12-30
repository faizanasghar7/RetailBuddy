'use client';
import { useState } from 'react';
import { Search, Filter, ChevronDown, Clock, Package, CheckCircle2, AlertCircle, Eye } from 'lucide-react';

export default function OrderManager() {
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

    const orders = [
        { id: '#ORD-7281', customer: 'Sarah Johnson', email: 'sarah.j@example.com', date: 'Dec 31, 2025', amount: '$129.00', status: 'Processing', items: 2 },
        { id: '#ORD-7280', customer: 'Michael Chen', email: 'm.chen@example.com', date: 'Dec 31, 2025', amount: '$89.00', status: 'Shipped', items: 1 },
        { id: '#ORD-7279', customer: 'Emma Wilson', email: 'emma.w@example.com', date: 'Dec 30, 2025', amount: '$210.00', status: 'Delivered', items: 3 },
        { id: '#ORD-7278', customer: 'James Miller', email: 'j.miller@example.com', date: 'Dec 30, 2025', amount: '$45.00', status: 'Pending', items: 1 },
        { id: '#ORD-7277', customer: 'Olivia Davis', email: 'olivia.d@example.com', date: 'Dec 29, 2025', amount: '$350.00', status: 'Delivered', items: 5 },
    ];

    const filteredOrders = activeTab === 'All'
        ? orders
        : orders.filter(o => o.status === activeTab);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-50 text-green-600';
            case 'Shipped': return 'bg-blue-50 text-blue-600';
            case 'Processing': return 'bg-orange-50 text-orange-600';
            case 'Pending': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-50 text-gray-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Delivered': return <CheckCircle2 size={14} />;
            case 'Shipped': return <Package size={14} />;
            case 'Processing': return <Clock size={14} />;
            case 'Pending': return <AlertCircle size={14} />;
            default: return null;
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Order Manager</h1>
                <p className="text-gray-500 mt-1">Track and manage your customer orders.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            placeholder="Search orders..."
                            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-black outline-none transition-all"
                        />
                    </div>
                    <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-xs uppercase tracking-widest text-gray-400">
                                <th className="px-6 py-4 font-bold">Order ID</th>
                                <th className="px-6 py-4 font-bold">Customer</th>
                                <th className="px-6 py-4 font-bold">Date</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold text-right">Amount</th>
                                <th className="px-6 py-4 font-bold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-sm">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold">{order.customer}</div>
                                        <div className="text-xs text-gray-400">{order.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="text-sm font-bold">{order.amount}</div>
                                        <div className="text-xs text-gray-400">{order.items} items</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
                                                <ChevronDown size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No orders found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}
