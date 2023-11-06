import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Chart } from 'chart.js/auto';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { ListaAtivoCalculado } from 'src/app/core/model/Ativo';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';

@Component({
  selector: 'app-dashboard-novo-aporte',
  templateUrl: './dashboard-novo-aporte.component.html',
  styleUrls: ['./dashboard-novo-aporte.component.scss'],
})
export class DashboardNovoAporteComponent implements OnInit {
  @ViewChild('chartAporte', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  @Input() idUsuario;
  @Input() calculo;
  @Output() ativos = new EventEmitter<ListaAtivoCalculado>();

  chart!: Chart<'doughnut', number[], string>;

  acoes: number = 0;
  fiis: number = 0;
  rendaFixa: number = 0;

  items;
  listasCriadas = false;

  constructor(
    private seviceFinaces: FinancesService,
    private spinner: NgxSpinnerService
  ) {
    this.seviceFinaces.listen().subscribe((e) => {
      this.items = e;
      this.acoes = 0;
      this.fiis = 0;
      this.rendaFixa = 0;
      this.montaDash();
      this.updateChart();
    });
  }

  ngOnInit() {
    this.listarAtivos();
  }

  listarAtivos() {
    this.spinner.show();
    this.seviceFinaces
      .litarAtivosById(this.idUsuario.idUsuario)
      .subscribe({
        next: (res) => {
          this.items = res;
          this.ativos.emit(res);
          this.callAll();
        },
        error: (e) => console.error(e),
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

  montaDash() {
    this.items.forEach((ativo: ListaAtivoCalculado) => {
      if (ativo.tipo === 3) {
        this.acoes += ativo.sugestaoInvestimento;
      } else if (ativo.tipo === 1) {
        this.fiis += ativo.sugestaoInvestimento;
      } else if (ativo.tipo === 2) {
        this.rendaFixa += ativo.sugestaoInvestimento;
      }
    });
  }

  montaLi(newData?: any) {
    const ul = document.querySelector('.programming-stats .details ul');

    if (this.listasCriadas == true) {
      this.chart.data?.datasets?.[0].data.forEach((value, i) => {
        const listItem = document.querySelector(
          `.programming-stats .list-item-${i}`
        );
        if (listItem) {
          switch (i) {
            case 0:
              listItem.innerHTML = `Ações: ${value.toFixed(2)}`;
              break;
            case 1:
              listItem.innerHTML = `Fundos Imobiliários: ${value.toFixed(2)}`;
              break;
            case 2:
              listItem.innerHTML = `Renda Fixa: ${value.toFixed(2)}`;
              break;

            default:
              break;
          }
        }
      });
    } else {
      this.chart?.data?.labels?.forEach((label, i) => {
        this.listasCriadas = true;
        var li = document.createElement('li');
        li.innerHTML = `${label}`;
        li.classList.add('list-item-' + i);
        ul?.appendChild(li);
      });
    }
  }

  updateChart() {
    const newData = [this.acoes, this.fiis, this.rendaFixa];
    const soma = this.acoes + this.fiis + this.rendaFixa;

    if (newData) {
      this.chart.data.datasets[0].data = newData;
    }

    if (
      this.chart.options.plugins &&
      this.chart.options.plugins.legend &&
      this.chart.options.plugins.legend.title
    ) {
      this.chart.options.plugins.legend.title.text = `Valor Total ${soma.toString()}`;
    }

    this.montaLi(newData);

    this.chart.update();
  }

  callAll() {
    this.dashboard();
    this.montaDash();
    this.updateChart();
    this.montaLi();
  }
}
