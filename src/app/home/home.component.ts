import { Component, OnInit } from '@angular/core';
import { Sticky } from '../sticky/sticky.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentSticker: Sticky;
  constructor() {
  }

  ngOnInit() {
    this.currentSticker = new Sticky;
    this.currentSticker.Name = 'New Sticker';
    this.currentSticker.StickyId = 1;
    this.currentSticker.X = 55;
    this.currentSticker.Y = 55;
  }

  onStickerSelected(s: Sticky) {
    this.currentSticker = s;
  }
}
