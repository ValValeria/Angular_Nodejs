import {Component, Input, OnInit} from '@angular/core';
import {IList} from "../../Interfaces/Interfaces";

@Component({
  selector: 'app-post-content-list',
  templateUrl: './post-content-list.component.html',
  styleUrls: ['./post-content-list.component.scss']
})
export class PostContentListComponent implements OnInit {
  @Input() content: IList[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  navigate(id: string){
    const elem = document.getElementById(id);

    if(elem != null){
      elem.scrollIntoView(false);
    }
  }
}
