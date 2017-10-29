import  { Partida } from '../models';
export class User { 
    public username?: string;
    public password?: string;
    public email?: string;
    public country?: string;
    public score?: number;
    public partidas?: Partida[];
    public displayName?: string;
}