'use client';

import Link from 'next/link';
import { FileText, Trash2, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface ResumeCardProps {
    resume: any;
    onDelete: (id: string) => void;
}

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group relative bg-zinc-900/40 border border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all"
        >
            <div className="aspect-[4/5] bg-zinc-900/50 relative overflow-hidden flex items-center justify-center">
                <FileText className="text-zinc-800 group-hover:text-zinc-700 transition-colors" size={48} />

                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                    <Link
                        href={`/resume/${resume._id}`}
                        className="p-3 bg-white text-black rounded-xl hover:scale-105 transition-transform"
                    >
                        <ExternalLink size={18} />
                    </Link>
                    <button
                        onClick={() => onDelete(resume._id)}
                        className="p-3 bg-zinc-900 text-red-500 border border-zinc-800 rounded-xl hover:bg-red-500/10 transition-all hover:scale-105"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="p-5 border-t border-zinc-900">
                <h3 className="font-bold text-white truncate mb-1 text-sm">
                    {resume.personalInfo?.fullName || 'Untitled Resume'}
                </h3>
                <p className="text-xs text-zinc-500 truncate mb-4 font-medium">
                    {resume.personalInfo?.role || 'No role specified'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-900/50">
                    <div className="flex items-center text-[10px] text-zinc-600 space-x-1 uppercase tracking-widest font-bold">
                        <Calendar size={12} />
                        <span>{new Date(resume.updatedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
