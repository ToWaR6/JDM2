import { Pipe, PipeTransform } from '@angular/core';
export interface IRelation{
  id:number;
  position:number;
  name:string;
  help:string;
}
@Pipe({
  name: 'frenchOrder'
})
export class FrenchOrderPipe implements PipeTransform {

  transform(array: Array<IRelation>, args?: any): any {

    if(array != undefined){
      array.sort(FrenchOrderPipe.alphabeticalOrder);
    }
    return array;
  }

  static alphabeticalOrder(a :IRelation, b:IRelation){
    if(a.name>b.name) return 1;
    if(a.name<b.name) return -1
    if (a.name===b.name) return 0;
    return 0;
  }

}
