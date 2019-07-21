import { AfterContentInit, ContentChildren, Directive, ElementRef, HostBinding, QueryList } from '@angular/core';
import { FeatureComponent } from './feature/feature.component';

/**
 * The "Angular" way to do this is to use @angular/animations. I generally try to avoid using them (not saying I won't, just not my cup of tea).
 * They're heavy, they're clunky, I don't find myself writing less code to make things happen, just different code. If you're doing complex routing transitions
 * they are definitely helpful then, but otherwise, why pass over something native that works in all major browsers?
 *
 * In the past I dealt with this with a small library of animation directives (and still use one of them for routing transitions). These days, this is the type
 * of stuff I like to put in the web component layer. They're closer to the metal already and part of the DOM, so let them be the thing manipulating it.
 * Angular then handles the higher level stuff. I have this theory about the next phase of UI Frameworks being "meta UI frameworks", I'll try to mention it.
 */
@Directive({
    selector: '[rbCarousel]'
})
export class CarouselDirective implements AfterContentInit {
    @ContentChildren(FeatureComponent) features: QueryList<FeatureComponent>;
    @HostBinding('class.sliding') sliding = false;

    private offset = 0;

    private get featureWidth() {
        return this.features.first.width;
    }

    constructor(private element: ElementRef) {}

    ngAfterContentInit() {
        this.center();
    }

    center() {
        // Hard-coding for the padding here, making this more reusable would start there.
        this.offset = (this.featureWidth + 32) * -1;
        this.element.nativeElement.style.transform = `translateX(${this.offset}px)`;
    }

    /**
     * Slide the animation left
     */
    async slideLeft(): Promise<void> {
        this.sliding = true;
        return new Promise<void>(resolve => {
            this.offset = this.offset + this.featureWidth;
            this.element.nativeElement.style.transform = `translateX(${this.offset}px)`;
            this.element.nativeElement.addEventListener('transitionend', this.listenerFactory(resolve));
        });
    }

    async slideRight(): Promise<void> {
        this.sliding = true;
        return new Promise<void>(resolve => {
            this.offset = this.offset - this.featureWidth;
            this.element.nativeElement.style.transform = `translateX(${this.offset}px)`;
            this.element.nativeElement.addEventListener('transitionend', this.listenerFactory(resolve));
        });
    }

    private listenerFactory(resolve: () => void): (e: TransitionEvent) => void {
        const listener = (e: TransitionEvent) => {
            this.sliding = false;
            e.target.removeEventListener('transitionend', listener);
            resolve();
        };
        return listener;
    }
}
