'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/api';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ResumeCard } from '@/components/dashboard/ResumeCard';
import { FileText, Search, Filter, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function ResumesPage() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const res = await fetch(`${API_URL}/api/resumes`);
            const data = await res.json();
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
            const res = await fetch(`${API_URL}/api/resumes/${id}`, { method: 'DELETE' });
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
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">My <span className="text-zinc-500">Resumes</span></h1>
                        <p className="text-zinc-500 mt-1">Manage and organize all your professional documents</p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 flex items-center space-x-2 w-full md:w-64">
                            <Search size={18} className="text-zinc-500" />
                            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-zinc-600" />
                        </div>
                        <button className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all">
                            <Filter size={20} />
                        </button>
                        <button className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all">
                            <ArrowUpDown size={20} />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="aspect-[3/4] bg-zinc-900/50 rounded-3xl animate-pulse border border-zinc-800" />
                        ))}
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
        </DashboardLayout>
    );
}
