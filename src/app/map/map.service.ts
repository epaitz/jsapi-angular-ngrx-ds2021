import { Injectable } from '@angular/core';
import WebMap from '@arcgis/core/WebMap';
import { Observable } from 'rxjs';
import { HttpClientService } from '../shared/services/http-client.service';

@Injectable({
    providedIn: 'root',
})
export class MapService {

    constructor(private httpClientService: HttpClientService) { }

    getWebMap(): Observable<WebMap> {
        return this.httpClientService.get<WebMap>('api/webmap');
    }
}
