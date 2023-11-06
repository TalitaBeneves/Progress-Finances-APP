import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioLogado } from 'src/app/core/model/Usuario';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-dashboard-meta',
  templateUrl: './dashboard-meta.component.html',
  styleUrls: ['./dashboard-meta.component.scss'],
})
export class DashboardMetaComponent implements OnInit {
  @ViewChild('chart', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  @Input() dadosUsuario: UsuarioLogado;
  chart!: Chart<'pie', number[], string>;

  acoes: number = 0;
  fiis: number = 0;
  rendaFixa: number = 0;

  listasCriadas = false;

  constructor(
    private seviceFinaces: FinancesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.listaMeta();
  }

  listaMeta() {
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
        error: (e) => {
          console.error(e);
        },
      })
      .add(() => this.spinner.hide());
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

  montaLi(newData?: any) {
    const ulMeta = document.querySelector(
      '.programming-stats .details_meta ul'
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
  }
}
