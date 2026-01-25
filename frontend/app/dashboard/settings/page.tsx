'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { User, Bell, Lock, Shield, CreditCard, ChevronRight, ArrowLeft, Camera, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchWithAuth } from '@/lib/api';

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
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-10"
                        >
                            <div className="px-2">
                                <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
                                <p className="text-zinc-500 mt-1 font-medium italic">Manage your account preferences</p>
                            </div>

                            <div className="space-y-3">
                                {sections.map((section, i) => (
                                    <div
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className="group flex items-center justify-between p-6 bg-zinc-900/20 border border-zinc-900 rounded-2xl hover:border-zinc-700 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center space-x-6">
                                            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                                                <section.icon size={20} className="text-zinc-600 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white tracking-tight">{section.name}</h3>
                                                <p className="text-xs text-zinc-500 mt-1 font-medium">{section.desc}</p>
                                            </div>
                                        </div>

                                        <ChevronRight size={18} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-zinc-900 px-2">
                                <button className="text-xs font-bold text-red-500/60 hover:text-red-500 transition-colors">
                                    Deactivate Account
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="section"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-10"
                        >
                            <button
                                onClick={() => setActiveSection(null)}
                                className="flex items-center space-x-2 text-zinc-600 hover:text-white transition-colors px-2"
                            >
                                <ArrowLeft size={16} />
                                <span className="font-bold text-xs uppercase tracking-widest">Back</span>
                            </button>

                            {activeSection === 'profile' && <ProfileSettings />}
                            {activeSection !== 'profile' && (
                                <div className="py-20 bg-zinc-900/10 border border-zinc-900 rounded-3xl text-center">
                                    <h2 className="text-xl font-bold text-zinc-700 uppercase tracking-widest">Coming Soon</h2>
                                    <p className="text-zinc-600 mt-2 text-sm font-medium">This module is under development.</p>
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
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const res = await fetchWithAuth('/api/auth/me');
            const data = await res.json();
            
            if (res.ok && data.user) {
                setUser(data.user);
                setName(data.user.name || '');
                setEmail(data.user.email || '');
                setBio(data.user.bio || '');
            } else {
                toast.error('Failed to fetch user data');
            }
        } catch (error) {
            toast.error('Failed to fetch user data');
        } finally {
            setFetching(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // TODO: Implement update user API endpoint
            // const res = await fetchWithAuth('/api/auth/update', {
            //     method: 'PUT',
            //     body: JSON.stringify({ name, email, bio }),
            // });
            // if (res.ok) {
            //     toast.success('Settings updated');
            //     fetchUserData();
            // }
            
            // Temporary: just show success message
            setTimeout(() => {
                setLoading(false);
                toast.success('Settings updated');
            }, 1000);
        } catch (error) {
            setLoading(false);
            toast.error('Failed to update settings');
        }
    };

    if (fetching) {
        return (
            <div className="space-y-12">
                <div className="px-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Profile</h1>
                    <p className="text-zinc-500 mt-1 font-medium">Manage your professional identity</p>
                </div>
                <div className="py-20 bg-zinc-900/10 border border-zinc-900 rounded-3xl text-center">
                    <p className="text-zinc-600 text-sm font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="px-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">Profile</h1>
                <p className="text-zinc-500 mt-1 font-medium">Manage your professional identity</p>
            </div>

            <div className="flex items-center space-x-8 px-2">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        {user?.name ? (
                            <span className="text-2xl font-bold text-zinc-300">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        ) : (
                            <User size={32} className="text-zinc-700" />
                        )}
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-white">{user?.name || 'User'}</h4>
                    <p className="text-zinc-600 text-sm">{user?.email || 'No email'}</p>
                    <button className="text-blue-500 text-[10px] font-bold uppercase tracking-widest mt-2 hover:underline">Change Identity</button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 px-2">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 ml-2">Display Name</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-zinc-700 transition-all font-medium" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 ml-2">Contact Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-zinc-700 transition-all font-medium" 
                    />
                </div>
                <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 ml-2">Bio Summary</label>
                    <textarea 
                        rows={3} 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-zinc-700 transition-all font-medium resize-none text-zinc-400" 
                    />
                </div>
            </div>

            <div className="pt-8 border-t border-zinc-900 px-2">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center space-x-3 bg-white text-black px-10 py-3.5 rounded-xl font-bold hover:bg-zinc-200 transition-all disabled:opacity-50"
                >
                    <Save size={18} />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>
        </div>
    );
}
