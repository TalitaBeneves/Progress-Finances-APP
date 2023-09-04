import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardCarteiraComponent } from './components/dashboard-carteira/dashboard-carteira.component';
import { DashboardMetaComponent } from './components/dashboard-meta/dashboard-meta.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DashboardComponent,
    DashboardCarteiraComponent,
    DashboardMetaComponent,
  ],
})
export class DashboardModule {}
