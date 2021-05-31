import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BannerComponent implements OnInit {
  @Input() title = "";
  @Input() description = "";
  @Input() link = "";
  @Input() img = "";

  constructor() {
    this.title = "JavaScript Development";
    this.description = " Discover the language that gives you the freedom to create, design, manage and develop your web presence exactly the way you want.";
    this.img = "/assets/editor.webp";
  }

  ngOnInit(): void {
  }

}
