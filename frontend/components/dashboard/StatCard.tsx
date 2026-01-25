'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: 'blue' | 'indigo' | 'emerald' | 'rose' | 'amber';
}

const colorMap = {
    blue: 'text-blue-500 bg-blue-500/10',
    indigo: 'text-indigo-500 bg-indigo-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10',
    rose: 'text-rose-500 bg-rose-500/10',
    amber: 'text-amber-500 bg-amber-500/10',
};

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
    return (
        <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl">
            <div className="flex items-center space-x-4">
                <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>
                    <Icon size={20} />
                </div>
                <div>
                    <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest leading-none mb-2">{title}</p>
                    <h3 className="text-2xl font-bold tracking-tight text-white">{value}</h3>
                </div>
            </div>
        </div>
    );
}
