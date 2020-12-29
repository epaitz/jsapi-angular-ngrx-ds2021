import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/shared/services/http-client.service";

@Injectable({
    providedIn: 'root'
})
export class BookmarksService {

    constructor(private httpClientService: HttpClientService) { }

    getBookmarks() {
        return this.httpClientService.get<any[]>('api/bookmarks')
    }
}
