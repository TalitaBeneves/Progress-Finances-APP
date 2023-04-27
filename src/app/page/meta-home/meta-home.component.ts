import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogMetaHomeComponent } from './components/dialog-meta-home/dialog-meta-home.component';
import { Status } from 'src/app/core/model/Enums';
import { AllMetasModel } from 'src/app/core/model/Metas';
import { MetasService } from 'src/app/core/server/metas.service';

@Component({
  selector: 'app-meta-home',
  templateUrl: './meta-home.component.html',
  styleUrls: ['./meta-home.component.scss'],
})
export class MetaHomeComponent implements OnInit {
  resultMeta: any;
  progresso: number = 0;

  filtroStatusConcluidas: AllMetasModel;
  filtroStatusAndamentos: AllMetasModel;

  constructor(private serveMeta: MetasService, public dialog: MatDialog) {
    this.serveMeta.listen().subscribe((e) => {
      this.getMeta();
    });
  }

  ngOnInit() {
    this.getMeta();
  }

  // onPercentChange(newPercent: number) {
  //   this.acoes = newPercent;
  //   this.fiis = newPercent;
  //   this.fixa = newPercent;
  // }

  getMeta() {
    this.serveMeta.getMeta().subscribe({
      next: (res) => {
        this.resultMeta = res;
        this.filtro();
        this.progresso = res.porcentagem;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  addMeta() {
    const dialogRef = this.dialog.open(DialogMetaHomeComponent, {
      width: '400px',
      data: {
        nomeMeta: null,
        valorInicial: null,
        objetivo: null,
        dataEstimada: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  filtro() {
    this.filtroStatusConcluidas = this.resultMeta.filter(
      (p: { status: number }) => p.status == Status.CONCLUIDA
    );
    this.filtroStatusAndamentos = this.resultMeta.filter(
      (p: { status: number }) => p.status == Status.ANDAMENTO
    );
  }
}
