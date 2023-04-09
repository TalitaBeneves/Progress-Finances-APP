import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AllMetasModel, Status } from 'src/core/model/Metas';
import { MetasService } from 'src/core/server/metas.service';
import { DialogMetaHomeComponent } from './components/dialog-meta-home/dialog-meta-home.component';

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
