import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/internal/operators';

@Injectable()
export class Http{
    
     constructor(private http:HttpClient){
     }

     public get<T>(url:string):Observable<T>{
        const obj = {
            headers: new HttpHeaders().set('Auth',localStorage.getItem('auth')||''),
        };  

        return this.http.get<T>(url,obj);
     }

     public post<T>(url:string,formdata:FormData|{email:string,password:string}):Observable<T|{status:string}>{
     
        const obj = {
            headers: new HttpHeaders().set('Auth',localStorage.getItem('auth')||''),
        };
      
        return this.http.post<T>(url,formdata,obj);
    }
}