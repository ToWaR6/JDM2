import { Component, OnInit ,OnChanges, Input, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Relation,Word} from '../relation'
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class RelationTable{
  name:string;
  dataSource=  new MatTableDataSource<Word>([]);
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit,OnChanges {
  @Input() relations: Relation[];
  tabsSources = new Array<RelationTable>(); //array of dataSource for the tables

  ngOnInit() {}
  constructor(private http:HttpClient){}
  ngOnChanges(changes: SimpleChanges){
    this.tabsSources = new Array<RelationTable>();
    for(let relation of this.relations){
      let relationTable = new RelationTable();
      this.getJson(relation.word,relation.name).subscribe(data => {
        relationTable.dataSource = new MatTableDataSource(data);
      });
      relationTable.dataSource = new MatTableDataSource();
      relationTable.name = relation.name;
      this.tabsSources.push(relationTable);
    }
  }

  public getJson(word, relationName): Observable<any>{
    return this.http.get("https://jdm2-server.herokuapp.com/diko/relation?mot="+word+"&relation=r_"+relationName);
  }
}
