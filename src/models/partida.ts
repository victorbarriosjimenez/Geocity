import { Locacion } from '../models'
export class Partida { 
    public continente:  string;
    public puntuacion: number;
    public timestamp: Date;
    public locaciones: Locacion[];
    public completed: boolean;
    public state: number;
}