import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { MetaDetalhesComponent } from './meta-detalhe/meta-detalhes.component';
import { MetaHomeComponent } from './meta-home/meta-home.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'metas-home', component: MetaHomeComponent },
  { path: 'meta-detalhe/:id', component: MetaDetalhesComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
