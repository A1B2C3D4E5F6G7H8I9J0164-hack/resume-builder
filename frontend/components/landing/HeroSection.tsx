'use client'
import { CheckIcon, VideoIcon } from "lucide-react";
import TiltedImage from "@/components/TiltImage";
import { motion } from "motion/react";

export default function HeroSection() {
    const specialFeatures = [
        "No credit card required",
        "Modern PDF Export",
        "Privacy Focused",
    ];

    return (
        <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32 pt-32 pb-20 bg-zinc-950 overflow-hidden">
            <div className="absolute top-40 -z-10 left-1/4 size-[500px] bg-blue-600/20 blur-[150px] animate-pulse"></div>
            <div className="absolute top-60 -z-10 right-1/4 size-[400px] bg-indigo-600/10 blur-[150px]"></div>
            <motion.h1 className="text-6xl/tight md:text-8xl/tight font-bold max-w-4xl text-center tracking-tight text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Build your <span className="text-zinc-500">dream career</span> with confidence.
            </motion.h1>

            <motion.p className="text-lg md:text-xl text-center text-zinc-400 max-w-2xl mt-8 leading-relaxed font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Create professional, recruiter-ready resumes in minutes. Focus on your story while we handle the design and structural optimization.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4 mt-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <a href="/dashboard" className="px-10 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all active:scale-95">
                    Start Building Free
                </a>
                <button className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 font-bold px-8 py-4 rounded-xl transition-all">
                    <VideoIcon size={18} className="text-zinc-400" />
                    <span className="text-white">Watch demo</span>
                </button>
            </motion.div>

            <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
                {specialFeatures.map((feature, index) => (
                    <motion.p className="flex items-center gap-2" key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                    >
                        <CheckIcon className="size-4 text-blue-500" strokeWidth={3} />
                        <span className="text-zinc-500 text-sm font-bold tracking-tight">{feature}</span>
                    </motion.p>
                ))}
            </div>

            <div className="relative w-full max-w-6xl mt-20">
                <TiltedImage />
            </div>
        </div>
    );
}