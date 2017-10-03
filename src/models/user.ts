export class User { 
    public _id: string;
    public username: string;
    public email: string;
    public country: string;
    public record: number;
    public partidas: Partida[];
}