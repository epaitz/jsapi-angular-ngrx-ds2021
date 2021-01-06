import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Helpers } from '../helpers/helpers';
import { RestResponse } from '../models/rest-response';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {
    constructor(private httpClient: HttpClient) {}

    public getIt<T>(url: string, options?: {}): Observable<T> {
        return this.httpClient
            .get<RestResponse<T>>(url, options)
            .pipe(
                tap((response: RestResponse<T>) => {
                    if (!Helpers.isNullOrWhitespace(response.error)) {
                        throw response.error;
                    }
                }),
                map((response: RestResponse<T>) => {
                    return response.data;
                }),
                catchError((error) => {
                    throw error;
                })
            );
    }

    public get<T>(url: string, options?: {}): Observable<T> {
        return this.httpClient
            .get<T>(url, options)
            .pipe(
                delay(2000),
                map((response: T) => {
                    return response;
                }),
                catchError((error) => {
                    console.error(error);
                    throw error;
                })
            );
    }

}
