import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Chart } from 'chart.js';

import { NgxSpinnerService } from 'ngx-spinner';

import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { ListaAtivoCalculado } from './../../../../core/model/Ativo';

@Component({
  selector: 'app-dashboard-meus-ativos',
  templateUrl: './dashboard-meus-ativos.component.html',
  styleUrls: ['./dashboard-meus-ativos.component.scss'],
})
export class DashboardMeusAtivosComponent implements OnInit {
  @ViewChild('chart', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @Input() getId;
  @Output() ativos = new EventEmitter<ListaAtivoCalculado>();

  chart!: Chart<'doughnut', number[], string>;

  acoes: number = 0;
  fiis: number = 0;
  rendaFixa: number = 0;

  items: any;

  constructor(
    private serviceFinances: FinancesService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    this.serviceFinances.listen().subscribe((e) => {
      this.listAtivos();
    });
  }

  ngOnInit() {
    this.listAtivos();
  }

  ngAfterViewInit() {
    this.montaLi();
  }

  listAtivos() {
    this.spinner.show();
    this.serviceFinances
      .litarAtivosById(this.getId.usuario_Id)
      .subscribe({
        next: (res) => {
          this.items = res;
          this.ativos.emit(res);
          this.dashboard();
          this.montaDash();
          this.updateChart();
        },
      })
      .add(() => this.spinner.hide());
  }

  dashboard() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      const colors = ['#17a2b8', '#fd7e14', '#20c997'];
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Ações', 'Fundos Imobiliários', 'Renda Fixa'],
          datasets: [
            {
              data: [this.acoes, 0, 0],
              backgroundColor: colors,
              borderWidth: 1,
              borderColor: '#ffffff',
            },
            {
              data: [0, this.fiis, 0],
              backgroundColor: colors,
              borderWidth: 1,

              borderColor: '#ffffff',
            },
            {
              data: [0, 0, this.rendaFixa],
              backgroundColor: colors,
              borderWidth: 1,
              borderColor: '#ffffff',
            },
          ],
        },
        options: {
          animation: {
            animateRotate: false,
            animateScale: false,
            duration: 1000,
            easing: 'easeInOutQuad',
          },
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
    const ul = document.querySelector('.dash .details ul');

    this.chart?.data?.labels?.forEach((label, i) => {
      var li = document.createElement('li');
      li.innerHTML = `${label}`;
      li.classList.add('list-item-' + i);
      ul?.appendChild(li);
    });
  }

  updateChart() {
    const newData = [this.acoes, this.fiis, this.rendaFixa];
    const soma = this.acoes + this.fiis + this.rendaFixa;

    this.chart.data.datasets[0].data = newData;

    if (
      this.chart.options.plugins &&
      this.chart.options.plugins.legend &&
      this.chart.options.plugins.legend.title
    ) {
      this.chart.options.plugins.legend.title.text = `Valor Total ${soma.toString()}`;
    }

    this.montaLi();
    this.chart.update();
  }

  montaDash() {
    this.items.forEach((ativo) => {
      if (ativo.tipo === 3) {
        this.acoes += ativo.valorAtualDoAtivo;
      } else if (ativo.tipo === 1) {
        this.fiis += ativo.valorAtualDoAtivo;
      } else if (ativo.tipo === 2) {
        this.rendaFixa += ativo.valorAtualDoAtivo;
      }
    });
  }
}
