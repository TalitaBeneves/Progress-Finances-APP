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

    this.serviceMeta.getMetaById(this.id).subscribe({
      next: (res) => {
        this.items = res;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  editarItem(e: any) {
    const dialogRef = this.dialog.open(DialogMetaDetalheComponent, {
      width: '400px',
      data: {
        nomeMeta: null,
        valorInicial: null,
        objetivo: null,
        dataEstimada: null,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  deletarItem(e: any) {
    const dialogRef = this.dialog.open(DialogMetaDetalheComponent, {
      width: '400px',
      data: {
        nomeMeta: null,
        valorInicial: null,
        objetivo: null,
        dataEstimada: null,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  cadastrarItem() {
    const dialogRef = this.dialog.open(DialogMetaDetalheComponent, {
      width: '400px',
      data: this.items,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
