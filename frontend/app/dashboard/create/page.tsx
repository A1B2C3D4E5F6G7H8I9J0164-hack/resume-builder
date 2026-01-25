'use client';

import ResumeBuilder from "@/components/resume/ResumeBuilder";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Sparkles } from "lucide-react";

export default function CreateResumePage() {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <div className="flex items-center space-x-2 text-blue-500 mb-2">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">AI Powered</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Create <span className="text-zinc-500">Resume</span></h1>
                <p className="text-zinc-500 mt-2">
                    Our AI will help you craft a professional resume that stands out to recruiters.
                </p>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-900 rounded-[2.5rem] p-1 overflow-hidden">
                <ResumeBuilder />
            </div>
        </DashboardLayout>
    );
}
