import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, EMPTY, of } from 'rxjs';
import { switchMap, debounceTime, startWith, map, tap, finalize } from 'rxjs/operators';
import { FrenchOrderPipe } from '../french-order.pipe';
import { Relation } from './relation';
import { HttpClient } from '@angular/common/http';

import {RequesterService} from './requester.service';
export interface relationGroup {
  letter: string;
  relations: IRelation[];
}
export interface IRelation {
  id: number;
  position: number;
  name: string;
  help: string;
}

export const _filter = (opt: IRelation[], value: string): IRelation[] => {
  const filterValue = value;
  return opt.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
};
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  selectable = true;
  removable = true;
  isSearching = false;
  searchForm: FormGroup = this.fb.group({
    relationGroup: '',
    searchWordForm:''
  });
  results = new Array<Relation>();
  relationGroups: relationGroup[] = [];
  choosenRelations: IRelation[] = [];
  options: Observable<string[]>;
  relationGroupOptions: Observable<relationGroup[]>;
  definition:string;
  isLoading=true;
  constructor(private fb: FormBuilder, private http: HttpClient, private requester: RequesterService) {
    this.getJSON().subscribe(data => {
      this.relationGroups = data;
      this.relationGroups.map(item => item.relations.sort(FrenchOrderPipe.alphabeticalOrder));
      this.relationGroupOptions = this.searchForm.get('relationGroup')!.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterGroup(value)
            .filter(group => group.relations.length > 0)
          )
        );
    });
  }

  ngAfterViewInit(){
    this.options = this.searchForm.get('searchWordForm')!.valueChanges
    .pipe( startWith(null),
      debounceTime(200),
      tap(()=>this.isLoading=true),
      switchMap(value => {
         return this.requester.getAutocomplete(value).pipe(
          finalize(()=>this.isLoading=false));
      }),
    );    
  }


  public getJSON(): Observable<any> {
    return this.http.get("./assets/relations.json");
  }
  private _filterGroup(value: string): relationGroup[] {
    if (value) {
      return this.relationGroups
        .map(group => ({ letter: group.letter, relations: _filter(group.relations, value) }))
        .filter(group => group.relations.length > 0);
    }
    return this.relationGroups;
  }

  onEnter(event: any) {
    let value;
    if (event.source != undefined) { //Si c'est mat-option
      value = this._getRelationFromName(event.source.value);
      event.source.value = "";
    } else { //Si c'est un input classique
      value = this._getRelationFromName(event.explicitOriginalTarget.value);
      event.explicitOriginalTarget.value = "";
    }
    for (let relationGroup of this.relationGroups) {
      for (let relation of relationGroup.relations) {
        let found = relationGroup.relations.indexOf(value);
        if (found != -1) {
          this.choosenRelations.push(value);
          relationGroup.relations.splice(found, 1);
        }
      }
    }
  }
  _getRelationFromName(name: string) {
    for (let relations of this.relationGroups) {
      for (let relation of relations.relations) {
        if (relation.name == name)
          return relation;
      }
    }
    return name;
  }
  remove(relation: IRelation) {
    const index = this.choosenRelations.indexOf(relation);
    if (index >= 0) {
      this.choosenRelations.splice(index, 1);
      for (let relationBrowsed of this.relationGroups) {
        if (relation.name[0].toUpperCase() === relationBrowsed.letter) {
          relationBrowsed.relations.push(relation);
          relationBrowsed.relations.sort(FrenchOrderPipe.alphabeticalOrder);
          break;
        }
      }
    }
  }

  onSubmit() {
    let wordToSearch = this.searchForm.get('searchWordForm').value;
    if (wordToSearch.trim().length > 0 && this.choosenRelations.length > 0)
      this.isSearching = true;
    this.results = [];
    this.requester.getDefinition(wordToSearch).subscribe(data=>{
      if(data != null){
       if(data['exist']){
         this.definition = "Définition : " + data['value'];
       }else{
         this.definition = "Pour obtenir une définition essayez avec : ";
         this.definition += data['value'].map(item => item.noeud.motFormate).join(', ');
         this.definition += ""
       }
      }else{
        this.definition = "Désolé, ce mot n'existe pas."
      }
    })
    for (let relation of this.choosenRelations) {
      this.results.push({
        "name": relation.name,
        "word": wordToSearch,
        words: []
      });
    }
  }
}