import { AfterContentInit, ContentChildren, Directive, HostBinding, OnDestroy, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';

import { ResultDirective } from './result.directive';

/**
 * This works differently than the source material, but they're hard-coding the height to 150px and then adjusting down which is not super user friendly.
 * That only works for them because their font sizes are in PX instead of responsive REMs.
 */
@Directive({
    selector: '[rbResultList]'
})
export class ResultListDirective implements AfterContentInit, OnDestroy {
    @HostBinding('style.height.px') height = 0;
    @ContentChildren(ResultDirective) results: QueryList<ResultDirective>;

    private resultsSub: Subscription;

    ngAfterContentInit() {
        this.resultsSub = this.results.changes.subscribe({
            next: this.onResultsChange.bind(this)
        });
    }

    ngOnDestroy() {
        this.resultsSub.unsubscribe();
    }

    private onResultsChange(changes: QueryList<ResultDirective>) {
        this.height = changes.toArray().reduce((a: number, c: ResultDirective) => a + c.height, 0);
    }
}
