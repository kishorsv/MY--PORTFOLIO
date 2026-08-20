import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { Toast } from './components/Toast';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { Footer } from './components/Footer';

// Sections
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { EducationSection } from './sections/EducationSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { GithubSection } from './sections/GithubSection';
import { ContactSection } from './sections/ContactSection';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Toast notification state
  const [toast, setToast] = useState<{
    isVisible: boolean;
    title: string;
    description?: string;
    type: 'success' | 'error' | 'info';
  }>({
    isVisible: false,
    title: '',
    description: '',
    type: 'info',
  });

  const showToast = useCallback((title: string, description?: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({
      isVisible: true,
      title,
      description,
      type,
    });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    showToast(
      !isDarkMode ? 'Dark Theme Activated' : 'Light Theme Preview Activated',
      !isDarkMode ? 'Optimized for high-contrast dark environments.' : 'Clean bright developer palette.',
      'info'
    );
  };

  return (
    <div className="min-h-screen font-sans bg-[#020204] text-[#E0E0E6] selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden">
      {/* Global Ambient Frosted Glass Blur Lights */}
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Scroll Progress Bar at the very top */}
      <ScrollProgress />

      {/* Main Top Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Portfolio Content Sections */}
      <main className="relative flex flex-col">
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenAiChat={() => setIsAiChatOpen(true)}
          isDarkMode={isDarkMode}
        />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />

        <EducationSection />

        <CertificationsSection />

        <GithubSection />

        <ContactSection onNotify={showToast} />
      </main>

      {/* Footer */}
      <Footer onOpenAiChat={() => setIsAiChatOpen(true)} />

      {/* Interactive Modals and Drawers */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <AiAssistantDrawer
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        onNotify={showToast}
      />

      {/* Toast Notification Container */}
      <Toast
        isVisible={toast.isVisible}
        title={toast.title}
        description={toast.description}
        type={toast.type}
        onClose={closeToast}
      />
    </div>
  );
}

export default App;
