import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Save,
  Trash2,
  Image as ImageIcon,
  FileText,
  Shield,
  Layers,
  Award,
  Calendar,
  Link,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { CertificateItem } from '../types';
import { initialCertificationsData } from '../data/certifications';

interface AdminCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (certs: CertificateItem[]) => void;
  currentCertificates: CertificateItem[];
}

export const AdminCertificateModal: React.FC<AdminCertificateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentCertificates
}) => {
  const [activeMode, setActiveMode] = useState<'add' | 'manage'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [category, setCategory] = useState<string>('AI & Generative AI');
  const [type, setType] = useState<string>('Professional Certificate');
  const [skillsInput, setSkillsInput] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAddSkill = () => {
    if (!skillsInput.trim()) return;
    const newSkills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !skillsList.includes(s));
    setSkillsList([...skillsList, ...newSkills]);
    setSkillsInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter((s) => s !== skillToRemove));
  };

  const handleStartEdit = (cert: CertificateItem) => {
    setEditingId(cert.id);
    setTitle(cert.title);
    setIssuer(cert.issuer);
    setIssueDate(cert.issueDate);
    setCategory(cert.category);
    setType(cert.type);
    setSkillsList(cert.skills);
    setImageUrl(cert.image);
    setPdfUrl(cert.pdfUrl || '');
    setCredentialId(cert.credentialId === 'Not provided' ? '' : cert.credentialId);
    setVerificationUrl(cert.verificationUrl || cert.credentialUrl || '');
    setLinkedinUrl(cert.linkedinUrl || '');
    setDescription(cert.description || '');
    setActiveMode('add');
  };

  const handleResetForm = () => {
    setEditingId(null);
    setTitle('');
    setIssuer('');
    setIssueDate('');
    setCategory('AI & Generative AI');
    setType('Professional Certificate');
    setSkillsInput('');
    setSkillsList([]);
    setImageUrl('');
    setPdfUrl('');
    setCredentialId('');
    setVerificationUrl('');
    setLinkedinUrl('');
    setDescription('');
    setFormError('');
  };

  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Please enter a Certificate Title');
      return;
    }
    if (!issuer.trim()) {
      setFormError('Please enter an Issuing Organization');
      return;
    }
    if (!issueDate.trim()) {
      setFormError('Please enter an Issue Date');
      return;
    }

    const finalImage = imageUrl.trim() || '/certificates/github-professional.svg';
    const finalSkills = skillsList.length > 0
      ? skillsList
      : skillsInput.split(',').map((s) => s.trim()).filter((s) => s.length > 0);

    if (finalSkills.length === 0) {
      finalSkills.push('Technical Competency', 'Coursework');
    }

    const newCert: CertificateItem = {
      id: editingId || `cert-custom-${Date.now()}`,
      title: title.trim(),
      issuer: issuer.trim(),
      date: issueDate.trim(),
      issueDate: issueDate.trim(),
      completedDate: issueDate.trim(),
      credentialId: credentialId.trim() || 'Not provided',
      category: category as any,
      type: type as any,
      skills: finalSkills,
      certificateImage: finalImage,
      image: finalImage,
      pdfUrl: pdfUrl.trim() || undefined,
      verificationUrl: verificationUrl.trim() || undefined,
      credentialUrl: verificationUrl.trim() || undefined,
      linkedinPostUrl: linkedinUrl.trim() || undefined,
      linkedinUrl: linkedinUrl.trim() || undefined,
      description: description.trim() || undefined,
      verified: true,
      featured: true,
      accentColor: '#6366f1',
      createdAt: new Date().toISOString().split('T')[0]
    };

    let updated: CertificateItem[];
    if (editingId) {
      updated = currentCertificates.map((c) => (c.id === editingId ? newCert : c));
    } else {
      updated = [newCert, ...currentCertificates];
    }

    onSave(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      handleResetForm();
    }, 1500);
  };

  const handleDeleteCertificate = (id: string) => {
    if (confirm('Are you sure you want to remove this certificate?')) {
      const updated = currentCertificates.filter((c) => c.id !== id);
      onSave(updated);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Reset all certificates back to the 8 verified defaults?')) {
      onSave(initialCertificationsData);
      handleResetForm();
    }
  };

  return (
    <AnimatePresence>
      <div
        id="admin-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-gray-100 flex flex-col my-4 max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/90 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Certificate Administration CMS
                </h3>
                <p className="text-xs font-mono text-gray-400">
                  Add, update, or manage verified portfolio certificates
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => {
                    handleResetForm();
                    setActiveMode('add');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeMode === 'add' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {editingId ? 'Edit Form' : '+ Add New'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('manage')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeMode === 'manage' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Manage ({currentCertificates.length})
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/80 text-white transition-colors border border-white/15"
                title="Close Admin Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeMode === 'add' ? (
              <form onSubmit={handleSaveCertificate} className="space-y-5">
                {formError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                    {formError}
                  </div>
                )}

                {saveSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Certificate saved successfully! Added to live portfolio.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      Certificate Name / Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. AWS Certified Machine Learning Specialist"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Issuer */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      Issuing Organization *
                    </label>
                    <input
                      type="text"
                      value={issuer}
                      onChange={(e) => setIssuer(e.target.value)}
                      placeholder="e.g. Anthropic, GitHub, Microsoft"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Issue Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      Issue Date *
                    </label>
                    <input
                      type="text"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      placeholder="e.g. April 2026 or August 5, 2026"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="AI & Generative AI">AI &amp; Generative AI</option>
                      <option value="Web Development">Web Development</option>
                      <option value="GitHub & Development">GitHub &amp; Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Data Analysis">Data Analysis</option>
                      <option value="Achievements">Achievements</option>
                    </select>
                  </div>

                  {/* Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      Credential Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="Professional Certificate">Professional Certificate</option>
                      <option value="Training Certificate">Training Certificate</option>
                      <option value="Course Completion Certificate">Course Completion Certificate</option>
                      <option value="Community Achievement / Badge">Community Achievement / Badge</option>
                    </select>
                  </div>

                  {/* Certificate Image URL / Asset */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      Certificate Image Asset URL
                    </label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="/certificates/my-certificate.png or .svg"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none font-mono text-xs"
                    />
                    <span className="text-[10px] font-mono text-gray-400">
                      Standard assets are in <code>/certificates/filename.svg</code>
                    </span>
                  </div>

                  {/* Certificate PDF URL */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      Certificate PDF Document (Optional)
                    </label>
                    <input
                      type="text"
                      value={pdfUrl}
                      onChange={(e) => setPdfUrl(e.target.value)}
                      placeholder="https://example.com/certificate.pdf"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none font-mono text-xs"
                    />
                  </div>

                  {/* Credential ID */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      Credential ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={credentialId}
                      onChange={(e) => setCredentialId(e.target.value)}
                      placeholder="e.g. CERT-98234-XYZ"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none font-mono text-xs"
                    />
                  </div>

                  {/* Verification URL */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      Verification URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={verificationUrl}
                      onChange={(e) => setVerificationUrl(e.target.value)}
                      placeholder="https://verify.issuer.com/certificate/12345"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none font-mono text-xs"
                    />
                  </div>

                  {/* LinkedIn URL */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      LinkedIn Credential URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://www.linkedin.com/learning/certificates/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none font-mono text-xs"
                    />
                  </div>

                  {/* Skills Tagging */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      Skills (comma separated or enter to add)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={skillsInput}
                        onChange={(e) => setSkillsInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                        placeholder="e.g. Generative AI, PyTorch, React"
                        className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                      >
                        Add
                      </button>
                    </div>

                    {skillsList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {skillsList.map((s, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                          >
                            <span>{s}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(s)}
                              className="text-indigo-400 hover:text-rose-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      Certificate Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="Summary of course content, hands-on labs, and key accomplishments..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono transition-colors"
                  >
                    Clear Form
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingId ? 'Update Certificate' : 'Save Certificate'}</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Manage List Mode */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-mono text-gray-400">
                    Existing Certificates in System ({currentCertificates.length})
                  </p>
                  <button
                    type="button"
                    onClick={handleResetToDefaults}
                    className="flex items-center gap-1 text-xs font-mono text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to 8 Defaults</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {currentCertificates.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={c.image}
                          alt={c.title}
                          className="w-12 h-10 rounded-lg object-cover bg-neutral-900 border border-white/10"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white line-clamp-1">{c.title}</h4>
                          <p className="text-xs font-mono text-gray-400">
                            {c.issuer} • {c.completedDate || c.issueDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(c)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-indigo-300 border border-white/10"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCertificate(c.id)}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                          title="Delete Certificate"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
