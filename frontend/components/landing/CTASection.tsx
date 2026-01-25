'use client'
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <div className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 pb-40">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden group rounded-3xl border border-zinc-900 bg-zinc-900/40 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10"
            >
                <div className="max-w-xl text-center md:text-left z-10">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        Ready to build a <span className="text-zinc-500">better resume?</span>
                    </h2>
                    <p className="text-lg text-zinc-400 mt-4 font-medium leading-relaxed">
                        Join thousands of professionals who have simplified their job search with our streamlined career tools.
                    </p>
                </div>

                <div className="z-10 w-full md:w-auto">
                    <a
                        href="/signup"
                        className="group flex items-center justify-center gap-3 bg-white text-black font-bold h-14 px-10 rounded-xl hover:bg-zinc-200 transition-all active:scale-95"
                    >
                        <span>Get Started Now</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </motion.div>
        </div>
    );
}