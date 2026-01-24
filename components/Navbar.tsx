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
                className={`fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-300 ${scrolled ? 'bg-zinc-950 border-b border-zinc-900 py-3' : 'bg-transparent'}`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <Link href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
                        <FileText className="text-white" size={16} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white select-none">RESUME.AI</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navlinks.map((link: INavLink) => (
                        <Link key={link.name} href={link.href} className="text-sm font-bold text-zinc-500 hover:text-white transition-colors">
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login" className="text-sm font-bold text-zinc-500 hover:text-white transition-colors">
                        Sign In
                    </Link>
                    <Link href="/dashboard" className="px-6 py-2.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-zinc-200 transition-all active:scale-95">
                        Get Started
                    </Link>
                </div>

                <button onClick={() => setIsOpen(true)} className="md:hidden text-white">
                    <MenuIcon size={24} />
                </button>
            </motion.nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-8"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white"
                        >
                            <XIcon size={20} />
                        </button>

                        <div className="flex flex-col items-center gap-8 text-3xl font-bold">
                            {navlinks.map((link: INavLink) => (
                                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="mt-4 px-10 py-4 bg-white text-black rounded-xl">
                                Start Free
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}