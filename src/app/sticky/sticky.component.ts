import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

export class Sticky {
  public StickyId: number = 0;
  public Name: string = '';
  public X: number = 0;
  public Y: number = 0;
  public Color: string = '';

}

@Component({
  selector: 'app-sticky',
  templateUrl: './sticky.component.html',
  styleUrls: ['./sticky.component.css']
})
export class StickyComponent implements OnInit {

  @Input() sticker: Sticky;
  @Output() selected = new EventEmitter<Sticky>();
  @Output() newLeftTop = new EventEmitter<Sticky>();

  // *** Switch between dragMode and Normal Mode: ***
  public dragMode: boolean = false;
  public mouseEntered: boolean = false;

  // *** Store the position of the MouseDownEvent: **
  private mouseDownLeft: number;
  private mouseDownTop: number;

  // *** Store the positon of the draggable element at the time of mouse down:
  private draggableLeft: number;
  private draggableTop: number;

  // *** Define the cursor: ***
  public cursor = 'text';

  constructor() { }

  ngOnInit() {
  }



  @HostListener('mouseenter', ['$event']) onMouseEnter(event: any) {
    console.log("mouseenter");
    this.mouseEntered = true;
    this.cursor = 'text';
  }

  //The mousedown event is fired when a pointing device button is pressed on an element.
  @HostListener('mousedown', ['$event']) onMouseDown(event: any) {
    console.log("*** mousedown ");
    if (this.mouseEntered == true) {
      this.dragMode = true;
      // Store, where we start the mouse move
      this.mouseDownLeft = event.clientX;
      this.mouseDownTop = event.clientY;

      console.log('mousedown:' + this.mouseDownLeft + ' && ' + this.mouseDownTop);
      this.cursor = 'move';
    }
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: any) {
    console.log("mousemove ");
    if (this.mouseEntered == true) {
      if (this.dragMode == true) {
        // calculate the move in PX since mouse down
        const deltaLeft = event.clientX - this.mouseDownLeft;
        const deltaTop = event.clientY - this.mouseDownTop;

        this.sticker.X = deltaLeft;
        this.sticker.Y = deltaTop;

        console.log('mousemove:' + deltaLeft + ' && ' + deltaTop);
      }
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: any) {
    console.log("mouseleave");
    this.dragMode = false;
    this.cursor = 'text';
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event: any) {
    console.log("mouseup ");
    this.dragMode = false;
    this.cursor = 'text';
  }

  onSelected() {
    console.log('selected');
    this.dragMode = !this.dragMode;
    if (this.dragMode) {
      this.cursor = 'move';
    }
    this.selected.emit(this.sticker);
  }
}
