'use client';

import { useState } from 'react';
import { fetchWithAuth } from '@/lib/api';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetchWithAuth('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || 'Login failed');
                }
            } else {
                if (!res.ok) {
                    const text = await res.text();
                    console.error('Server error:', text);
                    throw new Error('Server error occurred. Please check if your environment variables are set.');
                }
            }

            toast.success("Logged in successfully!");
            // Use window.location.href for full page reload to ensure cross-site cookies are processed
            // This is necessary for cookies set by the backend (Render) to be available to the frontend (Vercel)
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 100);

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="mt-2 text-zinc-400">Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-zinc-300">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-zinc-300">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-sm text-zinc-400">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="font-medium text-blue-500 hover:text-blue-400">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
