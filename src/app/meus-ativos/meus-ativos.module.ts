import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormatTipoAtivoPipe } from 'src/core/pipe/format-tipoAtivo.pipe';
import { DialogMeusAtivosComponent } from './components/dialog-meus-ativos/dialog-meus-ativos.component';
import { MeusAtivosComponent } from './meus-ativos.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  declarations: [
    MeusAtivosComponent,
    DialogMeusAtivosComponent,
    FormatTipoAtivoPipe,
  ],
})
export class MeusAtivosModule {}
