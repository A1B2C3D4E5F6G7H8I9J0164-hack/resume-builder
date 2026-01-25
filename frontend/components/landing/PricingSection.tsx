'use client'
import SectionTitle from "./SectionTitle"
import { pricingData } from "@/data/pricing";
import { IPricing } from "@/types";
import { CheckIcon } from "lucide-react";
import { motion } from "motion/react";

export default function PricingSection() {
    return (
        <div id="pricing" className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 relative bg-zinc-950">
            <SectionTitle
                text1="Pricing"
                text2="Choose Your Plan"
                text3="Select the tier that aligns with your professional ambitions. Transparent pricing for career excellence."
            />

            <div className="flex flex-wrap items-center justify-center gap-8 mt-20">
                {pricingData.map((plan: IPricing, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className={`w-full max-w-sm rounded-3xl p-8 border ${plan.mostPopular ? 'border-blue-600 bg-zinc-900/50 shadow-xl shadow-blue-500/5' : 'border-zinc-900 bg-zinc-900/20'}`}
                    >
                        <div className="flex flex-col h-full">
                            <div className="mb-8">
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-2">{plan.name}</p>
                                <div className="flex items-baseline gap-1">
                                    <h1 className="text-4xl font-bold tracking-tight text-white">${plan.price}</h1>
                                    <span className="text-zinc-500 font-medium tracking-tight">/{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-blue-500" strokeWidth={3} />
                                        <p className="text-zinc-400 text-sm font-medium">{feature}</p>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                className={`w-full py-4 rounded-xl font-bold transition-all active:scale-[0.95] ${plan.mostPopular ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
                            >
                                {plan.mostPopular ? 'Get Pro Access' : 'Start for Free'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}