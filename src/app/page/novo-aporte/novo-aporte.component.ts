import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ListaAtivoCalculado } from 'src/app/core/model/Ativo';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-novo-aporte',
  templateUrl: './novo-aporte.component.html',
  styleUrls: ['./novo-aporte.component.scss'],
})
export class NovoAporteComponent implements OnInit {
  @ViewChild('chartAporte', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  isChecked = true;
  valorInvestimento = new FormControl(null, Validators.required);
  items: any;
  corFundo = '#4fbfb5';

  acoes: number = 0;
  fiis: number = 0;
  rendaFixa: number = 0;
  listasCriadas = false;
  chart!: Chart<'doughnut', number[], string>;
  getIdUser: any;

  constructor(
    private seviceFinaces: FinancesService,
    private serviceUsuario: UsuarioService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.getIdUser = this.serviceUsuario.getUserLocalStorage();

    this.seviceFinaces
      .litarAtivosById(this.getIdUser.usuario_Id)
      .subscribe({
        next: (res) => {
          this.items = res;
          this.dashboard();
          this.montaDash();
          this.updateChart();
        },
        error: (e) => console.error(e),
      })
      .add(() => this.spinner.hide());
  }

  ngAfterViewInit() {
    this.montaLi();
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

  calcular() {
    this.spinner.show();
    const valor = parseInt(this.valorInvestimento.value);
    if (this.valorInvestimento.invalid) {
      this.toastr.warning('Favor preencher o campo!', 'Atenção');
      return;
    } else if (valor < 100) {
      this.toastr.warning('Valor precisa ser maior ou igual a 100!', 'Atenção');
      return;
    }

    this.acoes = 0;
    this.fiis = 0;
    this.rendaFixa = 0;

    this.seviceFinaces
      .calcularRecomendacaoInvestimento(this.getIdUser.idUsuario, valor)
      .subscribe({
        next: (res) => {
          this.items = res;
          this.montaDash();
          this.updateChart();
        },

        error: () => {},
      })
      .add(() => this.spinner.hide());
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
      this.chart.data?.labels?.forEach((label, i) => {
        this.listasCriadas = true;
        var li = document.createElement('li');
        li.innerHTML = `${label}`;
        li.classList.add('list-item-' + i);
        ul?.appendChild(li);
      });
    }
  }

  montaDash() {
    this.items.forEach((ativo: ListaAtivoCalculado) => {
      if (ativo.tipoAtivo === 3) {
        this.acoes += ativo.sugestaoInvestimento;
      } else if (ativo.tipoAtivo === 1) {
        this.fiis += ativo.sugestaoInvestimento;
      } else if (ativo.tipoAtivo === 2) {
        this.rendaFixa += ativo.sugestaoInvestimento;
      }
    });
  }

  naoCalcula(model: any, e) {
    this.seviceFinaces
      .naoCalcularInvestimento(model.idUsuario, model.idAtivo, e)
      .subscribe({
        next: () => {
          this.toastr.success(
            'Este ativo agora não esta na fila de calculo.',
            'Sucesso'
          );
        },
        error: (e) => {
          console.error(e);
        },
      });
  }
}
