'use client'
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <div className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 pb-40">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden group rounded-[3rem] border border-zinc-900 bg-zinc-900/30 backdrop-blur-xl p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10"
            >
                {}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />

                <div className="max-w-xl text-center md:text-left z-10">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white leading-[1.1]"
                    >
                        Ready to join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">elite class?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-zinc-400 mt-6 font-medium leading-relaxed"
                    >
                        Join 20,000+ professionals who have already architected their success with Resume.AI
                    </motion.p>
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="z-10 w-full md:w-auto"
                >
                    <a
                        href="/dashboard"
                        className="group flex items-center justify-center gap-3 bg-white text-black font-extrabold h-16 px-12 rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-white/5 active:scale-95"
                    >
                        <span>Initialize Engine</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}