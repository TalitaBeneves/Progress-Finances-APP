import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetaDetalhesComponent } from './meta-detalhe/meta-detalhes.component';
import { MetaHomeComponent } from './meta-home/meta-home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'metas-home', component: MetaHomeComponent },
  { path: 'meta-detalhe/:id', component: MetaDetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
