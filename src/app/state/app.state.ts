import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AppService } from './app.service';
import { tap } from 'rxjs/operators';

/**
 * If using Angular for this is overkill, then this is super, mega overkill, but again trying to set things up like its at least semi-legit.
 */

export interface Feature {
    src: string;
    cta: string;
}

export class LoadFeatures {
    static readonly type = '[App] LoadFeatures';
}

export class SearchQuery {
    static readonly type = '[App] SearchQuery';

    constructor(public query: string) {}
}

export class AppStateModel {
    results: string[];
    features: Feature[];
}

@State<AppStateModel>({
    name: 'App',
    defaults: {
        results: [],
        features: []
    }
})
export class AppState {
    @Selector()
    static results(state: AppStateModel) {
        return state.results;
    }

    @Selector()
    static features(state: AppStateModel) {
        return state.features;
    }

    constructor(private service: AppService) {}

    @Action(SearchQuery)
    public getResults({ patchState }: StateContext<AppStateModel>, { query }: SearchQuery) {
        return this.service.getResults(query).pipe(tap((results: string[]) => {
            patchState({ results });
        }));
    }

    @Action(LoadFeatures)
    public getFeatures({ patchState }: StateContext<AppStateModel>) {
        return this.service.getFeatures().pipe(tap((features: Feature[]) => {
            patchState({ features });
        }));
    }
}
