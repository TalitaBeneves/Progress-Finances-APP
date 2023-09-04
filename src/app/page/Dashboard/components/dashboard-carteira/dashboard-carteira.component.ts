import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Chart } from 'chart.js';

import { NgxSpinnerService } from 'ngx-spinner';

import { ListaAtivoCalculado } from 'src/app/core/model/Ativo';
import { UsuarioLogado } from 'src/app/core/model/Usuario';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';

@Component({
  selector: 'app-dashboard-carteira',
  templateUrl: './dashboard-carteira.component.html',
  styleUrls: ['./dashboard-carteira.component.css'],
})
export class DashboardCarteiraComponent implements OnInit {
  @ViewChild('chart', { static: true }) canvas2: ElementRef<HTMLCanvasElement>;

  @Input() dadosUsuario: UsuarioLogado;
  @Output() ativosRes = new EventEmitter<ListaAtivoCalculado>();

  chart!: Chart<'pie', number[], string>;

  acoesAtivo: number = 0;
  fiisAtivo: number = 0;
  rendaFixaAtivo: number = 0;

  ativos: ListaAtivoCalculado[];
  listasCriadas = false;

  constructor(
    private seviceFinaces: FinancesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.listarAtivos();
  }

  dashboard() {
    const ctx = this.canvas2.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
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

  montaDashAtivos() {
    this.ativos.forEach((ativo: ListaAtivoCalculado) => {
      if (ativo.tipo === 3) {
        this.acoesAtivo += ativo.valorTotalInvestido;
      } else if (ativo.tipo === 1) {
        this.fiisAtivo += ativo.valorTotalInvestido;
      } else if (ativo.tipo === 2) {
        this.rendaFixaAtivo += ativo.valorTotalInvestido;
      }
    });
  }

  listarAtivos() {
    this.spinner.show();

    this.seviceFinaces
      .litarAtivosById(this.dadosUsuario.usuario_Id)
      .subscribe({
        next: (res: any) => {
          this.ativos = res;

          this.ativosRes.emit(res);

          this.montaDashAtivos();
          this.dashboard();
          this.montaLi();
        },
        error: (e) => {
          console.error(e);
        },
      })
      .add(() => this.spinner.hide());
  }

  montaLi(newData?: any) {
    const ulAtivo = document.querySelector(
      '.programming-stats .details_ativo ul'
    );

    if (this.chart?.data) {
      this.chart?.data?.labels?.forEach((label, i) => {
        var li = document.createElement('li');
        li.innerHTML = `${label}`;
        li.classList.add('list-item-ativo-' + i);
        ulAtivo?.appendChild(li);
      });
    }
  }
}
