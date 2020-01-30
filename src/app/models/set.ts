export class Set {
   setId: number;
   userId: number;
   exerciseId: number;
   sessionIndex: number;
   timeStap: Date;
   weight: number;
   distance: number;
   reps: number;
   rpe: number;
   tempo: Object; // TODO: tempo needs some type that can probably be cast to and from strings
   duration: number;
}