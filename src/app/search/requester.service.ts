import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,EMPTY} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequesterService {
  url  = "https://jdm2-server.herokuapp.com/diko";
  
  constructor(private http: HttpClient) { }
  
  public getAutocomplete(word): Observable<any>{
    if(word != null && word.length >0){
      return this.http.get(this.url+ "/word?begin="+word);
    }
    return EMPTY;
  }

  public getDefinition(word): Observable<any>{
    if(word != null && word.length >0){
      return this.http.get(this.url+"?mot="+word);
    }
    return EMPTY;
  }

  public getJson(word, relationName): Observable<any>{
    return this.http.get(this.url + "/relation?mot="+word+"&relation=r_"+relationName);
  }
}

