'use client'
import SectionTitle from "./SectionTitle";
import { Zap } from "lucide-react";
import { motion } from "motion/react";
import { featuresData } from "@/data/features";
import { IFeature } from "@/types";

export default function FeaturesSection() {
    return (
        <div id="features" className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 relative bg-zinc-950">
            <SectionTitle
                text1="Features"
                text2="Built for Precision"
                text3="Every tool you need to build a professional resume that stands out in modern recruitment."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 px-4">
                {featuresData.map((feature: IFeature, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative"
                    >
                        <div className="relative p-8 rounded-3xl border border-zinc-900 bg-zinc-900/20 hover:border-zinc-700 transition-all h-full">
                            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 mb-6 group-hover:border-blue-500 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center space-x-2 text-blue-500 font-bold text-[10px] uppercase tracking-widest">
                        <Zap size={14} fill="currentColor" />
                        <span>Core Performance</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Modern design for <span className="text-zinc-500">serious</span> outcomes.
                    </h2>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                        Our platform focuses on structure and clarity, ensuring your professional narrative is communicated effectively to hiring managers and ATS systems alike.
                    </p>

                    <div className="pt-4 flex gap-4">
                        <a href="/dashboard" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all">
                            Get Started
                        </a>
                    </div>
                </motion.div>

                <div className="relative rounded-3xl border border-zinc-900 overflow-hidden bg-zinc-900/50 aspect-video flex items-center justify-center">
                    <span className="text-zinc-800 font-bold text-6xl tracking-tighter select-none">RESUME.AI</span>
                </div>
            </div>
        </div>
    );
}