'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Palmtree, Layers, Layout, Palette, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const templates = [
    { id: '1', name: 'Elite Executive', category: 'Professional', color: 'blue' },
    { id: '2', name: 'Creative Wave', category: 'Design', color: 'indigo' },
    { id: '3', name: 'Minimalist Air', category: 'Clean', color: 'zinc' },
    { id: '4', name: 'Modern Tech', category: 'Software', color: 'emerald' },
];

export default function TemplatesPage() {
    return (
        <DashboardLayout>
            <div className="space-y-10">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Design <span className="text-zinc-500">Templates</span></h1>
                    <p className="text-zinc-500 mt-2">Choose from our curated collection of professional templates</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {templates.map((tpl, i) => (
                        <motion.div
                            key={tpl.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-zinc-900/50 border border-zinc-900 rounded-3xl overflow-hidden p-6 hover:border-blue-500/30 transition-all hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.1)]"
                        >
                            <div className="aspect-[3/4] bg-zinc-950 rounded-2xl mb-6 flex items-center justify-center border border-zinc-900">
                                <Layout size={48} className="text-zinc-800 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold">{tpl.name}</h3>
                                {i === 0 && (
                                    <div className="bg-blue-600/10 text-blue-500 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-blue-500/10">
                                        Popular
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-zinc-500">{tpl.category}</p>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex -space-x-1">
                                    {[1, 2, 3].map(c => (
                                        <div key={c} className="w-4 h-4 rounded-full border border-zinc-900 bg-zinc-800" />
                                    ))}
                                </div>
                                <button className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">
                                    Preview
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    <div className="bg-zinc-950 border-2 border-dashed border-zinc-900 rounded-3xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-zinc-800 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Sparkles size={24} className="text-zinc-600" />
                        </div>
                        <h3 className="font-bold text-zinc-400">Custom Template</h3>
                        <p className="text-xs text-zinc-600 mt-1">Coming Soon</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
