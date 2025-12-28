
export enum EmbryonicLayer {
  ENDODERM = "Endoderma (Sobrevivência/Pedaço)",
  OLD_MESODERM = "Mesoderma Antigo (Proteção/Ataque)",
  NEW_MESODERM = "Mesoderma Novo (Valorização/Comparação)",
  ECTODERM = "Ectoderma (Território/Relacionamento)"
}

export type HealthCategory = 'Doença' | 'Síndrome' | 'Trauma' | 'Pscicoemocional' | 'Especial';
export type BodyRegion = 'HEAD' | 'CHEST' | 'ABDOMEN' | 'PELVIS' | 'LIMBS' | 'SKIN' | 'SYSTEMIC' | 'DENTAL';

export type PairCategory = 'EMOCIONAL' | 'PSICOEMOCIONAL' | 'ESPECIAL' | 'PATOGENICO' | 'RESERVATORIO' | 'TUMORAL' | 'GENE';

export interface BioPair {
  id: string;
  negative: string;
  positive: string;
  pathogen?: string;
  relatedDisease?: string;
  category: PairCategory;
  description: string;
  isPremium: boolean;
}

export interface Constellation {
  id: string;
  name: string;
  brainRelays: string;
  behavior: string;
  conflicts: string[];
  systemicRoot: string;
  professionalInsight: string;
}

export interface GNMPart {
  layer: EmbryonicLayer;
  activePhase: string;
  healingPhaseA: string;
  healingPhaseB: string;
  crisis: string;
  biologicalSense: string;
}

export interface Disease {
  id: string;
  name: string;
  category: HealthCategory;
  region: BodyRegion;
  description: string;
  isPremium: boolean;
  emotionalBlock?: string;
  metaphysics?: string;
  reichFrechet?: string;
  gnm: {
    conflict: string;
    tissue: GNMPart;
  };
  biomagnetism: {
    pairs: {
      negative: string;
      positive: string;
      description: string;
    }[];
    notes?: string;
  };
  pnl: {
    affirmation: string;
    reframingTip: string;
  };
  systemic?: {
    conflict: string;
    healingPhrases: string[];
  };
}

export type ViewState = 'SPLASH' | 'HOME' | 'CATALOG' | 'TOOLS' | 'AI_THERAPIST' | 'PREMIUM' | 'DISEASE_DETAIL' | 'BIOMAG_INDEX' | 'ABOUT' | 'SPECIAL_PATHOLOGIES';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
