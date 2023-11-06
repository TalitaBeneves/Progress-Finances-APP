import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RedefinirSenhaComponent } from './redefinir-senha.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [RedefinirSenhaComponent],
})
export class RedefinirSenhaModule {}
