'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/api';
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
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [resumesRes, userRes] = await Promise.all([
                fetch(`${API_URL}/api/resumes`),
                fetch(`${API_URL}/api/auth/me`)
            ]);

            const resumesData = await resumesRes.json();
            const userData = await userRes.json();

            if (resumesRes.status === 401 || userRes.status === 401) {
                toast.error('Session expired. Please log in again.');
                router.push('/login');
                return;
            }

            if (resumesRes.ok) setResumes(resumesData.resumes);
            if (userRes.ok) setUser(userData.user);
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const deleteResume = async (id: string) => {
        if (!confirm('Are you sure you want to delete this resume?')) return;
        try {
            const res = await fetch(`${API_URL}/api/resumes/${id}`, { method: 'DELETE' });

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
            <div className="space-y-12">
                <div className="relative group">
                    <div className="relative bg-zinc-900/50 border border-zinc-900 rounded-3xl p-10 overflow-hidden">
                        <div className="max-w-xl relative z-10">
                            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
                                Welcome back, <span className="text-zinc-500">{user?.name?.split(' ')[0] || 'User'}.</span>
                            </h1>
                            <p className="text-zinc-500 text-lg mb-8 leading-relaxed font-medium">
                                You have <span className="text-white font-bold">{resumes.length} professional profiles</span> active. Ready to refine your career narrative today?
                            </p>
                            <Link
                                href="/dashboard/create"
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all active:scale-95 group"
                            >
                                <span>Create New Resume</span>
                                <ArrowUpRight className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={18} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-end mb-6 px-2">
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">Overview</h2>
                            <p className="text-zinc-500 text-sm font-medium">Your current performance metrics</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Total Resumes"
                            value={resumes.length}
                            icon={FileText}
                            color="blue"
                        />
                        <StatCard
                            title="Profile Views"
                            value="2,482"
                            icon={Users}
                            color="emerald"
                        />
                        <StatCard
                            title="Success Rate"
                            value="94%"
                            icon={Trophy}
                            color="amber"
                        />
                        <StatCard
                            title="AI Score"
                            value="98"
                            icon={Zap}
                            color="indigo"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-end mb-8 px-2">
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">Your Resumes</h2>
                            <p className="text-zinc-500 text-sm font-medium">Manage and refine your professional profiles</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="bg-zinc-900/50 border border-zinc-900 rounded-xl px-4 py-2 flex items-center space-x-2">
                                <Search size={14} className="text-zinc-600" />
                                <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-32 text-zinc-300 placeholder:text-zinc-700 font-medium" />
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-[4/5] bg-zinc-900/20 rounded-3xl animate-pulse border border-zinc-900" />
                            ))}
                        </div>
                    ) : resumes.length === 0 ? (
                        <div className="text-center py-24 bg-zinc-900/10 border border-zinc-900 rounded-[2.5rem]">
                            <div className="bg-zinc-900/50 h-20 w-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <FilePlus className="text-zinc-800" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-zinc-400">No resumes yet</h3>
                            <p className="text-zinc-600 max-w-xs mx-auto mb-8 font-medium">
                                Start building your first professional profile with our streamlined tools.
                            </p>
                            <Link
                                href="/dashboard/create"
                                className="bg-zinc-900 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition-all inline-block border border-zinc-800"
                            >
                                Get Started
                            </Link>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
