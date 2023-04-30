import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './components/menu/menu.component';
import { DashboardModule } from './page/Dashboard/novo-aporte.module';
import { NovoAporteModule } from './page/NovoAporte/novo-aporte.module';
import { DialogMetaDetalheComponent } from './page/meta-detalhe/components/dialog-meta-detalhe/dialog-meta-detalhe.component';
import { MetaDetalhesComponent } from './page/meta-detalhe/meta-detalhes.component';
import { DialogMetaHomeComponent } from './page/meta-home/components/dialog-meta-home/dialog-meta-home.component';
import { MetaInvestimentoComponent } from './page/meta-home/components/meta-investimento/meta-investimento.component';
import { MetasAndamentoComponent } from './page/meta-home/components/metas-andamento/metas-andamento.component';
import { MetasConcluidasComponent } from './page/meta-home/components/metas-concluidas/metas-concluidas.component';
import { MetaHomeComponent } from './page/meta-home/meta-home.component';
import { MeusAtivosModule } from './page/meus-ativos/meus-ativos.module';
import { CadastroModule } from './user/cadastro/cadastro.module';
import { LoginModule } from './user/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    MetaHomeComponent,
    MetaDetalhesComponent,
    DialogMetaHomeComponent,
    DialogMetaDetalheComponent,
    MetasAndamentoComponent,
    MetasConcluidasComponent,
    MenuComponent,
    MetaInvestimentoComponent,
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
    MeusAtivosModule,
    MatTabsModule,
    NovoAporteModule,
    DashboardModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true,
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    LoginModule,
    CadastroModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
