import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerguntasComponent } from './perguntas.component';
import { DialogPerguntasComponent } from './components/dialog-perguntas/dialog-perguntas.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PerguntasComponent, DialogPerguntasComponent],
})
export class PerguntasModule {}
