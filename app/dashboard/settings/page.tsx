'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { User, Bell, Lock, Shield, CreditCard, ChevronRight, ArrowLeft, Camera, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';

const sections = [
    { id: 'profile', name: 'Profile Information', icon: User, desc: 'Update your personal details and avatar' },
    { id: 'security', name: 'Security & Password', icon: Lock, desc: 'Manage your password and 2FA settings' },
    { id: 'notifications', name: 'Notification Preferences', icon: Bell, desc: 'Control which alerts you receive' },
    { id: 'billing', name: 'Billing & Subscription', icon: CreditCard, desc: 'Current plan: Pro Monthly' },
    { id: 'privacy', name: 'Privacy Settings', icon: Shield, desc: 'Manage visibility of your public profile' },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    return (
        <DashboardLayout>
            <div className="max-w-4xl">
                <AnimatePresence mode="wait">
                    {!activeSection ? (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-10"
                        >
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight">System <span className="text-zinc-500">Settings</span></h1>
                                <p className="text-zinc-500 mt-2">Manage your account preferences and application configuration</p>
                            </div>

                            <div className="space-y-4">
                                {sections.map((section, i) => (
                                    <motion.div
                                        key={section.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => setActiveSection(section.id)}
                                        className="group flex items-center justify-between p-6 bg-zinc-900/40 border border-zinc-900 rounded-[2rem] hover:border-blue-500/30 hover:bg-zinc-900/60 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center space-x-6">
                                            <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all">
                                                <section.icon size={24} className={`text-zinc-500 group-hover:text-blue-500 transition-colors`} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{section.name}</h3>
                                                <p className="text-sm text-zinc-500 mt-0.5">{section.desc}</p>
                                            </div>
                                        </div>

                                        <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <ChevronRight size={20} className="text-zinc-400" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-zinc-900">
                                <button className="text-sm font-bold text-red-500/50 hover:text-red-500 transition-colors bg-red-500/5 px-6 py-3 rounded-2xl border border-red-500/10 active:scale-95">
                                    Deactivate Account
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="section"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <button
                                onClick={() => setActiveSection(null)}
                                className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors group"
                            >
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-bold text-sm uppercase tracking-widest">Back to Settings</span>
                            </button>

                            {activeSection === 'profile' && <ProfileSettings />}
                            {activeSection !== 'profile' && (
                                <div className="p-20 border-2 border-dashed border-zinc-900 rounded-[3rem] text-center">
                                    <h2 className="text-2xl font-bold text-zinc-700">Module Under Construction</h2>
                                    <p className="text-zinc-500 mt-2">This settings module will be available in the next release.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}

function ProfileSettings() {
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success('Profile updated successfully!');
        }, 1500);
    };

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">Profile <span className="text-zinc-500">Information</span></h1>
                <p className="text-zinc-500 mt-2">Update your public profile and personal identity</p>
            </div>

            <div className="flex items-center space-x-8">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-zinc-900 border-2 border-zinc-800 overflow-hidden flex items-center justify-center">
                        <User size={48} className="text-zinc-700" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white border-4 border-zinc-950 hover:scale-110 transition-transform">
                        <Camera size={18} />
                    </button>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-white">Aditya Rana</h4>
                    <p className="text-zinc-500 text-sm">aditya@example.com</p>
                    <button className="text-blue-500 text-xs font-bold uppercase tracking-widest mt-2 hover:underline">Remove Image</button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Full Name</label>
                    <input type="text" defaultValue="Aditya Rana" className="w-full bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Public Email</label>
                    <input type="email" defaultValue="aditya@example.com" className="w-full bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium" />
                </div>
                <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Professional Bio</label>
                    <textarea rows={4} defaultValue="Full-stack developer passionate about building AI-powered tools for the next generation of talent." className="w-full bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium resize-none" />
                </div>
            </div>

            <div className="pt-8 border-t border-zinc-900">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center space-x-3 bg-white text-black px-10 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 disabled:opacity-50"
                >
                    <Save size={18} />
                    <span>{loading ? 'Saving...' : 'Update Records'}</span>
                </button>
            </div>
        </div>
    );
}
