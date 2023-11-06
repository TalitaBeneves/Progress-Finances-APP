import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
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

import {
  CURRENCY_MASK_CONFIG,
  CurrencyMaskConfig,
  CurrencyMaskModule,
} from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './components/menu/menu.component';
import { CadastroModule } from './components/user/cadastro/cadastro.module';
import { LoginModule } from './components/user/login/login.module';
import { PerfilModule } from './components/user/perfil/perfil.module';

import { DashboardModule } from './page/dashboard/dashboard.module';
import { DialogMetaDetalheComponent } from './page/meta-detalhe/components/dialog-meta-detalhe/dialog-meta-detalhe.component';
import { MetaDetalhesComponent } from './page/meta-detalhe/meta-detalhes.component';
import { DialogMetaHomeComponent } from './page/meta-home/components/dialog-meta-home/dialog-meta-home.component';
import { MetaInvestimentoComponent } from './page/meta-home/components/meta-investimento/meta-investimento.component';
import { MetasAndamentoComponent } from './page/meta-home/components/metas-andamento/metas-andamento.component';
import { MetasConcluidasComponent } from './page/meta-home/components/metas-concluidas/metas-concluidas.component';
import { MetaHomeComponent } from './page/meta-home/meta-home.component';
import { MeusAtivosModule } from './page/meus-ativos/meus-ativos.module';
import { NovoAporteModule } from './page/novo-aporte/novo-aporte.module';
import { PerguntasModule } from './page/perguntas/perguntas.module';

import { RedefinirSenhaModule } from './components/user/redefinir-senha/redefinir-senha.module';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { UsuarioService } from './core/server/usuario/usuario.service';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
};

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
    PerfilModule,
    CurrencyMaskModule,
    PerguntasModule,
    NgxSpinnerModule,
    LoginModule,
    CadastroModule,
    RedefinirSenhaModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true,
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  providers: [
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
