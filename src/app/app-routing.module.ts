import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MetaDetalhesComponent } from './page/meta-detalhe/meta-detalhes.component';
import { MetaHomeComponent } from './page/meta-home/meta-home.component';
import { MeusAtivosComponent } from './page/meus-ativos/meus-ativos.component';
import { NovoAporteComponent } from './page/novo-aporte/novo-aporte.component';
import { PerguntasComponent } from './page/perguntas/perguntas.component';

import { CadastroComponent } from './components/user/cadastro/cadastro.component';
import { LoginComponent } from './components/user/login/login.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { RedefinirSenhaComponent } from './components/user/redefinir-senha/redefinir-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'redefinir-senha', component: RedefinirSenhaComponent },
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
    loadChildren: () =>
      import('./page/meus-ativos/meus-ativos.module').then(
        (m) => m.MeusAtivosModule
      ),
  },
  {
    path: 'novo-aporte',
    component: NovoAporteComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./page/novo-aporte/novo-aporte.module').then(
        (m) => m.NovoAporteModule
      ),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./page/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/user/perfil/perfil.module').then(
        (m) => m.PerfilModule
      ),
  },
  {
    path: 'perguntas',
    component: PerguntasComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./page/perguntas/perguntas.module').then(
        (m) => m.PerguntasModule
      ),
  },
  {
    path: '**',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./page/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
