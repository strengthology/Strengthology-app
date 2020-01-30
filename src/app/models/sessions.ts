import { Set } from './set';

export class Session {
    id: number;
    userId: number;
    date: Date;
    sets: Set[];
}