import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frenchOrder'
})
export class FrenchOrderPipe implements PipeTransform {

  transform(array: Array<String>, args?: any): any {

    if(array != undefined){
      array.sort(FrenchOrderPipe.alphabeticalOrder);
    }
    return array;
  }

  static alphabeticalOrder(a :string, b:string){
    if(a>b) return 1;
    if(a<b) return -1
    if (a===b) return 0;
    return 0;
  }

}
