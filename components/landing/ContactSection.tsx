'use client'
import SectionTitle from "@/components/SectionTitle";
import { ArrowRightIcon, MailIcon, UserIcon, Send } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
    return (
        <div id="contact" className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 size-[500px] bg-blue-600/5 blur-[120px]"></div>

            <SectionTitle
                text1="Connect"
                text2="Architect Your Future"
                text3="Ready to elevate your career story? Let's discuss how our AI can help you reach your professional peak."
            />

            <form onSubmit={(e) => e.preventDefault()} className='mt-20 grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto w-full' >
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                >
                    <label className='text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4'>Full Name</label>
                    <div className='flex items-center pl-4 rounded-2xl border border-zinc-900 bg-zinc-900/40 backdrop-blur-md focus-within:border-blue-500/50 transition-all group overflow-hidden'>
                        <UserIcon className='size-5 text-zinc-600 group-focus-within:text-blue-500 transition-colors' />
                        <input name='name' type="text" placeholder='Aditya Rana' className='w-full p-4 bg-transparent outline-none text-white font-medium placeholder:text-zinc-700' />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-2"
                >
                    <label className='text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4'>Email Address</label>
                    <div className='flex items-center pl-4 rounded-2xl border border-zinc-900 bg-zinc-900/40 backdrop-blur-md focus-within:border-blue-500/50 transition-all group overflow-hidden'>
                        <MailIcon className='size-5 text-zinc-600 group-focus-within:text-blue-500 transition-colors' />
                        <input name='email' type="email" placeholder='aditya@example.com' className='w-full p-4 bg-transparent outline-none text-white font-medium placeholder:text-zinc-700' />
                    </div>
                </motion.div>

                <motion.div className='sm:col-span-2 space-y-2'
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <label className='text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4'>Message</label>
                    <textarea
                        name='message'
                        rows={6}
                        placeholder='How can we help you succeed?'
                        className='bg-zinc-900/40 backdrop-blur-md focus:border-blue-500/50 resize-none w-full p-5 outline-none rounded-3xl border border-zinc-900 text-white font-medium placeholder:text-zinc-700 transition-all'
                    />
                </motion.div>

                <div className="sm:col-span-2 flex justify-center mt-4">
                    <motion.button
                        type='submit'
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full sm:w-max flex items-center justify-center gap-3 bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20'
                    >
                        <span>Send Transmission</span>
                        <Send size={18} />
                    </motion.button>
                </div>
            </form>
        </div>
    );
}