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
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
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
    chooseRelation : relationGroup[];
    relationGroupOptions: Observable<relationGroup[]>;
  
    constructor(private fb: FormBuilder) {}
  
    ngOnInit() {
      this.relationGroupOptions = this.searchForm.get('relationGroup')!.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterGroup(value))
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
      const input = event.input;
      const value = event.value;
      console.log("value" + value);
    }
}
