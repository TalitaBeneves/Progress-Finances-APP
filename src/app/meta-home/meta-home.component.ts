import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MetasService } from 'src/core/server/metas.service';
import { DialogMetaHomeComponent } from './components/dialog-meta-home/dialog-meta-home.component';

@Component({
  selector: 'app-meta-home',
  templateUrl: './meta-home.component.html',
  styleUrls: ['./meta-home.component.scss'],
})
export class MetaHomeComponent implements OnInit {
  @ViewChild('dialogData') dialogData: DialogMetaHomeComponent;

  metas: any;
  constructor(
    private route: Router,
    private serveMeta: MetasService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getMeta();
  }
  getMeta() {
    this.serveMeta.getMeta().subscribe({
      next: (res) => {
        this.metas = res;
        console.log(res);
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

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  edit(e: any) {
    const dialogRef = this.dialog.open(DialogMetaHomeComponent, {
      width: '400px',
      data: e,
    });
  }

  delet(id: number) {
    this.serveMeta.deletMeta(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
  openDetail() {
    this.route.navigate(['/meta-detalhe']);
    // alert('Detalhes Meta');
  }
}
