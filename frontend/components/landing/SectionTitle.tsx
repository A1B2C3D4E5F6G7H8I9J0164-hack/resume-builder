'use client'
import { motion } from "motion/react"

interface SectionTitleProps {
    text1: string;
    text2: string;
    text3: string;
}

export default function SectionTitle({ text1, text2, text3 }: SectionTitleProps) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center space-y-4"
        >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                {text1}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl">
                {text2}
            </h2>
            <p className="text-zinc-500 font-medium max-w-xl text-lg leading-relaxed">
                {text3}
            </p>
        </motion.div>
    );
}