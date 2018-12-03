import { Component, OnInit, OnChanges,ViewChild,Input, SimpleChanges} from '@angular/core';
import {MatSort,MatPaginator, MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import {Word} from '../../relation'
@Component({
  selector: 'app-table-result',
  templateUrl: './table-result.component.html',
  styleUrls: ['./table-result.component.css']
})
export class TableResultComponent implements OnInit, OnChanges{
  @Input() dataSourceInput: MatTableDataSource<Word>;
  displayedColumns: string[] = ['position', 'noeud.motFormate', 'poids'];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges){
    this.dataSourceInput.sortingDataAccessor = (item, property) => {
      switch(property) {
        case("noeud.motFormate") :
          return item.noeud.motFormate.toLowerCase();
        default: return item[property];
      }
    };
    this.dataSourceInput.sort = this.sort;
    this.dataSourceInput.paginator = this.paginator;
  }
}
