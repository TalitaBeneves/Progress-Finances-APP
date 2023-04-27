import { HttpHeaders } from '@angular/common/http';
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
          'O fundo imobiliário está negociado abaizo do P/VP 1?(Acima de 1,5 eu descarto o investimento em qualquer hipótese)?',
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

      ////AÇÕES
      {
        id: 5,
        question:
          'O valor atual do ativo é considerado um bom preço em relação ao seu valor intrínseco?',
        checked: false,
        criterio: 'Relação preço/lucro da ação',
        tipo: 3,
      },

      {
        id: 6,
        question:
          'A divida liquida é menor que o lucro liquído dos últimos 12 meses? ',
        checked: false,
        criterio: 'Dívid Liquida - Lucro Líquido',
        tipo: 3,
      },
      {
        id: 7,
        question:
          'Tem um crescimento de receita(lucro) superior a 5% nos últimos 5 anos?',
        checked: false,
        criterio: 'CAGR',
        tipo: 3,
      },
    ];
  }
}

// {

//     'A empresa tem um histórico consistente de lucros e crescimento?',
//  checked: false,
//   criterio: 'Relação preço/lucro da ação',
// },
// {
//   question:
//     'A empresa possui uma vantagem competitiva em relação aos seus concorrentes?',
//  checked: false,
//   criterio: 'Histórico da empresa',
// },
// {
//   question:
//     'O setor em que a empresa atua está em uma fase de crescimento ou estabilidade?',
//   nota: 0,
//   criterio: 'Setor empresarial',
// },
// {
//   question: 'A empresa tem uma gestão eficiente e transparente?',
//   nota: 0,
//   criterio: 'Histórico da empresa',
// },
// {
//   question:
//     'O ativo está sendo negociado abaixo da sua média histórica em termos de múltiplos de valuation?',
//   nota: 0,
//   criterio: '',
question: tipo: 'fiis';
// },

// {
//   question: 'O ativo paga dividendos regulares e crescentes?',
//   nota: 0,
//   criterio: 'Dividendos',
// },
// {
//   question:
//     'O fundo imobiliário possui uma carteira diversificada de imóveis e locatários',
//   nota: 0,
//   criterio: 'Qualidade do imóvel',
// },
// {
//   question:
//     'O fundo imobiliário está negociando com um desconto em relação ao valor patrimonial de seus ativos?',
//   nota: 0,
//   criterio: '',
tipo: 'fiis';
// },
// {
//   question:
//     'O fundo imobiliário tem uma boa gestão e histórico de distribuição de rendimentos consistentes?',
//   nota: 0,
//   criterio: '',
tipo: 'fiis';
// },
