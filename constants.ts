
import { Disease, EmbryonicLayer, Constellation, BioPair } from './types';

export const PREMIUM_TOPICS = ['lupus', 'alzheimer', 'psoríase', 'câncer', 'depressão', 'autismo', 'parkinson', 'esclerose', 'esclerodermia', 'fibromialgia', 'fenômeno tumoral'];

const generateExtendedPairs = (): BioPair[] => {
  const pairs: BioPair[] = [
    { id: 'bp-001', negative: 'Pineal', positive: 'Pineal', category: 'ESPECIAL', pathogen: 'Disfunção Glandular', description: 'Atua sobre o sono, melatonina e estados depressivos. Indução de ondas Alpha.', isPremium: false },
    { id: 'bp-002', negative: 'Parietal', positive: 'Rim Contra-lateral', category: 'ESPECIAL', pathogen: 'Goiz', description: 'Par de equilíbrio de pH e regulação de fluidos. Harmoniza a pressão osmótica celular.', isPremium: false },
    { id: 'bp-003', negative: 'Timo', positive: 'Reto', category: 'PATOGENICO', pathogen: 'HIV (Falso Positivo)', description: 'Atua no sistema imunológico e regulação de linfócitos T.', isPremium: true },
    { id: 'bp-f1', negative: 'Mandíbula', positive: 'Mandíbula', category: 'PATOGENICO', relatedDisease: 'Acne Juvenil', pathogen: 'Neisseria Gonorrhoeae', description: 'Desbloqueio de toxinas dérmicas. Atua na autoestima facial.', isPremium: false },
    { id: 'bp-f9', negative: 'Vagina', positive: 'Vagina', category: 'PATOGENICO', relatedDisease: 'Candidíase', pathogen: 'Candida Albicans', description: 'Regulação do microbioma pélvico. Harmoniza a energia do sagrado feminino.', isPremium: false },
  ];
  return pairs;
};

export const BIO_PAIRS: BioPair[] = generateExtendedPairs();

