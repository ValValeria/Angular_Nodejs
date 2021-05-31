import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input, IterableDiffer, IterableDiffers,
  OnChanges, OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {fromEvent} from "rxjs";
import config from 'src/app/config';


@Component({
  selector: 'app-flex-layout',
  templateUrl: './flex-layout.component.html',
  styleUrls: ['./flex-layout.component.scss']
})
export class FlexLayoutComponent implements OnChanges, AfterViewChecked, OnInit {
  @Input() cols: number;
  @Input() flex: number[];
  @ViewChild('items', {read: ElementRef}) itemsHolder: ElementRef;
  @Input() changeOrder = false;
  private diff: IterableDiffer<number>;

  constructor(
    private iterableDiffers: IterableDiffers
  ) {
    this.flex = [];
  }

  ngOnInit(): void {
    this.diff = this.iterableDiffers.find(this.flex).create();

    window.onload = () => this.setStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.flex.length === 0){
      switch (this.cols) {
        case 2:
          this.flex = [48, 52];
          break;
        case 3:
          this.flex = new Array(3).fill(100/3);
          break;
      }

      if(this.changeOrder){
        this.flex.reverse();
      }
    }
  }

  ngAfterViewChecked(): void{
    const changes = this.diff.diff(this.flex);

    if(changes !== null){
      this.setStyle();
    }
  }

  setStyle(): void{
    const element: HTMLDivElement = this.itemsHolder.nativeElement;
    const children: HTMLElement[] = Array.from(element.children) as HTMLElement[];

    children.forEach((v, index) => {
      v.classList.add('flex__item');

      const func = () => {
        const mediaHeader = parseInt(config.styles.mediaHeader);

        if(window.matchMedia(`(max-width: ${mediaHeader - 500}px)`).matches){
          v.style.cssText = `
           flex: 1 1 100%;
           max-width: 90%;
           width: 90%;
           margin-bottom: ${config.styles.margin};
        `;
        } else {
          v.style.cssText = `
      flex: 1 1 ${this.flex[index] || 100}%;
      max-width: ${this.flex[index] || 100}%;
      width: ${this.flex[index] || 100}%;
      margin-right: ${config.styles.margin};
      `;

          if(index !== 0 && index !== children.length-1){
            v.style.cssText += `
          margin-right: ${config.styles.margin};
          margin-left: 0;
        `;
          } else if(children.length === 2 && index == 1){
            v.style.cssText += `
          margin-left: ${config.styles.margin};
          margin-right: 0;
        `;
          } else if(children.length == index+1){
            v.style.cssText += `
          margin-right: 0;
        `;
          }
        }
      };

      fromEvent(window, 'resize')
        .subscribe(() => {
           func.apply(this);
        });

      func.apply(this);
    });
  }
}
