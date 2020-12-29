import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
import { ToolsComponent } from './tools/tools.component';
import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from './app-material.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { StatusContainerComponent } from './shared/components/status-container/status-container.component';
import { BookmarksComponent } from './map/bookmarks/bookmarks.component';
import { SearchComponent } from './map/search/search.component';
import { NotificationsComponent } from './map/notifications/notifications.component';
import { MapContentsComponent } from './map/map-contents/map-contents.component';
import { SettingsComponent } from './map/settings/settings.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { MapViewComponent } from './map/map-view/map-view.component';
import { AppStoreModule } from './app-store.module';
import { AdminComponent } from './admin/admin.component';
import { ScrollableContainerComponent } from './shared/components/scrollable-container/scrollable-container.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MapComponent,
        FooterComponent,
        ToolsComponent,
        HomeComponent,
        StatusContainerComponent,
        BookmarksComponent,
        SearchComponent,
        NotificationsComponent,
        MapContentsComponent,
        SettingsComponent,
        ToolbarComponent,
        MapViewComponent,
        AdminComponent,
        ScrollableContainerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        AppMaterialModule,
        AppStoreModule,
        HttpClientModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
