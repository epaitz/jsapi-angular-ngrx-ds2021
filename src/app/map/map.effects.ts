import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../app.state';
import { NavigationService } from '../shared/services/navigation.service';
import { selectWebMap } from './map.selectors';
import { MapService } from './map.service';
import * as MapActions from './map.actions';

@Injectable()
export class MapEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private mapService: MapService,
        private navigationService: NavigationService) {
    }

    webMap$ = createEffect(() => {
        return this.actions$
           .pipe(
               ofType(MapActions.GetWebMap),
               withLatestFrom(this.store.select(selectWebMap),
                   (action: Action, webMap) => {
                       return webMap;
                   }
               ),
               mergeMap((webMap) => {
                   if (webMap != null) { return [MapActions.GetWebMapCompleted({webMap: webMap})]; }
                   return this.mapService.getWebMap()
                       .pipe(
                           map((x) => {
                               return MapActions.GetWebMapCompleted({webMap: x});
                           }),
                           catchError((error) => {
                               return of(MapActions.GetWebMapError({error: error}));
                           })
                       );
               })
           );
    });
}
