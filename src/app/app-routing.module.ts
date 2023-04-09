import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetaDetalhesComponent } from './meta-detalhe/meta-detalhes.component';
import { MetaHomeComponent } from './meta-home/meta-home.component';

const routes: Routes = [
  { path: '', component: MetaDetalhesComponent },
  { path: 'metas-home', component: MetaHomeComponent },
  { path: 'meta-detalhe/:id', component: MetaDetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
