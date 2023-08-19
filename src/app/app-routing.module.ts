import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './user/cadastro/cadastro.component';
import { LoginComponent } from './user/login/login.component';
import { MetaDetalhesComponent } from './page/meta-detalhe/meta-detalhes.component';
import { MetaHomeComponent } from './page/meta-home/meta-home.component';
import { MeusAtivosComponent } from './page/meus-ativos/meus-ativos.component';
import { AuthGuard } from './core/guard/auth.guard';
import { NovoAporteComponent } from './page/novo-aporte/novo-aporte.component';
import { DashboardComponent } from './page/Dashboard/dashboard.component';
import { PerfilComponent } from './user/perfil/perfil.component';
import { PerguntasComponent } from './page/perguntas/perguntas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'metas-home',
    component: MetaHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'meta-detalhe/:id',
    component: MetaDetalhesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'meus-ativos',
    component: MeusAtivosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'novo-aporte',
    component: NovoAporteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'perguntas',
    component: PerguntasComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: LoginComponent },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
