import { Component, OnInit } from '@angular/core';
import { Auth } from './Services/Auth.service';
import { Http } from './Services/Http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
   
  title:string;
  loading:boolean=true;

  constructor(private http:Http,private auth:Auth){
     window.onload = ()=>this.loading = false;
  }

  ngOnInit(): void {
     try {
        const item = JSON.parse(localStorage.getItem('auth'));

        if (typeof(item)=="object" && item) {
            this.http.post<{status:"admin"}>('/api/login',item)
            .subscribe(v=>{
               if(v.status == "admin"){
                  this.auth.isAdmin = true;
               }
            })
        }
     } catch (error) {
       
     }
  }
  
}
