
import { Disease, EmbryonicLayer, Constellation, BioPair } from './types';

export const PREMIUM_TOPICS = [
  'lupus', 'alzheimer', 'psoríase', 'câncer', 'depressão', 'autismo', 'parkinson', 'esclerose', 
  'esclerodermia', 'fibromialgia', 'fenômeno tumoral', 'diabetes', 'epilepsia', 'esquizofrenia', 
  'bipolaridade', 'leucemia', 'infarto', 'adenocarcinoma', 'aneurisma', 'artrite', 'asma', 
  'bexiga', 'prostata', 'crohn', 'tiroide', 'endometriose', 'mioma', 'glaucoma', 'aneurisma',
  'addison', 'sida', 'aids', 'alopecia', 'anemia', 'apendicite', 'arteriosclerose', 'sjogren',
  'paget', 'neurofibromatose', 'zenker', 'mesotelioma', 'hodgkin', 'non-hodgkin'
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

// --- ÍNDICE SBS MASTER ULTRA-EXPANDIDO (BASEADO EM LEARNINGGNM.COM) ---
const SBS_MASTER_RAW_DATA = [
  { n: "Abandono (Conflito de)", c: "Túbulos Coletores dos Rins (TCR). Retenção de água, medo de existência e isolamento.", l: EmbryonicLayer.ENDODERM },
  { n: "Abscesso (Gengiva)", c: "Conflito de mordida: não poder 'morder' o pedaço ou atacar de volta.", l: EmbryonicLayer.ENDODERM },
  { n: "Abscesso (Pele)", c: "Ataque à integridade física (Derme). Sentir-se sujo ou ameaçado.", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Abscesso (Dente)", c: "Conflito de mordida profunda afetando a dentina (Desvalorização).", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Acne", c: "Conflito de ataque, sujeira ou deformação facial na derme.", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Acromegalia", c: "Não conseguir 'alcançar o pedaço' (Glândula Hipófise).", l: EmbryonicLayer.ENDODERM },
  { n: "Adenocarcinoma", c: "Proliferação glandular em órgãos endodérmicos por falta de 'pedaço'.", l: EmbryonicLayer.ENDODERM },
  { n: "Adenóides", c: "Conflito de 'pedaço de ar': algo que não se consegue tragar ou expulsar.", l: EmbryonicLayer.ENDODERM },
  { n: "Adnexite (Tubas)", c: "Conflito sexual 'feio' com um parceiro ou perda de um filho/pessoa próxima.", l: EmbryonicLayer.ENDODERM },
  { n: "Adrenal (Córtex)", c: "Conflito de ter tomado a 'direção errada' ou perdido o norte na vida.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Adrenal (Medula)", c: "Estresse de sobrevivência extremo e pânico insuportável.", l: EmbryonicLayer.ENDODERM },
  { n: "Agorafobia", c: "Constelação de medo frontal (perigo) e occipital (ataque por trás).", l: EmbryonicLayer.ECTODERM },
  { n: "AIDS / SIDA", c: "Medo de ataque, desvalorização severa e trilhos de doenças infecciosas.", l: EmbryonicLayer.SYSTEMIC },
  { n: "Albinismo", c: "Conflito de separação brutal com perda total de proteção.", l: EmbryonicLayer.ECTODERM },
  { n: "Albuminúria", c: "Dano glomerular por autodesvalorização renal severa.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Alergias", c: "Trilhos (âncoras) gravados durante o choque biológico original (DHS).", l: EmbryonicLayer.ECTODERM },
  { n: "Alopecia (Queda)", c: "Conflito de separação severa na região da cabeça.", l: EmbryonicLayer.ECTODERM },
  { n: "Alzheimer", c: "Constelação sensorial extrema: esquecer para parar de sofrer com a separação.", l: EmbryonicLayer.ECTODERM },
  { n: "Amenorreia", c: "Frustração territorial ou sexual severa (Cérvix Uterina).", l: EmbryonicLayer.ECTODERM },
  { n: "Anemia", c: "Autodesvalorização profunda que atinge a medula óssea.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Aneurisma (Abdominal)", c: "Autodesvalorização em relação ao suporte vital e aorta.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Aneurisma (Cerebral)", c: "Autodesvalorização intelectual lancinante e perigosa.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Angina de Peito", c: "Perda de território (Artérias Coronárias) em fase ativa.", l: EmbryonicLayer.ECTODERM },
  { n: "Angioedema", c: "Ataque à integridade somado à retenção de líquidos (TCR).", l: EmbryonicLayer.SYSTEMIC },
  { n: "Anorexia", c: "Constelação psíquica envolvendo raiva territorial e asco profundo.", l: EmbryonicLayer.ECTODERM },
  { n: "Anosmia (Olfato)", c: "Algo que 'cheira mal' (perigo) e deve ser evitado.", l: EmbryonicLayer.ECTODERM },
  { n: "Anúria", c: "Retenção total de urina por conflito ativo de existência (TCR).", l: EmbryonicLayer.ENDODERM },
  { n: "Aorta (Problemas)", c: "Autodesvalorização do centro do ser e da circulação vital.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Apendicite", c: "Conflito de pedaço indigesto e sujo em fase de cura inflamatória.", l: EmbryonicLayer.ENDODERM },
  { n: "Arteriosclerose", c: "Cicatrizes de conflitos territoriais recidivantes nas artérias.", l: EmbryonicLayer.ECTODERM },
  { n: "Artrite Reumatoide", c: "Cura de autodesvalorização motora crônica em trilhos constantes.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Artrose", c: "Desvalorização articular persistente na fase ativa (necrose).", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Asbestose", c: "Ataque à pleura pelo medo de morrer sufocado (amianto como trilho).", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Ascite", c: "Acúmulo de líquido: cura de um ataque ao peritônio abdominal.", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Asma Brônquica", c: "Constelação territorial (Medo territorial + Susto).", l: EmbryonicLayer.ECTODERM },
  { n: "Astigmatismo", c: "Conflito visual de medo frontal recorrente.", l: EmbryonicLayer.ECTODERM },
  { n: "Ataxia", c: "Incoordenação motora por constelação no córtex motor.", l: EmbryonicLayer.ECTODERM },
  { n: "Atelectasia", c: "Obstrução brônquica em fase de cura por medo territorial.", l: EmbryonicLayer.ECTODERM },
  { n: "Atropia Vaginal", c: "Conflito de frustração sexual e separação intensa.", l: EmbryonicLayer.ECTODERM },
  { n: "Autismo", c: "Constelação autista: choque frontal e territorial simultâneos.", l: EmbryonicLayer.ECTODERM },
  { n: "Barret (Esôfago)", c: "Não poder engolir o pedaço (Refluxo como sinal de raiva).", l: EmbryonicLayer.ECTODERM },
  { n: "Bell (Paralisia de)", c: "Ser ridicularizado ou 'perder a face' perante os outros.", l: EmbryonicLayer.ECTODERM },
  { n: "Bexiga (Cistite)", c: "Impossibilidade de marcar os limites do território.", l: EmbryonicLayer.ECTODERM },
  { n: "Bexiga (Pólipo)", c: "Conflito 'sujo' no território (Trígono Vesical).", l: EmbryonicLayer.ENDODERM },
  { n: "Bipolaridade", c: "Constelação territorial: alternância entre hemisfério esquerdo e direito.", l: EmbryonicLayer.ECTODERM },
  { n: "Bócio", c: "Conflito de tempo: ser muito lento para pegar o pedaço.", l: EmbryonicLayer.ENDODERM },
  { n: "Borreliose (Lyme)", c: "Ataque à integridade (picada) em trilhos de medo constante.", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Bradicardia", c: "Perda de território afetando o nodo sinusal (vago).", l: EmbryonicLayer.ECTODERM },
  { n: "Bronquite", c: "Cura de conflito de medo no território (ameaça).", l: EmbryonicLayer.ECTODERM },
  { n: "Bruxismo", c: "Necessidade de morder para se defender sem poder fazê-lo.", l: EmbryonicLayer.ECTODERM },
  { n: "Bulimia", c: "Constelação: Raiva territorial (Estômago) + Oposição (Pâncreas).", l: EmbryonicLayer.ECTODERM },
  { n: "Bursite", c: "Cura de autodesvalorização motora local.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Cálculo Biliar", c: "Raiva territorial em trilhos constantes (Cura endurecida).", l: EmbryonicLayer.ECTODERM },
  { n: "Cálculo Renal", c: "Conflito de existência/refugiado (TCR) com perda de minerais.", l: EmbryonicLayer.ENDODERM },
  { n: "Candidíase", c: "Cura de mucosas endodérmicas (sujeira sexual) assistida por fungos.", l: EmbryonicLayer.ENDODERM },
  { n: "Cáries", c: "Esmalte (Separação); Dentina (Mordida/Desvalorização).", l: EmbryonicLayer.ECTODERM },
  { n: "Catarata", c: "Separação visual extrema: não querer ver algo traumático.", l: EmbryonicLayer.ECTODERM },
  { n: "Cefaleia", c: "Edema cerebral em fase de cura (PCL).", l: EmbryonicLayer.SYSTEMIC },
  { n: "Celulite", c: "Autodesvalorização estética e local do tecido conjuntivo.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Cérvix (Câncer)", c: "Frustração sexual ou perda territorial feminina.", l: EmbryonicLayer.ECTODERM },
  { n: "Ciática", c: "Cura de desvalorização motora em relação às pernas/movimento.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Cirrose", c: "Raiva territorial recorrente ou medo de passar fome.", l: EmbryonicLayer.ENDODERM },
  { n: "Cistite", c: "Cura de conflito de marcação de limites territoriais.", l: EmbryonicLayer.ECTODERM },
  { n: "Colesterol (Alto)", c: "Reparação das paredes arteriais (conflito territorial).", l: EmbryonicLayer.ECTODERM },
  { n: "Colite Ulcerativa", c: "Pedaço indigesto extremamente sujo e vil.", l: EmbryonicLayer.ENDODERM },
  { n: "Conjuntivite", c: "Cura de conflito visual de separação severa.", l: EmbryonicLayer.ECTODERM },
  { n: "Constipação", c: "Fase ativa: retenção do pedaço indigesto.", l: EmbryonicLayer.ENDODERM },
  { n: "Corneia (Úlcera)", c: "Separação visual severa (perder alguém de vista).", l: EmbryonicLayer.ECTODERM },
  { n: "Coriza", c: "Cura de algo que 'cheira mal' ou perigo frontal.", l: EmbryonicLayer.ECTODERM },
  { n: "Crohn (Doença de)", c: "Conflito de pedaço indigesto recorrente (Intestino).", l: EmbryonicLayer.ENDODERM },
  { n: "Cushing (Síndrome)", c: "Conflito de direção errada na vida (Adrenal).", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Dandruff (Caspa)", c: "Cura de separação leve no couro cabeludo.", l: EmbryonicLayer.ECTODERM },
  { n: "Depressão", c: "Constelação territorial: balança pesa para o hemisfério esquerdo.", l: EmbryonicLayer.ECTODERM },
  { n: "Dermatite Atópica", c: "Fase de cura de um conflito de separação.", l: EmbryonicLayer.ECTODERM },
  { n: "Desvio de Septo", c: "Conflito de perigo frontal com reparação óssea excessiva.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Diabetes", c: "Resistência (Alpha) ou Repugnância (Beta) contra algo vil.", l: EmbryonicLayer.ECTODERM },
  { n: "Diarreia", c: "Fase de cura de um conflito de pedaço indigesto.", l: EmbryonicLayer.ENDODERM },
  { n: "Disfunção Erétil", c: "Autodesvalorização sexual ou perda territorial masculina.", l: EmbryonicLayer.ECTODERM },
  { n: "Dislexia", c: "Constelação motora e sensorial (separação e medo).", l: EmbryonicLayer.ECTODERM },
  { n: "Diverticulite", c: "Cura de um pedaço indigesto (sujeira) no cólon.", l: EmbryonicLayer.ENDODERM },
  { n: "Dupuytren (Contratura)", c: "Não querer 'soltar' alguém ou algo (mão).", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Eczema", c: "Cura de conflito de separação na epiderme.", l: EmbryonicLayer.ECTODERM },
  { n: "Edema", c: "Retenção de líquidos (TCR) potencializando a cura (A Síndrome).", l: EmbryonicLayer.SYSTEMIC },
  { n: "ELA (Esclerose Lateral)", c: "Conflitos motores: estar preso e sem saída.", l: EmbryonicLayer.ECTODERM },
  { n: "Embolia Pulmonar", c: "Cura de conflito territorial nas veias coronárias.", l: EmbryonicLayer.ECTODERM },
  { n: "Emfisema", c: "Medo da morte por sufocamento (Alvéolos).", l: EmbryonicLayer.ENDODERM },
  { n: "Endometriose", c: "Perda ou conflito sexual sujo (Tecido uterino fora do útero).", l: EmbryonicLayer.ENDODERM },
  { n: "Enurese Noturna", c: "Marcação de território (bexiga) durante o relaxamento.", l: EmbryonicLayer.ECTODERM },
  { n: "Enxaqueca", c: "Edema cerebral na fase de cura de conflitos territoriais.", l: EmbryonicLayer.SYSTEMIC },
  { n: "Epicondilite", c: "Cura de desvalorização motora em relação ao trabalho/esporte.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Epilepsia", c: "Crise epiléptica da fase de cura de um conflito motor.", l: EmbryonicLayer.ECTODERM },
  { n: "Erisipela", c: "Ataque à integridade (Derme) com inflamação severa.", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Escoliose", c: "Autodesvalorização central da coluna em recaídas cíclicas.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Esclerose Múltipla", c: "Conflitos motores repetitivos e desvalorização.", l: EmbryonicLayer.ECTODERM },
  { n: "Esclerodermia", c: "Ataque à integridade + separação brutal (Couro).", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Esofagite", c: "Não conseguir engolir ou aceitar o pedaço vil.", l: EmbryonicLayer.ECTODERM },
  { n: "Esquizofrenia", c: "Constelações cerebrais múltiplas (muitos choques biológicos).", l: EmbryonicLayer.SYSTEMIC },
  { n: "Estomatite (Afta)", c: "Não conseguir capturar ou expulsar o pedaço na boca.", l: EmbryonicLayer.ECTODERM },
  { n: "Faringite", c: "Cura de conflito de pedaço de ar ou alimento (garganta).", l: EmbryonicLayer.ECTODERM },
  { n: "Fibroma Uterino", c: "Conflito de não poder ter um filho ou perda de um.", l: EmbryonicLayer.ENDODERM },
  { n: "Fibromialgia", c: "Autodesvalorização + Conflito de existência/abandono.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Fissura Anal", c: "Identidade territorial (Mucosa anal) em fase de cura.", l: EmbryonicLayer.ECTODERM },
  { n: "Flatulência", c: "Pedaço indigesto gasoso em fase de processamento (Intestino).", l: EmbryonicLayer.ENDODERM },
  { n: "Gastrite / Úlcera", c: "Raiva territorial no estômago (curvatura menor).", l: EmbryonicLayer.ECTODERM },
  { n: "Gengivite", c: "Cura de um conflito de mordida (não poder atacar).", l: EmbryonicLayer.ECTODERM },
  { n: "Glaucoma", c: "Medo frontal intenso (pressão ocular elevada).", l: EmbryonicLayer.ECTODERM },
  { n: "Gota", c: "Autodesvalorização profunda + Retenção de líquidos (Rins).", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Gripe", c: "Cura de conflitos territoriais (Nariz/Garganta/Brônquios).", l: EmbryonicLayer.ECTODERM },
  { n: "Halitose", c: "Pedaço sujo na boca em decomposição por fungos.", l: EmbryonicLayer.ENDODERM },
  { n: "Hemorroidas", c: "Cura de conflito de identidade territorial (Reto).", l: EmbryonicLayer.ECTODERM },
  { n: "Hepatite", c: "Cura de raiva territorial nos ductos biliares.", l: EmbryonicLayer.ECTODERM },
  { n: "Hérnia de Disco", c: "Desvalorização central extrema do suporte vital (Coluna).", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Hérnia Inguinal", c: "Desvalorização local (virilha) por não aguentar o peso.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Herpes Labial", c: "Cura de conflito de separação de contato (beijo/fala).", l: EmbryonicLayer.ECTODERM },
  { n: "Herpes Zoster", c: "Ataque à integridade + Separação severa.", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Hipertensão", c: "Conflito territorial e de liquidez (Coração/Rins).", l: EmbryonicLayer.ECTODERM },
  { n: "Hipertireoidismo", c: "Tempo: pressa para pegar o pedaço (Hiperfunção).", l: EmbryonicLayer.ENDODERM },
  { n: "Hipoglicemia", c: "Resistência e medo de algo vil (Células Alpha).", l: EmbryonicLayer.ECTODERM },
  { n: "Hipotireoidismo", c: "Tempo: ser muito lento (Hipo-função/Cura).", l: EmbryonicLayer.ENDODERM },
  { n: "Hodgkin (Linfoma)", c: "Cura de autodesvalorização leve/média (Linfonodos).", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Impotência", c: "Perda territorial ou desvalorização sexual masculina.", l: EmbryonicLayer.ECTODERM },
  { n: "Incontinência", c: "Incapacidade de marcar os limites (Bexiga).", l: EmbryonicLayer.ECTODERM },
  { n: "Infarto do Miocárdio", c: "Crise epilóide de perda territorial nas artérias coronárias.", l: EmbryonicLayer.ECTODERM },
  { n: "Insônia", c: "Vigilância ativa: manter-se alerta contra o perigo.", l: EmbryonicLayer.SYSTEMIC },
  { n: "Labirintite", c: "Queda, perda de equilíbrio ou perda de rumo na vida.", l: EmbryonicLayer.ECTODERM },
  { n: "Laringite", c: "Cura de susto territorial (Laringe).", l: EmbryonicLayer.ECTODERM },
  { n: "Leucemia", c: "Cura de autodesvalorização profunda (Medula Óssea).", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Linfoma (Non-Hodgkin)", c: "Cura de medo frontal/branquial (Arcos branquiais).", l: EmbryonicLayer.ECTODERM },
  { n: "Lupus", c: "Ataque à integridade + Desvalorização sistêmica severa.", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Malária", c: "Conflito de ataque em trilhos específicos (Trópicos).", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Mastite", c: "Cura de preocupação no ninho (Glândula Mamária).", l: EmbryonicLayer.ENDODERM },
  { n: "Melanoma", c: "Ataque à integridade ou sujeira profunda na derme.", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Meningite", c: "Cura de autodesvalorização intelectual extrema.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Miopia", c: "Medo frontal constante: perigo que vem de longe.", l: EmbryonicLayer.ECTODERM },
  { n: "Mioma Uterino", c: "Desejo de gravidez ou compensação por perda de filho.", l: EmbryonicLayer.ENDODERM },
  { n: "Neurofibromatose", c: "Conflito de toque indesejado (Bainha de Mielina).", l: EmbryonicLayer.ECTODERM },
  { n: "Nevralgia do Trigêmeo", c: "Cura de conflito de 'perder a face' ou ser esbofeteado.", l: EmbryonicLayer.ECTODERM },
  { n: "Obesidade", c: "Retenção de TCR + Autodesvalorização (Tecido Adiposo).", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Osteoporose", c: "Autodesvalorização crônica na fase ativa (necrose óssea).", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Otite", c: "Conflito auditivo: não conseguir capturar o som (pedaço).", l: EmbryonicLayer.ENDODERM },
  { n: "Paget (Doença de)", c: "Cura agressiva de desvalorização óssea severa.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Pancreatite", c: "Raiva com membros da família por causa de 'pedaço'.", l: EmbryonicLayer.ENDODERM },
  { n: "Parkinson (Mal de)", c: "Conflito motor: não poder segurar ou não poder fugir.", l: EmbryonicLayer.ECTODERM },
  { n: "Pneumonia", c: "Cura de medo da morte (Alvéolos) ou medo territorial (Brônquios).", l: EmbryonicLayer.ENDODERM },
  { n: "Próstata (Câncer)", c: "Conflito sexual 'sujo' ou conflito de procriação.", l: EmbryonicLayer.ENDODERM },
  { n: "Psoríase", c: "Duplo conflito de separação: um em cura e outro ativo.", l: EmbryonicLayer.ECTODERM },
  { n: "Raynaud (Síndrome)", c: "Separação + Frio emocional nas mãos/pés.", l: EmbryonicLayer.ECTODERM },
  { n: "Rinite", c: "Algo que 'cheira mal' ou perigo frontal iminente.", l: EmbryonicLayer.ECTODERM },
  { n: "Rosácea", c: "Cura de conflito de 'perder a face' na derme facial.", l: EmbryonicLayer.OLD_MESODERM },
  { n: "Sjögren (Síndrome)", c: "Não conseguir hidratar o pedaço (seca total).", l: EmbryonicLayer.ENDODERM },
  { n: "Tinnitus (Zumbido)", c: "Não querer ouvir algo específico (Zumbido ativo).", l: EmbryonicLayer.ECTODERM },
  { n: "Trombose", c: "Cura de desvalorização venosa local intensa.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Tuberculose", c: "Cura de adenocarcinoma pulmonar assistida por micobactérias.", l: EmbryonicLayer.ENDODERM },
  { n: "Varizes", c: "Sentir-se 'preso' ou carregando um peso insuportável.", l: EmbryonicLayer.NEW_MESODERM },
  { n: "Vitiligo", c: "Separação brutal e feia (despigmentação).", l: EmbryonicLayer.ECTODERM },
  { n: "Zenker (Divertículo)", c: "Não conseguir engolir o pedaço vil no esôfago.", l: EmbryonicLayer.ENDODERM }
];

export const SPECIAL_DISEASES: Disease[] = SBS_MASTER_RAW_DATA.map((item, idx) => ({
    id: `p-sbs-${idx}`,
    name: item.n,
    category: 'Especial',
    region: 'SYSTEMIC',
    isPremium: true,
    description: `Programa Biológico Especial (SBS) para ${item.n}.`,
    emotionalBlock: `Relacionado a: ${item.c}`,
    metaphysics: 'O corpo biológico não comete erros; ele responde a um impacto dramático.',
    gnm: {
        conflict: item.c,
        tissue: {
            layer: item.l || EmbryonicLayer.ECTODERM, 
            activePhase: 'Adaptação celular ao choque biológico.', 
            healingPhaseA: 'Reparação inflamatória intensa.', 
            healingPhaseB: 'Finalização da cicatriz e retorno funcional.', 
            crisis: 'Crise epilóide (pico simpaticotônico).', 
            biologicalSense: 'Garantir a sobrevivência biológica perante o DHS.'
        }
    },
    biomagnetism: {
        pairs: [{ negative: 'Ponto Bio', positive: 'Ponto Mag', description: 'Equilíbrio vibracional geral.' }]
    },
    pnl: {
        affirmation: 'Eu reconheço a inteligência do meu corpo e me abro para a cura.',
        reframingTip: 'Visualize o órgão retornando à sua vibração original de saúde.'
    }
}));

export const DISEASES: Disease[] = [...generateAlphabeticalFreeList(), ...SPECIAL_DISEASES];

export const HAMER_BERT_CONSTELLATIONS: Constellation[] = [
  { id: 'c-001', name: 'Constelação do Tronco Cerebral', brainRelays: 'Relés da Ponte', behavior: 'Desorientação total, confusão mental grave.', conflicts: ['Pedaço bilateral'], systemicRoot: 'Vincular ao caos sistêmico.', professionalInsight: 'Paciente fora da realidade.' },
  { id: 'c-002', name: 'Constelação de Túbulos Coletores (TCR)', brainRelays: 'Relés Renais', behavior: 'Desorientação geográfica, hoarding, medo de abandono.', conflicts: ['Abandono bilateral'], systemicRoot: 'Ancestrais refugiados e expulsos.', professionalInsight: 'Causa a Síndrome de Retenção de Líquidos.' },
  { id: 'c-017', name: 'Constelação Autista', brainRelays: 'Lóbulos Temporais', behavior: 'Isolamento, rituais, dificuldade de comunicação.', conflicts: ['Medo frontal e territorial'], systemicRoot: 'Criança protegendo segredos graves.', professionalInsight: 'Um refúgio biológico contra invasão.' },
  { id: 'c-009', name: 'Constelação Lóbulo Temporal', brainRelays: 'Córtex Temporal', behavior: 'Bipolaridade, alternância depressão/mania.', conflicts: ['Território em oposição'], systemicRoot: 'Dinamismo sexual do clã familiar.', professionalInsight: 'Equilíbrio depende da balança de carga.' }
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
