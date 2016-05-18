import {Injectable, Pipe} from 'angular2/core';

/*
Generated class for the OrderByNewest pipe.

See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
Angular 2 Pipes.
*/
@Pipe({
    name: 'order-by-newest'
})
@Injectable()
export class OrderByNewest {
    /*
    Takes a value and makes it lowercase.
    */
    transform(value: string, args: any[]) {
        value = value + ''; // make sure it's a string
        return value.toLowerCase();
    }
}
