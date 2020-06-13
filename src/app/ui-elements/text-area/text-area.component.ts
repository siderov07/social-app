import {
  Component, OnInit, Input, Output, EventEmitter,
  ChangeDetectionStrategy, Optional, ViewChild,
  ElementRef, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextAreaComponent implements OnInit, AfterViewInit {

  @Input() @Optional() showAbove = true;
  @Input() placeholder: string;
  @Input() toggleSubmit: boolean;
  @Input() @Optional() value = '';
  @Output() contentInput: EventEmitter<string> = new EventEmitter();
  @Output() submitInput: EventEmitter<string> = new EventEmitter();
  @ViewChild('inputField') inputField: ElementRef<HTMLTextAreaElement>;
  toggleEmoji: boolean;
  maxRows = 10;

  constructor() { }

  ngOnInit(): void {
    if (!this.placeholder) {
      throw new Error('Text area placeholder must have value');
    }

    // Trims the new lines and empty spaces
    this.value = this.value.replace('\n', '').trim();
  }

  // Focuses if there is provided data to the input (used for UX)
  ngAfterViewInit(): void {
    if (this.value) {
      this.inputField.nativeElement.focus();
    }
  }

  // Emits current value of the text area
  onInput(): void {
    this.contentInput.emit(this.value);
  }

  // Update current value with emoji and emites the new value
  onEmoji(emoji: string): void {
    this.value += emoji;
    this.contentInput.emit(this.value);
  }

  // Emits current value and handles UX
  submitForm(): void {
    this.toggleEmoji = false;

    this.maxRows = 2;
    setTimeout(() => this.maxRows = 10); // Used to fix a glitch with resizing in the text area

    this.submitInput.emit(this.value);
    this.value = null;
  }
}
