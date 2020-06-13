import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() dropped = new EventEmitter<FileList>();

  constructor() { }

  @HostListener('drop', ['$event'])
  onDrop($event): void {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files[0]);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event): void {
    $event.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event): void {
    $event.preventDefault();
  }
}
