import { DialogMeusAtivosComponent } from './components/dialog-meus-ativos/dialog-meus-ativos.component';
import { LoginUsuario, UsuarioLogado } from './../../core/model/Usuario';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { FinancesService } from 'src/core/server/Finances/finances.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meus-ativos',
  templateUrl: './meus-ativos.component.html',
  styleUrls: ['./meus-ativos.component.scss'],
})
export class MeusAtivosComponent implements OnInit {
  @ViewChild('chart', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  items: any;
  getId: any;
  acoes: number;
  fiis: number;
  rendaFixa: number;
  corFundo = '#4fbfb5';

  constructor(
    private serviceFinances: FinancesService,
    public dialog: MatDialog
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
    this.serviceFinances.getMeta(this.getId.idUsuario).subscribe({
      next: (res) => {
        this.items = res;
        console.log(res);
        this.mondaDashboard();
        this.dashboard();
      },
    });
  }

  openDialogCadastrar() {
    const dialogRef = this.dialog.open(DialogMeusAtivosComponent, {
      width: '1000px',
      data: this.items,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  dashboard() {
    const ctx = this.canvas.nativeElement.getContext('2d');
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
      (item: { tipoAtivo: number }) => item.tipoAtivo === 0
    ).length;
    this.fiis = this.items.filter(
      (item: { tipoAtivo: number }) => item.tipoAtivo === 1
    ).length;
    this.rendaFixa = this.items.filter(
      (item: { tipoAtivo: number }) => item.tipoAtivo === 2
    ).length;
  }
}
