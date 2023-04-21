import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './cadastro.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [CadastroComponent],
})
export class CadastroModule {}
