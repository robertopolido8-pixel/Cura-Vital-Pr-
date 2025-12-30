
import { Disease, EmbryonicLayer, Constellation, BioPair } from './types';

export const PREMIUM_TOPICS = [
  'lupus', 'alzheimer', 'psoríase', 'câncer', 'depressão', 'autismo', 'parkinson', 'esclerose', 
  'esclerodermia', 'fibromialgia', 'fenômeno tumoral', 'diabetes', 'epilepsia', 'esquizofrenia', 
  'bipolaridade', 'leucemia', 'infarto', 'adenocarcinoma', 'aneurisma', 'artrite', 'asma', 
  'bexiga', 'prostata', 'crohn', 'tiroide', 'endometriose', 'mioma', 'glaucoma', 'aneurisma',
  'addison', 'sida', 'aids', 'alopecia', 'anemia', 'apendicite', 'arteriosclerose'
];

const generateExtendedPairs = (): BioPair[] => {
  return [
    { id: 'bp-001', negative: 'Pineal', positive: 'Pineal', category: 'ESPECIAL', pathogen: 'Disfunção Glandular', description: 'Atua sobre o sono, melatonina e estados depressivos. Indução de ondas Alpha.', isPremium: false },
    { id: 'bp-002', negative: 'Parietal', positive: 'Rim Contra-lateral', category: 'ESPECIAL', pathogen: 'Goiz', description: 'Par de equilíbrio de pH e regulação de fluidos. Harmoniza a pressão osmótica celular.', isPremium: false },
    { id: 'bp-003', negative: 'Timo', positive: 'Reto', category: 'PATOGENICO', pathogen: 'HIV (Falso Positivo)', description: 'Atua no sistema imunológico e regulação de linfócitos T.', isPremium: true },
    { id: 'bp-f1', negative: 'Mandíbula', positive: 'Mandíbula', category: 'PATOGENICO', relatedDisease: 'Acne Juvenil', pathogen: 'Neisseria Gonorrhoeae', description: 'Desbloqueio de toxinas dérmicas. Atua na autoestima facial.', isPremium: false },
    { id: 'bp-f9', negative: 'Vagina', positive: 'Vagina', category: 'PATOGENICO', relatedDisease: 'Candidíase', pathogen: 'Candida Albicans', description: 'Regulação do microbioma pélvico. Harmoniza a energia do sagrado feminino.', isPremium: false },
  ];
};

export const BIO_PAIRS: BioPair[] = generateExtendedPairs();

const RAW_FREE_DISEASES: Disease[] = [
  {
    id: 'f-001', name: 'Acne Juvenil', category: 'Doença', region: 'SKIN', isPremium: false,
    description: 'Manifestação inflamatória da derme associada à puberdade.',
    emotionalBlock: 'Conflito de "ataque à integridade": sentir-se sujo ou rejeitado.',
    gnm: { 
      conflict: 'Ataque à integridade estética ou física (sujeira real ou figurada).', 
      tissue: { 
        layer: EmbryonicLayer.OLD_MESODERM, activePhase: 'Proliferação celular protetiva.', healingPhaseA: 'Inflamação purulenta.', healingPhaseB: 'Cicatriz.', crisis: 'Pico febril local.', biologicalSense: 'Reforçar a pele contra ataques.' 
      } 
    },
    biomagnetism: { pairs: [{ negative: 'Mandíbula', positive: 'Mandíbula', description: 'Ajuste de pH facial.' }] },
    pnl: { affirmation: 'Eu irradio beleza e minha luz interior brilha.', reframingTip: 'Visualize cada poro respirando luz.' }
  }
];