const RAW_FREE_DISEASES: Disease[] = [
  {
    id: 'f-001', name: 'Acne Juvenil', category: 'Doença', region: 'SKIN', isPremium: false,
    description: 'Manifestação inflamatória da derme associada à puberdade.',
    emotionalBlock: 'Conflito de "ataque à integridade": sentir-se sujo, desvalorizado ou rejeitado pelo olhar do outro.',
    metaphysics: 'Dificuldade em aceitar a própria imagem e a transição para a maturidade. Medo da própria sexualidade e brilho pessoal.',
    reichFrechet: 'Reich: Couraça dérmica por expressão de impulsos. Fréchet: Inconsciente querendo se tornar "feio" para evitar olhares perigosos.',
    gnm: { 
      conflict: 'Ataque à integridade estética ou física (sujeira real ou figurada).', 
      tissue: { 
        layer: EmbryonicLayer.OLD_MESODERM, 
        activePhase: 'Proliferação celular (engrossamento da glândula sebácea) para proteção.', 
        healingPhaseA: 'Inflamação purulenta por ação de bactérias para decompor o excesso de tecido.', 
        healingPhaseB: 'Cicatriz e retorno à elasticidade.', 
        crisis: 'Pico febril local e coceira intensa.', 
        biologicalSense: 'Reforçar a proteção da pele contra ataques externos.' 
      } 
    },
    biomagnetism: { pairs: [{ negative: 'Mandíbula', positive: 'Mandíbula', description: 'Ajuste de pH da derme facial.' }] },
    pnl: { affirmation: 'Eu irradio beleza e minha luz interior brilha através da minha pele.', reframingTip: 'Visualize cada poro respirando luz e liberando julgamentos.' }
  },
  {
    id: 'f-002', name: 'Ansiedade', category: 'Pscicoemocional', region: 'SYSTEMIC', isPremium: false,
    description: 'Hipervigilância do sistema nervoso central diante de ameaças antecipadas.',
    emotionalBlock: 'Medo visceral de perder o controle ou de ser excluído do clã protetor.',
    metaphysics: 'Desconexão com o momento presente. Tentativa vã de controlar o oceano da vida com as mãos.',
    reichFrechet: 'Reich: Bloqueio do diafragma (angústia). Fréchet: Insegurança gerada por pais que viviam em modo sobrevivência.',
    gnm: { 
      conflict: 'Susto ou medo territorial; ameaça que não se sabe de onde vem.', 
      tissue: { 
        layer: EmbryonicLayer.ECTODERM, 
        activePhase: 'Alerta simpaticotônico extremo. Dilatação brônquica para lutar ou fugir.', 
        healingPhaseA: 'Fadiga adrenal e necessidade de recolhimento.', 
        healingPhaseB: 'Reequilíbrio vagotônico.', 
        crisis: 'Crise de pânico ou taquicardia súbita.', 
        biologicalSense: 'Estar 100% pronto para um ataque iminente.' 
      } 
    },
    biomagnetism: { pairs: [{ negative: 'Amígdala Cerebral', positive: 'Rim', description: 'Equilíbrio do eixo do medo e secreção de cortisol.' }] },
    pnl: { affirmation: 'Estou seguro aqui e agora. O universo conspira ao meu favor.', reframingTip: 'Troque o "E se?" por "Eu posso lidar com o que vier".' }
  },
  {
    id: 'f-010', name: 'Candidíase', category: 'Doença', region: 'PELVIS', isPremium: false,
    description: 'Superpopulação de leveduras fúngicas no ambiente vaginal ou oral.',
    emotionalBlock: 'Frustração profunda em relação à intimidade ou sensação de ser "usado" emocionalmente.',
    metaphysics: 'Dificuldade em impor limites claros. Permissividade excessiva que gera raiva oculta.',
    reichFrechet: 'Reich: Couraça pélvica rígida. Fréchet: Herança de abusos ou desrespeito ao feminino na linhagem.',
    gnm: { 
      conflict: 'Conflito de "separação suja" ou "frustração sexual".', 
      tissue: { 
        layer: EmbryonicLayer.ENDODERM, 
        activePhase: 'Proliferação das células da mucosa para secretar mais muco protetor.', 
        healingPhaseA: 'Ação dos fungos (Candida) para decompor as células extras em excesso.', 
        healingPhaseB: 'Retorno ao pH ácido protetor.', 
        crisis: 'Prurido e ardor intenso.', 
        biologicalSense: 'Limpar e proteger o canal sagrado de invasões indesejadas.' 
      } 
    },
    biomagnetism: { pairs: [{ negative: 'Vagina', positive: 'Vagina', description: 'Combate a acidez excessiva que favorece fungos.' }] },
    pnl: { affirmation: 'Meu corpo é meu templo sagrado e eu defino meus limites com amor.', reframingTip: 'Aprenda a dizer Não para situações que ferem sua dignidade.' }
  }
];

const generateAlphabeticalFreeList = () => {
  const list = [...RAW_FREE_DISEASES];
  const placeholderNames = [
    "Cálculo Renal", "Catarata", "Cefaleia", "Cirrose", "Cistite", "Diabetes", "Gastrite", "Gripe", "Hepatite", "Insônia", "Labirintite", "Obesidade", "Rinite", "Sinusite"
  ];

  placeholderNames.forEach((name, i) => {
    if (list.length < 100 && !list.find(d => d.name === name)) {
      list.push({
        id: `f-gen-${i}`, name: name, category: 'Doença', region: 'SYSTEMIC', isPremium: false,
        description: `Visão bio-integrativa sobre ${name}.`,
        emotionalBlock: 'Conflito de território e desvalorização sistêmica.',
        metaphysics: 'Desequilíbrio entre o dar e o receber. Rigidez mental perante a vida.',
        reichFrechet: 'Bloqueios energéticos profundos disponíveis no módulo Master.',
        gnm: { conflict: 'Conflito biológico padrão de sobrevivência.', tissue: { layer: EmbryonicLayer.ENDODERM, activePhase: 'Alerta', healingPhaseA: 'Reparo', healingPhaseB: 'Cura', crisis: 'Pico', biologicalSense: 'Garantir a vida.' } },
        biomagnetism: { pairs: [{ negative: 'Ponto Bio', positive: 'Ponto Mag', description: 'Equilíbrio de polaridade.' }] },
        pnl: { affirmation: 'Eu fluo com a vida.', reframingTip: 'Solte o controle.' }
      });
    }
  });
  return list.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 100);
};

