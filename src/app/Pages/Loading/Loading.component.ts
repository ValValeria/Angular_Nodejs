import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector:"loading",
    templateUrl:"./Loading.component.html",
    styleUrls:['./Loading.component.scss'],
})
export class Loading implements OnChanges{

    @Input('isLoading') loading:boolean;
    
    constructor(public comp:ElementRef){}

    ngOnInit():void{}
    
    ngOnChanges(changes: SimpleChanges): void {
        const item = changes.loading;

        if (item.previousValue!=item.currentValue && item.currentValue) {
            setTimeout(() => {
                this.comp.nativeElement.hidden = true;
            }, 0);
        }
    }

    
}