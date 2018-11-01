import { Component, OnInit ,OnChanges, Input,ViewChild, SimpleChanges} from '@angular/core';
import {MatSort,MatPaginator, MatTableDataSource} from '@angular/material';
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
  displayedColumns: string[] = ['position', 'name', 'weight'];
  tabsSources = new Array<RelationTable>(); //array of dataSource for the tables
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges){
    console.log(this.sort);
    this.tabsSources = new Array<RelationTable>();
    for(let relation of this.relations){
      let relationTable = new RelationTable();
      relationTable.dataSource = new MatTableDataSource(relation.words);

      relationTable.dataSource.sort = this.sort;
      relationTable.dataSource.paginator = this.paginator;
      relationTable.name = relation.name;
      this.tabsSources.push(relationTable);
    }
  }

  resetPagination(){
    this.paginator.firstPage();
  }
}
