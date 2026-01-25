'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { API_URL } from '@/lib/api';
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    LogOut,
    PlusCircle,
    Globe,
    Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'My Resumes', icon: FileText, href: '/dashboard/resumes' },
    { label: 'Community', icon: Globe, href: '/community' },
    { label: 'Templates', icon: Zap, href: '/dashboard/templates' },
    { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function Sidebar() {
    const pathname = usePathname();

    const handleLogout = async () => {
        await fetch(`${API_URL}/api/auth/logout`, { method: 'POST' });
        window.location.href = '/login';
    };

    return (
        <aside className="w-64 border-r border-zinc-900 bg-zinc-950/50 backdrop-blur-xl h-screen flex flex-col sticky top-0">
            <div className="p-6">
                <Link href="/dashboard" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <FileText className="text-white" size={18} />
                    </div>
                    <span className="text-xl font-bold tracking-tighter italic">RESUME.AI</span>
                </Link>
            </div>

            <div className="px-4 py-4">
                <Link
                    href="/dashboard/create"
                    className="flex items-center justify-center space-x-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                >
                    <PlusCircle size={18} />
                    <span>Create New</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all group",
                                isActive
                                    ? "bg-blue-600/10 text-blue-500"
                                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                            )}
                        >
                            <item.icon size={20} className={cn(
                                "transition-colors",
                                isActive ? "text-blue-500" : "text-zinc-500 group-hover:text-white"
                            )} />
                            <span className="font-medium text-sm">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-zinc-900">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-all group"
                >
                    <LogOut size={20} className="text-zinc-500 group-hover:text-red-500" />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
}
