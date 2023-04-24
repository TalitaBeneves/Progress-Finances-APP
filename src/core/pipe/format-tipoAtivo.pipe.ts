import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTipoAtivo',
})
export class FormatTipoAtivoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value == 0) return 'Ações';
    if (value == 1) return 'Fundos Imobiliários';
    if (value == 2) return 'Renda Fixa';
  }
}
