import  { Partida } from '../models';
import { ObservableInput } from 'rxjs/Observable';
export class User { 
    public uid?: string;
    public username?: string;
    public password?: string;
    public email?: string;
    public country?: string;
    public score?: number;
    public partidas?: Partida[];
    public displayName?: string;
    public profilePhotoUrl?: string;
    public editionRequests?: number;
    constructor(auth) {
        this.uid = auth.uid
    }
}
