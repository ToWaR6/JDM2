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
  displayedColumns: string[] = ['position', 'term', 'weight'];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges){
    console.log(this.sort);
    this.dataSourceInput.sort = this.sort;
    this.dataSourceInput.paginator = this.paginator;
  }
}
