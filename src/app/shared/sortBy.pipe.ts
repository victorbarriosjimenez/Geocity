import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/index';
import { sortBy } from 'underscore';
@Pipe({
    name: 'order'
})
export class OrderByPipe implements PipeTransform {
    transform(users: User[]): User[] {
            return users.reverse()
    }
}