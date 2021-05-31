import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss']
})
export class GridLayoutComponent implements OnInit{
  @Input() min = '250px';
  @Input() max = '1fr';
  @Input() oneColumn = false;
  styles: {gridTemplateColumns: string};

  constructor() {}

  ngOnInit(): void {
    this.styles = {
      gridTemplateColumns: `repeat(auto-fit, minmax(${this.min},${this.max}))`
    };

    if(this.oneColumn){
      this.styles.gridTemplateColumns = `1fr`;
    }
  }
}
