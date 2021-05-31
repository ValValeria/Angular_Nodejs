import { ChangeDetectorRef, Component, ElementRef, Inject, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialogRef } from '@angular/material/dialog';
import {last} from 'lodash';
import {ADD_PHOTO, DEFAULT_SETTINGS} from '../../Services/Default.service'
import { IPost } from 'src/app/Interfaces/Interfaces';

@Component({
    selector: 'tools',
    templateUrl: './Tools.component.html',
})
export class Tools {
    
    public options:string[];  
    public active:string;
    @ViewChild('file',{read:ElementRef}) file:ElementRef;
    @ViewChild('image',{read:TemplateRef}) image:TemplateRef<any>;
    @ViewChild('code',{read:TemplateRef}) code:TemplateRef<any>;
    @ViewChild('container',{read:ViewContainerRef}) container: ViewContainerRef;
    @ViewChild('p',{read:TemplateRef}) p: TemplateRef<any>;
    @ViewChild('h1',{read:TemplateRef}) h1: TemplateRef<any>;
    @ViewChild('list',{read:TemplateRef}) list: TemplateRef<any>;
    public formData:FormData;
    codesLines: string[] = [];
    isCodeBlockEnded: string[] = [];

    constructor(
      public dialogRef: MatDialogRef<Tools>,
      @Inject(DEFAULT_SETTINGS) public post:IPost,
      @Inject(ADD_PHOTO) public formdata:FormData,
      public change:ChangeDetectorRef
    ) {
        this.options = ["new_line","image","code",'title','list'];
        this.formData = new FormData();
    }
    
    ngAfterViewInit():void{
        setTimeout(()=>{
            for (const v of this.post.content) {
                const [key,value] = Object.entries(v)[0];
                if(value){
                   switch (key) {
                       case 'p':
                           this.container.createEmbeddedView(this.p,{p:value});
                           break;
                       case 'code':
                           this.container.createEmbeddedView(this.code,{code:value});
                           break;
                       case 'img':
                           this.container.createEmbeddedView(this.image,{url:value});
                           last(Array.from(<NodeListOf<HTMLImageElement>>document.querySelectorAll(`img`))).src = value as string;
                           break;
                       case 'li':
                           this.container.createEmbeddedView(this.list,{li:value});
                           break;
                       default:
                           break;
                   }
                }
           }
        },0)
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    changeTool($event:MatButtonToggleChange):void{

        if(this.options.includes($event.value)){
          this.active = $event.value;
        }
    }

    fileUpload():void{

       this.file.nativeElement.click();

       const file:File = last(this.file.nativeElement.files);

       if(file.type.includes('image/')){
          
          const fileReader = new FileReader();

          fileReader.readAsArrayBuffer(file);

          fileReader.onload = (e)=>{
              const fileName:string = Math.random()+file.name;

              const blob = new Blob([new Uint8Array(e.target.result as ArrayBufferLike)],{type:file.type});

              this.formData.append('photos',blob,fileName);
 
              const url = URL.createObjectURL(blob);
             
              this.container.createEmbeddedView(this.image,{url:url});

              const elem = last(Array.from(<NodeListOf<HTMLImageElement>>document.querySelectorAll(`img`)));
   
              elem.src = url;

              this.post.content.push({img:url})
          }
       }
    }


    addLine(line:HTMLInputElement,isErase:boolean=false): void{
        const obj = {p:line.value};
        this.post.content.push(obj)
        this.container.createEmbeddedView(this.p,obj);

        if (isErase) {
            line.value="";
        }
    }

    erase():void{
        this.post.content = [];
        this.container.clear();
        this.change.detectChanges();
    }
      
    addCode(input:HTMLInputElement):void{
        const str:string[] = input.value.split("\n");
        this.container.createEmbeddedView(this.code,{code:str});
        this.post.content.push({code:str})
        input.value = '';
        this.change.detectChanges();
    }

    addTitle(input:HTMLInputElement,isErase:boolean=false):void{
        const str = input.value;
        this.post.content.push({h1:str})
        this.container.createEmbeddedView(this.h1,{h1:str});

        if(isErase){
            input.value="";
        }
    }

    addList(input:HTMLInputElement,isErase:boolean=false):void{
        this.post.content.push({li:input.value});
        this.container.createEmbeddedView(this.list,{li:input.value});
        input.value = ''
    }

}