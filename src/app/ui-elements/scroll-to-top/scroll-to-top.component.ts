import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollToTopComponent implements OnInit {

  showButton: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  scrollToTop(): void {
    window.scroll(0, 0);
  }

  @HostListener('window:scroll')
  scroll() {
    this.showButton = window.scrollY > 150 ? true : false;
  }
}
