'use client';

import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: string;
        isUp: boolean;
    };
    color: 'blue' | 'indigo' | 'emerald' | 'rose' | 'amber';
}

const colorMap = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    indigo: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    rose: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
};

export function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-zinc-900/50 border border-zinc-900 p-6 rounded-2xl hover:border-zinc-800 transition-all"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2.5 rounded-xl border", colorMap[color])}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                        trend.isUp ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
                    )}>
                        {trend.isUp ? '+' : '-'}{trend.value}
                    </div>
                )}
            </div>

            <div>
                <p className="text-zinc-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-900/50 flex items-center text-[11px] text-zinc-600">
                <span className="font-semibold text-zinc-500 mr-2 italic">INSIGHT</span>
                <span>Performing well this week.</span>
            </div>
        </motion.div>
    );
}
