
import React, { useState, useMemo } from 'react';
import { HAMER_BERT_CONSTELLATIONS, SPECIAL_DISEASES } from '../constants';
import { Brain, Zap, Crown, ChevronRight, Heart, Activity, AlertCircle, Microscope, Search, BookOpen, Layers, Shield, MessageSquare } from 'lucide-react';

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

  const filteredConstellations = useMemo(() => {
    return HAMER_BERT_CONSTELLATIONS.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.behavior.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="animate-fade-in pb-20">
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white mb-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Compêndio Master GNM</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Arquivo <span className="text-indigo-400">Pró</span></h2>
          <p className="text-slate-400 text-xs font-medium mt-1">Transtornos Mentais & Programas Biológicos SBS.</p>
        </div>
        <Brain className="absolute -right-12 -bottom-12 w-48 h-48 opacity-5 rotate-12" />
      </div>

      <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
        <button 
          onClick={() => { setActiveTab('CONSTELLATIONS'); setSearchTerm(''); }}
          className={`flex-1 flex items-center justify-center py-4 px-4 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all ${activeTab === 'CONSTELLATIONS' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Zap className="w-4 h-4 mr-2" /> Constelações
        </button>
        <button 
          onClick={() => { setActiveTab('SBS_INDEX'); setSearchTerm(''); }}
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
          <div className="relative">
            <Search className="absolute left-5 top-5 w-5 h-5 text-slate-300" />
            <input 
              type="text" 
              placeholder={activeTab === 'CONSTELLATIONS' ? "Buscar constelação ou comportamento..." : "Pesquisar no Índice SBS Master..."}
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-3xl font-bold text-lg focus:outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {activeTab === 'CONSTELLATIONS' ? (
            <div className="space-y-4">
              {filteredConstellations.length > 0 ? (
                filteredConstellations.map(c => (
                  <div key={c.id} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm group hover:border-indigo-200 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-tight max-w-[80%]">{c.name}</h4>
                      <div className="bg-indigo-50 p-2 rounded-xl">
                        <Layers className="w-4 h-4 text-indigo-600" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-5 rounded-2xl">
                        <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Impacto Cerebral (Relés)</span>
                        <p className="text-xs text-slate-700 font-bold">{c.brainRelays}</p>
                      </div>

                      <div className="p-5 bg-slate-900 rounded-2xl text-white">
                        <div className="flex items-center gap-2 mb-2">
                           <Activity className="w-3.5 h-3.5 text-indigo-400" />
                           <span className="text-[9px] font-black text-indigo-400 uppercase block">Expressão Psíquica</span>
                        </div>
                        <p className="text-xs leading-relaxed font-medium italic">"{c.behavior}"</p>
                      </div>

                      <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                        <div className="flex items-center gap-2 mb-2">
                           <Heart className="w-3.5 h-3.5 text-indigo-600" />
                           <span className="text-[9px] font-black text-indigo-600 uppercase flex items-center">Campo Sistêmico</span>
                        </div>
                        <p className="text-xs text-indigo-900 font-medium italic">"{c.systemicRoot}"</p>
                      </div>

                      <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
                        <div className="flex items-center gap-2 mb-2">
                           <Shield className="w-3.5 h-3.5 text-amber-600" />
                           <span className="text-[9px] font-black text-amber-600 uppercase block">Insight Pró</span>
                        </div>
                        <p className="text-xs text-amber-900 font-bold leading-relaxed">{c.professionalInsight}</p>
                      </div>

                      <button 
                        onClick={() => onAskAI(`Análise completa da ${c.name} integrando GNM e Ordens do Amor.`)}
                        className="w-full py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" /> Consultar Vitalino IA
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                   <AlertCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                   <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Nenhuma constelação encontrada.</p>
                </div>
              )}
            </div>
          ) : (
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
                    <div className="text-left">
                      <h4 className="font-black text-slate-800 uppercase text-xs tracking-tight">{disease.name}</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5 tracking-tighter">Programa Especial SBS</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-teal-600 transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConstellationResearch;
