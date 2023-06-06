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
  @ViewChild('chart', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('chart2', { static: true }) canvas2: ElementRef<HTMLCanvasElement>;

  acoes: number = 0;
  fiis: number = 0;
  rendaFixa: number = 0;
  acoesAtivo: number = 0;
  fiisAtivo: number = 0;
  rendaFixaAtivo: number = 0;
  chart!: Chart<'pie', number[], string>;
  chart2!: Chart<'pie', number[], string>;
  dadosUsuario: UsuarioLogado;
  items: any;
  listasCriadas = false;
  saudacao: string;

  constructor(
    private seviceFinaces: FinancesService,
    private serviceUsuario: UsuarioService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.dadosUsuario = this.serviceUsuario.getUserLocalStorage();

    this.seviceFinaces
      .listarMetaInvestimento(this.dadosUsuario.idUsuario)
      .subscribe({
        next: (res: any) => {
          this.acoes = res[0].acoes;
          this.fiis = res[0].fiis;
          this.rendaFixa = res[0].rendaFixa;
          this.dashboard();
          this.montaLi();
        },
        error: (e) => {},
      })
      .add(() => this.spinner.hide());

    this.seviceFinaces.litarAtivosById(this.dadosUsuario.idUsuario).subscribe({
      next: (res: any) => {
        this.items = res;
        this.montaDashAtivos();
        this.dashboard2();
        this.montaLi();
      },
      error: (e) => {},
    });

    this.saudacoes();
  }

  dashboard() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Ações', 'Fundos Imobiliários', 'Renda Fixa'],
          datasets: [
            {
              data: [this.acoes, this.fiis, this.rendaFixa],
              backgroundColor: [
                'rgb(23,162,184, 0.30)',
                'rgb(253,126,20, 0.30)',
                'rgb(32,201,151, 0.30)',
              ],
              borderColor: [
                'rgb(23,162,184, 1)',
                'rgb(253,126,20, 1)',
                'rgb(32,201,151, 1)',
              ],
              hoverBackgroundColor: [
                'rgb(23,162,184, 0.70)',
                'rgb(253,126,20, 0.70)',
                'rgb(32,201,151, 0.70)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }

  dashboard2() {
    const ctx = this.canvas2.nativeElement.getContext('2d');
    if (ctx) {
      this.chart2 = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Ações', 'Fundos Imobiliários', 'Renda Fixa'],
          datasets: [
            {
              data: [this.acoesAtivo, this.fiisAtivo, this.rendaFixaAtivo],
              backgroundColor: [
                'rgb(23,162,184, 0.30)',
                'rgb(253,126,20, 0.30)',
                'rgb(32,201,151, 0.30)',
              ],
              borderColor: [
                'rgb(23,162,184, 1)',
                'rgb(253,126,20, 1)',
                'rgb(32,201,151, 1)',
              ],
              hoverBackgroundColor: [
                'rgb(23,162,184, 0.70)',
                'rgb(253,126,20, 0.70)',
                'rgb(32,201,151, 0.70)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }

  montaLi(newData?: any) {
    const ulMeta = document.querySelector(
      '.programming-stats .details_meta ul'
    );
    const ulAtivo = document.querySelector(
      '.programming-stats .details_ativo ul'
    );

    if (!this.listasCriadas) {
      this.chart?.data?.labels?.forEach((label, i) => {
        var li = document.createElement('li');
        li.innerHTML = `${label}`;
        li.classList.add('list-item-meta-' + i);
        ulMeta?.appendChild(li);
        this.listasCriadas = true;
      });
    }
    if (this.chart2?.data) {
      this.chart2?.data?.labels?.forEach((label, i) => {
        var li = document.createElement('li');
        li.innerHTML = `${label}`;
        li.classList.add('list-item-ativo-' + i);
        ulAtivo?.appendChild(li);
      });
    }
  }

  montaDashAtivos() {
    this.items.forEach((ativo: ListaAtivoCalculado) => {
      if (ativo.tipoAtivo === 3) {
        this.acoesAtivo += ativo.valorTotalInvestido;
      } else if (ativo.tipoAtivo === 1) {
        this.fiisAtivo += ativo.valorTotalInvestido;
      } else if (ativo.tipoAtivo === 2) {
        this.rendaFixaAtivo += ativo.valorTotalInvestido;
      }
    });
  }

  saudacoes() {
    const now = new Date();
    const hora = now.getHours();

    if (hora >= 12 && hora < 18) {
      this.saudacao = 'Boa tarde';
    } else if (hora >= 18 || hora < 6) {
      this.saudacao = 'Boa noite';
    } else {
      this.saudacao = 'Bom dia';
    }
  }
}
