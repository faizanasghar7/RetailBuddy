'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        payment: 'card'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would create an order in D1
        setIsSubmitted(true);
        clearCart();
    };

    if (isSubmitted) {
        return (
            <div className="container mx-auto px-4 py-20 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <CheckCircle2 size={64} />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">Order Confirmed!</h1>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Thank you for your purchase. We've sent a confirmation email to <strong>{formData.email}</strong>.
                        Your order number is #RB-{Math.floor(Math.random() * 100000)}.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all"
                >
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-8">
                <ChevronLeft size={20} />
                Back to Cart
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Checkout Form */}
                <div className="space-y-10">
                    <h1 className="text-4xl font-bold tracking-tight">Checkout</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <section className="space-y-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Truck size={22} />
                                Shipping Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        required
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Street Address</label>
                                    <input
                                        required
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">City</label>
                                    <input
                                        required
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                                    <input
                                        required
                                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                                        value={formData.zip}
                                        onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <CreditCard size={22} />
                                Payment Method
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, payment: 'card' })}
                                    className={`p-4 border-2 rounded-2xl text-left transition-all ${formData.payment === 'card' ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    <div className="font-bold">Credit Card</div>
                                    <div className="text-xs text-gray-500 mt-1">Visa, Mastercard, AMEX</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, payment: 'cod' })}
                                    className={`p-4 border-2 rounded-2xl text-left transition-all ${formData.payment === 'cod' ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    <div className="font-bold">Cash on Delivery</div>
                                    <div className="text-xs text-gray-500 mt-1">Pay when you receive</div>
                                </button>
                            </div>
                        </section>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-5 rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
                        >
                            Complete Purchase — ${cartTotal.toFixed(2)}
                        </button>
                    </form>
                </div>

                {/* Order Summary Sidebar */}
                <aside>
                    <div className="bg-gray-50 p-8 rounded-3xl space-y-8 sticky top-24">
                        <h2 className="text-2xl font-bold">Your Order</h2>

                        <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2">
                            {cart.map((item) => (
                                <div key={item.variantId} className="flex gap-4">
                                    <div className="w-16 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-sm">{item.title}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.variantName}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-xs font-medium">Qty: {item.quantity}</span>
                                            <span className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-6 border-t">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border flex items-center gap-4">
                            <div className="bg-green-50 p-2 rounded-full text-green-600">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <div className="text-sm font-bold">Secure Checkout</div>
                                <div className="text-xs text-gray-500">Your data is always protected</div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
