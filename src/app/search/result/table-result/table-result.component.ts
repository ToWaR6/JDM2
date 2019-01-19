import { Component, OnInit, OnChanges, Input,ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { _isNumberValue } from '@angular/cdk/coercion';
import { DataSource } from '@angular/cdk/table';
import { Word } from '../../relation'
@Component({
  selector: 'app-table-result',
  templateUrl: './table-result.component.html',
  styleUrls: ['./table-result.component.css']
})
export class TableResultComponent implements OnInit, OnChanges {
  @Input() dataSourceInput: MatTableDataSource<Word>;
  @Output() wordSelected=  new EventEmitter<String>();
  displayedColumns: string[] = ['position', 'noeud.motFormate', 'poids'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit() {

  }

  selectRow(row){
    this.wordSelected.emit(row.noeud.motFormate);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.dataSourceInput.sortingDataAccessor = this.customSortingDataAccessor;
    this.dataSourceInput.sort = this.sort;
    this.dataSourceInput.sortData = this.customSortData;
    this.dataSourceInput.paginator = this.paginator;
  }
  /**
   * Custom sorting data Accessor to access a property 
   * @returns string | number
   */
  customSortingDataAccessor = (item, property) : number|string => {
    switch (property) {
      case ("noeud.motFormate"):
        return item.noeud.motFormate;
      default: return item[property];
    }
  };

  /**
   * This function is use to locally compare string  and compare number
   * It's an arrow function to not loose this (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions/Fonctions_fl%C3%A9ch%C3%A9es)
   */
  customSortData = (data, sort): Word[] =>{
    const active = sort.active;
    const direction = sort.direction;
    if (!active || direction == '') { return data; }
    return data.sort((a, b) => {
      let valueA = this.customSortingDataAccessor(a, active);
      let valueB = this.customSortingDataAccessor(b, active);
      let comparatorResult = 0;
      if (valueA != null && valueB != null) {
        if (_isNumberValue(valueA) && _isNumberValue(valueB)) { //Si c'est un poid
          if (valueA > valueB) {
            comparatorResult = 1;
          } else if (valueA < valueB) {
            comparatorResult = -1;
          }
        }
        else {
          valueA = valueA.toString().toLocaleLowerCase();
          valueB = valueB.toString().toLocaleLowerCase();
          comparatorResult = valueA.localeCompare(valueB)
        }
      } else if (valueA != null) {
        comparatorResult = 1;
      } else if (valueB != null) {
        comparatorResult = -1;
      }
      return comparatorResult * (direction == 'asc' ? 1 : -1);
    });
  }
}
