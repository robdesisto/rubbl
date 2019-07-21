import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * It has been a minute since I've had to create a shared module for an app.
 */
import { ButtonComponent } from './button/button.component';
import { ResultDirective } from './result-list/result.directive';
import { ResultListDirective } from './result-list/result-list.directive';
import { SubStringPipe } from './substring/substring.pipe';

@NgModule({
    declarations: [
        ButtonComponent,
        ResultDirective,
        ResultListDirective,
        SubStringPipe
    ],
    exports: [
        CommonModule,
        ButtonComponent,
        ResultDirective,
        ResultListDirective,
        SubStringPipe
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {}
