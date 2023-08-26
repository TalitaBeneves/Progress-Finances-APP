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
      import('./page/Dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user/perfil/perfil.module').then((m) => m.PerfilModule),
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
  { path: '**', component: LoginComponent },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
