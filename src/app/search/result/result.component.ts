import { Component, OnInit ,OnChanges, Input,ViewChild, SimpleChanges} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Relation,Word} from '../relation'

export class RelationTable{
  name:string;
  dataSource: MatTableDataSource<Word>
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit,OnChanges {
  @Input() relations: Relation[];
  displayedColumns: string[] = ['position', 'name', 'weight'];
  tabsSources = new Array<RelationTable>(); //array of dataSource for the tables
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges){
    this.tabsSources = new Array<RelationTable>();
    for(let relation of this.relations){
      let relationTable = new RelationTable();
      relationTable.dataSource = new MatTableDataSource<Word>(relation.words);
      relationTable.dataSource.paginator = this.paginator;
      relationTable.name = relation.name;
      this.tabsSources.push(relationTable);
    }
  }

}
