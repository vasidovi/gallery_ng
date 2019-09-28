import { NgModule } from '@angular/core';

import { CatalogsSelectComponent } from './components/inputs/catalogs-select/catalogs-select.component';
import { DescriptionTextareaComponent } from './components/inputs/description-textarea/description-textarea.component';
import { NameInputComponent } from './components/inputs/name-input/name-input.component';
import { TagInputComponent } from './components/inputs/tag-input/tag-input.component';
import { UsernameInputComponent } from './components/inputs/username-input/username-input.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';

import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from './directives.module';

@NgModule({
    imports: [
        DirectivesModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        CatalogsSelectComponent,
        DescriptionTextareaComponent,
        NameInputComponent,
        TagInputComponent,
        UsernameInputComponent,
        PasswordInputComponent,
    ],
    exports: [
        CatalogsSelectComponent,
        DescriptionTextareaComponent,
        NameInputComponent,
        TagInputComponent,
        UsernameInputComponent,
        PasswordInputComponent,
    ]
})
export class FormComponentsModule { }
