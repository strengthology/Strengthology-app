import { Exercise } from './exercise';
export class Set {
   id: number;
   exercise: Exercise;
   sessionId: number;
   weight: number;
   weightType: string;
   reps: number;
   rpe: number;
   // tempo: Object; // TODO: tempo needs some type that can probably be cast to and from strings
   // duration: number;
   // distance: number;
}
