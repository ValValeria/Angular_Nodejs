import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, EmbeddedViewRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import {IContent, IList, IPost, IResponse} from 'src/app/Interfaces/Interfaces';
import { Auth } from 'src/app/Services/Auth.service';
import { Http } from 'src/app/Services/Http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Prism from 'prismjs';
import {element} from "protractor";


@Component({
    selector:'page-article',
    templateUrl:'./Article.component.html',
    styleUrls:['./Article.component.scss']
})
export class Article implements AfterViewInit{
    public post:IPost;
    public postId:number;
    @ViewChild('img',{read:TemplateRef}) img: TemplateRef<any>;
    @ViewChild('p',{read:TemplateRef}) p:TemplateRef<any>;
    @ViewChild('code',{read:TemplateRef}) code:TemplateRef<any>;
    @ViewChild('container',{read:ViewContainerRef}) container:ViewContainerRef;
    @ViewChild('title',{read:TemplateRef}) title:TemplateRef<any>;
    @ViewChild('list',{read:TemplateRef}) list:TemplateRef<any>;
    urls: [string, string][] = [];
    public content: IList[] = [];

    constructor(
        private http:Http,
        private router:Router,
        private route:ActivatedRoute,
        private changeRef:ChangeDetectorRef,
        public auth:Auth,
        public matSnackBar:MatSnackBar
    )
    {
      this.urls = [['/', 'Home'], [this.router.url, 'Post']];

      this.route.paramMap.subscribe(v=>{
            this.postId = Number(v.get('postId'));
            this.urls[1][0] = this.router.url;
      });
    }

    ngAfterViewInit():void{
        this.http.get<IResponse>(`/api/mypost/${this.postId}`)
        .pipe(
            catchError(e=>{
              setTimeout(async ()=>{
                await this.router.navigateByUrl('/');
              });

              return of({posts:[]});
            })
        )
        .subscribe((v)=>{
           this.post = v.posts.find(el=>el.id == this.postId);

           if(!this.post){
              return this.router.navigateByUrl('/');
           } else{
              this.showContent();
           }

           this.changeRef.detectChanges();
        })
    }

    showContent():void {
        const content1:any= JSON.parse(this.post.content as any);
        const content:IContent[] =JSON.parse(<any>content1);

        content.forEach(el=>{
            const key = Object.keys(el)[0];
            const value = Object.values(el)[0];
            switch (key) {
                case 'p':
                    this.container.createEmbeddedView(this.p,{p:value})
                    break;
                case 'h1':
                    const id = Math.random().toString();
                    this.content.push({txt: value, link: id});

                    const element: EmbeddedViewRef<HTMLElement> = this.container.createEmbeddedView(this.title,{h1:value});
                    const titleElement: HTMLElement = element.rootNodes[0];

                    titleElement.setAttribute('id', id);

                    break;
                case 'img':
                    this.container.createEmbeddedView(this.img,{img:value})
                    break;
                case 'code':
                    const code: string[] = value;
                    const htmlPattern = new RegExp('(<([^>]+)>)', 'gi');

                    if(value){
                      const result: string[] = [];
                      const languages = [Prism.languages.javascript, 'javascript'];
                      const codeStr = code.join(' ');

                      if(htmlPattern.test(codeStr)){
                        languages[0] = Prism.languages.html;
                        languages[1] = 'html';
                      }

                      code.forEach(v => {
                        result.push(Prism.highlight(v, languages[0], languages[1]).toString());
                      });

                      this.container.createEmbeddedView(this.code,{code: result});
                    }

                    break;
                case 'li':
                    this.container.createEmbeddedView(this.list,{li:value})
                    break;
                default:
                    break;
            }
        })
    }

    back():void{
        if(window.history.length > 2){
            window.history.back();
        } else{
            this.router.navigateByUrl('/posts')
        }
    }

    deletePost():void{
        this.http.get<{status:"Deleted"}>('/api/deletePost?id='+this.postId)
        .subscribe(v=>{
             if(v.status=="Deleted"){

                 this.matSnackBar.open('Your post is deleted','Close',{
                     duration:2000
                 })

                 setTimeout(()=>{
                    this.router.navigateByUrl('/');
                 },2000);
             }
        })
    }
}
