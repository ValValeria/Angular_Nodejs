import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {IPost} from "../../Interfaces/Interfaces";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post: IPost;
  @Output() sortby = new EventEmitter<string>();

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  onSort(category){
    this.sortby.emit(category);
  }
}
