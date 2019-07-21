import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';

import { AppState, SearchQuery } from '../../state/app.state';

@Component({
    selector: 'rb-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
    @Select(AppState.results) results$: Observable<string[]>;

    set query(value) {
        this._query = value;
        this.queryHandler.next(this._query);
    }

    get query(): string {
        return this._query;
    }

    private _query = '';
    private queryHandler: Subject<string> = new Subject();

    constructor(private store: Store, private changeRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.queryHandler
            .pipe(
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe((value: string) => {
                this.store.dispatch(new SearchQuery(value));
            });
    }

    /**
     * This is where we've navigate to the results view.
     * It's a little funky when the form is submitted using the enter key but only because the navigation doesn't really exist.
     */
    search(event: Event, query: string) {
        event.preventDefault();
        console.log(`It would be time to go to results for ${query}`);
    }

    onQueryChange({ target }: Event) {
        this.query = (target as HTMLFormElement).value.toLowerCase();
        this.queryHandler.next(this.query);
    }

    /**
     * Not that anything is waiting on this right now, but I usually put things that go into timeouts into promises for testability
     */
    async clearQuery({ target }: Event): Promise<void> {
        return new Promise<void>(resolve => {
            window.setTimeout(() => {
                this.query = '';
                (target as HTMLFormElement).value = '';
                this.changeRef.markForCheck();
                resolve();
            }, 200);
        });
    }
}
