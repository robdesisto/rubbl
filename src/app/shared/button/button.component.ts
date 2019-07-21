import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type BtnContext = 'icon' | 'primary' | 'secondary';
export type BtnShape = 'pill' | 'rounded';
export type BtnType = 'button' | 'reset' | 'submit';

@Component({
    selector: 'rb-button',
    template: '<button [attr.type]="type"><ng-content></ng-content></button>',
    styleUrls: ['button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
    @HostBinding('attr.context') _context: BtnContext = 'primary';
    @HostBinding('attr.inverse') _inverse;
    @HostBinding('attr.shape') _shape: BtnShape = 'rounded';
    @HostBinding('attr.type') _type: BtnType = 'button';

    /**
     * Context does most of the lifting style wise
     */
    @Input()
    get context(): BtnContext {
        return this._context;
    }

    set context(value: BtnContext) {
        this._context = value;
    }

    /**
     * Would change the button so it'd work on dark backgrounds, only implemented this for the icons though.
     */
    @Input()
    get inverse(): boolean {
        return this._inverse;
    }

    set inverse(value: boolean) {
        this._inverse = value;
    }

    /**
     * Shape which is ignored for icon buttons
     */
    @Input()
    get shape(): BtnShape {
        return this._shape;
    }

    set shape(value: BtnShape) {
        this._shape = value;
    }

    /**
     * The type of button we're workin' with here
     */
    @Input()
    get type(): BtnType {
        return this._type;
    }

    set type(value: BtnType) {
        this._type = value;
    }
}
