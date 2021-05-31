import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import { IPost, IResponse } from 'src/app/Interfaces/Interfaces';
import { Http } from 'src/app/Services/Http.service';
import {Router} from "@angular/router";

@Component({
   selector:"articles",
   templateUrl:'./Articles.component.html',
   styleUrls:['./Articles.component.scss']
})
export class Articles {
    urls: [string, string][];
    public articles:IPost[] = [];
    public latest_articles: IPost[] = [];
    public pageSize:number=3;
    public length:number=10;
    public pageIndex:number=1;
    public httpRequest:boolean = false;
    public isCat:boolean = false;
    category: string;

    constructor(private service:Http,private changeDetector:ChangeDetectorRef, public router: Router){}

    ngOnInit(): void {
       this.getPosts();

       this.urls = [['/', 'Home'], ['/posts', 'Posts']];
    }

    pageChange($event:PageEvent):void{
       this.pageIndex=$event.pageIndex+1;

       if(this.isCat){
          this.getPosts('/api/categories-sort?page='+this.pageIndex+'&category='+this.category);
       } else{
          this.getPosts();
       }
    }

    getPosts(url?:string):void{
        this.service.get<IResponse>(url||'/api/javascriptposts/?page='+this.pageIndex)
        .subscribe((v)=>{
            this.articles = v.posts;
            this.latest_articles = v.latest_posts;
            this.length = v.posts_count;
            this.pageSize = v.posts_per_page;
            this.changeDetector.detectChanges();
            this.httpRequest = true;
        })
    }

    sortby(cat:string):void{
        this.pageIndex = 1;
        this.getPosts('/api/categories-sort?page='+this.pageIndex+'&category='+cat);
        this.isCat = true;
        this.category = cat;
    }

    undo():void{
        this.isCat = false;
        this.category = '';
        this.getPosts();
    }
}
