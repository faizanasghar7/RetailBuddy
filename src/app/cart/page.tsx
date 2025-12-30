'use client';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    if (cartCount === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center space-y-6">
                <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag size={48} className="text-gray-300" />
                </div>
                <h1 className="text-3xl font-bold">Your cart is empty</h1>
                <p className="text-gray-500 max-w-md mx-auto">
                    Looks like you haven't added anything to your cart yet. Explore our catalog to find something you love.
                </p>
                <Link
                    href="/shop"
                    className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold tracking-tight mb-12">Shopping Cart ({cartCount})</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-8">
                    {cart.map((item) => (
                        <div key={item.variantId} className="flex gap-6 pb-8 border-b">
                            <div className="w-24 h-32 sm:w-32 sm:h-40 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow flex flex-col justify-between py-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg">{item.title}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{item.variantName}</p>
                                    </div>
                                    <p className="font-bold text-lg">${item.price}</p>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center border rounded-full px-3 py-1">
                                        <button
                                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                            className="p-1 hover:text-gold-600"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                            className="p-1 hover:text-gold-600"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.variantId)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <aside className="lg:col-span-1">
                    <div className="bg-gray-50 p-8 rounded-3xl space-y-6 sticky top-24">
                        <h2 className="text-2xl font-bold">Order Summary</h2>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Estimated Tax</span>
                                <span className="font-medium">$0.00</span>
                            </div>
                            <div className="pt-4 border-t flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                        >
                            Checkout Now
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="pt-4 text-center">
                            <Link href="/shop" className="text-sm text-gray-500 hover:text-black transition-colors">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
