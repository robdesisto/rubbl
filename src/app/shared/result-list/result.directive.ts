import { Directive, ElementRef } from '@angular/core';

/**
 * This and its sibling directive aren't really generic enough to be in shared, but grabbing the height as it exists instead of hard-coding it is a start.
 */
@Directive({
    selector: '[rbResult]'
})
export class ResultDirective {
    get height() {
        return this.element.nativeElement.offsetHeight;
    }

    constructor(private element: ElementRef) {}
}
