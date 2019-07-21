import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';

import { Feature } from '../../state/app.state';

@Component({
    selector: 'rb-feature',
    template: '<a [attr.href]="feature.cta"><img [attr.src]="feature.src" width="756" height="350" alt="Featured"/></a>',
    styleUrls: ['./feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent {
    @Input() feature: Feature;

    get width() {
        return this.element.nativeElement.offsetWidth;
    }

    constructor(private element: ElementRef) {}
}
