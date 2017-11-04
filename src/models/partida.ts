import { Location } from '../models'
export class Partida { 
    public continente:  string;
    public puntuacion: number;
    public timestamp: Date;
    public locaciones: Location[];
    public completed: boolean;
    public state: number;
}