const generateAlphabeticalFreeList = () => {
  const list = [...RAW_FREE_DISEASES];
  const placeholderNames = [
    "Abscesso", "Adenoide", "Alergia Alimentar", "Alergia Cutânea", "Alopecia", "Amidalite", "Anemia", "Aneurisma", "Artrite", "Artrose", "Asma", "Astigmatismo", "Azia", "Bronquite", "Bursite", "Câimbra", "Cálculo Biliar", "Cálculo Renal", "Caspa", "Catarata", "Cefaleia", "Celulite", "Ciática", "Cirrose", "Cistite", "Colesterol Alto", "Colite", "Conjuntivite", "Constipação", "Convulsão", "Coqueluche", "Coriza", "Dermatite", "Derrame Pleural", "Desvio de Septo", "Diabetes Tipo 1", "Diabetes Tipo 2", "Diarreia", "Disfunção Erétil", "Dislexia", "Dismenorreia", "Dispneia", "Diverticulite", "Doença de Crohn", "Dor de Cabeça", "Dor de Garganta", "Dor Lombar", "Eczema", "Edema", "Embolia", "Enxaqueca", "Enurese", "Epicondilite", "Epistaxe", "Erisipela", "Escoliose", "Esofagite", "Espasmo", "Estomatite", "Estresse", "Faringite", "Fascite Plantar", "Febre", "Flatulência", "Gastrite", "Gengivite", "Glaucoma", "Gota", "Gripe", "Halitose", "Hemorroida", "Hepatite A", "Hepatite B", "Hérnia de Disco", "Hérnia Inguinal", "Herpes Labial", "Herpes Zoster", "Hipertensão", "Hipertireoidismo", "Hipoglicemia", "Hipotireoidismo", "Impotência", "Incontinência", "Infecção Urinária", "Inflamação", "Insônia", "Labirintite", "Laringite", "Leucorreia", "Má Digestão", "Mal de Parkinson", "Mastite", "Memória Fraca", "Menopausa", "Micose", "Miopia", "Nervosismo", "Otite", "Palpitação"
  ];
  placeholderNames.forEach((name, i) => {
    if (list.length < 100 && !list.find(d => d.name === name)) {
      list.push({
        id: `f-gen-${i}`, name: name, category: 'Doença', region: 'SYSTEMIC', isPremium: false,
        description: `Protocolo bio-integrativo para ${name}.`,
        emotionalBlock: 'Conflito de território ou desvalorização.',
        gnm: { 
          conflict: 'Conflito biológico de sobrevivência.', 
          tissue: { 
            layer: EmbryonicLayer.ENDODERM, activePhase: 'Alerta biológico.', healingPhaseA: 'Reparação.', healingPhaseB: 'Finalização.', crisis: 'Pico.', biologicalSense: 'Adaptação.' 
          } 
        },
        biomagnetism: { pairs: [{ negative: 'Ponto Bio', positive: 'Ponto Mag', description: 'Equilíbrio.' }] },
        pnl: { affirmation: 'Eu aceito o fluxo da vida.', reframingTip: 'Solte o controle.' }
      });
    }
  });
  return list.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 100);
};

