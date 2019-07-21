import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppState, Feature, LoadFeatures } from './state/app.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'rb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @Select(AppState.features) features$: Observable<Feature[]>;

    constructor(private store: Store) {}

    ngOnInit() {
        this.store.dispatch(new LoadFeatures());
    }
}
