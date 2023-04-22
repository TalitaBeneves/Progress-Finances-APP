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
  getId: string;
  acoes: number;
  fiis: number;
  rendaFixa: number;

  constructor(
    private financesService: FinancesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const getId = localStorage.getItem('usuario');
    if (getId) this.getId = getId;

    this.listAtivos();
  }

  listAtivos() {
    this.financesService.getMeta(this.getId).subscribe({
      next: (res) => {
        this.items = res;
        this.mondaDashboard();
        this.dashboard();
      },
    });
  }

  addMeta() {
    const dialogRef = this.dialog.open(DialogMeusAtivosComponent, {
      width: '1000px',
      data: {
        nomeMeta: null,
        valorInicial: null,
        objetivo: null,
        dataEstimada: null,
      },
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
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
              ],
              borderWidth: 1,
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
