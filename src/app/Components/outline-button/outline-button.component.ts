import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-outline-button',
  templateUrl: './outline-button.component.html',
  styleUrls: ['./outline-button.component.scss']
})
export class OutlineButtonComponent implements OnInit {
  @Input() cssClass: string = 'h5';
  @Input() txt: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
