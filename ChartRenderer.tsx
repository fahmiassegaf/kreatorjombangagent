import React from 'react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Defs,
  LinearGradient,
  Stop
} from 'recharts';
import { ChartData } from '../types';

interface ChartRendererProps {
  data: ChartData;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4', '#F472B6', '#FBBF24', '#10B981'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <p className="text-white font-bold font-display text-sm mb-1">{`${label}`}</p>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <p className="text-primary text-xs font-mono">
            {`${payload[0].name}: ${payload[0].value}`}
            </p>
        </div>
      </div>
    );
  }
  return null;
};

const ChartRenderer: React.FC<ChartRendererProps> = ({ data }) => {
  if (!data || !data.data) return null;

  return (
    <div className="w-full bg-surface_card/50 rounded-xl border border-white/5 p-4 my-6 shadow-lg relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
      
      <div className="flex items-center justify-between mb-6 px-2">
          <h4 className="text-sm md:text-base text-white font-display font-bold tracking-wide flex items-center gap-2">
             <span className="w-1 h-4 bg-primary rounded-full"></span>
             {data.title}
          </h4>
          <span className="text-[10px] text-text_secondary font-mono uppercase tracking-wider border border-white/10 px-2 py-1 rounded">
             AUTO-GENERATED
          </span>
      </div>

      <div className="h-64 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {(() => {
            switch (data.type) {
              case 'line':
                // UPGRADE: Use AreaChart for "Cyber" look instead of thin lines
                return (
                  <AreaChart data={data.data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                        dataKey={data.categoryKey} 
                        stroke="#64748b" 
                        fontSize={10} 
                        tickMargin={10} 
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#64748b" 
                        fontSize={10} 
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                    <Area 
                      type="monotone" 
                      dataKey={data.dataKey} 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                );
              case 'pie':
                return (
                  <PieChart>
                    <Pie
                      data={data.data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey={data.dataKey}
                      nameKey={data.categoryKey}
                      stroke="none"
                    >
                      {data.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        formatter={(value) => <span className="text-xs text-slate-400 ml-1">{value}</span>}
                    />
                  </PieChart>
                );
              case 'bar':
              default:
                return (
                  <BarChart data={data.data}>
                     <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                        dataKey={data.categoryKey} 
                        stroke="#64748b" 
                        fontSize={10} 
                        tickMargin={10} 
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#64748b" 
                        fontSize={10} 
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.03)'}} />
                    <Bar 
                        dataKey={data.dataKey} 
                        fill="url(#barGradient)" 
                        radius={[6, 6, 0, 0]} 
                        barSize={30}
                    />
                  </BarChart>
                );
            }
          })()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartRenderer;