import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectUnsubscribedError } from 'rxjs';
import { IComments } from 'src/app/Interfaces/Interfaces';
import { Http } from 'src/app/Services/Http.service';

@Component({
    selector:"comments",
    templateUrl:"./Comments.component.html",
    styleUrls:['./Comments.component.scss']
})
export class Comments{
    public comments:IComments[];
    message: string;
    @Input() postId:number;
    prevUsername:string;

    constructor(private _snackBar:MatSnackBar,private http:Http){
        this.comments = []
        this.prevUsername = localStorage.getItem('username') ?? '';
    }

    ngOnInit():void{
        this.http.get<IComments[]>('/api/comments/?postId='+this.postId)
        .subscribe(v=>{
            this.comments = v;
        })
    }
     
    submit(username:string,message:string):void{
        const u_l = username.trim().length;
        const m_l = message.trim().length;
        localStorage.setItem('username',username)

        if(u_l > 10 && u_l <20 && m_l<200 && m_l >10){

           const obj = {username:username,message:message};
           
           this.comments.unshift(obj);

           this.message = '';

           this.http.post('/api/createcomments',{...obj,postId:this.postId} as any)
           .subscribe(v=>{
              this._snackBar.open('Your comment is saved','Close',{
                  duration:9000
               });
           });
        } else {
           this.message = 'Invalid data';
        }
    }
}