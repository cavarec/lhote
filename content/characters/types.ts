import type { DialogueLine } from '../premises/types';

export type Archetype = 'confident' | 'worried' | 'hostile' | 'innocent';

export interface Character {
  id: string;
  archetype: Archetype;
  name: string;
  voice: string;
  dialogues: Record<string, DialogueLine[]>;
}
