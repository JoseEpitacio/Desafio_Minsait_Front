import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  constructor() { }

  closeDialog() {
    this.close.emit();
  }
}

