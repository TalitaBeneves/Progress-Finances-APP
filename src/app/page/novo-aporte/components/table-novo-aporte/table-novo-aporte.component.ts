import { Component, Input } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { FinancesService } from 'src/app/core/server/Finances/finances.service';

@Component({
  selector: 'app-table-novo-aporte',
  templateUrl: './table-novo-aporte.component.html',
  styleUrls: ['./table-novo-aporte.component.scss'],
})
export class TableNovoAporteComponent {
  @Input() items;

  constructor(
    private seviceFinaces: FinancesService,
    private toastr: ToastrService
  ) {}

  naoCalcula(model: any, e) {
    this.seviceFinaces
      .naoCalcularInvestimento(model.usuario_id, model.ativo_id, e)
      .subscribe({
        next: () => {},
        error: (e) => {
          console.error(e);
          this.toastr.success(`${e.messege}`, 'Erro');
        },
      });
  }
}
