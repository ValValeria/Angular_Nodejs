import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import {interval} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-section-layout',
  templateUrl: './section-layout.component.html',
  styleUrls: ['./section-layout.component.scss']
})
export class SectionLayoutComponent implements OnInit, AfterViewInit{
  @Input() title: string;
  @Input() cssClass: string = "slider";
  @Input() hasTitle = true;
  @Input() noSection = false;
  private readonly CSS_CLASS = 'section__wrap-half';

  constructor(
    private view: ViewContainerRef
  ) { }

  getCssClass(block: string, ...classes: string[]): string[]{
    return [`section__${block}`, `${this.cssClass}__${block}`, ... classes];
  }

  ngOnInit(): void{
    this.addCSSClass();
  }

  ngAfterViewInit(): void{
    interval(300).pipe(take(3)).subscribe(v=>this.addCSSClass());
  }

  addCSSClass(): void{
    if(this.noSection){
      const hostElement: HTMLElement = this.view.element.nativeElement;
      const sectionWrap = hostElement.querySelector('.section__wrap');

      if(sectionWrap && typeof sectionWrap === 'object' && !sectionWrap.classList.contains(this.CSS_CLASS)){
        hostElement.querySelector('.section__wrap').classList.add(this.CSS_CLASS);
      }
    }
  }
}
