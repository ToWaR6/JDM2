import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { FrenchOrderPipe } from '../french-order.pipe';
import {Relation} from './relation';

export interface relationGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  selectable = true;
  removable = true;
  isSearching = false;
  searchForm: FormGroup = this.fb.group({
    relationGroup: '',
  });
  results  = new Array<Relation>();
  relationGroups: relationGroup[] = [{
    letter: 'A',
    names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
  }, {
    letter: 'C',
    names: ['California', 'Colorado', 'Connecticut']
  }];


  choosenRelations :string[] = [];
  relationGroupOptions: Observable<relationGroup[]>;
    
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.relationGroupOptions = this.searchForm.get('relationGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value)
        .filter(group => group.names.length > 0)
        )
        
      );
  }
  
    private _filterGroup(value: string): relationGroup[] {
      if (value) {
        return this.relationGroups
          .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
          .filter(group => group.names.length > 0);
      }
      return this.relationGroups;
    }

    onEnter(event : any){
      let value;
      if(event.source != undefined) { //Si c'est mat-option
        value = event.source.value;
        event.source.value = "";
      }else{ //Si c'est un input classique
        value = event.explicitOriginalTarget.value;
        event.explicitOriginalTarget.value ="";
      }
      for(let relation of this.relationGroups){
        for(let name of relation.names){
          let found = relation.names.indexOf(value);
          if(found != -1){
            this.choosenRelations.push(value);
            relation.names.splice(found,1);
          }
        }
      }
    }

    remove(relationName :string){
      const index = this.choosenRelations.indexOf(relationName);

      if(index >=0){
        this.choosenRelations.splice(index,1);
        for(let relationBrowsed of this.relationGroups){
          if(relationName[0]===relationBrowsed.letter){
            relationBrowsed.names.push(relationName); 
            relationBrowsed.names.sort(FrenchOrderPipe.alphabeticalOrder);
            break;
          }
        }
      }
    }

    onSubmit(){
      this.isSearching = true;
      this.results = [
        {
          name :"is_a",
          words: [
            {term:"chien",weight:1},
            {term :"chat",weight:0.0243}
          ]
        },{
          name :"is_not",
          words: [
            {term:"oiseau",weight:1},
            {term :"humain",weight:1}
          ]
        }
      ];
    }
}
