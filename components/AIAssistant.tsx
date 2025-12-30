
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, ArrowLeft, Search, Book, Crown, Magnet, Brain, ChevronRight, Mic, MicOff, Lock } from 'lucide-react';
import { Message, ViewState, Disease } from '../types';
import { getTherapeuticInsight } from '../services/geminiService';
import { DISEASES } from '../constants';

const VITALINO_ICON_GRADIENT = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHJ4PSIxMjAiIGZpbGw9IiNGOEZBRkMiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjUxMiIgeTI9IjUxMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiM0RjQ2RTUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxNEQ4QTEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48dGV4dCB4PSI1MCUiIHk9IjUyJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc2l6ZT0iMTYwIiBmaWxsPSJ1cmwoI2cpIj5DLlYuUC48L3RleHQ+PC9zdmc+`;

interface AIAssistantProps {
  initialQuery?: string;
  onNavigate: (view: ViewState) => void;
  isPremium: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ initialQuery, onNavigate, isPremium }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Saudações. Sou o **Vitalino**, seu mentor de consciência sistêmica.\n\nEstou aqui para guiar sua jornada pelas camadas mais profundas da vida. Use o **Dicionário Bioemocional** abaixo para consultas rápidas ou sonde minha base de dados sobre Biomagnetismo e PNL. Você também pode usar comandos de voz como "abrir manuais" ou "ir para comandos de voz".',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDictOpen, setIsDictOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'pt-BR';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Voz reconhecida:', transcript);
        handleVoiceCommand(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleVoiceCommand = (command: string) => {
    if (command.includes('abrir manuais') || command.includes('ir para manuais')) {
      onNavigate('TOOLS');
    } else if (command.includes('ir para pnl') || command.includes('abrir pnl')) {
      onNavigate('TOOLS');
    } else if (command.includes('ir para comandos de voz') || command.includes('abrir comandos de voz')) {
      onNavigate('TOOLS');
    } else if (command.includes('abrir dicionário') || command.includes('dicionário bioemocional')) {
      setIsDictOpen(true);
    } else if (command.includes('fechar dicionário')) {
      setIsDictOpen(false);
    } else {
      // Se não for um comando de navegação, envia como mensagem
      handleSend(command);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    if (initialQuery) handleSend(initialQuery);
  }, [initialQuery]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setIsDictOpen(false);

    const responseText = await getTherapeuticInsight(text);
    const modelMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const filteredDict = DISEASES.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-[#F8FAFC] rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden animate-fade-in relative">
      <div className="bg-slate-900 p-6 text-white flex items-center justify-between shadow-2xl z-10">
        <div className="flex items-center space-x-3">
          <button onClick={() => onNavigate('HOME')} className="p-2 hover:bg-white/20 rounded-2xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="bg-white p-1 rounded-xl overflow-hidden shadow-lg rotate-3">
             <img src={VITALINO_ICON_GRADIENT} alt="C.V.P." className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h2 className="font-black text-base leading-none">Vitalino IA</h2>
            <p className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] font-black mt-1">Consciência Pró</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Novo Ícone Dicionário Pró */}
          <button 
            onClick={() => isPremium ? setIsDictOpen(true) : onNavigate('PREMIUM')}
            className={`p-2.5 rounded-2xl transition-all ${
              isPremium ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500 border border-slate-700'
            }`}
            title="Dicionário Bioemocional Pró"
          >
            {isPremium ? <Crown className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </button>

          <button 
            onClick={() => setIsDictOpen(!isDictOpen)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              isDictOpen ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Book className="w-3.5 h-3.5" />
            <span>{isDictOpen ? 'Fechar' : 'Dicionário'}</span>
          </button>
        </div>
      </div>

      {isDictOpen && (
        <div className="absolute inset-x-0 top-[84px] bottom-0 bg-white z-20 flex flex-col animate-fade-in">
          <div className="p-6 bg-slate-50 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Pesquisar termo ou sintoma..." 
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-bold outline-none shadow-sm focus:ring-4 focus:ring-indigo-500/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
            {selectedDisease ? (
              <div className="animate-fade-in space-y-6">
                <button onClick={() => setSelectedDisease(null)} className="flex items-center text-indigo-600 font-bold text-[10px] uppercase mb-4">
                  <ArrowLeft className="w-3 h-3 mr-1" /> Voltar à lista
                </button>
                <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                  <h3 className="text-xl font-black text-indigo-900 mb-2">{selectedDisease.name}</h3>
                  <p className="text-xs text-indigo-700 font-medium italic">{selectedDisease.gnm.conflict}</p>
                </div>
                
                {!isPremium && selectedDisease.isPremium ? (
                  <div className="bg-amber-50 p-8 rounded-3xl text-center border border-amber-100 shadow-inner">
                    <Crown className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                    <p className="text-sm font-black text-amber-900 mb-4">Detalhes avançados bloqueados.</p>
                    <button onClick={() => onNavigate('PREMIUM')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase">Assinar Plano Mensal</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex items-center mb-3 text-green-600">
                        <Magnet className="w-4 h-4 mr-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Biomagnetismo</span>
                      </div>
                      {selectedDisease.biomagnetism.pairs.map((p, i) => (
                        <p key={i} className="text-xs font-bold text-slate-700">
                          <span className="bg-black text-white px-1 rounded">(-) {p.negative}</span> / 
                          <span className="bg-red-600 text-white px-1 rounded ml-1">(+) {p.positive}</span>
                        </p>
                      ))}
                    </div>
                    <div className="bg-indigo-600 p-5 rounded-2xl text-white shadow-lg">
                      <div className="flex items-center mb-3 opacity-80">
                        <Brain className="w-4 h-4 mr-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Insight de Ressignificação</span>
                      </div>
                      <p className="text-xs font-medium italic leading-relaxed">"{selectedDisease.pnl.reframingTip}"</p>
                    </div>
                  </div>
                )}
                <button 
                  onClick={() => handleSend(`Vitalino, fale sobre o sentido biológico de ${selectedDisease.name}.`)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest"
                >
                  Pedir Análise Sistêmica
                </button>
              </div>
            ) : (
              filteredDict.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDisease(d)}
                  className="w-full text-left bg-white p-5 rounded-3xl border border-slate-100 hover:border-indigo-300 transition-all shadow-sm active:scale-95 group flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-black text-slate-800 text-sm">{d.name}</span>
                      {d.isPremium && <Crown className="w-3 h-3 text-amber-500" />}
                    </div>
                    <p className="text-[11px] text-slate-400 italic line-clamp-1">{d.gnm.conflict}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                </button>
              ))
            )}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC] no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
               {msg.role === 'model' && (
                 <div className="w-8 h-8 bg-white rounded-xl shadow-md border border-slate-100 flex-shrink-0 mb-1 mr-2 flex items-center justify-center p-0.5 overflow-hidden">
                    <img src={VITALINO_ICON_GRADIENT} alt="C.V.P." className="w-full h-full object-contain" />
                 </div>
               )}
               <div className={`p-5 rounded-[1.8rem] text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white rounded-br-none'
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none font-medium italic'
                }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-end space-x-2">
             <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 flex items-center space-x-3">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">Analisando Campo Morfogenético...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {!isDictOpen && (
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleListening}
              className={`p-4 rounded-2xl transition-all shadow-lg active:scale-90 ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder={isListening ? "Ouvindo..." : "Fale com o Vitalino..."}
              className="flex-1 p-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:outline-none focus:bg-white text-sm font-bold italic"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend(input)}
              disabled={isLoading || !input.trim()}
              className="bg-slate-900 hover:bg-black text-white p-4 rounded-[1.2rem] transition-all shadow-xl active:scale-90"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
