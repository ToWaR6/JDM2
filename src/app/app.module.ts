import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule,MatInputModule, MatSelectModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips'
import {MatIconModule} from '@angular/material/icon'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchComponent} from './search/search.component';
import {ResultComponent} from './search/result/result.component';
import {FrenchOrderPipe} from './french-order.pipe';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSortModule} from '@angular/material/sort';
import {TableResultComponent} from './search/result/table-result/table-result.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent,
    FrenchOrderPipe,
    TableResultComponent
  ],
  imports: [
    MatSortModule,
    MatTabsModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
