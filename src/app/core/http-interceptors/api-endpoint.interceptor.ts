import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeoApi } from 'src/app/shared/constants';

@Injectable()
export class EndpointInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes(GeoApi.BaseURL)) {
      request = request.clone({
        url: request.url
      });
    } else {
      request = request.clone({
        url: environment.apiUrl + '/' + request.url
      });
    }

    return next.handle(request);
  }
}
