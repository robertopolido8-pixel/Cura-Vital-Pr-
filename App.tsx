
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Crown, Lock, ChevronRight, Home, Book, Magnet, Brain, Sparkles, BrainCircuit, UserCheck, ShieldCheck, Star, ListOrdered, Heart, Info, PenTool, AlertCircle, MessageSquareShare, CreditCard, QrCode, FileText, User, Mail, Phone, CheckCircle2, Share2, Smartphone, MessageCircle, Link as LinkIcon, Copy, ExternalLink } from 'lucide-react';
import { ViewState, Disease } from './types';
import { DISEASES, NAV_ITEMS } from './constants';
import AIAssistant from './components/AIAssistant';
import DiseaseDetail from './components/DiseaseDetail';
import BiomagIndex from './components/BiomagIndex';
import TherapyTools from './components/TherapyTools';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [searchTerm, setSearchTerm] = useState('');
  const [homeDictSearch, setHomeDictSearch] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [aiContext, setAiContext] = useState<string | undefined>(undefined);
  
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'PIX' | 'BOLETO'>('CARD');
  const [checkoutData, setCheckoutData] = useState({ email: '', cpf: '', phone: '' });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  // Detecta a URL real. Se for ambiente de desenvolvimento do Google, avisa o usuário.
  const currentUrl = useMemo(() => {
    const origin = window.location.origin;
    if (origin.includes('usercontent.goog') || origin.includes('localhost')) {
      return "LINK_PENDENTE_DEPLOY"; 
    }
    return origin;
  }, []);

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

  const filteredHomeDict = useMemo(() => {
    return freeDiseases.filter(d => 
      d.name.toLowerCase().includes(homeDictSearch.toLowerCase()) ||
      d.emotionalBlock?.toLowerCase().includes(homeDictSearch.toLowerCase())
    );
  }, [homeDictSearch, freeDiseases]);

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

  const handleCopyLink = () => {
    if (currentUrl === "LINK_PENDENTE_DEPLOY") {
      alert("⚠️ Você está em modo de edição. O link oficial será gerado após você seguir o passo a passo da Vercel.");
      return;
    }
    navigator.clipboard.writeText(currentUrl);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleShare = (platform: 'WA' | 'TG' | 'GENERIC') => {
    if (currentUrl === "LINK_PENDENTE_DEPLOY") {
      alert("⚠️ Siga o passo a passo para hospedar o site antes de compartilhar.");
      return;
    }
    const text = "Acesse o Cura Vital Pró: Guia Master de Saúde Integrativa.";
    const url = currentUrl;
    
    if (platform === 'WA') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, '_blank');
    } else if (platform === 'TG') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleCheckout = () => {
    if (!agreedToTerms) {
      alert("Você precisa concordar com os termos de uso para prosseguir.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsPremium(true);
      setIsProcessing(false);
      navigateTo('HOME');
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
                     <button onClick={() => navigateTo('PREMIUM')} className="bg-amber-500 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2">
                         <Crown className="w-4 h-4" /> Plano Pró
                     </button>
                   </div>
                </div>
                <Brain className="absolute -right-12 -bottom-12 w-64 h-64 opacity-5 rotate-12" />
             </div>

             {/* Link & Compartilhamento Centralizado */}
             <div className="bg-white p-8 rounded-[3rem] border-2 border-indigo-50 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="bg-indigo-50 p-2.5 rounded-xl"><LinkIcon className="w-5 h-5 text-indigo-600" /></div>
                      <h3 className="font-black text-xs uppercase tracking-widest text-slate-800">Seu Link Permanente</h3>
                   </div>
                   <button onClick={handleCopyLink} className="text-indigo-600 flex items-center gap-1.5 font-black text-[10px] uppercase">
                      {copyStatus ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copyStatus ? 'Copiado!' : 'Copiar'}
                   </button>
                </div>

                <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-3 overflow-hidden">
                   <code className="text-[11px] font-black text-indigo-400 truncate tracking-tight">
                     {currentUrl === "LINK_PENDENTE_DEPLOY" ? "Aguardando Hospedagem Vercel..." : currentUrl}
                   </code>
                </div>

                <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
                   <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-[9px] font-black text-amber-800 uppercase">Atenção Leigo:</span>
                   </div>
                   <p className="text-[10px] text-amber-900 leading-relaxed font-medium">
                      O link que você está vendo no navegador <strong>NÃO</strong> deve ser colado na Vercel. Você deve <strong>baixar os arquivos</strong> e arrastá-los para dentro do site da Vercel.
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <button onClick={() => handleShare('WA')} className="flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-transform">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                   </button>
                   <button onClick={() => handleShare('TG')} className="flex items-center justify-center gap-3 py-4 bg-[#0088CC] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-transform">
                      <ExternalLink className="w-4 h-4" /> Telegram
                   </button>
                </div>
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

        {(view === 'CATALOG' || view === 'SPECIAL_PATHOLOGIES') && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
               <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                 {view === 'CATALOG' ? 'Catálogo 1-100' : 'Especiais Pró'}
               </h2>
               <button onClick={() => navigateTo('HOME')} className="text-[10px] font-black text-slate-400 uppercase hover:text-indigo-600">Voltar</button>
            </div>
            <div className="relative group">
              <Search className="absolute left-5 top-5 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Pesquisar termo..."
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm focus:outline-none font-bold text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-3">
              {filteredCatalog.map((disease, index) => (
                <button key={disease.id} onClick={() => openDisease(disease)} className="bg-white p-6 rounded-[2.2rem] border border-slate-50 flex items-center justify-between shadow-sm active:scale-95">
                  <div className="flex items-center gap-4 text-left">
                    {view === 'CATALOG' && <div className="bg-slate-900 text-white w-8 h-8 rounded-xl flex items-center justify-center font-black text-[10px]">{index + 1}</div>}
                    <h4 className="font-black text-slate-800">{disease.name}</h4>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'BIOMAG_INDEX' && (
          <BiomagIndex isPremium={isPremium} onUpgrade={() => navigateTo('PREMIUM')} />
        )}

        {view === 'DISEASE_DETAIL' && selectedDisease && (
          <DiseaseDetail 
            disease={selectedDisease} 
            onBack={() => setView('HOME')} 
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
             {isPremium ? (
               <div className="bg-white border border-slate-100 p-12 rounded-[3rem] shadow-xl">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">Licença Master Ativa</h2>
                  <p className="text-slate-500 font-medium mb-8">Acesso vitalício liberado.</p>
                  <button onClick={() => navigateTo('HOME')} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg">Ir para o Dashboard</button>
               </div>
             ) : (
               <div className="space-y-8 pb-12">
                 <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border border-white/10">
                    <Crown className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                    <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase">Licença Master</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Desbloqueio Total</p>
                    
                    <div className="space-y-4 text-left">
                       <input 
                         type="email" 
                         placeholder="E-mail de Acesso"
                         className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold focus:bg-white/10 outline-none"
                         value={checkoutData.email}
                         onChange={e => setCheckoutData({...checkoutData, email: e.target.value})}
                       />
                       <div className="grid grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            placeholder="CPF"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold focus:bg-white/10 outline-none"
                            value={checkoutData.cpf}
                            onChange={e => setCheckoutData({...checkoutData, cpf: e.target.value})}
                          />
                          <input 
                            type="tel" 
                            placeholder="Telefone"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold focus:bg-white/10 outline-none"
                            value={checkoutData.phone}
                            onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})}
                          />
                       </div>
                    </div>
                 </div>

                 <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
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

                    <div className="flex items-start gap-3 text-left group cursor-pointer" onClick={() => setAgreedToTerms(!agreedToTerms)}>
                       <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${agreedToTerms ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200'}`}>
                          {agreedToTerms && <CheckCircle2 className="w-4 h-4 text-white" />}
                       </div>
                       <p className="text-[10px] text-slate-500 font-bold leading-tight">
                          Aceito os termos de responsabilidade.
                       </p>
                    </div>

                    <button 
                      onClick={handleCheckout}
                      disabled={isProcessing || !agreedToTerms}
                      className={`w-full py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl transition-all ${
                        !agreedToTerms ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-indigo-600 text-white active:scale-95'
                      }`}
                    >
                      {isProcessing ? 'Processando...' : 'Finalizar - R$ 0,10'}
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
