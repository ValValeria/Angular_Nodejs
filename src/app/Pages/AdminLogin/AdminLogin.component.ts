import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/Services/Auth.service';
import { Http } from 'src/app/Services/Http.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector:"admin-login",
  templateUrl:"./AdminLogin.component.html",
  styleUrls:['./AdminLogin.component.scss']
})
export class AdminLogin{
    public formGroup:FormGroup;
    public message:string=``;

    constructor(private http:Http,
                public auth:Auth,
                private route:Router,
                private snackBar: MatSnackBar){}

    ngOnInit():void{
        this.formGroup = new FormGroup({
            "email":new FormControl('',Validators.email),
            "password":new FormControl('',Validators.required),
        });

        window.onload = () => {
          this.snackBar.open("Only the super admin has an opportunity to login", "Close");
        };
    }

    submit():void{
        if(this.formGroup.valid){
            this.http.post<{status:"admin"}>('/api/login',this.formGroup.value)
            .subscribe((v)=>{
                 if(v.status == 'admin'){
                     this.auth.isAdmin = true;
                     this.route.navigateByUrl("/");
                     localStorage.setItem('auth',JSON.stringify(this.formGroup.value))
                 } else {
                     this.message = 'You are not the admin';
                 }
                 console.log(v)
            })
        } else {
            this.message = "Invalid data";
        }
    }
}
