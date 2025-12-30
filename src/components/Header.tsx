'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { cartCount } = useCart();
    const [showLogin, setShowLogin] = useState(false);
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleAdminLogin = async () => {
        // Simple client-side check for demo (Move to API for production)
        if (password === 'admin123') {
            document.cookie = "admin_session=true; path=/";
            router.push('/admin');
            setShowLogin(false);
        } else {
            alert("Access Denied");
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Retail<span className="text-gold-500">Buddy</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    <Link href="/shop/jewelry" className="hover:text-gold-600 transition-colors">Jewelry</Link>
                    <Link href="/shop/clothing" className="hover:text-gold-600 transition-colors">Clothing</Link>
                    <Link href="/shop/shoes" className="hover:text-gold-600 transition-colors">Shoes</Link>
                    <Link href="/shop/household" className="hover:text-gold-600 transition-colors">Household</Link>
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowLogin(true)}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                        title="Admin Access"
                    >
                        <Lock size={20} />
                    </button>

                    <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Admin Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-80 border animate-in fade-in zoom-in duration-200">
                        <h3 className="font-bold mb-4 text-lg">Admin Access</h3>
                        <input
                            type="password"
                            placeholder="Enter PIN"
                            className="w-full border p-2 mb-4 rounded focus:ring-2 focus:ring-black outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                            autoFocus
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowLogin(false)}
                                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAdminLogin}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
