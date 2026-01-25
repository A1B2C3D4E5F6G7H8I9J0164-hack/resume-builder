'use client';

import { fetchWithAuth } from '@/lib/api';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FileText, Eye, User, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CommunityPage() {
    const router = useRouter();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWithAuth('/api/community')
            .then(res => {
                if (res.status === 401) {
                    toast.error('Session expired. Please log in again.');
                    router.push('/login');
                    return;
                }
                return res.json();
            })
            .then(data => {
                if (data) {
                    setResumes(data.resumes || []);
                    setLoading(false);
                }
            });
    }, [router]);

    return (
        <DashboardLayout>
            <div className="space-y-10">
                { }
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center space-x-2 text-blue-500 mb-2">
                            <Globe size={18} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Global Network</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Community <span className="text-zinc-500">Showcase</span></h1>
                        <p className="text-zinc-500 mt-2 max-w-md">
                            Explore and get inspired by professional resumes crafted by our elite community members.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-72 bg-zinc-900/50 rounded-3xl animate-pulse border border-zinc-900" />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode='popLayout'>
                            {resumes.map((resume: any, index: number) => (
                                <motion.div
                                    key={resume._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group relative bg-zinc-900/40 border border-zinc-900 rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all hover:bg-zinc-900/60"
                                >
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="h-14 w-14 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/10 group-hover:scale-110 transition-transform duration-500">
                                                <FileText className="text-blue-500" size={28} />
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">
                                                    Template
                                                </span>
                                                <span className="text-xs font-bold text-zinc-400 bg-zinc-800/50 px-2 py-0.5 rounded-lg border border-zinc-700/50">
                                                    {resume.templateId || 'Modern'}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold truncate text-zinc-100 group-hover:text-blue-400 transition-colors">
                                            {resume.personalInfo?.fullName}
                                        </h3>
                                        <p className="text-zinc-500 font-medium mt-1 truncate">
                                            {resume.personalInfo?.role}
                                        </p>

                                        <div className="mt-8 pt-6 border-t border-zinc-800/50 flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                                                    <User size={14} className="text-zinc-500" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-zinc-600 uppercase font-black tracking-tighter">Authored by</span>
                                                    <span className="text-xs font-bold text-zinc-300">
                                                        {resume.userId?.name || 'Anonymous User'}
                                                    </span>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/resume/${resume._id}`}
                                                className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:scale-110 transition-all shadow-lg active:scale-95"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                        </div>
                                    </div>

                                    { }
                                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    );
}
