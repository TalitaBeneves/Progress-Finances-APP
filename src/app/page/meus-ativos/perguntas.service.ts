import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PerguntasService {
  getPerguntas() {
    return [
      ///FIIs
      {
        id: 1,
        question:
          'O fundo imobiliário está negociado abaizo do P/VP 1?(Acima de 1,5 eu descarto o investimento em qualquer hipótese).',
        checked: false,
        criterio: '',
        tipo: 1,
      },
      {
        id: 2,
        question:
          'As propriedades são novas e não consomem manutenção excessiva?',
        checked: false,
        criterio: '',
        tipo: 1,
      },
      {
        id: 3,
        question: 'Distribui dividendos a mais de 4 anos consistentemente?',
        checked: false,
        criterio: '',
        tipo: 1,
      },
      {
        id: 4,
        question:
          'Os imóveis desse Fundo Imobiliário estão localizados em regiões nobres?',
        checked: false,
        criterio: '',
        tipo: 1,
      },
      {
        id: 5,
        question:
          'O fundo imobiliário está negociando com um desconto em relação ao valor patrimonial de seus ativos?',
        checked: false,
        criterio: '',
        tipo: 1,
      },
      {
        id: 6,
        question:
          'O fundo imobiliário possui uma carteira diversificada de imóveis e locatários?',
        checked: false,
        criterio: '',
        tipo: 1,
      },

      ////AÇÕES
      {
        id: 5,
        question: 'Empresa nunca deu prejuízo?',
        checked: false,
        criterio: 'Relação preço/lucro da ação',
        tipo: 3,
      },

      {
        id: 6,
        question: 'Empresa é uma boa pagadora de dividendos?',
        checked: false,
        criterio: 'Dívid Liquida - Lucro Líquido',
        tipo: 3,
      },
      {
        id: 7,
        question: 'A dívida da empresa é menor que seu patrimônio?',
        checked: false,
        criterio: 'CAGR',
        tipo: 3,
      },
      {
        id: 8,
        question:
          'A empresa apresentou bom crescimento de lucros nos últimos 5 anos ?',
        checked: false,
        criterio: 'CAGR',
        tipo: 3,
      },
      {
        id: 9,
        question: 'Empresa com mais de 5 anos de bolsa?',
        checked: false,
        criterio: 'CAGR',
        tipo: 3,
      },
      {
        id: 10,
        question: 'A empresa possui um bom ROE?',
        checked: false,
        criterio: 'CAGR',
        tipo: 3,
      },
      {
        id: 11,
        question: 'A empresa possui boa liquidez?',
        checked: false,
        criterio: 'CAGR',
        tipo: 3,
      },
    ];
  }
}
