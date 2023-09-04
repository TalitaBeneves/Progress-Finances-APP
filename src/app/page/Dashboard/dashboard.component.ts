import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListaAtivoCalculado } from 'src/app/core/model/Ativo';
import { UsuarioLogado } from 'src/app/core/model/Usuario';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dadosUsuario: UsuarioLogado;
  items: any;
  listasCriadas = false;
  saudacao: string;

  constructor(private serviceUsuario: UsuarioService) {}

  ngOnInit() {
    this.dadosUsuario = this.serviceUsuario.getUserLocalStorage();
    this.saudacoes();
  }

  saudacoes() {
    const now = new Date();
    const hora = now.getHours();

    if (hora >= 12 && hora < 18) {
      this.saudacao = 'Boa tarde!';
    } else if (hora >= 18 || hora < 6) {
      this.saudacao = 'Boa noite!';
    } else {
      this.saudacao = 'Bom dia!';
    }
  }
}
