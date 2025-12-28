
import React, { useState } from 'react';
import { HAMER_BERT_CONSTELLATIONS, BIO_MICROBIOLOGY } from '../constants';
import { Brain, Zap, Crown, ChevronRight, Info, BookOpen, Heart, Activity, AlertCircle, Link as LinkIcon, Microscope } from 'lucide-react';

interface ConstellationResearchProps {
  isPremium: boolean;
  onUpgrade: () => void;
  onAskAI: (context: string) => void;
}

const ConstellationResearch: React.FC<ConstellationResearchProps> = ({ isPremium, onUpgrade, onAskAI }) => {
  const [activeTab, setActiveTab] = useState<'CONSTELLATIONS' | 'HAMER_PSYCH' | 'MICROBIOLOGY'>('CONSTELLATIONS');

  return (
    <div className="animate-fade-in pb-20">
      <div className="bg-indigo-900 rounded-3xl p-6 text-white mb-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Zap className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Módulo Avançado</span>
          </div>
          <h2 className="text-2xl font-bold">Plano Cura Vital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">Pró</span></h2>
          <p className="text-indigo-100 text-xs mt-1">Ciência Biológica e Ordens do Amor integradas.</p>
        </div>
      </div>

      {/* Tabs Didáticas Expandidas */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-6 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('CONSTELLATIONS')}
          className={`flex-1 flex items-center justify-center py-2 px-4 text-[10px] uppercase tracking-widest font-black rounded-lg transition-all whitespace-nowrap ${activeTab === 'CONSTELLATIONS' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Brain className="w-4 h-4 mr-2" /> Sistêmica
        </button>
        <button 
          onClick={() => setActiveTab('HAMER_PSYCH')}
          className={`flex-1 flex items-center justify-center py-2 px-4 text-[10px] uppercase tracking-widest font-black rounded-lg transition-all whitespace-nowrap ${activeTab === 'HAMER_PSYCH' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Zap className="w-4 h-4 mr-2" /> Constelações Hamer
        </button>
        <button 
          onClick={() => setActiveTab('MICROBIOLOGY')}
          className={`flex-1 flex items-center justify-center py-2 px-4 text-[10px] uppercase tracking-widest font-black rounded-lg transition-all whitespace-nowrap ${activeTab === 'MICROBIOLOGY' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Activity className="w-4 h-4 mr-2" /> Micróbios
        </button>
      </div>

      {!isPremium ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Acesso Restrito</h3>
            <p className="text-slate-500 text-sm mb-6">Este conteúdo avançado do Compêndio <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 font-black">Pró</span> exige assinatura ativa.</p>
            <button onClick={onUpgrade} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95">Assinar R$ 0,10</button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-800 font-medium italic">As informações abaixo visam o autoconhecimento biológico e sistêmico. Não devem ser usadas para substituir diagnósticos ou tratamentos médicos oficiais.</p>
          </div>

          {activeTab === 'CONSTELLATIONS' ? (
            <div className="space-y-4">
              {HAMER_BERT_CONSTELLATIONS.map(c => (
                <div key={c.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-bold text-indigo-900">{c.name}</h4>
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Sistêmica</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Comportamento Percebido</span>
                      <p className="text-sm text-slate-700 leading-relaxed">{c.behavior}</p>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                      <span className="text-[10px] font-bold text-amber-600 uppercase flex items-center mb-1">
                        <Heart className="w-3 h-3 mr-1" /> Raiz Sistêmica (Hellinger)
                      </span>
                      <p className="text-sm text-amber-900 italic">"{c.systemicRoot}"</p>
                    </div>

                    <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase flex items-center mb-1">
                        <BookOpen className="w-3 h-3 mr-1" /> Visão Clínica (Profissional)
                      </span>
                      <p className="text-xs text-indigo-900 leading-relaxed font-medium">{c.professionalInsight}</p>
                    </div>

                    <button 
                      onClick={() => onAskAI(`Análise técnica da ${c.name} unindo os trilhos biológicos e a dinâmica familiar.`)}
                      className="w-full py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-black transition-colors"
                    >
                      Consultar IA sobre este caso
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'HAMER_PSYCH' ? (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-2 rounded-xl mr-3">
                    <Microscope className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 uppercase text-xs tracking-widest">Introdução às Constelações de Hamer</h3>
                </div>
                <div className="prose prose-slate text-[13px] leading-relaxed text-slate-600 font-medium mb-6">
                  <p>
                    O Dr. Hamer descobriu que alterações comportamentais, condições psiquiátricas e mudanças de personalidade não são doenças mentais no sentido tradicional, mas sim <strong>"Constelações Esquizofrênicas"</strong>.
                  </p>
                  <p className="mt-2">
                    Uma constelação ocorre quando um indivíduo sofre dois Conflitos Biológicos (DHSs) simultâneos, afetando relés cerebrais em ambos os hemisférios do cérebro. Este estado biológico especial serve para "congelar" a pessoa em um modo de sobrevivência específico, impedindo que os conflitos se tornem letais no nível orgânico imediato.
                  </p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                    <LinkIcon className="w-3 h-3 mr-2" /> Fonte Oficial e Referência
                  </h4>
                  <a 
                    href="https://learninggnm.com/constellations/documents/constellations_intro.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] text-indigo-600 font-bold hover:underline flex items-center break-all"
                  >
                    learninggnm.com/constellations_intro.html
                  </a>
                </div>
              </div>

              {/* Exemplos de Constelações Esquizofrênicas */}
              <div className="grid grid-cols-1 gap-4">
                 <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-orange-500">
                    <h4 className="font-black text-slate-800 text-sm mb-2">Constelação Frontal</h4>
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      "Medo frontal" em ambos os hemisférios. O indivíduo sente-se constantemente em guarda, como se estivesse diante de um perigo eminente.
                    </p>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-orange-500">
                    <h4 className="font-black text-slate-800 text-sm mb-2">Constelação de Planante (Flying)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      Conflitos de susto/medo territoriais combinados. A pessoa sente-se "fora do corpo", sonhadora ou flutuando sobre a realidade.
                    </p>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-orange-500">
                    <h4 className="font-black text-slate-800 text-sm mb-2">Constelação Mitômana</h4>
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      Conflitos de território que envolvem a fala. O indivíduo fala compulsivamente ou cria narrativas para manter o controle do território emocional.
                    </p>
                 </div>
              </div>

              <button 
                onClick={() => onAskAI(`Gostaria de saber mais sobre as Constelações Esquizofrênicas do Dr. Hamer e como elas protegem o organismo.`)}
                className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-orange-700 transition-all active:scale-95"
              >
                Aprofundar com Vitalino IA
              </button>
            </div>
          ) : (
            <div className="space-y-4">
               <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 mb-4">
                  <h4 className="font-bold text-teal-900 text-sm mb-1">A Quarta Lei Biológica (Microbiologia Integrativa)</h4>
                  <p className="text-xs text-teal-700 leading-relaxed">Os micróbios são trabalhadores especializados sob as ordens do cérebro. Eles não causam doenças; eles participam da restauração biológica.</p>
               </div>
               {BIO_MICROBIOLOGY.map((m, idx) => (
                 <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h5 className="font-bold text-indigo-600 mb-2">{m.term}</h5>
                    <div className="grid grid-cols-1 gap-3">
                       <div className="border-l-2 border-slate-200 pl-3">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Para o Paciente</span>
                          <p className="text-sm text-slate-600 italic">{m.simple}</p>
                       </div>
                       <div className="border-l-2 border-teal-200 pl-3">
                          <span className="text-[10px] font-bold text-teal-400 uppercase block">Para o Profissional</span>
                          <p className="text-xs text-slate-700 font-medium">{m.pro}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConstellationResearch;
