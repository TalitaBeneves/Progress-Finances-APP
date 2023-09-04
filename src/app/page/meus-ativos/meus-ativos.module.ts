import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';

import { SharedModule } from 'src/app/core/shared/shared.module';
import { DashboardMeusAtivosComponent } from './components/dashboard-meus-ativos/dashboard-meus-ativos.component';
import { DialogMeusAtivosComponent } from './components/dialog-meus-ativos/dialog-meus-ativos.component';
import { FiltrarPorAtivosComponent } from './components/filtrar-por-ativos/filtrar-por-ativos.component';
import { TableMeusAtivosComponent } from './components/table-meus-ativos/table-meus-ativos.component';
import { MeusAtivosComponent } from './meus-ativos.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSelectModule,
    SharedModule,
    CurrencyMaskModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [
    MeusAtivosComponent,
    DialogMeusAtivosComponent,
    FiltrarPorAtivosComponent,
    DashboardMeusAtivosComponent,
    TableMeusAtivosComponent,
  ],
})
export class MeusAtivosModule {}
