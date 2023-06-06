import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Chart from 'chart.js/auto';
import { DialogMeusAtivosComponent } from './components/dialog-meus-ativos/dialog-meus-ativos.component';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-meus-ativos',
  templateUrl: './meus-ativos.component.html',
  styleUrls: ['./meus-ativos.component.scss'],
})
export class MeusAtivosComponent implements OnInit {
  @ViewChild('chart', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  items: any;
  getId: any;
  acoes: number = 0;
  fiis: number = 0;
  rendaFixa: number = 0;
  corFundo = '#4fbfb5';
  chart!: Chart<'doughnut', number[], string>;
  array: any = [];
  ativos: any;
  constructor(
    private serviceFinances: FinancesService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.serviceFinances.listen().subscribe((e) => {
      this.listAtivos();
    });
  }

  ngOnInit() {
    const getId = localStorage.getItem('usuario');
    if (getId) this.getId = JSON.parse(getId);

    this.listAtivos();
  }

  ngAfterViewInit() {
    this.montaLi();
  }

  listAtivos() {
    this.spinner.show();
    this.serviceFinances
      .litarAtivosById(this.getId.idUsuario)
      .subscribe({
        next: (res) => {
          this.items = res;
          this.ativos = res;
          this.dashboard();
          this.montaDash();
          this.updateChart();
        },
      })
      .add(() => this.spinner.hide());
  }

  openDialogCadastrar(element?) {
    const dialogRef = this.dialog.open(DialogMeusAtivosComponent, {
      width: '1000px',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  getDadosTabela(e) {
    this.openDialogCadastrar(e);
  }

  deletarAtivo(e) {
    this.spinner.show();
    this.serviceFinances
      .deletarAtivo(e.idAtivo)
      .subscribe({
        next: (res) => {
          this.toastr.success('O ativo foi atualizado com sucesso!', 'Sucesso');
          this.serviceFinances.filter(res);
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
      if (ativo.tipoAtivo === 3) {
        this.acoes += ativo.valorAtualDoAtivo;
      } else if (ativo.tipoAtivo === 1) {
        this.fiis += ativo.valorAtualDoAtivo;
      } else if (ativo.tipoAtivo === 2) {
        this.rendaFixa += ativo.valorAtualDoAtivo;
      }
    });
  }

  filtra(event) {
    var e = event.target.className;
    var tipoAtivo = 0;

    switch (e) {
      case 'acoes':
        tipoAtivo = 3;
        this.array = [];
        break;
      case 'fiis':
        tipoAtivo = 1;
        this.array = [];
        break;
      case 'fixa':
        tipoAtivo = 2;
        this.array = [];
        break;
      case 'limpaFiltro':
        this.items = this.ativos;
        break;

      default:
        break;
    }

    if (tipoAtivo > 0) {
      this.ativos.forEach((element) => {
        if (element.tipoAtivo == tipoAtivo) {
          this.array.push(element);
        }

        this.items = this.array;
      });
    }
  }
}
