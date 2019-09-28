import { NgModule } from '@angular/core';
import { MinLengthDirective } from './directives/min-length.directive';
import { PasswordMismatchDirective } from './directives/password-mismatch.directive';

@NgModule({
    imports: [],
    declarations: [
        MinLengthDirective,
        PasswordMismatchDirective
    ],
    exports: [
        MinLengthDirective,
        PasswordMismatchDirective
    ]
})

export class DirectivesModule { }
