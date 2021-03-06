import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../app.state';
import { NavigationService } from '../shared/services/navigation.service';
import { selectMapState, selectWebMap } from './map.selectors';
import { MapService } from './map.service';
import * as MapActions from './map.actions';
import { MapState } from './map.state';
import { ServiceStatusTypes } from '../shared/models/service-status.types';

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
               withLatestFrom(this.store.select(selectMapState),
                   (action: Action, mapState: MapState) => {
                       return mapState;
                   }
               ),
               mergeMap((mapState: MapState) => {
                    if (mapState.webMap != null) { return [MapActions.GetWebMapCompleted({webMapDocument: mapState.webMap})]; }
                    return this.mapService.getWebMap()
                        .pipe(
                            map((webMapDocument) => {
                                return MapActions.GetWebMapCompleted({webMapDocument: webMapDocument});
                            }),
                            catchError((error) => {
                                return of(MapActions.GetWebMapError({error: error}));
                            })
                        );

               })
           );
    });

    // webMap$ = createEffect(() => {
    //     return this.actions$
    //        .pipe(
    //            ofType(MapActions.GetWebMap),
    //            withLatestFrom(this.store.select(selectWebMap),
    //                (action: Action, webMapDocument) => {
    //                    return webMapDocument;
    //                }
    //            ),
    //            mergeMap((webMapDocument) => {
    //                if (webMapDocument != null) { return [MapActions.GetWebMapCompleted({webMapDocument: webMapDocument})]; }
    //                return this.mapService.getWebMap()
    //                    .pipe(
    //                        map((x) => {
    //                            return MapActions.GetWebMapCompleted({webMapDocument: x});
    //                        }),
    //                        catchError((error) => {
    //                            return of(MapActions.GetWebMapError({error: error}));
    //                        })
    //                    );
    //            })
    //        );
    // });

    // Create a navigation.effects.ts for this or move NavigationService into MapService
    navigationRequest$ = createEffect(() => this.actions$
        .pipe(
            ofType(MapActions.NavigationRequest),
            tap((action: any) => {
                this.navigationService.goTo(action.target);
            })
        ),
        { dispatch: false }
    );
}
