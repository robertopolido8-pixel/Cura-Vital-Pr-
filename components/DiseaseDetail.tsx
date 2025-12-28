
import React, { useState } from 'react';
import { Disease } from '../types';
import { ArrowLeft, Magnet, Brain, Heart, Activity, ChevronDown, ChevronUp, Quote, ShieldCheck, Crown, BrainCircuit, PenTool, Zap, Info, Microscope, Sun, Waves, Infinity } from 'lucide-react';

interface DiseaseDetailProps {
  disease: Disease;
  onBack: () => void;
  onAskAI: (context: string) => void;
  onExploreTherapies: (diseaseName: string) => void;
  onNavigateToPremium: () => void;
  isPremium: boolean;
}

const DiseaseDetail: React.FC<DiseaseDetailProps> = ({ disease, onBack, onAskAI, onExploreTherapies, onNavigateToPremium, isPremium }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const isLocked = disease.isPremium && !isPremium;

  if (isLocked) {
    return (
      <div className="p-8 text-center animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-amber-100 p-6 rounded-full mb-6">
           <Crown className="w-12 h-12 text-amber-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-4 uppercase tracking-tighter">Acesso Master Pró</h2>
        <p className="text-slate-500 mb-8 font-medium">Os fundamentos avançados de Metafísica, GNM e Biomagnetismo desta patologia são exclusivos.</p>
        <button 
          onClick={onNavigateToPremium} 
          className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-indigo-700 transition-all active:scale-95 uppercase text-xs tracking-widest"
        >
          Desbloquear Licença
        </button>
      </div>
    );
  }

  const toggleSection = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  return (
    <div className="animate-fade-in pb-20">
      <button onClick={onBack} className="flex items-center text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </button>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
           <span className="bg-indigo-600 text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-indigo-100">{disease.category}</span>
           <span className="bg-slate-900 text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">{disease.region}</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-6 uppercase">{disease.name}</h1>
        <p className="text-slate-500 font-bold text-sm leading-relaxed italic border-l-4 border-indigo-500 pl-6 py-2">
           "{disease.description}"
        </p>
      </div>

      <div className="space-y-6">
        {/* METAFÍSICA DA SAÚDE */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center mb-6">
            <div className="bg-amber-50 p-4 rounded-2xl mr-4 group-hover:rotate-12 transition-transform"><Sun className="w-6 h-6 text-amber-500" /></div>
            <div>
               <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Metafísica da Alma</h2>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Linguagem do Inconsciente</p>
            </div>
          </div>
          <div className="bg-amber-50/20 p-6 rounded-3xl border border-amber-100/50">
             <p className="text-sm font-semibold text-slate-700 leading-relaxed italic">
                {disease.metaphysics || "A compreensão metafísica profunda revela que o corpo físico apenas projeta o que a alma não consegue mais sustentar em silêncio."}
             </p>
          </div>
          <Infinity className="absolute -right-6 -bottom-6 w-24 h-24 text-amber-500/5" />
        </section>

        {/* NOVA MEDICINA GERMÂNICA */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm group">
          <div className="flex items-center mb-6">
            <div className="bg-blue-50 p-4 rounded-2xl mr-4 group-hover:scale-110 transition-transform"><Microscope className="w-6 h-6 text-blue-600" /></div>
            <div>
               <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Inteligência Biológica</h2>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Leis de Dr. Hamer (GNM)</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-slate-50 p-5 rounded-3xl">
                 <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Tecido Original</span>
                 <p className="font-black text-slate-700 text-xs">{disease.gnm.tissue.layer}</p>
               </div>
               <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100">
                  <span className="text-[9px] font-black text-indigo-400 uppercase block mb-1">Choque Biológico (DHS)</span>
                  <p className="font-black text-indigo-900 text-xs leading-snug">{disease.gnm.conflict}</p>
               </div>
            </div>

            <button onClick={() => toggleSection('gnm-phases')} className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl shadow-inner hover:bg-slate-50 transition-colors">
               <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Análise do Programa Biológico</span>
               </div>
               {expandedSection === 'gnm-phases' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {expandedSection === 'gnm-phases' && (
              <div className="grid grid-cols-1 gap-3 animate-fade-in pt-2">
                 <div className="p-5 bg-red-50 rounded-2xl border border-red-100">
                    <span className="text-[8px] font-black text-red-400 uppercase tracking-widest block mb-2">Simpaticotonia (Ativa)</span>
                    <p className="text-[11px] font-bold text-red-900">{disease.gnm.tissue.activePhase}</p>
                 </div>
                 <div className="p-5 bg-teal-50 rounded-2xl border border-teal-100">
                    <span className="text-[8px] font-black text-teal-400 uppercase tracking-widest block mb-2">Vagotonia (Cura/PCL)</span>
                    <p className="text-[11px] font-bold text-teal-900">{disease.gnm.tissue.healingPhaseA}</p>
                 </div>
                 <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                       <Zap className="w-4 h-4 text-indigo-400" />
                       <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Sentido Evolutivo</span>
                    </div>
                    <p className="text-[11px] font-bold leading-relaxed italic">"{disease.gnm.tissue.biologicalSense}"</p>
                 </div>
              </div>
            )}
          </div>
        </section>

        {/* VISÃO SISTÊMICA (HELLINGER) */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center mb-6">
            <div className="bg-red-50 p-4 rounded-2xl mr-4 group-hover:-rotate-12 transition-transform"><Heart className="w-6 h-6 text-red-600" /></div>
            <div>
               <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Vínculos Sistêmicos</h2>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ordens do Amor</p>
            </div>
          </div>
          <div className="bg-red-50/30 p-6 rounded-3xl border border-red-100/50">
             <p className="text-sm font-semibold text-slate-700 leading-relaxed italic">
               {disease.emotionalBlock || "O sintoma é uma tentativa de incluir o que foi excluído no sistema familiar."}
             </p>
          </div>
          <Waves className="absolute -left-10 -bottom-10 w-40 h-40 text-red-100/20" />
        </section>

        {/* BIOMAGNETISMO VIBRACIONAL */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm group">
          <div className="flex items-center mb-6">
            <div className="bg-teal-50 p-4 rounded-2xl mr-4 group-hover:animate-pulse"><Magnet className="w-6 h-6 text-teal-600" /></div>
            <div>
               <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Equilíbrio Bio-Iônico</h2>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pares Magnéticos de Goiz</p>
            </div>
          </div>
          
          <div className="space-y-4">
             {disease.biomagnetism.pairs.map((pair, idx) => (
               <div key={idx} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center gap-6 relative overflow-hidden hover:bg-white hover:shadow-lg transition-all">
                  <div className="flex flex-col gap-2">
                     <div className="flex items-center gap-2">
                        <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl font-black text-[10px] shadow-lg shadow-slate-200">(-) {pair.negative}</div>
                        <div className="w-4 h-[2px] bg-slate-200"></div>
                        <div className="bg-red-600 text-white px-3 py-1.5 rounded-xl font-black text-[10px] shadow-lg shadow-red-100">(+) {pair.positive}</div>
                     </div>
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">{pair.description}</p>
                  </div>
                  <ShieldCheck className="absolute right-6 w-8 h-8 text-teal-600/10 group-hover:text-teal-600/30 transition-colors" />
               </div>
             ))}
          </div>
        </section>

        {/* PNL & AFIRMAÇÕES DE ALTA FREQUÊNCIA */}
        <section className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
           <Quote className="w-12 h-12 opacity-10 mb-6" />
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-indigo-200">Ressignificação Bio-Quântica</h3>
           <p className="text-2xl font-black italic mb-8 leading-tight tracking-tighter uppercase">"{disease.pnl.affirmation}"</p>
           <div className="bg-white/10 p-6 rounded-3xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                 <Zap className="w-4 h-4 text-amber-400" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-amber-400">Ponte para o Futuro</span>
              </div>
              <p className="text-xs font-semibold leading-relaxed opacity-90">{disease.pnl.reframingTip}</p>
           </div>
           <Sun className="absolute -right-10 -top-10 w-48 h-48 text-white/5 rotate-12" />
        </section>
      </div>

      <div className="mt-12 space-y-4">
        <button 
          onClick={() => onExploreTherapies(disease.name)}
          className="w-full py-7 bg-teal-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl flex items-center justify-center gap-4 hover:bg-teal-700 transition-all active:scale-95 border-b-4 border-teal-800"
        >
          <PenTool className="w-5 h-5" />
          Protocolos de Autocura
        </button>

        <button 
          onClick={() => onAskAI(`Vitalino, faça uma análise quântica e sistêmica sobre ${disease.name} unindo Metafísica e GNM.`)}
          className="w-full py-7 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl flex items-center justify-center gap-4 hover:bg-black transition-all active:scale-95 border-b-4 border-slate-700"
        >
          <BrainCircuit className="w-5 h-5" />
          Vitalino IA Expert
        </button>
      </div>
    </div>
  );
};

export default DiseaseDetail;
