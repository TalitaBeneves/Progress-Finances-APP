import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Chart from 'chart.js/auto';
import { DialogMeusAtivosComponent } from './components/dialog-meus-ativos/dialog-meus-ativos.component';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meus-ativos',
  templateUrl: './meus-ativos.component.html',
  styleUrls: ['./meus-ativos.component.scss'],
})
export class MeusAtivosComponent implements OnInit {
  @ViewChild('chart', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  items: any;
  getId: any;
  acoes: number = 1;
  fiis: number = 1;
  rendaFixa: number = 1;
  corFundo = '#4fbfb5';

  constructor(
    private serviceFinances: FinancesService,
    public dialog: MatDialog,
    private toastr: ToastrService
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

  listAtivos() {
    this.serviceFinances.litarAtivosById(this.getId.idUsuario).subscribe({
      next: (res) => {
        this.items = res;
        this.mondaDashboard();
        this.dashboard();
      },
    });
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
    this.serviceFinances.deletarAtivo(e.idAtivo).subscribe({
      next: (res) => {
        this.toastr.success('O ativo foi atualizado com sucesso!', 'Sucesso');
        this.serviceFinances.filter(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  dashboard() {
    const ctx = this.canvas?.nativeElement.getContext('2d');
    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Ações', 'Fundos Imobiliários', 'Renda Fixa'],
          datasets: [
            {
              data: [this.acoes, this.fiis, this.rendaFixa],
              backgroundColor: [
                'rgb(79, 191, 181, 0.50)',
                'rgb(38, 213, 242, 0.50)',
                'rgb(82, 155, 225, 0.50)',
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

  mondaDashboard() {
    this.acoes = this.items.filter(
      (item: { tipoAtivo: number }) => item.tipoAtivo === 3
    ).length;
    this.fiis = this.items.filter(
      (item: { tipoAtivo: number }) => item.tipoAtivo === 1
    ).length;
    this.rendaFixa = this.items.filter(
      (item: { tipoAtivo: number }) => item.tipoAtivo === 2
    ).length;
  }
}
