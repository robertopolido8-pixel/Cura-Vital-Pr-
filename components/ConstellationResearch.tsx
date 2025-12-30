
import React, { useState, useMemo } from 'react';
import { HAMER_BERT_CONSTELLATIONS, SPECIAL_DISEASES } from '../constants';
import { Brain, Zap, Crown, ChevronRight, Heart, Activity, AlertCircle, Microscope, Search, BookOpen } from 'lucide-react';

interface ConstellationResearchProps {
  isPremium: boolean;
  onUpgrade: () => void;
  onAskAI: (context: string) => void;
  onOpenDisease?: (disease: any) => void;
}

const ConstellationResearch: React.FC<ConstellationResearchProps> = ({ isPremium, onUpgrade, onAskAI, onOpenDisease }) => {
  const [activeTab, setActiveTab] = useState<'CONSTELLATIONS' | 'SBS_INDEX'>('CONSTELLATIONS');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSBS = useMemo(() => {
    return SPECIAL_DISEASES.filter(d => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm]);

  return (
    <div className="animate-fade-in pb-20">
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white mb-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Compêndio Master</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Arquivo <span className="text-indigo-400">Pró</span></h2>
          <p className="text-slate-400 text-xs font-medium mt-1">Conhecimento avançado do Dr. Hamer.</p>
        </div>
        <Brain className="absolute -right-12 -bottom-12 w-48 h-48 opacity-5 rotate-12" />
      </div>

      <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
        <button 
          onClick={() => setActiveTab('CONSTELLATIONS')}
          className={`flex-1 flex items-center justify-center py-4 px-4 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all ${activeTab === 'CONSTELLATIONS' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Zap className="w-4 h-4 mr-2" /> Constelações
        </button>
        <button 
          onClick={() => setActiveTab('SBS_INDEX')}
          className={`flex-1 flex items-center justify-center py-4 px-4 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all ${activeTab === 'SBS_INDEX' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500'}`}
        >
          <BookOpen className="w-4 h-4 mr-2" /> Índice SBS
        </button>
      </div>

      {!isPremium ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-12 text-center">
            <Crown className="w-12 h-12 text-amber-500 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">Módulo Exclusivo</h3>
            <p className="text-slate-500 text-sm mb-8 font-medium">As constelações de Hamer e o índice SBS avançado são exclusivos da Licença Master.</p>
            <button onClick={onUpgrade} className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all">Ativar Licença</button>
        </div>
      ) : (
        <div className="space-y-6">
          {activeTab === 'CONSTELLATIONS' ? (
            <div className="space-y-4">
              {HAMER_BERT_CONSTELLATIONS.map(c => (
                <div key={c.id} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm group">
                  <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{c.name}</h4>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-5 rounded-2xl">
                      <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Cérebro (Relés)</span>
                      <p className="text-xs text-slate-700 font-bold">{c.brainRelays}</p>
                    </div>
                    <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                      <span className="text-[9px] font-black text-indigo-400 uppercase flex items-center mb-1"><Heart className="w-3 h-3 mr-1" /> Dinâmica Sistêmica</span>
                      <p className="text-xs text-indigo-900 font-medium italic">"{c.systemicRoot}"</p>
                    </div>
                    <div className="p-5 bg-slate-900 rounded-2xl text-white">
                      <span className="text-[9px] font-black text-indigo-400 uppercase block mb-2">Visão do Dr. Hamer</span>
                      <p className="text-xs leading-relaxed opacity-90">{c.behavior}</p>
                    </div>
                    <button 
                      onClick={() => onAskAI(`Análise profunda da ${c.name} unindo os trilhos biológicos de Hamer e a dinâmica de Hellinger.`)}
                      className="w-full py-4 border-2 border-slate-900 text-slate-900 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                    >
                      Solicitar Análise IA
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-5 top-5 w-5 h-5 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="Pesquisar no Índice SBS Master..." 
                  className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-3xl font-bold text-lg focus:outline-none shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-3">
                {filteredSBS.map(disease => (
                  <button 
                    key={disease.id} 
                    onClick={() => onOpenDisease?.(disease)}
                    className="bg-white p-6 rounded-[2.2rem] border border-slate-100 flex items-center justify-between shadow-sm active:scale-95 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-teal-50 p-3 rounded-xl group-hover:bg-teal-100 transition-colors">
                        <Microscope className="w-5 h-5 text-teal-600" />
                      </div>
                      <h4 className="font-black text-slate-800 uppercase text-xs tracking-tight">{disease.name}</h4>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-teal-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConstellationResearch;
