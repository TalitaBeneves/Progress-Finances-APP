import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { DialogMeusAtivosComponent } from '../dialog-meus-ativos/dialog-meus-ativos.component';

@Component({
  selector: 'app-table-meus-ativos',
  templateUrl: './table-meus-ativos.component.html',
  styleUrls: ['./table-meus-ativos.component.scss'],
})
export class TableMeusAtivosComponent {
  @Input() getId;
  @Input() ativos;

  constructor(
    private serviceFinances: FinancesService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.serviceFinances.listenFiltro().subscribe((e) => {
      this.ativos = e;
    });
  }

  getDadosTabela(e) {
    this.openDialogCadastrar(e);
  }

  deletarAtivo(e) {
    this.spinner.show();
    this.serviceFinances
      .deletarAtivo(e.ativo_id)
      .subscribe({
        next: (res) => {
          this.toastr.success('O ativo foi deletado com sucesso!', 'Sucesso');
          this.serviceFinances.filter(res);
        },
        error: (e) => {
          console.error(e);
        },
      })
      .add(() => this.spinner.hide());
  }

  openDialogCadastrar(element?) {
    const dialogRef = this.dialog.open(DialogMeusAtivosComponent, {
      width: '1000px',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => { });
  }
}