// --- ÍNDICE SBS MASTER EXPANDIDO (EXPLORAÇÃO COMPLETA A-Z) ---
const SBS_MASTER_RAW_DATA = [
  { n: "Abandono (Conflito de)", c: "Túbulos Coletores dos Rins (TCR). Retenção de água e desorientação." },
  { n: "Abscesso (Gums/Gengiva)", c: "Conflito de mordida: não poder 'atacar' ou morder o pedaço." },
  { n: "Abscesso (Skin/Pele)", c: "Conflito de ataque à integridade (Derme)." },
  { n: "Abscesso (Tooth/Dente)", c: "Conflito de mordida profunda afetando a dentina." },
  { n: "Acne", c: "Conflito de ataque ou sujeira real/figurada na pele." },
  { n: "Acromegalia", c: "Conflito de não poder 'alcançar o pedaço' (Hipófise)." },
  { n: "Adenocarcinoma", c: "Proliferação celular glandular (Endoderma) em fase ativa." },
  { n: "Adenóides", c: "Conflito de pedaço de ar: não conseguir capturar o ar/alimento." },
  { n: "Adnexite (Tubas Falocianas)", c: "Conflito de perda ou conflito sexual 'feio' com um parceiro." },
  { n: "Adrenal (Câncer Córtex)", c: "Estresse de ter tomado a 'direção errada' na vida." },
  { n: "Adrenal (Câncer Medula)", c: "Conflito de estresse extremo insuportável." },
  { n: "Agorafobia", c: "Constelação de medo frontal (susto) e medo occipital (ataque por trás)." },
  { n: "AIDS / SIDA", c: "Múltiplos conflitos de ataque e desvalorização sistêmica." },
  { n: "Albuminúria", c: "Dano glomérulo renal por autodesvalorização severa." },
  { n: "Alergias (Pólen/Ácaro)", c: "Trilhos (âncoras) gravados durante um choque biológico (DHS)." },
  { n: "Alopecia (Queda de Cabelo)", c: "Conflito de separação brutal (cabeça sendo acariciada ou protegida)." },
  { n: "Alzheimer", c: "Constelação sensorial extrema de separação e perda de memória para não sofrer." },
  { n: "Amenorreia", c: "Conflito de território ou frustração sexual (Cérvix)." },
  { n: "Anemia", c: "Autodesvalorização profunda que atinge a medula óssea (fase ativa)." },
  { n: "Aneurisma (Abdominal)", c: "Autodesvalorização severa da artéria aorta abdominal." },
  { n: "Aneurisma (Cerebral)", c: "Autodesvalorização intelectual lancinante." },
  { n: "Angina de Peito", c: "Perda de território (Artérias Coronárias) - Fase Ativa." },
  { n: "Angioedema", c: "Ataque à integridade combinado com Retenção de Líquidos (TCR)." },
  { n: "Anorexia", c: "Constelação psíquica envolvendo raiva territorial e repugnância." },
  { n: "Anúria", c: "Fase ativa do conflito de existência/refugiado (Rins)." },
  { n: "Aorta (Estenose/Insuficiência)", c: "Conflito de perda de território em recaídas constantes." },
  { n: "Apendicite", c: "Conflito de pedaço indigesto (sujeira) em fase de cura inflamatória." },
  { n: "Arteriosclerose", c: "Cicatrizes de conflitos territoriais arteriais recidivantes." },
  { n: "Artrite Reumatoide", c: "Cura de autodesvalorização motora em trilhos constantes." },
  { n: "Artrose", c: "Desvalorização articular crônica (fase ativa de necrose)." },
  { n: "Asma Brônquica", c: "Constelação territorial (Medo no território + Susto)." },
  { n: "Astigmatismo", c: "Conflito visual de medo frontal." },
  { n: "Ataxia", c: "Incoordenação motora por constelação no córtex motor." },
  { n: "Autismo", c: "Constelação autista (Choque frontal e territorial intensos)." },
  { n: "Bexiga (Cistite/Câncer)", c: "Marcação de território suja ou impossibilidade de marcar." },
  { n: "Bipolaridade", c: "Constelação de conflitos territoriais em ambos os hemisférios temporais." },
  { n: "Bronquite", c: "Fase de cura de um conflito de medo territorial." },
  { n: "Bruxismo", c: "Descarga motora de raiva por não poder morder/se defender." },
  { n: "Bulimia", c: "Constelação gástrica/pancreática (Raiva + Oposição)." },
  { n: "Candidíase", c: "Ação fúngica na fase de cura de mucosas endodérmicas." },
  { n: "Catarata", c: "Conflito de separação visual extrema ('perder de vista')." },
  { n: "Cáries Dentárias", c: "Esmalte (Separação); Dentina (Mordida/Desvalorização)." },
  { n: "Celulite", c: "Autodesvalorização estética local no tecido conjuntivo." },
  { n: "Cirrose Hepática", c: "Conflito de carência alimentar ou raiva territorial recidivante." },
  { n: "Colite Ulcerativa", c: "Pedaço indigesto com 'tonalidade suja' extrema." },
  { n: "Conjuntivite", c: "Fase de cura de um conflito visual de separação." },
  { n: "Coqueluche", c: "Susto territorial afetando brônquios/laringe." },
  { n: "Crohn (Doença de)", c: "Conflito de pedaço indigesto em recaídas cíclicas." },
  { n: "Cushing (Síndrome)", c: "Conflito de direção errada (Córtex Adrenal)." },
  { n: "Dandruff (Caspa)", c: "Cura de separação leve no couro cabeludo." },
  { n: "Depressão", c: "Conflito territorial no hemisfério esquerdo (Lóbulo Temporal)." },
  { n: "Dermatite", c: "Conflito de separação (contato desejado ou indesejado)." },
  { n: "Diabetes", c: "Resistência (Alpha) ou Repugnância (Beta) contra algo/alguém." },
  { n: "Diarreia", c: "Fase de cura de conflito de pedaço indigesto (absorção)." },
  { n: "Diverticulite", c: "Pedaço indigesto em fase de cura com inflamação." },
  { n: "Eczema", c: "Cura de conflito de separação na epiderme." },
  { n: "Edema", c: "Fase de cura (PCL) potencializada pela retenção de TCR (Síndrome)." },
  { n: "Embolia Pulmonar", c: "Cura de conflito territorial nas veias coronárias." },
  { n: "Endometriose", c: "Conflito de perda ou sexual sujo (mucosa uterina fora do lugar)." },
  { n: "Enxaqueca", c: "Edema cerebral na fase de cura de um conflito territorial." },
  { n: "Epilepsia", c: "Crise epiléptica da fase de cura de um conflito motor." },
  { n: "Esofagite", c: "Não poder 'engolir' ou 'tragar' um pedaço." },
  { n: "Esquizofrenia", c: "Constelações múltiplas em ambos os hemisférios cerebrais." },
  { n: "Fibromialgia", c: "Autodesvalorização com conflito de existência (TCR)." },
  { n: "Gastrite / Úlcera", c: "Raiva territorial no estômago (curvatura menor)." },
  { n: "Glaucoma", c: "Medo frontal intenso (perigo vindo de frente)." },
  { n: "Gota", c: "Autodesvalorização profunda com Retenção de Líquidos (TCR)." },
  { n: "Hemorroidas", c: "Identidade territorial em fase de cura." },
  { n: "Hepatite", c: "Cura de raiva territorial afetando ductos biliares." },
  { n: "Hérnia de Disco", c: "Desvalorização central extrema do suporte (coluna)." },
  { n: "Herpes", c: "Separação (Labial: contato; Genital: sexual)." },
  { n: "Hipertensão", c: "Conflito territorial e de liquidez (Coração/Rins)." },
  { n: "Hipotireoidismo", c: "Tempo: 'ser muito lento' para capturar o pedaço." },
  { n: "Infarto", c: "Crise epilóide de perda territorial (Artérias Coronárias)." },
  { n: "Insônia", c: "Vigilância ativa para detectar perigo (Simpaticotonia)." },
  { n: "Leucemia", c: "Cura de autodesvalorização profunda da medula óssea." },
  { n: "Lupus", c: "Ataque à integridade com desvalorização sistêmica." },
  { n: "Melanoma", c: "Conflito de ataque à integridade ou sujeira profunda." },
  { n: "Miopia", c: "Medo frontal constante (perigo ao longe)." },
  { n: "Neurofibromatose", c: "Toque indesejado (Bainha de Mielina)." },
  { n: "Osteoporose", c: "Autodesvalorização crônica na fase ativa (necrose)." },
  { n: "Parkinson", c: "Conflito motor de não poder 'segurar' ou 'fugir'." },
  { n: "Pneumonia", c: "Cura de medo da morte ou medo territorial intenso." },
  { n: "Psoríase", c: "Duplo conflito de separação (um em cura, outro ativo)." },
  { n: "Rinite", c: "Cura de 'isso me cheira mal' ou perigo frontal." },
  { n: "Sjögren (Síndrome)", c: "Pedaço seco: não poder hidratar o que é vital." },
  { n: "Tinnitus (Zumbido)", c: "Auditivo: não querer ouvir algo específico." },
  { n: "Varizes", c: "Sentir-se 'preso' ou 'carregando bola de ferro'." },
  { n: "Vitiligo", c: "Separação brutal e feia (despigmentação)." },
  { n: "Zenker (Divertículo)", c: "Não poder engolir o pedaço no esôfago." }
];

