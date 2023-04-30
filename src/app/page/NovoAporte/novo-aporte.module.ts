import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoAporteComponent } from './novo-aporte.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormatTipoAtivoPipe } from 'src/app/core/pipe/format-tipoAtivo.pipe';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule,
    MatToolbarModule,
  ],
  declarations: [NovoAporteComponent],
})
export class NovoAporteModule {}
