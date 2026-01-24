'use client'
import { TestimonialCardProps } from "@/types";
import { motion } from "motion/react";
import Image from "next/image";

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
    return (
        <motion.div className="p-8 rounded-3xl bg-zinc-900/20 border border-zinc-900 group hover:border-zinc-700 transition-all h-full"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
        >
            <div className="flex gap-4 items-center">
                <Image className="size-10 rounded-full object-cover border border-zinc-800" src={testimonial.image} alt={testimonial.name} height={40} width={40} />
                <div className="flex flex-col">
                    <p className="font-bold text-white text-sm tracking-tight">{testimonial.name}</p>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{testimonial.handle}</span>
                </div>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mt-6 italic">
                "{testimonial.quote}"
            </p>
        </motion.div>
    );
}