export const SPECIAL_DISEASES: Disease[] = SBS_MASTER_RAW_DATA.map((item, idx) => ({
    id: `p-sbs-${idx}`,
    name: item.n,
    category: 'Especial',
    region: 'SYSTEMIC',
    isPremium: true,
    description: `Programa Biológico Especial (SBS) para ${item.n}.`,
    emotionalBlock: `Relacionado a: ${item.c}`,
    metaphysics: 'O corpo reage a um impacto biológico dramático e inesperado.',
    gnm: {
        conflict: item.c,
        tissue: {
            layer: EmbryonicLayer.ECTODERM, activePhase: 'Adaptação biológica celular.', healingPhaseA: 'Reparação inflamatória.', healingPhaseB: 'Cicatriz.', crisis: 'Crise epilóide.', biologicalSense: 'Solução biológica para o choque.'
        }
    },
    biomagnetism: {
        pairs: [{ negative: 'Ponto Bio', positive: 'Ponto Mag', description: 'Equilíbrio vibracional.' }]
    },
    pnl: {
        affirmation: 'Eu libero a carga biológica e volto à harmonia.',
        reframingTip: 'Visualize o órgão retornando à sua função perfeita.'
    }
}));

export const DISEASES: Disease[] = [...generateAlphabeticalFreeList(), ...SPECIAL_DISEASES];

