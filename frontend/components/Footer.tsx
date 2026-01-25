'use client'
import { footerData } from "@/data/footer";
import { LinkedinIcon, TwitterIcon, Github, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { IFooterLink } from "@/types";

export default function Footer() {
    return (
        <footer className="border-t border-zinc-900 bg-zinc-950 px-6 md:px-16 lg:px-24 xl:px-32 py-20 relative overflow-hidden">
            {}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 relative z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex-1 max-w-sm"
                >
                    <Link href="/" className="flex items-center space-x-2 mb-6">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <FileText className="text-white" size={18} />
                        </div>
                        <span className="text-xl font-bold tracking-tighter italic text-white select-none">RESUME.AI</span>
                    </Link>
                    <p className="text-zinc-500 font-medium leading-relaxed">
                        Architecting the professional future of elite talent through AI-powered narrative optimization and premium design systems.
                    </p>
                    <div className="flex items-center gap-5 mt-8">
                        <a href="https://linkedin.com" target="_blank" className="text-zinc-600 hover:text-blue-500 transition-colors">
                            <LinkedinIcon size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" className="text-zinc-600 hover:text-blue-500 transition-colors">
                            <TwitterIcon size={20} />
                        </a>
                        <a href="https://github.com" target="_blank" className="text-zinc-600 hover:text-blue-500 transition-colors">
                            <Github size={20} />
                        </a>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24 flex-[2]">
                    {footerData.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link: IFooterLink, idx: number) => (
                                    <li key={idx}>
                                        <Link href={link.href} className="text-zinc-500 hover:text-blue-500 text-sm font-medium transition-colors flex items-center group">
                                            <span>{link.name}</span>
                                            {link.href.startsWith('http') && <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-zinc-600 tracking-widest uppercase">
                <p>&copy; {new Date().getFullYear()} RESUME.AI PLATFORM. DEVELOPED BY ADITYA RANA, 2ND YEAR STUDENT.</p>
                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-blue-500 transition-colors">Term of Service</Link>
                </div>
            </div>
        </footer>
    );
}