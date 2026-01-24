'use client';

import Link from 'next/link';
import { FileText, MoreVertical, Share2, Trash2, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface ResumeCardProps {
    resume: any;
    onDelete: (id: string) => void;
}

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative bg-zinc-900/50 border border-zinc-900 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.2)]"
        >
            {}
            <div className="aspect-[3/4] bg-zinc-950 relative overflow-hidden group-hover:bg-zinc-900/80 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        <FileText className="text-blue-500" size={32} />
                    </div>
                </div>

                {}
                <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                    <Link
                        href={`/resume/${resume._id}`}
                        className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl"
                    >
                        <ExternalLink size={20} />
                    </Link>
                    <button
                        onClick={() => onDelete(resume._id)}
                        className="p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full hover:bg-red-500 hover:text-white transition-all hover:scale-110"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            {}
            <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-zinc-100 truncate flex-1 pr-2">
                        {resume.personalInfo?.fullName || 'Untitled Resume'}
                    </h3>
                    <button className="text-zinc-500 hover:text-white p-1">
                        <MoreVertical size={16} />
                    </button>
                </div>

                <p className="text-sm text-zinc-500 truncate mb-4">
                    {resume.personalInfo?.role || 'No role specified'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                    <div className="flex items-center text-[10px] text-zinc-600 space-x-1 uppercase tracking-widest font-bold">
                        <Calendar size={12} />
                        <span>{new Date(resume.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex -space-x-2">
                        {[1, 2].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">
                                {i === 1 ? 'AI' : 'JS'}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
