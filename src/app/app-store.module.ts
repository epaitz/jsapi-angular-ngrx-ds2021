import { NgModule } from '@angular/core';
import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './custom-router-state-serializer';
import { AppState } from './app.state';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';
import { mapReducer } from './map/map.reducer';
import { MapEffects } from './map/map.effects';

export const reducers: ActionReducerMap<AppState> = {
    mapState: mapReducer,
    router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([
            MapEffects
        ]),
        StoreDevtoolsModule.instrument({
          maxAge: 25
        }),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
            serializer: CustomRouterStateSerializer
        })
    ],
    providers: [
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
    ]
})
export class AppStoreModule { }
