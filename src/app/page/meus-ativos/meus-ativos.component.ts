import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogMeusAtivosComponent } from './components/dialog-meus-ativos/dialog-meus-ativos.component';

@Component({
  selector: 'app-meus-ativos',
  templateUrl: './meus-ativos.component.html',
  styleUrls: ['./meus-ativos.component.scss'],
})
export class MeusAtivosComponent implements OnInit {
  ativos: any;
  getId: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    const getId = localStorage.getItem('usuario');
    if (getId) this.getId = JSON.parse(getId);
  }

  openDialogCadastrar(element?) {
    const dialogRef = this.dialog.open(DialogMeusAtivosComponent, {
      width: '1000px',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
