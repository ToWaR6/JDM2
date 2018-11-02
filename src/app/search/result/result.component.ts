import { Component, OnInit ,OnChanges, Input, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Relation,Word} from '../relation'

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
  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges){
    this.tabsSources = new Array<RelationTable>();
    for(let relation of this.relations){
      let relationTable = new RelationTable();
      relationTable.dataSource = new MatTableDataSource(relation.words);
      relationTable.name = relation.name;
      this.tabsSources.push(relationTable);
    }
  }
}
