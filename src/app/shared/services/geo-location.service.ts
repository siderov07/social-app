import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGeoLocation } from '../entities/geoLocation/geoLocation.interface';
import { GeoApi } from '../constants';

@Injectable()
export class GeoLocationService {

  constructor(private http: HttpClient) { }

  getCurrentLocation(latitude: number, longitude: number): Observable<IGeoLocation> {
    return this.http.get<IGeoLocation>(`${GeoApi.BaseURL}?latitude=${latitude}&longitude=${longitude}`);
  }
}
