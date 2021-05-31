import { TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Tools } from 'src/app/Components/Tools/Tools.component';
import { IPost } from 'src/app/Interfaces/Interfaces';
import { ADD_PHOTO, DEFAULT_SETTINGS } from 'src/app/Services/Default.service';
import { Http } from 'src/app/Services/Http.service';


interface IAdmin{
    isOpened:boolean,
    post:IPost
}

const MAIN_IMG_NAME = "main_img_dfile";

@Component({
    selector:'create-post',
    templateUrl:"./Admin.component.html"
})
export class Admin implements IAdmin{
    
    public isOpened:boolean = false;
    public formData:FormData = new FormData();
    @ViewChild('file',{read:ElementRef}) file : ElementRef;
    @ViewChild('imageContainer',{read:TemplateRef}) imageContainer : TemplateRef<any>;
    @ViewChild('container',{read:ViewContainerRef}) container:ViewContainerRef;
    formGroup: FormGroup;
    message: string = ``;
    imgIsUploaded: boolean;
    categories:"angular"|"react";
    isLoaded: boolean;
    public id:number=0;

    constructor( public dialog: MatDialog,
                 @Inject(DEFAULT_SETTINGS) public post:IPost,
                 @Inject(ADD_PHOTO) public formdata:FormData,
                 private bd:FormBuilder,
                 private http:Http
                ) {}
     
    public ngOnInit():void{
        this.formGroup = this.bd.group({
            title:[null,[Validators.minLength(10),Validators.maxLength(30),Validators.required]],
            excerpt:[null,[Validators.minLength(10),Validators.maxLength(200),Validators.required]],
        });
    }

    public edit():void{

         const dialogRef = this.dialog.open(Tools,{
             width:"70vw",
             height:"80vh"
         });

         this.isOpened = true;

         dialogRef.afterClosed().subscribe(result => {
            this.isOpened = false;
         });

    }

    public fileLoading(files:FileList):void{
        const file = files[0];
        if(file.type.includes('image/')){
          
            const fileReader = new FileReader();
  
            fileReader.readAsArrayBuffer(file);
  
            fileReader.onload = (e)=>{
                const fileName:string = Math.random()+MAIN_IMG_NAME+file.name;
                const blob = new Blob([new Uint8Array(e.target.result as ArrayBufferLike)],{type:file.type});
                this.formData.append('photos',blob,fileName);            
                const url = URL.createObjectURL(blob);        
                this.container.createEmbeddedView(this.imageContainer,{});         
                this.imgIsUploaded = true;

                queueMicrotask(()=>{
                    document.querySelector('.imageContainer img').setAttribute('src',url);       
                })
            }
         }
    }

    submit($event:Event):void{

        $event.preventDefault();
        
        if(this.formGroup.valid && this.imgIsUploaded){
             
            const obj:IPost = {...this.post,...this.formGroup.value,categories:this.categories}

            for (const [key,value] of Object.entries(obj)) {
                 if(value){
                    if(key=='content') {
                       this.formData.append(key,JSON.stringify(value));
                    } else{
                       this.formData.append(key,value);
                    }
                 }
            }

            this.http.post<{status:"ok",id:number}>('/api/createpost',this.formData)
            .subscribe((v)=>{
                     this.isLoaded = true;
                     this.id = (<any>v).id;
                     this.message=""
            })
            
        } else {
            this.message = "Invalid data";
        }
    }

    click(_$event:Event):void{
        this.file.nativeElement.click();
    }
}