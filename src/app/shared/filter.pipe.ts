import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/index';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term): any {
        return term 
            ? items.filter(item => item.title.indexOf(term) !== -1)
            : items;
    }
}