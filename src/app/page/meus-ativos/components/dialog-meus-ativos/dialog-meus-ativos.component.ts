import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { NgxSpinnerService } from 'ngx-spinner';
import { AtualizarAtivo, CadastrarAtivo } from 'src/app/core/model/Ativo';
import { ListarMetaInvestimentoModel } from 'src/app/core/model/MetaInvestimento';
import { UsuarioLogado } from 'src/app/core/model/Usuario';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { PerguntasService } from 'src/app/core/server/perguntas/perguntas.service';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-dialog-meus-ativos',
  templateUrl: './dialog-meus-ativos.component.html',
  styleUrls: ['./dialog-meus-ativos.component.scss'],
})
export class DialogMeusAtivosComponent implements OnInit {
  @Output() metaCriada = new EventEmitter();
  title: string = 'Aportar';
  btnTitle: string = 'Cadastrar ativo';
  getId: any;
  progresso: number;
  form: FormGroup;
  formPontos: FormGroup;
  metas: any;
  minDate: Date = new Date();
  items = [];
  color: ThemePalette = 'accent';
  checked: any;
  disabled = false;
  perguntas: any;
  value: any;

  qtdPontosPositivos: number = 0;
  qtdPontosNegativos: number = 0;
  pontuacaoFinal: number = 0;
  mostra = true
  nome: string = '';
  respostasPerguntas: { [perguntaId: number]: boolean } = {};

  recomendacaoPorcentagem: number;
  sugestaoInvestimento: number;
  dadosMeta: ListarMetaInvestimentoModel;
  getIdUser: UsuarioLogado;

  ativos = [
    { value: 3, viewValue: 'Ações' },
    { value: 1, viewValue: 'Fundos Imobiliários' },
    { value: 2, viewValue: 'Renda Fixa' },
  ];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private serviceFinances: FinancesService,
    private toastr: ToastrService,
    private servicePergunta: PerguntasService,
    private serviceUsuario: UsuarioService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.montaForm();

    this.getIdUser = this.serviceUsuario.getUserLocalStorage();
    this.getMetaId(this.getIdUser.usuario_Id);

    if (this.data) {
      this.btnTitle = 'Editar ativo';
      this.value = this.data.tipo;
      this.form.get('tipoAtivo')?.disable();
      this.form.get('tipoAtivo')?.setValue(this.value);
      this.form.patchValue(this.data);
    }
  }

  getMetaId(id: number) {
    this.spinner.show();
    this.serviceFinances
      .listarMetaInvestimento(id)
      .subscribe({
        next: (res) => {
          this.dadosMeta = res[0];
        },
      })
      .add(() => this.spinner.hide());
  }

  getNomeAtivo(nome: string) {
    if (nome.length >= 5) {
      this.serviceFinances.buscarValorAtivo(nome).subscribe({
        next: (res) => {
          this.form.get('valorAtualDoAtivo')?.setValue(res.results[0].regularMarketPrice);
        },
        error: (e) => { console.error(e) },
      })
    }
  }

  onSelectionChange() {
    this.spinner.show();
    this.servicePergunta
      .buscarPerguntasAtivasIdUsuario(this.getIdUser.usuario_Id)
      .subscribe({
        next: (res) => {
          this.perguntas = res;

          if (this.perguntas) {
            this.perguntas = this.perguntas.filter(
              (item: { tipo: number }) => item.tipo == this.value
            );

            this.qtdPontosNegativos = this.perguntas.length;
          }
        },
        error: (e) => {
          console.error(e);
        },
      })
      .add(() => this.spinner.hide());
  }

  onQtdPontosChange(perguntaId: number) {
    const resposta = this.respostasPerguntas[perguntaId];

    if (resposta === true) {
      this.qtdPontosPositivos++;
      this.qtdPontosNegativos--;
    } else if (resposta === false) {
      this.qtdPontosPositivos--;
      this.qtdPontosNegativos++;
    }

    this.calcularPontuacaoFinal();

  }
  calcularPontuacaoFinal() {
    const pontuacaoPercentual = (this.qtdPontosPositivos / this.qtdPontosNegativos) * 10;
    this.pontuacaoFinal = Math.min(pontuacaoPercentual, 10);
  }

  montaForm() {
    this.form = this.fb.group({
      tipoAtivo: [null, Validators.required],
      nome: [null, Validators.required],
      qtdAtivos: [null, Validators.required],
      localAlocado: [null, Validators.required],
      valorAtualDoAtivo: [null, Validators.required],
    });
  }

  cadastrarAtivo(): void {
    if (this.form.invalid) {
      this.toastr.warning(
        'Favor preencher todos os campos obrigatorios',
        'Alerta'
      );
      this.form.markAllAsTouched();
      return;
    }
    this.spinner.show();
    const qtdPontos = this.qtdPontosPositivos;
    const pontuacaoFinal = this.qtdPontosNegativos;

    const percentual = qtdPontos / (qtdPontos + pontuacaoFinal);

    let nota = Math.min(percentual * 10, 10);
    if (this.value == 2) nota = 10;

    const sugestaoInvestimento =
      nota * parseInt(this.form.value.valorAtualDoAtivo);

    const valorFormatado = this.form.value.qtdAtivos.replace(',', '.');

    const numero = parseFloat(valorFormatado);
    const calculaTotal =
      parseFloat(this.form.value.valorAtualDoAtivo) * numero;

    const model: CadastrarAtivo = {
      usuario_Id: this.getIdUser.usuario_Id,
      nome: this.form.value.nome,
      nota: Math.round(nota),
      sugestaoInvestimento: Math.round(sugestaoInvestimento),
      tipo: this.form.value.tipoAtivo,
      localAlocado: this.form.value.localAlocado,
      qtdAtivos: numero,
      valorTotalInvestido: calculaTotal,
      valorAtualDoAtivo: this.form.value.valorAtualDoAtivo,
      chekedParaCalculo: true
    };

    this.serviceFinances
      .cadastrarAtivo(model)
      .subscribe({
        next: (res) => {
          this.toastr.success('O ativo foi cadastrado com sucesso!', 'Sucesso');
          this.serviceFinances.filter(res);
          this.dialogRef.close();
        },
        error: (e) => {
          console.error(e);
          this.toastr.error('Erro ao cadastrar seu ativo!', 'Erro');
        },
      })
      .add(() => this.spinner.hide());
  }

  editarMeta(e?: any) {
    if (this.form.invalid) {
      this.toastr.warning(
        'Favor preencher todos os campos obrigatorios',
        'Alerta'
      );
      this.form.markAllAsTouched();
      return;
    }

    this.spinner.show();
    const calculaTotal =
      parseInt(this.form.value.valorAtualDoAtivo) *
      parseInt(this.form.value.qtdAtivos);

    const model: AtualizarAtivo = {
      usuario_Id: this.getIdUser.usuario_Id,
      ativo_id: this.data.ativo_id,
      nome: this.form.value.nome,
      localAlocado: this.form.value.localAlocado,
      qtdAtivos: parseInt(this.form.value.qtdAtivos),
      valorAtualDoAtivo: this.form.value.valorAtualDoAtivo,
      valorTotalInvestido: calculaTotal,
      nota: this.data.nota,
      sugestaoInvestimento: this.data.sugestaoInvestimento,
      tipo: this.data.tipo,
      chekedParaCalculo: true
    };

    this.serviceFinances
      .atualizarAtivo(model)
      .subscribe({
        next: (res) => {
          this.toastr.success('O ativo foi atualizado com sucesso!', 'Sucesso');
          this.serviceFinances.filter(res);
          this.dialogRef.close();
        },
        error: (e) => {
          console.error(e);
          this.toastr.error('Erro ao editar seu ativo!', 'Erro');
        },
      })
      .add(() => this.spinner.hide());
  }

  salvar() {
    if (this.data) this.editarMeta();
    else this.cadastrarAtivo();
  }

  cancelar() {
    this.dialogRef.close();
  }
}
