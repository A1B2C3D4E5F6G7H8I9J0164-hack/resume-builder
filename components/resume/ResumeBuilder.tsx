'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { User, Briefcase, GraduationCap, Code, Layout, Palette, Wand2, ArrowRight, ArrowLeft, Save, Plus, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { SAMPLE_RESUME_DATA } from '@/data/sample-resume';
import ResumeRenderer from './ResumeRenderer';

const STEPS = [
    { id: 1, name: 'Personal', icon: User },
    { id: 2, name: 'Experience', icon: Briefcase },
    { id: 3, name: 'Education', icon: GraduationCap },
    { id: 4, name: 'Projects', icon: Code },
    { id: 5, name: 'Templates', icon: Palette },
];

export default function ResumeBuilder() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [aiGenerating, setAiGenerating] = useState(false);

    const [formData, setFormData] = useState({
        personalInfo: { fullName: '', email: '', phone: '', address: '', summary: '', role: '' },
        experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
        education: [{ school: '', degree: '', startDate: '', endDate: '', description: '' }],
        projects: [{ name: '', description: '', link: '' }],
        skills: [''],
        templateId: 'template1',
        themeColor: '#3b82f6',
        isPublic: false,
    });

    const updateFormData = (section: string, value: any) => {
        setFormData((prev) => ({ ...prev, [section]: value }));
    };

    const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const handleAiGenerate = async () => {
        setAiGenerating(true);
        try {
            const res = await fetch('/api/generate-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.status === 401) {
                toast.error('Session expired. Please log in again.');
                router.push('/login');
                return;
            }

            if (!res.ok) throw new Error(data.error);


            const { result } = data;
            setFormData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, summary: result.summary },
                experience: prev.experience.map((exp, i) => ({
                    ...exp,
                    description: result.experience[i]?.description || exp.description
                })),
                projects: prev.projects.map((proj, i) => ({
                    ...proj,
                    description: result.projects[i]?.description || proj.description
                }))
            }));
            toast.success('Resume enhanced by AI!');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setAiGenerating(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/resumes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.status === 401) {
                toast.error('Session expired. Please log in again.');
                router.push('/login');
                return;
            }

            if (!res.ok) throw new Error(data.error);
            toast.success('Resume generated successfully!');
            router.push(`/resume/${data.resume._id}`);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-5xl py-12 px-4">
            { }
            <div className="mb-12 flex items-center justify-between overflow-x-auto pb-4 gap-8">
                <div className="flex items-center space-x-8">
                    {STEPS.map((step) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <div key={step.id} className="flex flex-col items-center space-y-2 min-w-[80px]">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-900/50' :
                                        isCompleted ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-500'
                                        }`}
                                >
                                    <Icon size={20} />
                                </div>
                                <span className={`text-xs font-medium ${isActive ? 'text-blue-500' : 'text-zinc-500'}`}>
                                    {step.name}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={() => setFormData(prev => ({ ...prev, ...SAMPLE_RESUME_DATA }))}
                    className="flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 text-blue-500 px-6 py-3 rounded-2xl hover:bg-blue-600/20 transition-all font-bold text-xs"
                >
                    <Wand2 size={14} />
                    <span>Magic Fill Sample</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                { }
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentStep === 1 && (
                                <PersonalInfoForm data={formData.personalInfo} onChange={(val) => updateFormData('personalInfo', val)} />
                            )}
                            {currentStep === 2 && (
                                <ExperienceForm data={formData.experience} onChange={(val) => updateFormData('experience', val)} />
                            )}
                            {currentStep === 3 && (
                                <EducationForm data={formData.education} onChange={(val) => updateFormData('education', val)} />
                            )}
                            {currentStep === 4 && (
                                <ProjectsForm data={formData.projects} onChange={(val) => updateFormData('projects', val)} />
                            )}
                            {currentStep === 5 && (
                                <TemplateConfig
                                    templateId={formData.templateId}
                                    themeColor={formData.themeColor}
                                    isPublic={formData.isPublic}
                                    onChange={(id: string, color: string, isPublic: boolean) =>
                                        setFormData(prev => ({ ...prev, templateId: id, themeColor: color, isPublic }))
                                    }
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-12 flex items-center justify-between pt-8 border-t border-zinc-800">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className="flex items-center space-x-2 text-zinc-400 hover:text-white disabled:opacity-0 transition-all"
                        >
                            <ArrowLeft size={18} />
                            <span>Back</span>
                        </button>

                        <div className="flex space-x-4">
                            {currentStep < 5 ? (
                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleAiGenerate}
                                        disabled={aiGenerating}
                                        className="flex items-center space-x-2 rounded-lg bg-zinc-800 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-all"
                                    >
                                        <Wand2 size={18} className={aiGenerating ? 'animate-spin' : ''} />
                                        <span>AI Enhance</span>
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center space-x-2 rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-all"
                                    >
                                        <span>Next</span>
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex items-center space-x-2 rounded-lg bg-green-600 px-8 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-all disabled:opacity-50"
                                >
                                    <Save size={18} />
                                    <span>{loading ? 'Saving...' : 'Generate Resume'}</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                { }
                <div className="hidden lg:block relative group">
                    <div className="sticky top-8 rounded-[2.5rem] border border-zinc-800 bg-zinc-900/50 p-4 shadow-2xl overflow-hidden min-h-[700px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/20 pointer-events-none z-10" />

                        <div className="flex items-center justify-between px-6 py-4 mb-4 border-b border-zinc-800">
                            <div className="flex items-center space-x-3">
                                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Real-time Preview</span>
                            </div>
                        </div>

                        <div className="origin-top scale-[0.65] -mb-[40%]">
                            <ResumeRenderer
                                data={formData}
                                preview={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function PersonalInfoForm({ data, onChange }: { data: any, onChange: (val: any) => void }) {
    const handleChange = (e: any) => onChange({ ...data, [e.target.name]: e.target.value });
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Full Name" name="fullName" value={data.fullName} onChange={handleChange} placeholder="John Doe" />
                <Input label="Email" name="email" value={data.email} onChange={handleChange} placeholder="john@example.com" />
                <Input label="Phone" name="phone" value={data.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                <Input label="Role" name="role" value={data.role} onChange={handleChange} placeholder="Full Stack Developer" />
            </div>
            <div className="col-span-2">
                <label className="text-sm font-medium text-zinc-300">Summary</label>
                <textarea
                    name="summary"
                    value={data.summary}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 transition-colors focus:border-blue-500 focus:outline-none"
                    placeholder="A brief overview of your professional background..."
                />
            </div>
        </div>
    );
}

function ExperienceForm({ data, onChange }: { data: any, onChange: (val: any) => void }) {
    const addExp = () => onChange([...data, { company: '', position: '', startDate: '', endDate: '', description: '' }]);
    const removeExp = (i: number) => onChange(data.filter((_: any, idx: number) => idx !== i));
    const handleChange = (i: number, e: any) => {
        const newData = [...data];
        newData[i] = { ...newData[i], [e.target.name]: e.target.value };
        onChange(newData);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Work Experience</h2>
                <button onClick={addExp} className="text-blue-500 hover:text-blue-400 flex items-center space-x-1 text-sm">
                    <Plus size={16} /> <span>Add</span>
                </button>
            </div>
            {data.map((exp: any, i: number) => (
                <div key={i} className="relative space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
                    {i > 0 && (
                        <button onClick={() => removeExp(i)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500">
                            <Trash2 size={16} />
                        </button>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Company" name="company" value={exp.company} onChange={(e: any) => handleChange(i, e)} placeholder="Google" />
                        <Input label="Position" name="position" value={exp.position} onChange={(e: any) => handleChange(i, e)} placeholder="Software Engineer" />
                        <Input label="Start Date" name="startDate" value={exp.startDate} onChange={(e: any) => handleChange(i, e)} placeholder="Jan 2020" />
                        <Input label="End Date" name="endDate" value={exp.endDate} onChange={(e: any) => handleChange(i, e)} placeholder="Present" />
                    </div>
                    <textarea
                        name="description"
                        value={exp.description}
                        onChange={(e: any) => handleChange(i, e)}
                        rows={3}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                        placeholder="Key responsibilities and achievements..."
                    />
                </div>
            ))}
        </div>
    );
}

function EducationForm({ data, onChange }: { data: any, onChange: (val: any) => void }) {
    const addEdu = () => onChange([...data, { school: '', degree: '', startDate: '', endDate: '', description: '' }]);
    const removeEdu = (i: number) => onChange(data.filter((_: any, idx: number) => idx !== i));
    const handleChange = (i: number, e: any) => {
        const newData = [...data];
        newData[i] = { ...newData[i], [e.target.name]: e.target.value };
        onChange(newData);
    };
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Education</h2>
                <button onClick={addEdu} className="text-blue-500 hover:text-blue-400 flex items-center space-x-1 text-sm">
                    <Plus size={16} /> <span>Add</span>
                </button>
            </div>
            {data.map((edu: any, i: number) => (
                <div key={i} className="relative space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
                    {i > 0 && <button onClick={() => removeEdu(i)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500"><Trash2 size={16} /></button>}
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="School/University" name="school" value={edu.school} onChange={(e: any) => handleChange(i, e)} placeholder="Stanford University" />
                        <Input label="Degree" name="degree" value={edu.degree} onChange={(e: any) => handleChange(i, e)} placeholder="BS Computer Science" />
                        <Input label="Start Date" name="startDate" value={edu.startDate} onChange={(e: any) => handleChange(i, e)} placeholder="Sep 2016" />
                        <Input label="End Date" name="endDate" value={edu.endDate} onChange={(e: any) => handleChange(i, e)} placeholder="May 2020" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function ProjectsForm({ data, onChange }: { data: any, onChange: (val: any) => void }) {
    const addProject = () => onChange([...data, { name: '', description: '', link: '' }]);
    const removeProject = (i: number) => onChange(data.filter((_: any, idx: number) => idx !== i));
    const handleChange = (i: number, e: any) => {
        const newData = [...data];
        newData[i] = { ...newData[i], [e.target.name]: e.target.value };
        onChange(newData);
    };
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Projects</h2>
                <button onClick={addProject} className="text-blue-500 hover:text-blue-400 flex items-center space-x-1 text-sm">
                    <Plus size={16} /> <span>Add</span>
                </button>
            </div>
            {data.map((project: any, i: number) => (
                <div key={i} className="relative space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
                    {i > 0 && <button onClick={() => removeProject(i)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500"><Trash2 size={16} /></button>}
                    <Input label="Project Name" name="name" value={project.name} onChange={(e: any) => handleChange(i, e)} placeholder="AI Resume Builder" />
                    <Input label="Project Link" name="link" value={project.link} onChange={(e: any) => handleChange(i, e)} placeholder="https://github.com/..." />
                    <textarea
                        name="description"
                        value={project.description}
                        onChange={(e: any) => handleChange(i, e)}
                        rows={2}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                        placeholder="Brief project description..."
                    />
                </div>
            ))}
        </div>
    );
}

function TemplateCard({ template, isSelected, onSelect, onViewSample, themeColor }: any) {
    return (
        <div
            className={`group relative rounded-2xl border-2 transition-all duration-500 overflow-hidden cursor-pointer ${isSelected ? 'border-blue-600 ring-4 ring-blue-600/10' : 'border-zinc-800 hover:border-zinc-700'
                }`}
            onClick={() => onSelect(template.id)}
        >
            <div className="aspect-[1/1.4] bg-white overflow-hidden pointer-events-none origin-top scale-[0.6] -mb-[40%]">
                <ResumeRenderer
                    data={{ ...SAMPLE_RESUME_DATA, templateId: template.id, themeColor }}
                    preview={true}
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8 p-4 text-center">
                <div className="space-y-3 w-full">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewSample(template.id);
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all font-bold text-xs"
                    >
                        <Eye size={14} />
                        <span>View Full Sample</span>
                    </button>
                    <button
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-lg shadow-blue-600/20"
                    >
                        Select Layout
                    </button>
                </div>
            </div>

            <div className="p-4 bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800">
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-white">{template.name}</h4>
                    {isSelected && <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />}
                </div>
            </div>
        </div>
    );
}

function TemplateConfig({ templateId, themeColor, isPublic, onChange }: { templateId: string, themeColor: string, isPublic: boolean, onChange: (id: string, color: string, isPublic: boolean) => void }) {
    const [previewModal, setPreviewModal] = useState<string | null>(null);
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#000000'];
    const templates = [
        { id: 'template1', name: 'Minimalist' },
        { id: 'template2', name: 'Executive' },
        { id: 'template3', name: 'Creative' },
        { id: 'template4', name: 'Modern' },
        { id: 'template5', name: 'Classic' },
        { id: 'template6', name: 'Elite' },
        { id: 'template7', name: 'Tech Lead' },
        { id: 'template8', name: 'Dark Mode' },
        { id: 'template9', name: 'Startup' },
        { id: 'template10', name: 'Swiss' },
    ];

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl shadow-black/20">
                <div>
                    <h3 className="text-white font-bold text-lg">Public Listing</h3>
                    <p className="text-xs text-zinc-500 max-w-xs">Publish your resume to the community showcase for elite professional visibility.</p>
                </div>
                <button
                    onClick={() => onChange(templateId, themeColor, !isPublic)}
                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 flex items-center px-1 ${isPublic ? 'bg-blue-600' : 'bg-zinc-800'}`}
                >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${isPublic ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
            </div>

            <div>
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-white italic tracking-tighter">Choose Your <span className="text-blue-500">Narrative.</span></h2>
                        <p className="text-zinc-500 text-sm font-medium mt-1">Select a high-fidelity design system for your career.</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
                        {colors.map((c) => (
                            <button
                                key={c}
                                onClick={() => onChange(templateId, c, isPublic)}
                                style={{ backgroundColor: c }}
                                className={`h-6 w-6 rounded-lg transition-all ${themeColor === c ? 'ring-2 ring-white scale-110' : 'hover:scale-110 opacity-70'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {templates.map((t) => (
                        <TemplateCard
                            key={t.id}
                            template={t}
                            isSelected={templateId === t.id}
                            themeColor={themeColor}
                            onSelect={(id: string) => onChange(id, themeColor, isPublic)}
                            onViewSample={(id: string) => setPreviewModal(id)}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {previewModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 lg:p-20 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setPreviewModal(null)}
                            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-5xl h-full bg-white rounded-[2rem] overflow-y-auto shadow-[0_0_100px_rgba(59,130,246,0.3)] scrollbar-hide"
                        >
                            <button
                                onClick={() => setPreviewModal(null)}
                                className="fixed top-24 right-24 z-10 w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-white/10"
                            >
                                <Plus size={24} className="rotate-45" />
                            </button>
                            <div className="p-12">
                                <ResumeRenderer
                                    data={{ ...SAMPLE_RESUME_DATA, templateId: previewModal, themeColor }}
                                    preview={false}
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Input({ label, ...props }: { label: string, [key: string]: any }) {
    return (
        <div>
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest">{label}</label>
            <input
                {...props}
                className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white placeholder-zinc-500 transition-colors focus:border-blue-500 focus:outline-none"
            />
        </div>
    );
}
