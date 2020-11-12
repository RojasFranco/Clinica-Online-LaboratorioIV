import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha_hora'
})
export class FechaPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let aux = (new Date(value)).toLocaleString();
    let auxArray = aux.split(':');
    auxArray.pop();
    return auxArray.join(':');
  }

}
