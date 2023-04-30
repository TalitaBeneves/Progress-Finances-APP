import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatTipoAtivoPipe } from 'src/app/core/pipe/format-tipoAtivo.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FormatTipoAtivoPipe],
  exports: [FormatTipoAtivoPipe],
})
export class SharedModule {}
