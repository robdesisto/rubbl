import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Feature } from '../state/app.state';
import { CarouselDirective } from './carousel.directive';

@Component({
    selector: 'rb-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnChanges {
    @Input() features: Feature[];

    @ViewChild(CarouselDirective) carousel: CarouselDirective;

    constructor(private changeRef: ChangeDetectorRef) {}

    /**
     * When the src array changes, clone this to give ourselves some space out of the view port so swapping the array around to keep it perpetual is not visible
     * This *should* be more defensive, what if there's - like - 30 already? But it works for this.
     */
    ngOnChanges() {
        this.features = this.features.concat(this.features.slice(0)).concat(this.features.slice(0));
    }

    /**
     * For these two methods, I went back and forth a lot on whether to use async/await or have the carousel directive emit an event when it is done animating
     * and then manipulate the array. I figured seeing as I already had the promise telling me it was done, why not just use that.
     */
    async next() {
        await this.carousel.slideRight();
        const features = this.features.slice(0);
        const popped = features.splice(0, 1);
        features[features.length - 1] = popped[0];
        this.features = features.concat(popped);
        this.changeRef.markForCheck();
        this.carousel.center();
    }

    async prev() {
        await this.carousel.slideLeft();
        const features = this.features.slice(0);
        const popped = features.splice(features.length - 1, 1);
        this.features = popped.concat(features);
        this.changeRef.markForCheck();
        this.carousel.center();
    }
}
