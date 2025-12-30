
import React, { useState, useMemo } from 'react';
import { Search, Crown, ChevronRight, Home, Book, Magnet, Brain, Sparkles, BrainCircuit, ShieldCheck, Star, ListOrdered, CreditCard, QrCode, FileText, CheckCircle2, AlertTriangle, PartyPopper } from 'lucide-react';
import { ViewState, Disease } from './types';
import { DISEASES, NAV_ITEMS } from './constants';
import AIAssistant from './components/AIAssistant';
import DiseaseDetail from './components/DiseaseDetail';
import BiomagIndex from './components/BiomagIndex';
import TherapyTools from './components/TherapyTools';
import ConstellationResearch from './components/ConstellationResearch';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [aiContext, setAiContext] = useState<string | undefined>(undefined);
  
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'PIX' | 'BOLETO'>('CARD');
  const [checkoutData, setCheckoutData] = useState({ fullName: '', email: '', cpf: '', phone: '' });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const freeDiseases = useMemo(() => {
    return DISEASES.filter(d => !d.isPremium).slice(0, 100);
  }, []);

  const specialDiseases = useMemo(() => {
    return DISEASES.filter(d => d.isPremium);
  }, []);

  const filteredCatalog = useMemo(() => {
    const list = view === 'SPECIAL_PATHOLOGIES' ? specialDiseases : freeDiseases;
    return list.filter(d => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, view, freeDiseases, specialDiseases]);

  const openDisease = (disease: Disease) => {
    setSelectedDisease(disease);
    setView('DISEASE_DETAIL');
    window.scrollTo(0, 0);
  };

  const askAI = (query: string) => {
    setAiContext(query);
    setView('AI_THERAPIST');
  };

  const navigateTo = (newView: ViewState | string) => {
    setView(newView as ViewState);
    window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
    if (!checkoutData.fullName || !checkoutData.email) {
      alert("Por favor, preencha seu nome completo e e-mail.");
      return;
    }
    if (!agreedToTerms) {
      alert("Você deve ler e aceitar os termos de responsabilidade médica.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsPremium(true);
      setIsProcessing(false);
      setShowSuccessScreen(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-28">
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-100 p-6 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('HOME')}>
          <div className="bg-slate-900 p-2.5 rounded-2xl text-white shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase">Cura Vital <span className="text-indigo-600">Pró</span></h1>
        </div>
        <div className="flex items-center gap-2">
          {isPremium && (
            <div className="bg-indigo-600/10 text-indigo-600 px-3 py-1.5 rounded-xl flex items-center gap-2 border border-indigo-200">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Master</span>
            </div>
          )}
          <button onClick={() => navigateTo('PREMIUM')} className={`p-2.5 rounded-2xl transition-all ${isPremium ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
             <Crown className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-6">
        {view === 'HOME' && (
          <div className="space-y-8 animate-fade-in">
             <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                   <h2 className="text-4xl font-black mb-4 leading-none tracking-tight uppercase">Dashboard <br/><span className="text-indigo-400">Terapêutico</span></h2>
                   <p className="text-slate-400 text-sm font-medium mb-8 max-w-[240px]">Ciência biológica para cura consciente.</p>
                   <div className="flex gap-3">
                     <button onClick={() => navigateTo('CATALOG')} className="bg-white text-slate-900 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Catálogo</button>
                     <button onClick={() => navigateTo('SPECIAL_PATHOLOGIES')} className="bg-amber-500 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2">
                         <Crown className="w-4 h-4" /> Arquivo Pró
                     </button>
                   </div>
                </div>
                <Brain className="absolute -right-12 -bottom-12 w-64 h-64 opacity-5 rotate-12" />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <button onClick={() => navigateTo('CATALOG')} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm text-left group">
                   <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                      <ListOrdered className="w-6 h-6 text-indigo-600" />
                   </div>
                   <h3 className="font-black text-xs uppercase tracking-widest text-slate-800">100 Patologias</h3>
                   <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Série Grátis</p>
                </button>
                <button onClick={() => navigateTo('AI_THERAPIST')} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm text-left group">
                   <div className="bg-teal-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                      <BrainCircuit className="w-6 h-6 text-teal-600" />
                   </div>
                   <h3 className="font-black text-xs uppercase tracking-widest text-slate-800">Vitalino IA</h3>
                   <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Análise Sistêmica</p>
                </button>
             </div>
          </div>
        )}

        {view === 'TOOLS' && <TherapyTools initialInput={aiContext} />}

        {view === 'CATALOG' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
               <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Catálogo 100 A-Z</h2>
               <button onClick={() => navigateTo('HOME')} className="text-[10px] font-black text-slate-400 uppercase hover:text-indigo-600">Voltar</button>
            </div>
            <div className="relative group">
              <Search className="absolute left-5 top-5 w-5 h-5 text-slate-300" />
              <input 
                type="text" 
                placeholder="Pesquisar no catálogo gratuito..."
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm focus:outline-none font-bold text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-3">
              {filteredCatalog.map((disease, index) => (
                <button key={disease.id} onClick={() => openDisease(disease)} className="bg-white p-6 rounded-[2.2rem] border border-slate-50 flex items-center justify-between shadow-sm active:scale-95">
                  <div className="flex items-center gap-4 text-left">
                    <div className="bg-slate-900 text-white w-8 h-8 rounded-xl flex items-center justify-center font-black text-[10px]">{index + 1}</div>
                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-tight">{disease.name}</h4>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'SPECIAL_PATHOLOGIES' && (
          <ConstellationResearch 
            isPremium={isPremium} 
            onUpgrade={() => navigateTo('PREMIUM')} 
            onAskAI={askAI}
            onOpenDisease={openDisease}
          />
        )}

        {view === 'BIOMAG_INDEX' && (
          <BiomagIndex isPremium={isPremium} onUpgrade={() => navigateTo('PREMIUM')} />
        )}

        {view === 'DISEASE_DETAIL' && selectedDisease && (
          <DiseaseDetail 
            disease={selectedDisease} 
            onBack={() => setView(selectedDisease.isPremium ? 'SPECIAL_PATHOLOGIES' : 'CATALOG')} 
            onAskAI={askAI}
            onExploreTherapies={(name) => {
              setAiContext(name);
              navigateTo('TOOLS');
            }}
            onNavigateToPremium={() => navigateTo('PREMIUM')}
            isPremium={isPremium}
          />
        )}

        {view === 'AI_THERAPIST' && (
          <AIAssistant initialQuery={aiContext} onNavigate={navigateTo} isPremium={isPremium} />
        )}

        {view === 'PREMIUM' && (
          <div className="space-y-6 animate-fade-in text-center py-4">
             {showSuccessScreen ? (
               <div className="bg-white border border-slate-100 p-12 rounded-[3rem] shadow-xl animate-fade-in">
                  <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <PartyPopper className="w-12 h-12 text-teal-600" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Bem-vindo, {checkoutData.fullName.split(' ')[0]}!</h2>
                  <div className="bg-slate-50 p-8 rounded-[2rem] mb-8 border border-slate-100">
                    <p className="text-lg font-black text-slate-800 leading-tight italic">
                      "Seja muito bem-vindo à nova era da sua prática terapêutica. Que os caminhos de consciência aqui revelados tragam cura profunda e sucesso extraordinário em sua jornada!"
                    </p>
                  </div>
                  <button 
                    onClick={() => { setShowSuccessScreen(false); navigateTo('HOME'); }} 
                    className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all"
                  >
                    Começar Exploração Master
                  </button>
               </div>
             ) : isPremium ? (
               <div className="bg-white border border-slate-100 p-12 rounded-[3rem] shadow-xl">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">Licença Master Ativa</h2>
                  <p className="text-slate-500 font-medium mb-8">Acesso vitalício liberado para {checkoutData.fullName || 'Usuário'}.</p>
                  <button onClick={() => navigateTo('HOME')} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg">Ir para o Dashboard</button>
               </div>
             ) : (
               <div className="space-y-8 pb-12">
                 <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border border-white/10">
                    <Crown className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                    <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase">Licença Master</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Acesso Especial, Biomagnetismo & IA Expert</p>
                    <div className="space-y-4 text-left">
                       <input 
                         type="text" 
                         placeholder="Nome Completo"
                         className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold focus:bg-white/10 outline-none text-white placeholder:text-slate-500"
                         value={checkoutData.fullName}
                         onChange={e => setCheckoutData({...checkoutData, fullName: e.target.value})}
                       />
                       <input 
                         type="email" 
                         placeholder="E-mail"
                         className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold focus:bg-white/10 outline-none text-white placeholder:text-slate-500"
                         value={checkoutData.email}
                         onChange={e => setCheckoutData({...checkoutData, email: e.target.value})}
                       />
                       <div className="grid grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            placeholder="CPF"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold focus:bg-white/10 outline-none text-white placeholder:text-slate-500"
                            value={checkoutData.cpf}
                            onChange={e => setCheckoutData({...checkoutData, cpf: e.target.value})}
                          />
                          <input 
                            type="tel" 
                            placeholder="Telefone"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold focus:bg-white/10 outline-none text-white placeholder:text-slate-500"
                            value={checkoutData.phone}
                            onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})}
                          />
                       </div>
                    </div>
                 </div>

                 <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                    <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 text-left">
                       <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600" />
                          <h4 className="font-black text-[10px] uppercase tracking-widest text-amber-800">Responsabilidade Médica & Uso</h4>
                       </div>
                       <div className="space-y-3 text-[10px] text-amber-900 font-medium leading-relaxed">
                          <p>• O Cura Vital Pró é uma <strong>ferramenta informativa e educacional</strong> auxiliar.</p>
                          <p>• <strong>NÃO SUBSTITUI</strong> diagnósticos ou tratamentos convencionais.</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4 text-left group cursor-pointer" onClick={() => setAgreedToTerms(!agreedToTerms)}>
                       <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all flex-shrink-0 mt-1 ${agreedToTerms ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200'}`}>
                          {agreedToTerms && <CheckCircle2 className="w-5 h-5 text-white" />}
                       </div>
                       <p className="text-[11px] text-slate-600 font-bold leading-tight">
                          Confirmo que li os termos e assumo total responsabilidade.
                       </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                       <button onClick={() => setPaymentMethod('CARD')} className={`p-4 rounded-2xl border transition-all ${paymentMethod === 'CARD' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                          <CreditCard className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-[9px] font-black uppercase">Cartão</span>
                       </button>
                       <button onClick={() => setPaymentMethod('PIX')} className={`p-4 rounded-2xl border transition-all ${paymentMethod === 'PIX' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                          <QrCode className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-[9px] font-black uppercase">PIX</span>
                       </button>
                       <button onClick={() => setPaymentMethod('BOLETO')} className={`p-4 rounded-2xl border transition-all ${paymentMethod === 'BOLETO' ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                          <FileText className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-[9px] font-black uppercase">Boleto</span>
                       </button>
                    </div>

                    <button 
                      onClick={handleCheckout}
                      disabled={isProcessing || !agreedToTerms}
                      className={`w-full py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl transition-all ${
                        !agreedToTerms ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-indigo-600 text-white active:scale-95'
                      }`}
                    >
                      {isProcessing ? 'Processando...' : 'Ativar Licença Master - R$ 9,90'}
                    </button>
                 </div>
               </div>
             )}
          </div>
        )}
      </main>

      <nav className="fixed bottom-8 left-8 right-8 bg-slate-900 rounded-[2.5rem] p-3 flex justify-between items-center shadow-2xl z-50 border border-white/10 backdrop-blur-md">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            className={`flex-1 flex flex-col items-center py-2 transition-all gap-1.5 ${view === item.id ? 'text-indigo-400' : 'text-slate-500'}`}
          >
            {item.icon === 'Home' && <Home className="w-5 h-5" />}
            {item.icon === 'Book' && <Book className="w-5 h-5" />}
            {item.icon === 'Sparkles' && <Star className="w-5 h-5" />}
            {item.icon === 'Magnet' && <Magnet className="w-5 h-5" />}
            {item.icon === 'Crown' && <Crown className="w-5 h-5" />}
            <span className="text-[7px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
