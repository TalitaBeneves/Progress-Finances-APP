import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { DialogMetaHomeComponent } from '../dialog-meta-home/dialog-meta-home.component';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AllMetasModel } from 'src/app/core/model/Metas';
import { MetasService } from 'src/app/core/server/metas.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-metas-andamento',
  templateUrl: './metas-andamento.component.html',
  styleUrls: ['./metas-andamento.component.scss'],
})
export class MetasAndamentoComponent {
  @Input() filtroStatusAndamentos: any;

  constructor(
    private router: Router,
    private serveMeta: MetasService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.serveMeta.listen().subscribe((e) => {
      this.filtroStatusAndamentos = e;
    });
  }

  editar(e: any) {
    const dialogRef = this.dialog
      .open(DialogMetaHomeComponent, {
        width: '400px',
        data: e,
      })
      .afterClosed()
      .subscribe((res) => {});
  }

  deletar(meta: AllMetasModel) {
    Swal.fire({
      title: '<b>Deletar Meta!</b>',
      text: `Term Certeza que gostaria de deletar a meta ${meta.nomeMeta}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Deletar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.serveMeta
          .deletMeta(meta.id)
          .subscribe({
            next: (res) => {
              this.toastr.success('Meta foi deletada com sucesso!', 'Sucesso');
              this.serveMeta.filter(res);
            },
            error: (e) => {
              console.error(e);
            },
          })
          .add(() => this.spinner.hide());
      }
    });
  }

  openDetail(item: AllMetasModel) {
    this.router.navigate(['/meta-detalhe', item.id], {
      queryParams: { idMeta: item.id },
    });
  }
}
