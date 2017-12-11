import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/index';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(users: User[],SearchTerm: string): User[] { 
        SearchTerm = SearchTerm.toLowerCase();
        return SearchTerm ? users.filter((user: User) => user.username.toLowerCase().indexOf(SearchTerm) !== -1) : users;
    }
}