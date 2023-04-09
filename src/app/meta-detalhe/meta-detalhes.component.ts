import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MetasService } from 'src/core/server/metas.service';
import { DialogMetaDetalheComponent } from './components/dialog-meta-detalhe/dialog-meta-detalhe.component';
import Swal from 'sweetalert2';
import { Items } from 'src/core/model/Metas';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meta-detalhes',
  templateUrl: './meta-detalhes.component.html',
  styleUrls: ['./meta-detalhes.component.scss'],
})
export class MetaDetalhesComponent implements OnInit, AfterViewInit {
  id: number;
  progresso: number;
  items: any;

  constructor(
    private route: ActivatedRoute,
    private serviceMeta: MetasService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.serviceMeta.listen().subscribe(() => {
      this.getById();
    });
  }
  ngAfterViewInit(): void {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.id = Number(params.idMeta);
    });
    this.getById();
  }

  getById() {
    this.serviceMeta.getMetaById(this.id).subscribe({
      next: (res) => {
        this.items = res;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  cadastrarItem() {
    const dialogRef = this.dialog.open(DialogMetaDetalheComponent, {
      width: '400px',
      data: {
        dados: this.items,
        cadastro: true,
      },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  editarItem(e: any) {
    const dialogRef = this.dialog.open(DialogMetaDetalheComponent, {
      width: '400px',
      data: {
        dataDeposito: null,
        valorDeposito: null,
        cadastro: false,
        dados: this.items,
        inputs: e,
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
        this.serviceMeta.deleteItem(item.id).subscribe({
          next: (res) => {
            this.toastr.success(
              'Deposito foi deletado com sucesso!',
              'success'
            );
            this.serviceMeta.filter(res);
          },
          error: (e) => {
            console.error(e);
          },
        });
      }
    });
  }
}
