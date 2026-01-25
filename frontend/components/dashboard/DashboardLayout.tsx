'use client';

import { Sidebar } from './Sidebar';
import { Search, Bell, User } from 'lucide-react';
import { motion } from 'motion/react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-zinc-950 text-white selection:bg-blue-500/30">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex-1 max-w-xl">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-64 bg-zinc-900/40 border border-zinc-900 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-zinc-700 transition-all placeholder:text-zinc-700"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="p-2 text-zinc-500 hover:text-white transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        </button>

                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center overflow-hidden">
                                <User className="text-zinc-600" size={18} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-8 max-w-7xl mx-auto w-full"
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
