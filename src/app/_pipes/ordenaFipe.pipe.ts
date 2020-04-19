import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenaFipe'
})
export class OrdenaFipePipe implements PipeTransform {

  transform(value: any): any {
    value.sort((a: any, b: any) => {
      if (a.Ordenacao < b.Ordenacao) {
        return -1;
      } else if (a.Ordenacao > b.Ordenacao) {
        return 1;
      } else {
        return 0;
      }
    });
    return value;
  }

}
