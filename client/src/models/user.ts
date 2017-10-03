export class User { 
    public username: string;
    public email: string;
    public country: string;
    public record: number;
    public partidas: Partida[];
}
export class Partida { 
    public continente:  string;
    public puntuacion: number;
    public timestamp: Date;
    public locaciones: Locacion[];
    public completed: boolean;
    public state: number;
}
export class Locacion { 
    public imagen: string;
    public titulo: string;
    public descripcion: string;
    public coordinateX: string;
    public coordinateY: string;
    public isCompleted: boolean;
}
