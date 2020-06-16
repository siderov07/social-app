import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollToTopComponent {

  showButton: boolean;

  constructor() { }

  scrollToTop(): void {
    window.scroll(0, 0);
  }

  @HostListener('window:scroll')
  scroll() {
    this.showButton = window.scrollY > 150 ? true : false;
  }
}