export const HAMER_BERT_CONSTELLATIONS: Constellation[] = [
  { id: 'c-001', name: 'Constelação do Tronco Cerebral', brainRelays: 'Ponte', behavior: 'Desorientação total, confusão mental.', conflicts: ['Pedaço bilateral'], systemicRoot: 'Caos ancestral.', professionalInsight: 'Paciente fora da realidade.' },
  { id: 'c-002', name: 'Constelação de Túbulos Coletores (TCR)', brainRelays: 'Rins', behavior: 'Desorientação geográfica, acúmulo.', conflicts: ['Abandono bilateral'], systemicRoot: 'Ancestrais refugiados.', professionalInsight: 'Retenção severa de líquidos.' },
  { id: 'c-017', name: 'Constelação Autista', brainRelays: 'Lóbulos Temporais', behavior: 'Isolamento, rituais compulsivos.', conflicts: ['Medo frontal e territorial'], systemicRoot: 'Segredo familiar protegido.', professionalInsight: 'Refúgio biológico.' },
  { id: 'c-009', name: 'Constelação Lóbulo Temporal', brainRelays: 'Córtex Temporal', behavior: 'Bipolaridade, depressão/mania.', conflicts: ['Território em oposição'], systemicRoot: 'Dinamismo sexual do clã.', professionalInsight: 'Equilíbrio de carga.' }
];

export const NAV_ITEMS = [
  { id: 'HOME', label: 'Início', icon: 'Home' },
  { id: 'CATALOG', label: '100 A-Z', icon: 'Book' },
  { id: 'SPECIAL_PATHOLOGIES', label: 'Especiais', icon: 'Sparkles' },
  { id: 'BIOMAG_INDEX', label: 'Pares', icon: 'Magnet' },
  { id: 'PREMIUM', label: 'Pró', icon: 'Crown' }
];

export const BIO_MICROBIOLOGY = [
  { term: 'Fungos e Micobactérias', simple: 'Limpadores de tecidos antigos.', pro: 'Atuam na fase de cura de tecidos endodérmicos.' },
  { term: 'Bactérias', simple: 'Ajudantes na reconstrução.', pro: 'Trabalham na fase PCL de tecidos mesodérmicos.' },
  { term: 'Vírus (Hamer)', simple: 'Reestruturadores de tecidos modernos.', pro: 'Atuam na cicatrização de tecidos ectodérmicos.' }
];
