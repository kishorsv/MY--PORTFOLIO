import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Code2,
  Cpu,
  Sparkles,
  Zap,
  CheckCircle2,
  Layers,
  Copy,
  Check,
  Play,
} from 'lucide-react';
import { profileData } from '../data/profile';

interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  icon: typeof Code2;
  code: string;
  output: string;
}

const snippets: CodeSnippet[] = [
  {
    id: 'ai',
    filename: 'ai_engine.py',
    language: 'Python',
    icon: Cpu,
    code: `import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from rag_core import VectorRetriever, AgentRouter

class KishorAIEngine:
    def __init__(self, model_id="gemini-flash-pro"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_id)
        self.router = AgentRouter(memory_depth=1024)
        self.vector_store = VectorRetriever(index="kishor-knowledge")

    async def generate_solution(self, query: str, context: dict):
        docs = await self.vector_store.retrieve(query, k=5)
        response = await self.router.execute_pipeline(query, docs)
        return {"status": "success", "latency_ms": 14.2, "data": response}`,
    output: `[INIT] Neural Engine v2.4 initialized\n[INDEX] 15,240 vector embeddings loaded\n[STATUS] Ready • 14.2ms inference latency`,
  },
  {
    id: 'fullstack',
    filename: 'FullStackApp.tsx',
    language: 'TypeScript',
    icon: Code2,
    code: `import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export const ProductionArchitecture: React.FC = () => {
  const { data: telemetry } = useQuery({
    queryKey: ['system-metrics'],
    queryFn: () => api.getTelemetryStream(),
    refetchInterval: 3000,
  });

  return (
    <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-neutral-900/90 border border-white/10">
      <TelemetryGauge value={telemetry?.throughput} unit="req/s" />
      <ModelLatencyGauge value={telemetry?.latencyMs} unit="ms" />
      <UptimeMonitor status="operational" uptime="99.98%" />
    </div>
  );
};`,
    output: `[VITE] HMR enabled • Build optimized (34ms)\n[BUNDLE] dist/assets/index.js 42.1 kB (gzip: 12.4 kB)\n[HEALTH] All API endpoints responding (200 OK)`,
  },
  {
    id: 'cloud',
    filename: 'deployment.yaml',
    language: 'YAML',
    icon: Layers,
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: kishor-ai-microservice
  labels:
    app.kubernetes.io/tier: backend
    developer: kishor-sv
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
        - name: inference-worker
          image: ghcr.io/kishorsv/ai-core:latest
          resources:
            limits:
              nvidia.com/gpu: 2
              memory: 16Gi`,
    output: `[K8S] 4/4 pods healthy & distributed across clusters\n[AUTOSCALE] HPA target: 70% CPU • Current load: 24%\n[SECURITY] Zero vulnerability CVEs detected`,
  },
];

export const HeroConsoleVisualizer: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = true }) => {
  const [activeTab, setActiveTab] = useState<string>('ai');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string | null>(null);

  const currentSnippet = snippets.find((s) => s.id === activeTab) || snippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setLogs('Executing live pipeline...');
    setTimeout(() => {
      setLogs(currentSnippet.output);
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="relative w-full max-w-[500px] select-none">
      {/* Dynamic Ambient Neon Glow Backlight */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-600/30 via-purple-600/25 to-cyan-400/30 rounded-3xl blur-2xl pointer-events-none transform-gpu opacity-80" />

      {/* Main Terminal Window Frame */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative rounded-3xl bg-[#090b10] border border-white/15 backdrop-blur-xl shadow-2xl overflow-hidden group"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d1017] border-b border-white/10">
          {/* Window Control Buttons */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/50" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/50" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/50" />
            <span className="ml-2 text-[11px] font-mono text-gray-400 hidden sm:inline-block">
              kishor-sv@engine ~ dev
            </span>
          </div>

          {/* Live Status Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>AI Core Active</span>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center justify-between px-2 pt-2 bg-[#090b10] border-b border-white/5 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1">
            {snippets.map((snippet) => {
              const Icon = snippet.icon;
              const isActive = activeTab === snippet.id;
              return (
                <button
                  key={snippet.id}
                  onClick={() => {
                    setActiveTab(snippet.id);
                    setLogs(null);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#121622] text-white border-t-2 border-indigo-400 shadow-sm font-semibold'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
                  <span>{snippet.filename}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 px-2 pb-1">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 text-[11px] font-mono transition-colors cursor-pointer"
              title="Run Snippet"
            >
              <Play className={`w-3 h-3 text-indigo-400 ${isRunning ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Run</span>
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Copy Code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Code Content Container */}
        <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed text-gray-300 overflow-x-auto min-h-[220px] max-h-[280px] bg-[#0c0f17]">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeTab}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="font-mono"
            >
              <code>
                {currentSnippet.code.split('\n').map((line, idx) => (
                  <div key={idx} className="table-row">
                    <span className="table-cell pr-4 text-gray-600 select-none text-[10px] text-right">
                      {idx + 1}
                    </span>
                    <span
                      className="table-cell"
                      dangerouslySetInnerHTML={{
                        __html: syntaxHighlight(line),
                      }}
                    />
                  </div>
                ))}
              </code>
            </motion.pre>
          </AnimatePresence>
        </div>

        {/* Execution Output Console / Log Drawer */}
        <div className="px-4 py-3 bg-[#080a0f] border-t border-white/10 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span className="flex items-center gap-1.5 text-indigo-400">
              <Terminal className="w-3 h-3" />
              <span>Console Output</span>
            </span>
            <span className="text-[10px] text-gray-500 font-mono">Edge Node • ap-south-1</span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 font-mono text-[10px] sm:text-[11px] text-emerald-400/90 whitespace-pre-line leading-normal">
            {logs || currentSnippet.output}
          </div>
        </div>

        {/* Bottom Profile Summary Badge */}
        <div className="p-3.5 bg-[#0e121b] border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-sm">
              <div className="w-full h-full bg-[#0a0c10] rounded-[10px] flex items-center justify-center font-mono font-bold text-xs text-white">
                K
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <span>{profileData.name}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <p className="text-[10px] font-mono text-indigo-300">AI/ML &amp; Full-Stack Engineer</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-mono text-indigo-300 uppercase">
              15+ Projects
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Accent Badges */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 z-20 pointer-events-none hidden sm:block"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-neutral-950/90 backdrop-blur-md border border-indigo-500/30 text-white shadow-xl">
          <div className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-[9px] text-gray-400 uppercase font-mono">Specialization</p>
            <p className="text-xs font-bold text-white">Generative AI &amp; ML</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute -bottom-4 -left-4 z-20 pointer-events-none hidden sm:block"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-neutral-950/90 backdrop-blur-md border border-cyan-500/30 text-white shadow-xl">
          <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-[9px] text-gray-400 uppercase font-mono">Status</p>
            <p className="text-xs font-bold text-white">Open for Roles</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function syntaxHighlight(line: string): string {
  return line
    .replace(/(import|from|class|def|return|async|await|const|export|type|interface|spec|labels|replicas)/g, '<span class="text-indigo-400 font-semibold">$1</span>')
    .replace(/(self|this|props|data)/g, '<span class="text-amber-300">$1</span>')
    .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-emerald-300">$1</span>')
    .replace(/(KishorAIEngine|ProductionArchitecture|VectorRetriever|AgentRouter|Deployment)/g, '<span class="text-cyan-300 font-bold">$1</span>')
    .replace(/(#.*|\/\/.*)/g, '<span class="text-gray-500 italic">$1</span>');
}
