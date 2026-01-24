'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ResumeCard } from '@/components/dashboard/ResumeCard';
import {
    FilePlus,
    FileText,
    Users,
    Zap,
    Trophy,
    ArrowUpRight,
    Search
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const res = await fetch('/api/resumes');
            const data = await res.json();

            if (res.status === 401) {
                toast.error('Session expired. Please log in again.');
                router.push('/login');
                return;
            }

            if (res.ok) setResumes(data.resumes);
        } catch (error) {
            toast.error('Failed to fetch resumes');
        } finally {
            setLoading(false);
        }
    };

    const deleteResume = async (id: string) => {
        if (!confirm('Are you sure you want to delete this resume?')) return;
        try {
            const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' });

            if (res.status === 401) {
                toast.error('Session expired. Please log in again.');
                router.push('/login');
                return;
            }

            if (res.ok) {
                setResumes(resumes.filter((r: any) => r._id !== id));
                toast.success('Resume deleted');
            }
        } catch (error) {
            toast.error('Failed to delete resume');
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-10">
                {}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-zinc-900 border border-white/5 rounded-[2rem] p-10 overflow-hidden">
                        <div className="max-w-xl relative z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] uppercase tracking-widest font-bold mb-6"
                            >
                                <Zap size={12} />
                                <span>Winter Update 2026</span>
                            </motion.div>
                            <h1 className="text-5xl font-bold tracking-tight mb-4">
                                Elevate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Career Game.</span>
                            </h1>
                            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                                Welcome back, Aditya. You have <span className="text-white font-semibold">{resumes.length} active resumes</span>. Ready to build something world-class today?
                            </p>
                            <Link
                                href="/dashboard/create"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-white/10 group"
                            >
                                <span>Create New Resume</span>
                                <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                            </Link>
                        </div>

                        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
                        >
                            <Trophy size={280} className="text-blue-500" />
                        </motion.div>
                    </div>
                </div>

                {}
                <div>
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">Performance</h2>
                            <p className="text-zinc-500 text-sm">Key metrics for your career growth</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Total Resumes"
                            value={resumes.length}
                            icon={FileText}
                            color="blue"
                            trend={{ value: '12%', isUp: true }}
                        />
                        <StatCard
                            title="Views"
                            value="2.4k"
                            icon={Users}
                            color="emerald"
                            trend={{ value: '8%', isUp: true }}
                        />
                        <StatCard
                            title="Success Rate"
                            value="94%"
                            icon={Trophy}
                            color="amber"
                        />
                        <StatCard
                            title="AI Optimizations"
                            value="42"
                            icon={Zap}
                            color="indigo"
                            trend={{ value: '150', isUp: true }}
                        />
                    </div>
                </div>

                {}
                <div>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl font-bold">Your Resumes</h2>
                            <p className="text-zinc-500 text-sm">Manage and edit your professional profiles</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 flex items-center space-x-2">
                                <Search size={14} className="text-zinc-500" />
                                <input type="text" placeholder="Filter..." className="bg-transparent border-none outline-none text-sm w-32 placeholder:text-zinc-700" />
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-[3/4] bg-zinc-900/50 rounded-3xl animate-pulse border border-zinc-800" />
                            ))}
                        </div>
                    ) : resumes.length === 0 ? (
                        <div className="text-center py-20 bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-[3rem]">
                            <div className="bg-zinc-900 h-24 w-24 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 group hover:rotate-0 transition-transform duration-500">
                                <FilePlus className="text-zinc-700 group-hover:text-blue-500" size={48} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-zinc-200">No resumes found</h3>
                            <p className="text-zinc-500 max-w-xs mx-auto mb-8">
                                Start your journey by creating your first AI-optimized professional resume.
                            </p>
                            <Link
                                href="/dashboard/create"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold transition-all inline-block shadow-lg shadow-blue-500/20"
                            >
                                Get Started
                            </Link>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            <AnimatePresence mode='popLayout'>
                                {resumes.map((resume: any) => (
                                    <ResumeCard
                                        key={resume._id}
                                        resume={resume}
                                        onDelete={deleteResume}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
