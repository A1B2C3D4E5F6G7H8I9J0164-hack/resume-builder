'use client';

import { Sidebar } from './Sidebar';
import { Search, Bell, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-zinc-950 text-white selection:bg-blue-500/30">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0">
                {}
                <header className="h-16 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex-1 max-w-xl">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search resumes, templates..."
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-600"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-zinc-950" />
                        </button>

                        <div className="h-8 w-[1px] bg-zinc-900 mx-2" />

                        <div className="flex items-center space-x-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium">User profile</p>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-none">Pro Plan</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center overflow-hidden">
                                <User className="text-zinc-500" size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="p-8 max-w-7xl mx-auto w-full"
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
