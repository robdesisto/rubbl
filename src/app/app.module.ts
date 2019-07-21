/**
 * Was really tempted to do this just with Web Components because Angular is way, way, WAY overkill, but I figured ya'll wanted to see how I worked in
 * your stack.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppState } from './state/app.state';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

/**
 * The actual page-specific content would DEFINITELY be in a separate module normally.
 */
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselDirective } from './carousel/carousel.directive';
import { FeatureComponent } from './carousel/feature/feature.component';

/**
 * There's some back and fourth in the NG community on whether the application chrome should be in the app module or in the "core" module.
 * IRL, our application chrome is a central library of web components (what I refer to as "black box" web components) with a second module of Angular magic
 * sprinkled on top for the Angular runtimes, so I don't really have a horse in that particular race usually. For simplicity I'll put them here, but in a
 * MFE ecosystem they should be handled uniformly without the application builders having to deal with them.
 */
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './header/search/search.component';

@NgModule({
    declarations: [
        AppComponent,
        CarouselComponent,
        CarouselDirective,
        FeatureComponent,
        HeaderComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        NgxsModule.forRoot([AppState], { developmentMode: !environment.production }),
        SharedModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
