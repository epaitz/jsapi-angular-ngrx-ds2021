import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebMapDocument } from '../shared/models/webmap-document';
import { HttpClientService } from '../shared/services/http-client.service';

@Injectable({
    providedIn: 'root',
})
export class MapService {

    constructor(private httpClientService: HttpClientService) { }

    getWebMap(): Observable<WebMapDocument> {
        return this.httpClientService.get<WebMapDocument>('api/webmap');
    }
}
