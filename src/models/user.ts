import  { Partida } from '../models';
export class User { 
    public uid: string;
    public username?: string;
    public password?: string;
    public email?: string;
    public country?: string;
    public record?: number;
    public partidas?: Partida[];
    public displayName?: string;
    constructor(auth){ 
        this.uid = auth.uid;
    }
}
export class emailAndPasswordCredentials extends User{ 
    public email: string;
    public password: string;
}