import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MetasService } from 'src/core/server/metas.service';
import { DialogMetaDetalheComponent } from './components/dialog-meta-detalhe/dialog-meta-detalhe.component';

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
    public dialog: MatDialog
  ) {}
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

    dialogRef.afterClosed().subscribe(() => {
      //atualizar a grid após o cadastro
      console.log('The dialog was closed');
    });
  }

  editarItem(e: any) {
    const dialogRef = this.dialog.open(DialogMetaDetalheComponent, {
      width: '400px',
      data: {
        dataDeposito: null,
        valorDeposito: null,
        cadastro: false,
        dados: this.items,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      //atualizar a grid após a edição
      console.log('The dialog was closed');
    });
  }

  deletarItem(e: any) {
    this.serviceMeta.deleteItem(e).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
    //swa pergintando se deseja realmente excluir aquele deposito
  }
}
