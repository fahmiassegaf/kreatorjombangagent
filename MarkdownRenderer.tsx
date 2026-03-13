import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileJson, Terminal, Table as TableIcon, BrainCircuit, ChevronDown, ChevronRight, Search } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // SPLIT LOGIC: Separate the ':::thinking' block from the rest of the content
  const thinkingBlockRegex = /:::thinking([\s\S]*?):::/;
  const match = content.match(thinkingBlockRegex);
  
  let thoughtContent = null;
  let mainContent = content;

  if (match) {
    thoughtContent = match[1].trim();
    mainContent = content.replace(thinkingBlockRegex, '').trim();
  }

  // STATE: Toggle thought visibility
  const [isThoughtOpen, setIsThoughtOpen] = useState(true);

  return (
    <div className="w-full">
      {/* 1. THOUGHT PROCESS PANEL (If exists) */}
      {thoughtContent && (
        <div className="mb-6 rounded-lg border border-primary/20 bg-surface_card/50 overflow-hidden shadow-lg">
           <button 
             onClick={() => setIsThoughtOpen(!isThoughtOpen)}
             className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors border-b border-white/5"
           >
              <div className="flex items-center gap-2 text-primary">
                 <BrainCircuit size={16} />
                 <span className="text-xs font-mono font-bold uppercase tracking-wider">Logika AI (KB-08)</span>
              </div>
              <div className="flex items-center gap-2 text-text_secondary text-[10px] font-mono">
                 {isThoughtOpen ? 'Sembunyikan' : 'Lihat Proses'}
                 {isThoughtOpen ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
              </div>
           </button>
           
           {isThoughtOpen && (
             <div className="p-4 bg-black/20 text-xs font-mono text-slate-400 leading-relaxed whitespace-pre-wrap border-l-2 border-primary/30 mx-4 my-2 pl-3 animate-in slide-in-from-top-2 fade-in">
               {thoughtContent.split('\n').map((line, i) => {
                 if (line.trim().startsWith('>')) {
                    return <div key={i} className="text-primary/80 mb-1">{line}</div>;
                 }
                 if (line.includes('L4') || line.includes('L3') || line.includes('L2') || line.includes('L1')) {
                    return <div key={i} className="text-white font-bold mt-2 mb-1">{line}</div>;
                 }
                 if (line.includes('RESEARCH LOGIC') || line.includes('KB-08 RECALL')) {
                    return <div key={i} className="text-accent font-bold mt-3 mb-1 border-b border-white/10 pb-1">{line}</div>;
                 }
                 return <div key={i}>{line}</div>;
               })}
             </div>
           )}
        </div>
      )}

      {/* 2. MAIN CONTENT RENDERER */}
      <div className="prose prose-invert max-w-none font-sans 
        prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight 
        prose-p:text-slate-300 prose-p:leading-8 prose-p:mb-4
        prose-strong:text-white prose-strong:font-bold
        prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-2 prose-ul:my-4 prose-ul:text-slate-300
        prose-ol:list-decimal prose-ol:pl-5 prose-ol:space-y-2 prose-ol:my-4 prose-ol:text-slate-300
        prose-li:marker:text-primary/70
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
        prose-hr:border-white/10 prose-hr:my-8
      ">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // ULTIMATE TABLE FIX
            table: ({node, ...props}) => (
              <div className="my-6 w-full grid grid-cols-1">
                  <div className="flex items-center gap-2 mb-2 text-[10px] uppercase font-mono text-text_secondary tracking-widest">
                    <TableIcon size={12} /> Data Table
                  </div>
                  <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-surface_card/30 shadow-2xl pb-1 scrollbar-hide">
                      <table className="w-full text-left border-collapse" {...props} />
                  </div>
              </div>
            ),
            thead: ({node, ...props}) => (
              <thead className="bg-surface_card border-b border-white/10 text-primary font-mono uppercase tracking-wider" {...props} />
            ),
            th: ({node, ...props}) => (
              <th className="px-4 py-3 text-[10px] font-bold whitespace-nowrap text-primary border-r border-white/5 last:border-r-0" {...props} />
            ),
            td: ({node, ...props}) => (
              <td className="px-4 py-3 border-b border-white/5 text-slate-300 text-[12px] leading-relaxed whitespace-normal min-w-[140px] max-w-[250px] align-top border-r border-white/5 last:border-r-0" {...props} />
            ),
            
            // Typography Overrides
            h1: ({node, ...props}) => <h1 className="text-2xl md:text-3xl text-white mt-8 mb-6 pb-2 border-b border-white/10" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-lg md:text-xl text-white mt-8 mb-4 flex items-center gap-2 group border-l-4 border-primary pl-4 py-1 bg-gradient-to-r from-primary/10 to-transparent rounded-r-lg" {...props}>
              {props.children}
            </h2>,
            h3: ({node, ...props}) => <h3 className="text-base md:text-lg text-primary/90 mt-6 mb-3 font-semibold" {...props} />,
            
            // Code Blocks
            code: ({node, className, children, ...props}: any) => {
              const match = /language-(\w+)/.exec(className || '');
              const isInline = !match && !String(children).includes('\n');
              const language = match ? match[1] : '';
              const isJson = language === 'json' || language === 'json-chart';
              
              if (String(children).includes('json-chart')) return null;

              return isInline ? (
                <code className="bg-primary/10 px-1.5 py-0.5 rounded text-primary font-mono text-[10px] md:text-sm border border-primary/20 break-all whitespace-normal" {...props}>
                  {children}
                </code>
              ) : (
                <div className={`my-4 md:my-6 rounded-lg border overflow-hidden shadow-lg ${isJson ? 'border-accent/30 bg-accent/5' : 'border-white/10 bg-[#050a14]'} w-full max-w-full`}>
                  <div className={`px-4 py-2 border-b flex items-center justify-between ${isJson ? 'border-accent/20 bg-accent/10' : 'border-white/5 bg-white/5'}`}>
                    <div className="flex items-center gap-2">
                      {isJson ? <FileJson size={14} className="text-accent"/> : <Terminal size={14} className="text-text_secondary"/>}
                      <span className={`text-[10px] uppercase font-mono tracking-wider ${isJson ? 'text-accent' : 'text-text_secondary'}`}>
                        {language || 'CODE'}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 overflow-x-auto w-full touch-pan-x custom-scrollbar">
                    <code className={`text-[10px] md:text-sm font-mono block leading-relaxed whitespace-pre ${isJson ? 'text-cyan-100' : 'text-slate-300'}`} {...props}>
                      {children}
                    </code>
                  </div>
                </div>
              );
            }
          }}
        >
          {mainContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownRenderer;