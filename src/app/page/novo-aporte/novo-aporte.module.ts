import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from 'src/app/core/shared/shared.module';
import { DashboardNovoAporteComponent } from './components/dashboard-novo-aporte/dashboard-novo-aporte.component';
import { TableNovoAporteComponent } from './components/table-novo-aporte/table-novo-aporte.component';
import { NovoAporteComponent } from './novo-aporte.component';

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
    CurrencyMaskModule,
    MatSlideToggleModule,
  ],
  declarations: [
    NovoAporteComponent,
    DashboardNovoAporteComponent,
    TableNovoAporteComponent,
  ],
})
export class NovoAporteModule {}
