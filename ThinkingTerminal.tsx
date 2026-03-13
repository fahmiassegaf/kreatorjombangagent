import React from 'react';
import { Cpu, Wifi } from 'lucide-react';

interface ThinkingTerminalProps {
  attachmentType?: string;
}

const ThinkingTerminal: React.FC<ThinkingTerminalProps> = ({ attachmentType }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-[85vw] max-w-sm p-1 glass-card rounded-2xl border border-primary/30 shadow-[0_0_50px_rgba(59,130,246,0.15)] bg-surface">
        
        {/* Header */}
        <div className="bg-surface_card rounded-t-xl p-3 border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
             <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">UPLINK ESTABLISHED</span>
           </div>
           <Wifi size={12} className="text-primary animate-pulse"/>
        </div>

        {/* Body */}
        <div className="p-8 bg-surface/90 rounded-b-xl flex flex-col items-center gap-6">
           
           {/* Cyber Loader */}
           <div className="relative w-16 h-16 flex items-center justify-center">
             <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
             <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
             <Cpu size={24} className="text-primary animate-pulse" />
           </div>
           
           <div className="text-center space-y-2">
             <div className="text-xs font-bold text-white tracking-widest uppercase animate-pulse">
               CONNECTING TO KB-08...
             </div>
             <div className="text-[10px] text-text_secondary font-mono">
               Mengakses Reasoning Layers & Data Brand
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingTerminal;