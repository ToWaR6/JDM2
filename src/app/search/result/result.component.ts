import { Component, OnInit ,OnChanges, Input, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Relation,Word} from '../relation'
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequesterService } from '../requester.service';

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
  constructor(private requester:RequesterService){}
  ngOnChanges(changes: SimpleChanges){
    this.tabsSources = new Array<RelationTable>();
    for(let relation of this.relations){
      let relationTable = new RelationTable();
      this.requester.getJson(relation.word,relation.name,relation.entrante).subscribe(data => {
        relationTable.dataSource = new MatTableDataSource(data);
      });
      relationTable.dataSource = new MatTableDataSource();
      relationTable.name = relation.name;
      this.tabsSources.push(relationTable);
    }
  }


}
