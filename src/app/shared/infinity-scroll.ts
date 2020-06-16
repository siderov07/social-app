import { Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinct, takeWhile } from 'rxjs/operators';

// Must be used with apply(this) to be able to handle 'load more' side effect

export function getInfinityScroll(): Observable<number> {
  return fromEvent(window, 'scroll').pipe(
    takeWhile(() => this.loadMore, false), // Unsubscribes if there is no more content to show
    map(() => window.scrollY), // return window vertical scroll position
    filter(current => current >=  document.body.clientHeight - window.innerHeight - 100),
    debounceTime(300), // ** //
    distinct()); // Eliminated all dublicated values
}
