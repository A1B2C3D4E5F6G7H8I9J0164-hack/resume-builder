import { IFeature } from "@/types";
import { Zap, Target, Palette, Sparkles, Shield, Cpu } from "lucide-react";

export const featuresData: IFeature[] = [
    {
        icon: (<Zap className="text-blue-500" size={32} />),
        title: "AI Analysis",
        description: "Intelligent content optimization that highlights your key achievements for recruiters.",
    },
    {
        icon: (<Target className="text-indigo-500" size={32} />),
        title: "ATS Optimized",
        description: "Built-in structure ensures your resume passes through Applicant Tracking Systems.",
    },
    {
        icon: (<Palette className="text-blue-400" size={32} />),
        title: "Premium Templates",
        description: "Choose from world-class designs tailored for various industries and seniority levels.",
    },
    {
        icon: (<Sparkles className="text-amber-500" size={32} />),
        title: "AI Enhancement",
        description: "Rewrite bullet points and summaries instantly with our advanced LLM integration.",
    },
    {
        icon: (<Shield className="text-emerald-500" size={32} />),
        title: "Privacy First",
        description: "Your data is encrypted and secure. You choose what to share with the community.",
    },
    {
        icon: (<Cpu className="text-rose-500" size={32} />),
        title: "Instant Export",
        description: "One-click high-quality PDF generation for seamless job applications.",
    }
];