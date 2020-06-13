import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input, Optional } from '@angular/core';

@Component({
  selector: 'app-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmojiPickerComponent {

  @Input() @Optional() showAbove = false;
  @Input() @Optional() isEmojiPickerToggled = false;
  @Output() inputEmoji: EventEmitter<string> = new EventEmitter();

  constructor() { }

  onEmojiClick(event: EmojiEvent): void {
    this.inputEmoji.emit(event.emoji.native);
  }

  toggleEmojiPicker(): void {
    this.isEmojiPickerToggled = !this.isEmojiPickerToggled;
  }

  hideEmojiPicker(): void {
    this.isEmojiPickerToggled = false;
  }
}

interface EmojiEvent {
  emoji: Emoji;
}

interface Emoji {
  unified: string;
  native: string;
}
