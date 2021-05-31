import { ChangeDetectorRef, Component, ElementRef, ViewContainerRef, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { IPost } from 'src/app/Interfaces/Interfaces';
import { Auth } from 'src/app/Services/Auth.service';
import { Http } from 'src/app/Services/Http.service';
import { animate, AnimationBuilder,  AnimationFactory, style } from '@angular/animations';
import { ViewChild } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import config from 'src/app/config';
import {skipWhile} from "rxjs/operators";

@Component({
    selector:'main-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.scss'],

})
export class Header implements AfterViewInit{
     isTouched:boolean = false;
     @ViewChild('nav',{read:ElementRef}) nav:ElementRef;
     posts:IPost[] = [];
     header: any;
     isLess: boolean;
     showNav:boolean;
     class: string = 'none';
     readonly MEDIA_HEADER: string;

     constructor(
        private _snackBar: MatSnackBar,
        private view:ViewContainerRef,
        private router:Router,
        public auth:Auth,
        public http:Http,
        public change:ChangeDetectorRef,
        public builder:AnimationBuilder)
    {
         this.isLess = false;
         this.showNav = true;
         this.MEDIA_HEADER = config.styles.mediaHeader;
     }

     ngAfterViewInit():void{
        fromEvent(window,'resize')
          .pipe(
            skipWhile(() => window.matchMedia(`(max-width: ${this.MEDIA_HEADER})`).matches)
          )
        .subscribe(this.resize.bind(this));

        this.resize();
     }


     search($value:string):void{
         const value = $value.trim().toLowerCase();
         this.isTouched = true;

         if(value.length > 3){
            this.http.get<{posts:IPost[]}>('/api/search/?search='+encodeURIComponent(value))
            .subscribe(v=>{
                this.posts=v.posts;
                this.change.detectChanges();
            })
         } else{
            this._snackBar.open('The length of string must be more than three characters', 'Close');
         }
     }

    resize():void{
        this.header = this.view.element.nativeElement.querySelector('header');

        if (window.matchMedia(`(max-width: ${this.MEDIA_HEADER})`).matches) {
            this.isLess = true;
            this.nav.nativeElement.classList.add('none');
        } else {
            this.isLess = false;
            this.nav.nativeElement.classList.remove('none');
        }
     }

    menuIcon():void{
          let factory:AnimationFactory;
          const htmlElement = this.nav.nativeElement as HTMLElement;
          const time = '0.25s';
          let func: () => void;

          if(htmlElement.classList.contains('none')){
            this.nav.nativeElement.classList.remove('none');

            factory = this.builder.build([
                style({height: 0,minHeight:'0',overflow:"hidden"}),
                animate(time,style({height: '*',minHeight:"90vh"}))
            ]);
          } else{
            factory = this.builder.build([
                style({overflow:"hidden"}),
                animate(time, style({height: '0',minHeight:"0"}))
            ]);

            func = () => {this.nav.nativeElement.classList.add('none');}
          }

          const player = factory.create(this.nav.nativeElement);
          player.play();
          player.onDone(() => {
            if(typeof func === "function"){
               func.call(this);
            }
          })
    }
}
