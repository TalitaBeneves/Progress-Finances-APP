import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { DialogMetaDetalheComponent } from './components/dialog-meta-detalhe/dialog-meta-detalhe.component';
import { MetasService } from 'src/app/core/server/metas.service';
import { Items } from 'src/app/core/model/Metas';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-meta-detalhes',
  templateUrl: './meta-detalhes.component.html',
  styleUrls: ['./meta-detalhes.component.scss'],
})
export class MetaDetalhesComponent implements OnInit {
  id: number;
  progresso: number;
  items: any;

  constructor(
    private route: ActivatedRoute,
    private serviceMeta: MetasService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.serviceMeta.listen().subscribe(() => {
      this.getById();
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.id = Number(params.idMeta);
    });
    this.getById();
  }

  getById() {
    this.spinner.show();
    this.serviceMeta
      .getMetaById(this.id)
      .subscribe({
        next: (res) => {
          this.items = res;
        },
        error: (e) => {
          console.error(e);
        },
      })
      .add(() => this.spinner.hide());
  }

  cadastrarItem() {
    const dialogRef = this.dialog.open(DialogMetaDetalheComponent, {
      width: '400px',
      data: {
        dados: this.items,
        cadastro: true,
        inputs: {
          valorDeposito: null,
          dataDeposito: null,
        },
      },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  editarItem(item: Items) {
    const dialogRef = this.dialog.open(DialogMetaDetalheComponent, {
      width: '400px',
      data: {
        dataDeposito: null,
        valorDeposito: null,
        cadastro: false,
        dados: this.items,
        inputs: item,
      },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  deletarItem(item: Items) {
    Swal.fire({
      title: '<b>Deletar Deposito!</b>',
      text: `Tem certeza que gostaria de deletar o deposito ${item.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Deletar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.serviceMeta
          .deleteItem(item.id)
          .subscribe({
            next: (res) => {
              this.toastr.success(
                'Deposito foi deletado com sucesso!',
                'Sucesso'
              );
              this.serviceMeta.filter(res);
            },
            error: (e) => {
              console.error(e);
            },
          })
          .add(() => this.spinner.hide());
      }
    });
  }
}
