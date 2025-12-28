
import React, { useState, useMemo } from 'react';
import { Magnet, Search, Crown, Lock, ChevronRight, ShieldCheck, Zap, Activity, Heart, AlertTriangle, Microscope, Database, Sparkles } from 'lucide-react';
import { BIO_PAIRS } from '../constants';
import { PairCategory } from '../types';

interface BiomagIndexProps {
  isPremium: boolean;
  onUpgrade: () => void;
}

const CATEGORIES: { label: string; value: PairCategory | 'ALL'; icon: any }[] = [
  { label: 'Todos', value: 'ALL', icon: Database },
  { label: 'Patogênicos', value: 'PATOGENICO', icon: ShieldCheck },
  { label: 'Emocionais', value: 'EMOCIONAL', icon: Heart },
  { label: 'Gene', value: 'GENE', icon: Sparkles },
  { label: 'Especiais', value: 'ESPECIAL', icon: Activity },
  { label: 'Reservatório', value: 'RESERVATORIO', icon: Microscope },
  { label: 'Tumoral', value: 'TUMORAL', icon: AlertTriangle }
];

// Helper to get a single icon based on category
const getCategoryIcon = (category: PairCategory) => {
  switch (category) {
    case 'PATOGENICO': return <ShieldCheck className="w-4 h-4" />;
    case 'EMOCIONAL': return <Heart className="w-4 h-4" />;
    case 'GENE': return <Sparkles className="w-4 h-4" />;
    case 'ESPECIAL': return <Activity className="w-4 h-4" />;
    case 'RESERVATORIO': return <Microscope className="w-4 h-4" />;
    case 'TUMORAL': return <AlertTriangle className="w-4 h-4" />;
    default: return <Zap className="w-4 h-4" />;
  }
};

const BiomagIndex: React.FC<BiomagIndexProps> = ({ isPremium, onUpgrade }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<PairCategory | 'ALL'>('ALL');

  const filteredPairs = useMemo(() => {
    return BIO_PAIRS.filter(p => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch = 
        p.negative.toLowerCase().includes(searchStr) || 
        p.positive.toLowerCase().includes(searchStr) ||
        p.description.toLowerCase().includes(searchStr) ||
        p.pathogen?.toLowerCase().includes(searchStr) ||
        p.relatedDisease?.toLowerCase().includes(searchStr);
        
      const matchesTab = activeTab === 'ALL' || p.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
         <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2 tracking-tight">Goiz Master Index</h2>
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">Ressonância Integrada 100 A-Z & Pró</p>
         </div>
         <Magnet className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 rotate-12" />
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveTab(cat.value as any)}
            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border flex items-center gap-2 ${
              activeTab === cat.value 
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
              : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 shadow-sm'
            }`}
          >
            <cat.icon className="w-3.5 h-3.5" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-6 top-5 w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Busque por doença, patógeno ou ponto..." 
          className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2.2rem] shadow-sm focus:ring-8 focus:ring-indigo-500/5 focus:outline-none font-bold text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Pairs Feed */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPairs.map(pair => (
          <div 
            key={pair.id} 
            className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
               <div className="flex gap-2">
                  <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 ${
                    pair.category === 'EMOCIONAL' ? 'bg-rose-50 text-rose-600' :
                    pair.category === 'TUMORAL' ? 'bg-red-50 text-red-600' :
                    pair.category === 'GENE' ? 'bg-teal-50 text-teal-600' :
                    pair.category === 'RESERVATORIO' ? 'bg-amber-50 text-amber-600' :
                    'bg-indigo-50 text-indigo-600'
                  }`}>
                    {getCategoryIcon(pair.category)}
                    {pair.category}
                  </span>
                  {pair.relatedDisease && (
                    <span className="bg-slate-100 text-slate-500 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                       Livre 100 A-Z
                    </span>
                  )}
               </div>
               {/* Fixed: Removed Lock icon to keep UI clean as requested */}
            </div>

            <div className="flex items-center gap-3 mb-4">
               <div className="flex-1 p-4 rounded-2xl text-center font-black text-sm shadow-inner bg-slate-900 text-white">
                  (-) {pair.negative}
               </div>
               <div className="flex-1 p-4 rounded-2xl text-center font-black text-sm shadow-inner bg-red-600 text-white">
                  (+) {pair.positive}
               </div>
            </div>

            <div>
               <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-black text-slate-800 uppercase tracking-tight">
                    {pair.pathogen} {pair.relatedDisease && `• ${pair.relatedDisease}`}
                  </p>
               </div>
               <p className="text-[11px] text-slate-500 leading-relaxed italic">{pair.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredPairs.length === 0 && (
        <div className="py-20 text-center animate-fade-in">
           <Database className="w-12 h-12 text-slate-200 mx-auto mb-4" />
           <p className="text-slate-500 font-black text-xs uppercase tracking-widest mb-2">Busca Exaurida</p>
           <p className="text-slate-400 font-bold text-[10px] max-w-[200px] mx-auto italic">Tente buscar por um ponto anatômico ou patógeno específico.</p>
        </div>
      )}
    </div>
  );
};

export default BiomagIndex;
