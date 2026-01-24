'use client'
import { TestimonialCardProps } from "@/types";
import { motion } from "motion/react";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
    return (
        <motion.div className="p-8 rounded-[2rem] mx-4 w-80 shrink-0 bg-zinc-900/40 border border-zinc-900 group hover:border-blue-500/30 transition-all hover:bg-zinc-900/60 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote size={80} className="text-blue-500" />
            </div>

            <div className="flex gap-4 items-center">
                <div className="relative p-1 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20">
                    <Image className="size-12 rounded-xl object-cover" src={testimonial.image} alt={testimonial.name} height={60} width={60} />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                        <p className="font-bold text-white tracking-tight">{testimonial.name}</p>
                        <div className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg width="8" height="8" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6L5 8L9 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-500/60 uppercase tracking-widest">{testimonial.handle}</span>
                </div>
            </div>
            <p className="text-zinc-500 font-medium leading-relaxed mt-6">
                "{testimonial.quote}"
            </p>
        </motion.div>
    );
}