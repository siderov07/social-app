import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeoApi } from 'src/app/shared/constants';
import { ApiRoutes } from '../config/api/api-routes';

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
        url: ApiRoutes.BaseUrl + '/' + request.url
      });
    }

    return next.handle(request);
  }
}
