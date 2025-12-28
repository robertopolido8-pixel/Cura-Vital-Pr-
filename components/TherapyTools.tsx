
import React, { useState, useEffect } from 'react';
import { Mic, PenTool, Sparkles, Heart, Zap, Award, User, Brain, ShieldCheck, ChevronRight, MessageSquare, Repeat, Target, RotateCcw, Volume2, Eye, Layout } from 'lucide-react';
import { DISEASES } from '../constants';

const TherapyTools: React.FC<{ initialInput?: string }> = ({ initialInput }) => {
  const [activeTab, setActiveTab] = useState<'MANTRAS' | 'PNL' | 'COMMANDS' | 'METHODS'>('METHODS');
  const [selectedDisease, setSelectedDisease] = useState(initialInput || '');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const freeDiseases = DISEASES.filter(d => !d.isPremium);

  const getMantra = (name: string) => {
    const d = freeDiseases.find(dis => dis.name.toLowerCase().includes(name.toLowerCase()));
    if (!d) return "Eu me abro para a cura e aceito a vida como ela é.";
    return d.pnl.affirmation;
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Protocolos Master</h2>
        <p className="text-slate-500 text-sm font-medium mb-8">Ativadores de Autocura e Ressignificação Biológica.</p>

        {/* Tabs Estilizadas */}
        <div className="flex space-x-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 'METHODS', label: 'Métodos', icon: Award },
            { id: 'MANTRAS', label: 'Mantras', icon: Repeat },
            { id: 'PNL', label: 'PNL & Exercícios', icon: Brain },
            { id: 'COMMANDS', label: 'Comandos Voz', icon: Mic }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl' : 'bg-slate-50 text-slate-400'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" /> {tab.label}
            </button>
          ))}
        </div>

        {/* MÉTODOS ROBERTO POLIDO */}
        {activeTab === 'METHODS' && (
          <div className="space-y-6 animate-fade-in">
             <div className="bg-indigo-900 p-8 rounded-[2rem] text-white relative overflow-hidden">
                <div className="relative z-10">
                   <h3 className="text-xl font-black mb-2">Prof. Roberto Polido</h3>
                   <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4">Criador dos Métodos MIB e DBS</p>
                   <p className="text-sm opacity-90 leading-relaxed italic">"A cura não é algo que você obtém, é algo que você libera retirando os obstáculos biológicos e sistêmicos."</p>
                </div>
                <User className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10" />
             </div>
             
             <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                   <h4 className="font-black text-xs uppercase text-indigo-600 mb-2">MIB - Investigativo Bioemocional</h4>
                   <p className="text-xs text-slate-600 leading-relaxed font-medium">Investigação profunda de trilhos de conflito e memórias celulares para desprogramar a causa primária da patologia.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                   <h4 className="font-black text-xs uppercase text-teal-600 mb-2">DBS - Desbloqueio Bioenergético</h4>
                   <p className="text-xs text-slate-600 leading-relaxed font-medium">Ajuste da frequência orgônica através da coluna vertebral e comandos de voz quânticos.</p>
                </div>
             </div>
          </div>
        )}

        {/* MANTRAS DE LIBERAÇÃO */}
        {activeTab === 'MANTRAS' && (
          <div className="space-y-6 animate-fade-in">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-slate-800 uppercase text-xs">Liberação Bio-Sistêmica</h3>
                <span className="text-[9px] bg-teal-100 text-teal-600 font-black px-2 py-1 rounded">100 Patologias</span>
             </div>
             
             <select 
               value={selectedDisease}
               onChange={(e) => setSelectedDisease(e.target.value)}
               className="w-full p-5 bg-white border border-slate-100 rounded-2xl font-bold text-sm shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10"
             >
                <option value="">Selecione para ver o Mantra...</option>
                {freeDiseases.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
             </select>

             {selectedDisease && (
               <div className="bg-indigo-50/50 p-8 rounded-[2rem] border-2 border-dashed border-indigo-200 text-center animate-fade-in">
                  <Repeat className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                  <p className="text-lg font-black italic text-indigo-900 leading-tight mb-4">
                    "{getMantra(selectedDisease)}"
                  </p>
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Repita 3x focando no órgão afetado</p>
               </div>
             )}
          </div>
        )}

        {/* PNL E EXERCÍCIOS DE RESSIGNIFICAÇÃO */}
        {activeTab === 'PNL' && (
          <div className="space-y-8 animate-fade-in">
             <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">Manual de PNL</h3>
                <p className="text-indigo-100 text-xs font-medium">Transformando programas biológicos em saúde consciente.</p>
                <Brain className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10" />
             </div>

             {/* Exercício de Ressignificação de Crenças */}
             <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                   <Target className="w-4 h-4 text-indigo-600" />
                   <h4 className="font-black text-xs uppercase text-slate-800 tracking-widest">Crenças Limitantes</h4>
                </div>
                <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                   <p className="text-[11px] text-slate-500 font-medium italic">A doença é um programa de sobrevivência ativado por uma crença de perigo. Vamos inverter o comando:</p>
                   <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Passo 1: Localizar</span>
                         <p className="text-[11px] font-bold text-slate-700">Identifique o pensamento por trás do sintoma (ex: "Eu não dou conta", "Estou em perigo").</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Passo 2: Dissociar</span>
                         <p className="text-[11px] font-bold text-slate-700">Veja essa crença como um software antigo em uma tela de cinema. Você está na poltrona, apenas observando.</p>
                      </div>
                      <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                         <span className="text-[9px] font-black text-indigo-400 uppercase block mb-1">Passo 3: Instalar</span>
                         <p className="text-[11px] font-bold text-indigo-900 leading-relaxed">Feche os olhos e afirme: "Este programa cumpriu sua função de me proteger no passado. Hoje, eu escolho a segurança no presente. Eu desinstalo esse medo agora."</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Exercício de Dessensibilização de Dor */}
             <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                   <Volume2 className="w-4 h-4 text-teal-600" />
                   <h4 className="font-black text-xs uppercase text-slate-800 tracking-widest">Controle da Dor</h4>
                </div>
                <div className="bg-teal-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                   <h5 className="font-black text-sm mb-4 flex items-center gap-2">
                      <Eye className="w-4 h-4" /> Técnica das Submodalidades
                   </h5>
                   <ul className="space-y-5">
                      <li className="flex gap-4">
                         <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center font-black text-[10px] flex-shrink-0">A</div>
                         <p className="text-[11px] font-medium leading-relaxed">Dê uma **forma, cor e textura** para a sua dor. Imagine-a como um objeto sólido fora de você.</p>
                      </li>
                      <li className="flex gap-4">
                         <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center font-black text-[10px] flex-shrink-0">B</div>
                         <p className="text-[11px] font-medium leading-relaxed">Agora, mude a cor dela para um tom suave (como azul claro) e transforme a textura em algo leve como **algodão ou fumaça**.</p>
                      </li>
                      <li className="flex gap-4">
                         <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center font-black text-[10px] flex-shrink-0">C</div>
                         <p className="text-[11px] font-medium leading-relaxed">Imagine um **botão de volume** no seu peito. Gire-o lentamente para o zero, vendo a imagem da dor se distanciar até sumir no horizonte.</p>
                      </li>
                   </ul>
                   <Zap className="absolute -left-4 -bottom-4 w-24 h-24 opacity-5" />
                </div>
             </div>
          </div>
        )}

        {/* COMANDOS DE VOZ */}
        {activeTab === 'COMMANDS' && (
          <div className="space-y-6 animate-fade-in">
             <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                   <div className="bg-red-500 p-2 rounded-xl animate-pulse"><Mic className="w-5 h-5" /></div>
                   <h3 className="font-black text-xs uppercase tracking-widest">Centro de Comando Vital</h3>
                </div>

                <div className="space-y-6">
                   <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-black text-indigo-400 uppercase mb-3">Instruções:</p>
                      <p className="text-xs leading-relaxed opacity-80">Coloque a mão sobre o órgão ou região em desequilíbrio, feche os olhos e diga em voz alta com autoridade:</p>
                   </div>

                   <div className="p-6 bg-indigo-600 rounded-3xl shadow-inner border border-white/10">
                      <p className="text-base font-black italic leading-tight text-white mb-6">
                        "Eu ordeno a este [Diga o nome do órgão ou região] que retorne ao seu status inicial de perfeição biológica. Reconheço o programa de sobrevivência, mas agora está tudo resolvido e passado a limpo."
                      </p>
                      <p className="text-base font-black italic leading-tight text-white">
                        "Minha mente está livre para desprogramar toda crença limitante e encerrar este programa biológico. Eu escolho a vida plenamente agora."
                      </p>
                   </div>
                </div>

                <button 
                   onClick={() => {
                      setFeedbackMsg("Comando Integrado no Campo Morfogenético.");
                      setTimeout(() => setFeedbackMsg(''), 3000);
                   }}
                   className="w-full mt-6 py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
                >
                   Confirmar Ativação
                </button>
                {feedbackMsg && <p className="text-center text-[10px] font-black text-teal-400 mt-3 animate-bounce">{feedbackMsg}</p>}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapyTools;
