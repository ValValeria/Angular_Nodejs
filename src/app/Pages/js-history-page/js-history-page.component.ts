import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-js-history-page',
  templateUrl: './js-history-page.component.html',
  styleUrls: ['./js-history-page.component.scss']
})
export class JsHistoryPageComponent implements OnInit {
  urls: [string, string][];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.urls = [['/', 'Home'], ['/', this.router.url]];
  }
}
