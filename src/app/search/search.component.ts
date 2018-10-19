import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

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
  searchForm: FormGroup = this.fb.group({
    relationGroup: '',
  });
  
  relationGroups: relationGroup[] = [{
    letter: 'A',
    names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
  }, {
    letter: 'C',
    names: ['California', 'Colorado', 'Connecticut']
  }];

  choosenRelation :string[] = [];
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
            this.choosenRelation.push(value);
            relation.names.splice(found,1);
          }
        }
      }
    }
}
