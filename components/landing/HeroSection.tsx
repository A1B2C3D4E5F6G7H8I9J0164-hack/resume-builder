'use client'
import { CheckIcon, ChevronRightIcon, VideoIcon, Sparkles } from "lucide-react";
import TiltedImage from "@/components/TiltImage";
import { motion } from "motion/react";

export default function HeroSection() {
    const specialFeatures = [
        "No credit card required",
        "AI-Generated Content",
        "Export to PDF instantly",
    ];

    return (
        <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32 pt-20">
            {}
            <div className="absolute top-40 -z-10 left-1/4 size-[500px] bg-blue-600/20 blur-[150px] animate-pulse"></div>
            <div className="absolute top-60 -z-10 right-1/4 size-[400px] bg-indigo-600/10 blur-[150px]"></div>

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
                className="group flex items-center gap-2 rounded-full p-1 pr-4 mt-20 text-blue-100 bg-blue-500/10 border border-blue-500/20 backdrop-blur-md"
            >
                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    v2.0
                </span>
                <p className="flex items-center gap-1 text-xs font-medium">
                    <span>Launched the new AI engine </span>
                    <ChevronRightIcon size={14} className="group-hover:translate-x-0.5 transition duration-300 text-blue-400" />
                </p>
            </motion.div>

            <motion.h1 className="text-6xl/tight md:text-8xl/tight font-extrabold max-w-4xl text-center tracking-tighter mt-8"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 70 }}
            >
                Build your <span className="text-zinc-500">dream career</span> with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">AI Intelligence.</span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl text-center text-zinc-400 max-w-2xl mt-8 leading-relaxed"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70 }}
            >
                Generate professional, recruiter-ready resumes in seconds. Powered by the next generation of AI content optimization and premium design templates.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center gap-6 mt-12"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70 }}
            >
                <a href="/dashboard" className="flex items-center justify-center bg-white text-black font-bold h-14 px-10 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/10 active:scale-95">
                    Start Building Free
                </a>
                <button className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-blue-500/30 font-bold h-14 px-8 rounded-2xl transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                        <VideoIcon size={18} className="text-blue-500" />
                    </div>
                    <span>Watch demo</span>
                </button>
            </motion.div>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-14 mt-16 pb-20">
                {specialFeatures.map((feature, index) => (
                    <motion.p className="flex items-center gap-2.5" key={index}
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
                            <CheckIcon className="size-3 text-blue-500" strokeWidth={3} />
                        </div>
                        <span className="text-zinc-500 text-sm font-medium">{feature}</span>
                    </motion.p>
                ))}
            </div>

            <div className="relative w-full max-w-6xl">
                <TiltedImage />
            </div>
        </div>
    );
}