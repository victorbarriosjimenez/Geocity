import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/index';
@Pipe({
    name: 'filter'
})
export class NamePipe implements PipeTransform {
    transform(users: User[],SearchTerm: string): User[] { 
        return SearchTerm.toLowerCase() ? users.filter((user: User) => user.username.toLowerCase().indexOf(SearchTerm) !== -1) : users;
    }
}