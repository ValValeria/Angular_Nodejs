import {Component} from '@angular/core';
import {IList, IPost} from 'src/app/Interfaces/Interfaces';
import {Http} from 'src/app/Services/Http.service';

type frameworks = 'react' | 'angular';

@Component({
    selector:"topics",
    templateUrl:"./Topics.component.html",
    styleUrls:['./Topics.component.scss'],
})
export class Topics{

    public react:IPost[] = [];
    public angular:IPost[] = [];
    public state:string = "initial";
    public data: {[prop in frameworks]: any} = {react: {}, angular: {}};
    public frameworksList: string[] = [];
    urls: [string, string][];
    isLoading = true;

    constructor(private http:Http){}

    ngOnInit():void{
      this.urls = [['/', 'Home'], ['/topics', 'Topics']];

      this.http.get<{posts:IPost[]}>('/api/categories')
       .subscribe((v)=>{
           this.react = v.posts.filter(v=>v.categories == 'react');
           this.angular = v.posts.filter(v=>v.categories == "angular")

           this.data['react']['list'] = this.react.map(v=>({
             link: '/post'+v.id,
             txt: v.title,
           }));
           this.data.react['image'] = '/assets/react_logo.png';

           this.data['angular']['list'] = this.angular.map(v=>({
             link: '/post/'+v.id,
             txt: v.title,
           }));
           this.data.angular['image'] = '/assets/angular_logo.png';

           this.data['react']['title'] = 'React';
           this.data['angular']['title'] = 'Angular';
           this.frameworksList = Object.keys(this.data);

           this.isLoading = false;
       });

       this.state="expanded"
    }
}
