'use client'
import { MenuIcon, XIcon, FileText } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { navlinks } from "@/data/navlinks";
import { INavLink } from "@/types";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                className={`fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent'}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70 }}
            >
                <Link href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <FileText className="text-white" size={18} />
                    </div>
                    <span className="text-xl font-bold tracking-tighter italic text-white select-none">RESUME.AI</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navlinks.map((link: INavLink) => (
                        <Link key={link.name} href={link.href} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">
                        Sign In
                    </Link>
                    <Link href="/dashboard" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                        Build For Free
                    </Link>
                </div>

                <button onClick={() => setIsOpen(true)} className="md:hidden text-white">
                    <MenuIcon size={26} className="active:scale-90 transition" />
                </button>
            </motion.nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-100 bg-zinc-950 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white"
                        >
                            <XIcon size={20} />
                        </button>

                        <div className="flex flex-col items-center gap-8 text-2xl font-bold">
                            {navlinks.map((link: INavLink) => (
                                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="mt-4 px-10 py-4 bg-blue-600 text-white rounded-2xl">
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}