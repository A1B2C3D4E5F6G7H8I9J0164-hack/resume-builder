'use client';

import React from 'react';
import { Mail, Phone, MapPin, Globe, Calendar, ExternalLink } from 'lucide-react';

interface ResumeRendererProps {
    data: any;
    preview?: boolean;
}

export default function ResumeRenderer({ data, preview = false }: ResumeRendererProps) {
    const { personalInfo, experience, education, projects, skills, templateId, themeColor } = data;

    const renderTemplate = () => {
        switch (templateId) {
            case 'template2': return <ExecutiveTemplate data={data} />;
            case 'template3': return <CreativeTemplate data={data} />;
            case 'template4': return <ModernTemplate data={data} />;
            case 'template5': return <ClassicTemplate data={data} />;
            case 'template6': return <EliteTemplate data={data} />;
            case 'template7': return <TechLeadTemplate data={data} />;
            case 'template8': return <DarkMinimalistTemplate data={data} />;
            case 'template9': return <StartupHeroTemplate data={data} />;
            case 'template10': return <SwissTemplate data={data} />;
            default: return <MinimalistTemplate data={data} />;
        }
    };

    return (
        <div
            className={`bg-white text-zinc-900 transition-all duration-500 overflow-hidden ${preview ? 'p-6 rounded-xl border border-zinc-100 shadow-sm' : 'min-h-[29.7cm] w-[21cm] shadow-print mx-auto p-12 mb-20'}`}
            style={{
                '--theme-color': themeColor,
                transform: preview ? 'scale(0.8)' : 'none',
                transformOrigin: 'top center',
                maxHeight: preview ? '400px' : 'none'
            } as any}
        >
            {renderTemplate()}
        </div>
    );
}

const PLACEHOLDERS = {
    fullName: 'Your Name',
    role: 'Professional Role',
    email: 'email@example.com',
    phone: '+1 234 567 890',
    address: 'City, Country',
    summary: 'A strategic and results-driven professional with a strong track record of success. Expert in problem-solving and leading high-performance teams to achieve objectives.',
    company: 'Innovate Corp',
    position: 'Senior Consultant',
    school: 'Global University',
    degree: 'Bachelor of Science'
};

function MinimalistTemplate({ data }: any) {
    const { personalInfo, experience, education, skills, themeColor } = data;
    return (
        <div className="space-y-8 font-serif">
            <header className="border-b-2 pb-6" style={{ borderColor: themeColor }}>
                <h1 className="text-4xl font-bold tracking-tight uppercase" style={{ color: themeColor }}>{personalInfo.fullName || PLACEHOLDERS.fullName}</h1>
                <p className="text-lg font-medium text-zinc-500 mt-1">{personalInfo.role || PLACEHOLDERS.role}</p>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-zinc-600">
                    <div className="flex items-center gap-1"><Mail size={14} /> {personalInfo.email || PLACEHOLDERS.email}</div>
                    <div className="flex items-center gap-1"><Phone size={14} /> {personalInfo.phone || PLACEHOLDERS.phone}</div>
                    <div className="flex items-center gap-1"><MapPin size={14} /> {personalInfo.address || PLACEHOLDERS.address}</div>
                </div>
            </header>

            <Section title="Profile" themeColor={themeColor}>
                <p className="text-sm leading-relaxed">{personalInfo.summary || PLACEHOLDERS.summary}</p>
            </Section>

            <Section title="Experience" themeColor={themeColor}>
                {experience.length > 0 && experience[0].company ? experience.map((exp: any, i: number) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold text-lg">{exp.company}</h4>
                            <span className="text-sm text-zinc-400 font-sans">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="font-medium text-zinc-600 italic">{exp.position}</p>
                        <p className="text-sm mt-2 leading-snug">{exp.description}</p>
                    </div>
                )) : (
                    <p className="text-sm text-zinc-400 italic">Add your professional journey here...</p>
                )}
            </Section>

            <div className="grid grid-cols-2 gap-12">
                <Section title="Education" themeColor={themeColor}>
                    {education.length > 0 && education[0].school ? education.map((edu: any, i: number) => (
                        <div key={i} className="mb-4">
                            <h4 className="font-bold">{edu.school}</h4>
                            <p className="text-sm italic">{edu.degree}</p>
                            <span className="text-xs text-zinc-400 font-sans">{edu.startDate} - {edu.endDate}</span>
                        </div>
                    )) : (
                        <p className="text-xs text-zinc-400 italic">Your academic background...</p>
                    )}
                </Section>
                <Section title="Skills" themeColor={themeColor}>
                    <div className="flex flex-wrap gap-2">
                        {skills.length > 0 && skills[0] ? skills.map((s: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-zinc-100 text-[10px] uppercase font-bold tracking-wider rounded">{s}</span>
                        )) : (
                            <p className="text-xs text-zinc-400 italic">List your core strengths...</p>
                        )}
                    </div>
                </Section>
            </div>
        </div>
    );
}

