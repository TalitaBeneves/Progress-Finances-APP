import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MetasModel, Status } from 'src/core/model/Metas';
import { MetasService } from 'src/core/server/metas.service';
import { DialogMetaHomeComponent } from './components/dialog-meta-home/dialog-meta-home.component';
import { MatDialog } from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-meta-home',
  templateUrl: './meta-home.component.html',
  styleUrls: ['./meta-home.component.scss'],
})
export class MetaHomeComponent implements OnInit {
  @ViewChild('dialogData') dialogData: DialogMetaHomeComponent;

  animal?: string;
  name?: string;
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
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  edit() {
    alert('Editar Meta');
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
    alert('Detalhes Meta');
  }
}
