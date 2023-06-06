import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MetaInvestimento } from 'src/app/core/model/MetaInvestimento';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-meta-investimento',
  templateUrl: './meta-investimento.component.html',
  styleUrls: ['./meta-investimento.component.scss'],
})
export class MetaInvestimentoComponent implements OnInit {
  @ViewChild('chart', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  acoes: number = 1;
  fiis: number = 1;
  fixa: number = 1;
  chart!: Chart<'doughnut', number[], string>;
  teste: any;
  formAcoes = new FormControl(null);
  formFiis = new FormControl(null);
  formFixa = new FormControl(null);
  getId: any;
  constructor(
    private serviceUsuario: UsuarioService,
    private servicesFinance: FinancesService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.dashboard();

    this.getId = this.serviceUsuario.getUserLocalStorage();

    this.listarMetaInvestimento();
  }

  listarMetaInvestimento() {
    this.spinner.show();
    this.servicesFinance
      .listarMetaInvestimento(this.getId.idUsuario)
      .subscribe({
        next: (res) => {
          this.formAcoes.setValue(res[0].acoes);
          this.formFiis.setValue(res[0].fiis);
          this.formFixa.setValue(res[0].rendaFixa);
        },
        error: (e) => console.error(e),
      })
      .add(() => this.spinner.hide());
  }

  salvarMetaInvestimento() {
    this.spinner.show();
    const model: MetaInvestimento = {
      idUsuario: this.getId.idUsuario,
      nome: 'Meta investimento',
      acoes: this.formAcoes.value,
      fiis: this.formFiis.value,
      rendaFixa: this.formFixa.value,
    };

    this.servicesFinance
      .cadastrarOuAtualizarMetaInvestimento(model)
      .subscribe({
        next: (res) => {
          this.toastr.success(
            'O meta de investimento foi cadastrado com sucesso!',
            'Sucesso'
          );
        },
        error: (e) => console.error(e),
      })
      .add(() => this.spinner.hide());
  }

  dashboard() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Ações', 'Fundos Imobiliários', 'Renda Fixa'],
          datasets: [
            {
              data: [this.acoes, this.fiis, this.fixa],
              backgroundColor: [
                'rgb(79, 191, 181)',
                'rgb(38, 213, 242)',
                'rgb(82, 155, 225)',
              ],
              borderWidth: 1,

              borderColor: '#4fbfb5',
            },
          ],
        },
        options: {},
      });
    }
  }

  updateChart() {
    const newData = [this.acoes, this.fiis, this.fixa];
    this.chart.data.datasets[0].data = newData;
    this.chart.update();
  }
}