function ExecutiveTemplate({ data }: any) {
    const { personalInfo, experience, education, themeColor } = data;
    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center text-center space-y-2 border-b-4 pb-6" style={{ borderColor: themeColor }}>
                <h1 className="text-4xl font-extrabold tracking-tighter" style={{ color: themeColor }}>{personalInfo.fullName || PLACEHOLDERS.fullName}</h1>
                <p className="text-xl font-semibold opacity-70 italic">{personalInfo.role || PLACEHOLDERS.role}</p>
                <div className="flex gap-4 text-xs font-mono">
                    <span>{personalInfo.email || PLACEHOLDERS.email}</span> | <span>{personalInfo.phone || PLACEHOLDERS.phone}</span> | <span>{personalInfo.address || PLACEHOLDERS.address}</span>
                </div>
            </div>
            <div className="flex gap-8">
                <div className="w-2/3 space-y-6">
                    <div className="bg-zinc-50 p-4 border-l-4" style={{ borderColor: themeColor }}>
                        <p className="text-sm text-zinc-700 italic">{personalInfo.summary || PLACEHOLDERS.summary}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold border-b-2 mb-4" style={{ borderColor: themeColor }}>Professional Experience</h3>
                        {experience.length > 0 && experience[0].company ? experience.map((exp: any, i: number) => (
                            <div key={i} className="mb-6">
                                <div className="flex justify-between font-bold"><span>{exp.company}</span><span>{exp.startDate} - {exp.endDate}</span></div>
                                <p className="font-semibold text-zinc-600 mb-2">{exp.position}</p>
                                <p className="text-xs leading-relaxed text-zinc-600">{exp.description}</p>
                            </div>
                        )) : (
                            <p className="text-xs text-zinc-400 italic">Detail your roles and achievements.</p>
                        )}
                    </div>
                </div>
                <div className="w-1/3 space-y-6">
                    <div>
                        <h3 className="text-lg font-bold border-b-2 mb-4" style={{ borderColor: themeColor }}>Education</h3>
                        {education.length > 0 && education[0].school ? education.map((edu: any, i: number) => (
                            <div key={i} className="mb-4 text-xs">
                                <p className="font-bold">{edu.degree}</p>
                                <p>{edu.school}</p>
                            </div>
                        )) : (
                            <p className="text-xs text-zinc-400 italic">Academic history.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function CreativeTemplate({ data }: any) {
    const { personalInfo, experience, themeColor } = data;
    return (
        <div className="flex min-h-[29.7cm]">
            <div className="w-1/3 p-8 text-white space-y-8" style={{ backgroundColor: themeColor }}>
                <div>
                    <h1 className="text-3xl font-black leading-tight uppercase">{(personalInfo.fullName || PLACEHOLDERS.fullName).split(' ')[0]}<br />{(personalInfo.fullName || PLACEHOLDERS.fullName).split(' ')[1] || ''}</h1>
                    <p className="text-xs tracking-[0.2em] font-medium mt-2 opacity-80">{personalInfo.role || PLACEHOLDERS.role}</p>
                </div>
                <div className="space-y-4 text-xs opacity-90">
                    <div className="flex items-center gap-2"><Mail size={12} /> {personalInfo.email || PLACEHOLDERS.email}</div>
                    <div className="flex items-center gap-2"><Phone size={12} /> {personalInfo.phone || PLACEHOLDERS.phone}</div>
                    <div className="flex items-center gap-2"><MapPin size={12} /> {personalInfo.address || PLACEHOLDERS.address}</div>
                </div>
            </div>
            <div className="w-2/3 p-12 space-y-12 bg-zinc-50">
                <section>
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-6" style={{ color: themeColor }}>About Me</h3>
                    <p className="text-sm leading-loose text-zinc-600">{personalInfo.summary || PLACEHOLDERS.summary}</p>
                </section>
                <section>
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-6" style={{ color: themeColor }}>Experience</h3>
                    {experience.length > 0 && experience[0].company ? (
                        <div className="space-y-8">
                            {experience.map((exp: any, i: number) => (
                                <div key={i} className="relative pl-6 border-l-2" style={{ borderColor: themeColor }}>
                                    <div className="absolute top-0 -left-[9px] h-4 w-4 rounded-full border-2 bg-white" style={{ borderColor: themeColor }} />
                                    <h4 className="font-black text-lg">{exp.position}</h4>
                                    <p className="text-sm font-bold opacity-60 uppercase">{exp.company}</p>
                                    <p className="mt-4 text-sm text-zinc-500 italic">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-zinc-400 italic">Your story begins here...</p>
                    )}
                </section>
            </div>
        </div>
    );
}

function ModernTemplate({ data }: any) {
    const { personalInfo, experience, themeColor } = data;
    return (
        <div className="p-10 space-y-10">
            <div className="flex items-end justify-between border-b-8 pb-4" style={{ borderColor: themeColor }}>
                <div>
                    <h1 className="text-5xl font-black italic tracking-tighter" style={{ color: themeColor }}>{personalInfo.fullName || PLACEHOLDERS.fullName}</h1>
                    <p className="text-xl uppercase font-bold tracking-[0.3em] mt-2 text-zinc-400">{personalInfo.role || PLACEHOLDERS.role}</p>
                </div>
                <div className="text-right text-xs font-bold space-y-1 text-zinc-500 ring-l pl-4 border-l-2" style={{ borderColor: themeColor }}>
                    <p>{personalInfo.email || PLACEHOLDERS.email}</p>
                    <p>{personalInfo.phone || PLACEHOLDERS.phone}</p>
                    <p>{personalInfo.address || PLACEHOLDERS.address}</p>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-8 space-y-8">
                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                            <div className="h-[2px] w-12" style={{ backgroundColor: themeColor }} /> Work History
                        </h3>
                        {experience.length > 0 && experience[0].company ? experience.map((exp: any, i: number) => (
                            <div key={i} className="mb-6 group">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="text-xl font-bold group-hover:underline" style={{ textDecorationColor: themeColor }}>{exp.position}</h4>
                                </div>
                                <p className="text-sm font-bold uppercase text-zinc-500 mb-3">{exp.company}</p>
                                <p className="text-sm leading-relaxed text-zinc-600">{exp.description}</p>
                            </div>
                        )) : (
                            <p className="text-sm text-zinc-400 italic">Chronicle your professional impact.</p>
                        )}
                    </section>
                </div>
                <div className="col-span-4 space-y-10">
                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.5em] mb-4" style={{ color: themeColor }}>Summary</h3>
                        <p className="text-xs leading-relaxed text-zinc-500">{personalInfo.summary || PLACEHOLDERS.summary}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

function ClassicTemplate({ data }: any) {
    const { personalInfo, experience, themeColor } = data;
    return (
        <div className="space-y-6 text-center font-serif">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-widest border-b border-zinc-200 pb-2 mb-2">{personalInfo.fullName || PLACEHOLDERS.fullName}</h1>
                <div className="flex justify-center gap-4 text-xs italic text-zinc-500">
                    <span>{personalInfo.address || PLACEHOLDERS.address}</span> • <span>{personalInfo.phone || PLACEHOLDERS.phone}</span> • <span>{personalInfo.email || PLACEHOLDERS.email}</span>
                </div>
            </div>
            <hr className="border-t-4" style={{ borderColor: themeColor }} />
            <div className="text-left space-y-8 px-4">
                <section>
                    <h3 className="text-center font-bold uppercase tracking-widest text-sm border-b mb-4 pb-1">Professional Summary</h3>
                    <p className="text-sm text-center leading-relaxed italic text-zinc-600">{personalInfo.summary || PLACEHOLDERS.summary}</p>
                </section>
                <section>
                    <h3 className="font-bold uppercase tracking-widest text-sm border-b mb-4 pb-1">Experience</h3>
                    {experience.length > 0 && experience[0].company ? experience.map((exp: any, i: number) => (
                        <div key={i} className="mb-6">
                            <div className="flex justify-between font-bold text-sm">
                                <span>{exp.company}</span>
                                <span>{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <p className="text-sm italic font-medium mb-2">{exp.position}</p>
                            <p className="text-xs leading-relaxed">{exp.description}</p>
                        </div>
                    )) : (
                        <p className="text-xs text-zinc-400 text-center italic">Document your career progression.</p>
                    )}
                </section>
            </div>
        </div>
    );
}

function EliteTemplate({ data }: any) {
    const { personalInfo, experience, education, themeColor } = data;
    return (
        <div className="space-y-10 font-serif max-w-[90%] mx-auto">
            <header className="text-center pt-4">
                <h1 className="text-5xl font-light tracking-widest text-zinc-800 mb-2 uppercase">{personalInfo.fullName || PLACEHOLDERS.fullName}</h1>
                <p className="text-sm font-bold tracking-[0.4em] text-zinc-400 uppercase">{personalInfo.role || PLACEHOLDERS.role}</p>
                <div className="mt-6 flex justify-center items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                    <span>{personalInfo.email || PLACEHOLDERS.email}</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
                    <span>{personalInfo.phone || PLACEHOLDERS.phone}</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
                    <span>{personalInfo.address || PLACEHOLDERS.address}</span>
                </div>
            </header>

            <div className="h-px w-full bg-zinc-100" />

            <section className="grid grid-cols-12 gap-10">
                <div className="col-span-3">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: themeColor }}>Biography</h3>
                </div>
                <div className="col-span-9">
                    <p className="text-sm leading-relaxed text-zinc-600 italic font-medium">{personalInfo.summary || PLACEHOLDERS.summary}</p>
                </div>
            </section>

            <section className="grid grid-cols-12 gap-10">
                <div className="col-span-3">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: themeColor }}>Experience</h3>
                </div>
                <div className="col-span-9 space-y-8">
                    {experience.length > 0 && experience[0].company ? experience.map((exp: any, i: number) => (
                        <div key={i}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-lg font-bold text-zinc-800">{exp.company}</h4>
                            </div>
                            <p className="text-sm font-bold text-zinc-500 mb-3 italic">{exp.position}</p>
                            <p className="text-xs leading-relaxed text-zinc-600">{exp.description}</p>
                        </div>
                    )) : (
                        <p className="text-xs text-zinc-400 italic">Your professional achievements...</p>
                    )}
                </div>
            </section>
        </div>
    );
}

function TechLeadTemplate({ data }: any) {
    const { personalInfo, experience, projects, skills, themeColor } = data;
    return (
        <div className="flex h-full min-h-[29.7cm]">
            <aside className="w-1/3 bg-zinc-900 p-8 text-white space-y-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter">{personalInfo.fullName || PLACEHOLDERS.fullName}</h1>
                    <p className="text-xs font-bold text-zinc-500 mt-1 uppercase tracking-widest">{personalInfo.role || PLACEHOLDERS.role}</p>
                </div>
                <div className="space-y-3 text-[10px] font-mono text-zinc-400">
                    <p className="flex items-center gap-2"><Mail size={12} className="text-blue-500" /> {personalInfo.email || PLACEHOLDERS.email}</p>
                    <p className="flex items-center gap-2"><Phone size={12} className="text-blue-500" /> {personalInfo.phone || PLACEHOLDERS.phone}</p>
                    <p className="flex items-center gap-2"><MapPin size={12} className="text-blue-500" /> {personalInfo.address || PLACEHOLDERS.address}</p>
                </div>
                <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-zinc-800 pb-2 mb-4">Core Stack</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {skills.length > 0 && skills[0] ? skills.map((s: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-zinc-800 rounded text-[9px] font-bold text-zinc-300 border border-zinc-700">{s}</span>
                        )) : (
                            <p className="text-[9px] text-zinc-600 uppercase">Skills stack...</p>
                        )}
                    </div>
                </div>
            </aside>
            <main className="w-2/3 p-10 space-y-10 bg-white">
                <section>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4" style={{ color: themeColor }}>Executive Summary</h3>
                    <p className="text-sm leading-relaxed text-zinc-600 border-l-4 pl-4" style={{ borderColor: themeColor }}>{personalInfo.summary || PLACEHOLDERS.summary}</p>
                </section>
                <section>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6" style={{ color: themeColor }}>Experience</h3>
                    {experience.length > 0 && experience[0].company ? experience.map((exp: any, i: number) => (
                        <div key={i} className="mb-8">
                            <div className="item-baseline flex justify-between mb-1">
                                <h4 className="text-xl font-black">{exp.position}</h4>
                            </div>
                            <p className="text-sm font-bold text-zinc-400 mb-3">{exp.company}</p>
                            <p className="text-xs text-zinc-500 leading-relaxed italic">{exp.description}</p>
                        </div>
                    )) : (
                        <p className="text-sm text-zinc-400 italic">Work history details.</p>
                    )}
                </section>
            </main>
        </div>
    );
}

function DarkMinimalistTemplate({ data }: any) {
    const { personalInfo, experience, skills, themeColor } = data;
    return (
        <div className="bg-zinc-950 text-zinc-400 p-16 space-y-12 min-h-[29.7cm]">
            <header className="flex justify-between items-start">
                <div className="space-y-2">
                    <h1 className="text-6xl font-black text-white tracking-tighter">{(personalInfo.fullName || PLACEHOLDERS.fullName).split(' ')[0]}<span className="text-blue-500">.</span></h1>
                    <p className="text-xl font-bold uppercase tracking-[0.3em] opacity-50">{personalInfo.role || PLACEHOLDERS.role}</p>
                </div>
                <div className="text-right text-[10px] font-bold uppercase tracking-widest space-y-1">
                    <p className="text-white">{personalInfo.email || PLACEHOLDERS.email}</p>
                    <p>{personalInfo.phone || PLACEHOLDERS.phone}</p>
                    <p>{personalInfo.address || PLACEHOLDERS.address}</p>
                </div>
            </header>

            <div className="h-px w-full bg-zinc-900" />

            <section className="grid grid-cols-12 gap-12">
                <div className="col-span-4">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-6">Expertise</h3>
                    <div className="space-y-4">
                        {skills.map((s: string, i: number) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-zinc-500">{s || 'Competency'}</span>
                                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '80%' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-8 space-y-10">
                    <div>
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-6">Experience</h3>
                        {experience.map((exp: any, i: number) => (
                            <div key={i} className="mb-10">
                                <div className="flex justify-between mb-2">
                                    <h4 className="text-lg font-bold text-white uppercase tracking-tight">{exp.position || PLACEHOLDERS.position}</h4>
                                </div>
                                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">{exp.company || PLACEHOLDERS.company}</p>
                                <p className="text-sm leading-relaxed">{exp.description || 'Achievement metrics...'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

function StartupHeroTemplate({ data }: any) {
    const { personalInfo, experience, themeColor } = data;
    return (
        <div className="p-0 font-sans min-h-[29.7cm]">
            <div className="h-8 w-full" style={{ backgroundColor: themeColor }} />
            <div className="px-12 py-16 space-y-12">
                <header className="flex flex-col items-center text-center">
                    <div className="bg-zinc-950 text-white px-8 py-4 -rotate-2 mb-6">
                        <h1 className="text-5xl font-black uppercase tracking-tighter">{personalInfo.fullName || PLACEHOLDERS.fullName}</h1>
                    </div>
                    <p className="text-2xl font-black text-zinc-800 italic">"{personalInfo.role || PLACEHOLDERS.role}"</p>
                </header>

                <div className="grid grid-cols-3 gap-12">
                    <div className="col-span-2 space-y-10">
                        <section>
                            <h3 className="text-lg font-black uppercase italic mb-6 shadow-[8px_8px_0px_#f4f4f5] inline-block pr-2">The Mission</h3>
                            <p className="text-sm leading-loose font-medium text-zinc-600 bg-zinc-50 p-6 rounded-2xl">{personalInfo.summary || PLACEHOLDERS.summary}</p>
                        </section>
                        <section>
                            <h3 className="text-lg font-black uppercase italic mb-6 shadow-[8px_8px_0px_#f4f4f5] inline-block pr-2">Impact</h3>
                            {experience.map((exp: any, i: number) => (
                                <div key={i} className="mb-8 p-6 hover:bg-zinc-50 transition-colors rounded-2xl border-2 border-transparent hover:border-zinc-100">
                                    <h4 className="text-xl font-black">{exp.position || PLACEHOLDERS.position}</h4>
                                    <div className="flex gap-2 text-xs font-bold text-zinc-400 uppercase mt-1">
                                        <span style={{ color: themeColor }}>{exp.company || PLACEHOLDERS.company}</span>
                                    </div>
                                    <p className="text-sm mt-4 leading-relaxed text-zinc-500 font-medium">{exp.description || 'Key performance indicators...'}</p>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SwissTemplate({ data }: any) {
    const { personalInfo, experience, themeColor } = data;
    return (
        <div className="p-16 grid grid-cols-12 gap-0 min-h-[29.7cm]">
            <div className="col-span-12 border-b-[20px] border-zinc-950 pb-12 mb-12">
                <h1 className="text-[120px] font-black leading-[0.8] tracking-tighter text-zinc-950 uppercase -ml-2">{(personalInfo.fullName || PLACEHOLDERS.fullName).split(' ')[0]}<br />{(personalInfo.fullName || PLACEHOLDERS.fullName).split(' ')[1] || ''}</h1>
            </div>

            <div className="col-span-4 pr-12 space-y-12">
                <div className="text-xs font-black uppercase leading-relaxed text-zinc-400">
                    <p>{personalInfo.role || PLACEHOLDERS.role}</p>
                    <div className="h-4" />
                    <p>{personalInfo.email || PLACEHOLDERS.email}</p>
                    <p>{personalInfo.phone || PLACEHOLDERS.phone}</p>
                </div>
            </div>

            <div className="col-span-8 space-y-16">
                <section>
                    <p className="text-2xl font-bold leading-tight tracking-tight text-zinc-900 border-t-2 border-zinc-950 pt-2">
                        {personalInfo.summary || PLACEHOLDERS.summary}
                    </p>
                </section>
                <section>
                    <h3 className="text-xs font-black uppercase border-t-2 border-zinc-950 pt-2 mb-8">Selected Experience</h3>
                    {experience.map((exp: any, i: number) => (
                        <div key={i} className="mb-12 grid grid-cols-8 gap-4">
                            <div className="col-span-8">
                                <h4 className="text-lg font-black uppercase leading-none mb-1">{exp.position || PLACEHOLDERS.position}</h4>
                                <p className="text-sm font-bold text-zinc-500 mb-4">{exp.company || PLACEHOLDERS.company}</p>
                                <p className="text-sm leading-relaxed text-zinc-600 font-medium">{exp.description || 'Detailed impact summary...'}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

function Section({ title, themeColor, children }: any) {
    return (
        <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: themeColor }}>{title}</h3>
            {children}
        </section>
    );
}
