import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllMetasModel } from 'src/core/model/Metas';
import { DialogMetaHomeComponent } from '../dialog-meta-home/dialog-meta-home.component';
import { MatDialog } from '@angular/material/dialog';
import { MetasService } from 'src/core/server/metas.service';

@Component({
  selector: 'app-metas-andamento',
  templateUrl: './metas-andamento.component.html',
  styleUrls: ['./metas-andamento.component.scss'],
})
export class MetasAndamentoComponent implements OnInit {
  @Input() filtroStatusAndamentos: any;
  constructor(
    private router: Router,
    private serveMeta: MetasService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

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

  openDetail(item: AllMetasModel) {
    this.router.navigate(['/meta-detalhe', item.id], {
      queryParams: { idMeta: item.id },
    });
  }
}
