import  { Partida } from '../models';
export class User { 
    public _id?: string;
    public username: string;
    public password: string;
    public email: string;
    public country: string;
    public record: number;
    public partidas: Partida[];
}
export class emailAndPasswordCredentials extends User{ 
    public email: string;
    public password: string;
}