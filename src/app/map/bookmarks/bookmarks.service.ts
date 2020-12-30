import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { Bookmark } from './bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarksService {

    constructor(private httpClientService: HttpClientService) { }

    getBookmarks(): Observable<Bookmark[]> {
        return this.httpClientService.get<Bookmark[]>('api/bookmarks');
    }
}
