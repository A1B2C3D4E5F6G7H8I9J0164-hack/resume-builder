'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ResumeRenderer from '@/components/resume/ResumeRenderer';
import { Download, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api-config';

export default function ResumePage() {
    const { id } = useParams();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/resumes/${id}`)
            .then(res => res.json())
            .then(data => {
                setResume(data.resume);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>;
    if (!resume) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Resume not found</div>;

    return (
        <div className="min-h-screen bg-zinc-900 overflow-y-auto">
            { }
            <div className="print:hidden sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 p-4">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-all">
                        <ArrowLeft size={18} />
                        <span>Dashboard</span>
                    </Link>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                        >
                            <Download size={18} />
                            <span>Download PDF</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                            <Share2 size={18} />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>

            { }
            <div className="py-12 print:p-0">
                <ResumeRenderer data={resume} />
            </div>

            <style jsx global>{`
        @media print {
          body { background: white; }
          .min-h-screen { min-height: auto; padding: 0 !important; }
        }
      `}</style>
        </div>
    );
}
