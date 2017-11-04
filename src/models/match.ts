import { Location } from '../models'
export class Match { 
    public continente:  string;
    public puntuacion: number;
    public timestamp: Date;
    public locaciones: Location[];
    public completed: boolean;
    public state: number;
}