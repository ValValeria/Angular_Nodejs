import {Component, Input, OnInit} from '@angular/core';
import {IList} from "../../Interfaces/Interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-simple',
  templateUrl: './card-simple.component.html',
  styleUrls: ['./card-simple.component.scss']
})
export class CardSimpleComponent implements OnInit {
  @Input() image = "";
  @Input() title = "";
  @Input() list: IList[] = [];
  @Input() isEmpty = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  async navigate(link: string){
    await this.router.navigateByUrl(link);
  }
}
