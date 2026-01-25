'use client'
import SectionTitle from "./SectionTitle";
import { MailIcon, UserIcon, Send } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
    return (
        <div id="contact" className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 bg-zinc-950">
            <SectionTitle
                text1="Contact"
                text2="Get in Touch"
                text3="Have questions? Our team is here to help you navigate your professional journey."
            />

            <form onSubmit={(e) => e.preventDefault()} className='mt-20 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full' >
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                >
                    <label className='text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4'>Full Name</label>
                    <div className='flex items-center pl-4 rounded-xl border border-zinc-900 bg-zinc-900/20 focus-within:border-zinc-700 transition-all group overflow-hidden'>
                        <UserIcon className='size-4 text-zinc-600' />
                        <input name='name' type="text" placeholder='Your Name' className='w-full p-4 bg-transparent outline-none text-white text-sm placeholder:text-zinc-700' />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                >
                    <label className='text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4'>Email Address</label>
                    <div className='flex items-center pl-4 rounded-xl border border-zinc-900 bg-zinc-900/20 focus-within:border-zinc-700 transition-all group overflow-hidden'>
                        <MailIcon className='size-4 text-zinc-600' />
                        <input name='email' type="email" placeholder='email@example.com' className='w-full p-4 bg-transparent outline-none text-white text-sm placeholder:text-zinc-700' />
                    </div>
                </motion.div>

                <motion.div className='sm:col-span-2 space-y-2'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <label className='text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4'>Message</label>
                    <textarea
                        name='message'
                        rows={6}
                        placeholder='How can we help you?'
                        className='bg-zinc-900/20 focus:border-zinc-700 resize-none w-full p-5 outline-none rounded-2xl border border-zinc-900 text-white text-sm placeholder:text-zinc-700 transition-all'
                    />
                </motion.div>

                <div className="sm:col-span-2 flex justify-center mt-4">
                    <motion.button
                        type='submit'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full sm:w-max flex items-center justify-center gap-3 bg-white text-black px-12 py-4 rounded-xl font-bold transition-all'
                    >
                        <span>Send Message</span>
                        <Send size={16} />
                    </motion.button>
                </div>
            </form>
        </div>
    );
}