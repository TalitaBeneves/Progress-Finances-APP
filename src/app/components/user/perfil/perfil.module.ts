import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { PerfilComponent } from './perfil.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FormDadosComponent } from './components/form-dados/form-dados.component';
import { FormSenhaComponent } from './components/form-senha/form-senha.component';
import { DeletarContaComponent } from './components/deletar-conta/deletar-conta.component';

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
    MatCardModule,
    MatIconModule,
    MatTabsModule,
  ],
  declarations: [
    PerfilComponent,
    FormDadosComponent,
    FormSenhaComponent,
    DeletarContaComponent,
  ],
})
export class PerfilModule {}