export const SPECIAL_DISEASES: Disease[] = [
  {
    id: 'p-001', name: 'Alzheimer', category: 'Especial', region: 'HEAD', isPremium: true,
    description: 'Processo degenerativo de desconexão cognitiva.',
    emotionalBlock: 'Desejo profundo de retirar-se de uma realidade insuportável ou dolorosa.',
    metaphysics: 'A alma escolhe "partir antes do corpo" para não mais processar mágoas do clã.',
    reichFrechet: 'Reich: Colapso da percepção. Fréchet: Segredos familiares que devem ser esquecidos.',
    gnm: { 
      conflict: 'Múltiplos conflitos de separação em constelação cerebral.', 
      tissue: { 
        layer: EmbryonicLayer.ECTODERM, 
        activePhase: 'Ulceração progressiva da substância cinzenta (perda de memória).', 
        healingPhaseA: 'Edema cerebral severo.', 
        healingPhaseB: 'Platô cognitivo.', 
        crisis: 'Confusão mental aguda.', 
        biologicalSense: 'Esquecer o perigo para não sofrer mais o choque.' 
      } 
    },
    biomagnetism: { pairs: [{ negative: 'Calcanhar', positive: 'Calcanhar', description: 'Apoio à regeneração neural.' }] },
    pnl: { affirmation: 'Eu aceito minha história e encontro paz no meu silêncio interior.', reframingTip: 'O amor é a única linguagem que não precisa de memória.' }
  }
];

export const DISEASES: Disease[] = [...generateAlphabeticalFreeList(), ...SPECIAL_DISEASES];
export const BIO_DICTIONARY = DISEASES;
export const NAV_ITEMS = [
  { id: 'HOME', label: 'Início', icon: 'Home' },
  { id: 'CATALOG', label: '100 A-Z', icon: 'Book' },
  { id: 'SPECIAL_PATHOLOGIES', label: 'Especiais', icon: 'Sparkles' },
  { id: 'BIOMAG_INDEX', label: 'Pares', icon: 'Magnet' },
  { id: 'PREMIUM', label: 'Pró', icon: 'Crown' }
];

// Add missing constants for ConstellationResearch component
export const HAMER_BERT_CONSTELLATIONS: Constellation[] = [
  {
    id: 'c-001',
    name: 'Constelação Frontal',
    brainRelays: 'Relés frontais (ECTO)',
    behavior: 'O indivíduo sente-se constantemente em guarda, em um estado de "medo frontal".',
    conflicts: ['Medo frontal (perigo vindo de frente)'],
    systemicRoot: 'Dificuldade de olhar para o futuro por lealdade a um destino difícil de um ancestral.',
    professionalInsight: 'Paciente apresenta hipervigilância e ansiedade antecipatória constante.'
  },
  {
    id: 'c-002',
    name: 'Constelação de Planante',
    brainRelays: 'Relés temporais/brônquicos (ECTO)',
    behavior: 'Sensação de estar fora da realidade, flutuando ou sonhando acordado.',
    conflicts: ['Susto/medo territorial em ambos hemisférios'],
    systemicRoot: 'Uma alma que quer "partir" para se reunir a alguém que foi excluído ou morreu cedo.',
    professionalInsight: 'Estado dissociativo que serve como amortecedor biológico para grandes choques emocionais.'
  }
];

export const BIO_MICROBIOLOGY = [
  {
    term: 'Fungos e Micobactérias',
    simple: 'Limpadores de tecidos antigos (Endoderma e Mesoderma Antigo) na fase de cura.',
    pro: 'Atuam na decomposição de tumores sólidos (glândulas) via caseificação tuberculosa.'
  },
  {
    term: 'Bactérias',
    simple: 'Ajudantes na reconstrução de tecidos (Mesoderma Novo) durante a reparação.',
    pro: 'Promovem a proliferação celular e preenchimento de necroses osteoarticulares.'
  }
];
