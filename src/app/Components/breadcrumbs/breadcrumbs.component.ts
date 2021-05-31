import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() urls: [string, string][] = [];

  constructor(private router: Router) { }

  isActivePage(url: string): boolean {
    const isActive = this.router.isActive(url, true);
    return isActive;
  }

  ngOnInit(): void {
  }
}
