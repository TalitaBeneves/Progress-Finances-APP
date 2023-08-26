import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerguntasComponent } from './perguntas.component';
import { DialogPerguntasComponent } from './components/dialog-perguntas/dialog-perguntas.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
  ],
  declarations: [PerguntasComponent, DialogPerguntasComponent],
})
export class PerguntasModule {}
