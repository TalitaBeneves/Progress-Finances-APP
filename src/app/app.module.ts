import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogMetaDetalheComponent } from './meta-detalhe/components/dialog-meta-detalhe/dialog-meta-detalhe.component';
import { MetaDetalhesComponent } from './meta-detalhe/meta-detalhes.component';
import { DialogMetaHomeComponent } from './meta-home/components/dialog-meta-home/dialog-meta-home.component';
import { MetasAndamentoComponent } from './meta-home/components/metas-andamento/metas-andamento.component';
import { MetasConcluidasComponent } from './meta-home/components/metas-concluidas/metas-concluidas.component';
import { MetaHomeComponent } from './meta-home/meta-home.component';

@NgModule({
  declarations: [
    AppComponent,
    MetaHomeComponent,
    MetaDetalhesComponent,
    DialogMetaHomeComponent,
    DialogMetaDetalheComponent,
    MetasAndamentoComponent,
    MetasConcluidasComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true,
    }),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
    }),
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-Br' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
