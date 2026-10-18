// Une fracture est le problème à réparer. Elle est toujours ambiguë : deux lectures (§6.4, beat 5).

export interface Fracture {
  id: string;
  title: string;
  interpretations: [string, string];
}
