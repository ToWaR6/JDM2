import { Component, OnInit ,OnChanges, Input,ViewChild, SimpleChanges} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
export interface Word{
  position :number;
  word : string;
  weight : number;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit,OnChanges {
  @Input() words: Word[];
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = new MatTableDataSource<Word>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Word>(this.words);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges){
    this.dataSource = new MatTableDataSource<Word>(this.words);
    this.dataSource.paginator = this.paginator;
  }

}
