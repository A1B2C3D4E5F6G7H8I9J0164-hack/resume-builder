'use client'
import SectionTitle from "@/components/SectionTitle"
import { pricingData } from "@/data/pricing";
import { IPricing } from "@/types";
import { CheckIcon, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function PricingSection() {
    return (
        <div id="pricing" className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 relative overflow-hidden">
            {}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 size-[800px] bg-blue-600/5 blur-[150px]"></div>

            <SectionTitle
                text1="Pricing"
                text2="Investment in Excellence"
                text3="Select the tier that aligns with your professional ambitions. No hidden fees, just pure AI intelligence."
            />

            <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
                {pricingData.map((plan: IPricing, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`w-full max-w-sm rounded-[2.5rem] p-1 ${plan.mostPopular ? 'bg-gradient-to-br from-blue-600/50 to-indigo-600/50 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]' : 'bg-transparent'}`}
                    >
                        <div className={`h-full flex flex-col p-10 rounded-[2.4rem] border border-zinc-900 ${plan.mostPopular ? 'bg-zinc-950 shadow-2xl relative overflow-hidden' : 'bg-zinc-900/30 backdrop-blur-md'}`}>
                            {plan.mostPopular && (
                                <>
                                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl" />
                                    <div className="absolute top-6 right-6">
                                        <div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                            Recommended
                                        </div>
                                    </div>
                                </>
                            )}

                            <div>
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-2">{plan.name}</p>
                                <div className="flex items-baseline gap-1">
                                    <h1 className="text-5xl font-extrabold tracking-tight text-white">${plan.price}</h1>
                                    <span className="text-zinc-500 font-medium tracking-tight">/{plan.period}</span>
                                </div>
                            </div>

                            <div className="mt-10 mb-10 flex-1">
                                <ul className="list-none space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
                                                <CheckIcon className="size-3 text-blue-500" strokeWidth={3} />
                                            </div>
                                            <p className="text-zinc-400 text-sm font-medium">{feature}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                type="button"
                                className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-[0.98] ${plan.mostPopular ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
                            >
                                {plan.mostPopular ? 'Activate Pro Engine' : 'Get Started'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}