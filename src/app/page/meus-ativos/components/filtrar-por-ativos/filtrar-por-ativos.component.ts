import { Component, Input } from '@angular/core';

import { FinancesService } from 'src/app/core/server/Finances/finances.service';

@Component({
  selector: 'app-filtrar-por-ativos',
  templateUrl: './filtrar-por-ativos.component.html',
  styleUrls: ['./filtrar-por-ativos.component.scss'],
})
export class FiltrarPorAtivosComponent {
  @Input() ativos;
  array: any = [];
  items;

  constructor(private serviceFinance: FinancesService) {}

  filtra(event) {
    var e = event.target.className;
    var tipoAtivo = 0;

    switch (e) {
      case 'acoes':
        tipoAtivo = 3;
        this.array = [];
        break;
      case 'fiis':
        tipoAtivo = 1;
        this.array = [];
        break;
      case 'fixa':
        tipoAtivo = 2;
        this.array = [];
        break;
      case 'limpaFiltro':
        this.serviceFinance.filterByFiltro(this.ativos);
        break;

      default:
        break;
    }

    if (tipoAtivo > 0) {
      this.ativos.forEach((element) => {
        if (element.tipo == tipoAtivo) this.array.push(element);

        this.items = this.array;
        this.serviceFinance.filterByFiltro(this.items);
      });
    }
  }
}
