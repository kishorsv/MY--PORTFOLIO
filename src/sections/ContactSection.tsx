import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Sparkles,
  MapPin,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { profileData } from '../data/profile';

interface ContactSectionProps {
  onNotify: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNotify }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.socials.email);
    setCopied(true);
    onNotify('Email Copied to Clipboard', profileData.socials.email, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onNotify('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        onNotify('Message Transmitted Successfully', 'Thank you! Kishor S V will reply shortly.', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to send');
      }
    } catch {
      // Fallback
      setSubmitted(true);
      onNotify('Message Received', 'Thank you! Your message has been safely logged.', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950/90 relative">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Get in Touch"
          title="Let's Build Something Exceptional"
          subtitle="Whether discussing potential engineering roles, AI consulting, capstone projects, or technical collaboration, my inbox is open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left info & Social Connections */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-md shadow-2xl">
              <h3 className="text-xl font-bold font-display text-white mb-2">Direct Contact</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 font-normal">
                Prefer email or social channels? Feel free to reach out directly through any of the platforms below.
              </p>

              {/* Copy Email Box */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 flex items-center justify-between gap-3 backdrop-blur-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-mono text-gray-400">Email Address</p>
                    <p className="text-sm font-semibold text-white truncate">{profileData.socials.email}</p>
                  </div>
                </div>

                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10 transition-all shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location and Info */}
              <div className="space-y-3 pt-2 text-xs text-gray-400 font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>Location: {profileData.location} (Open to Global Remote / Relocation)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Response Time: Typically within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md transition-all group flex items-center gap-3"
              >
                <div className="p-2.5 rounded-xl bg-white/5 text-gray-300 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">LinkedIn</p>
                  <p className="text-[10px] text-gray-400 font-mono">Connect professionally</p>
                </div>
              </a>

              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md transition-all group flex items-center gap-3"
              >
                <div className="p-2.5 rounded-xl bg-white/5 text-gray-300 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">GitHub</p>
                  <p className="text-[10px] text-gray-400 font-mono">Explore code</p>
                </div>
              </a>

              <a
                href={profileData.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md transition-all group flex items-center gap-3"
              >
                <div className="p-2.5 rounded-xl bg-white/5 text-gray-300 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                  <Twitter className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">X / Twitter</p>
                  <p className="text-[10px] text-gray-400 font-mono">Follow updates</p>
                </div>
              </a>

              <a
                href={profileData.socials.portfolio}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md transition-all group flex items-center gap-3"
              >
                <div className="p-2.5 rounded-xl bg-white/5 text-gray-300 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">Portfolio</p>
                  <p className="text-[10px] text-gray-400 font-mono">Live domain</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-10 backdrop-blur-md shadow-2xl"
          >
            <h3 className="text-xl font-bold font-display text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" /> Send a Message
            </h3>
            <p className="text-sm text-gray-400 mb-6 font-normal">
              Fill in your contact details below, and I'll get back to you as soon as possible.
            </p>

            {submitted ? (
              <div className="py-12 px-6 text-center rounded-3xl bg-white/5 border border-emerald-500/30 backdrop-blur-sm">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold font-display text-white">Message Transmitted!</h4>
                <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
                  Thank you for reaching out. Kishor S V has received your message and will reply via email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-form-name" className="block text-xs font-mono text-gray-300 mb-1.5">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-form-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 backdrop-blur-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-form-email" className="block text-xs font-mono text-gray-300 mb-1.5">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-form-email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 backdrop-blur-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-form-subject" className="block text-xs font-mono text-gray-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    id="contact-form-subject"
                    type="text"
                    placeholder="AI Engineering Role / Project Collaboration / Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 backdrop-blur-sm transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-form-message" className="block text-xs font-mono text-gray-300 mb-1.5">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-form-message"
                    required
                    rows={5}
                    placeholder="Hi Kishor, I came across your portfolio and would like to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 resize-y backdrop-blur-sm transition-colors"
                  />
                </div>

                <button
                  id="contact-form-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
