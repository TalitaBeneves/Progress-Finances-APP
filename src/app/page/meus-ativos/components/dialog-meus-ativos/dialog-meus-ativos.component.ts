import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { PerguntasService } from '../../perguntas.service';
import { CadastrarAtivo } from 'src/app/core/model/Ativo';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-dialog-meus-ativos',
  templateUrl: './dialog-meus-ativos.component.html',
  styleUrls: ['./dialog-meus-ativos.component.scss'],
})
export class DialogMeusAtivosComponent implements OnInit {
  @Output() metaCriada = new EventEmitter();
  title: string = 'Aportar';
  btnTitle: string = 'Cadastrar';
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
  qtdPontos: number = 0;
  recomendacaoPorcentagem: number;
  sugestaoInvestimento: number;
  IdMetaIdUses: any;
  getIdUser: any;
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
    private serviceUsuario: UsuarioService
  ) {}

  ngOnInit() {
    this.montaForm();

    this.getIdUser = this.serviceUsuario.getUserLocalStorage();
    this.getMetaId(this.getIdUser.idUsuario);
  }

  getMetaId(id: number) {
    this.serviceFinances.listarMetaInvestimento(id).subscribe({
      next: (res) => {
        this.IdMetaIdUses = res[0];
        console.log(this.IdMetaIdUses);
      },
    });
  }

  onSelectionChange() {
    this.perguntas = this.servicePergunta.getPerguntas();

    this.perguntas = this.perguntas.filter(
      (item: { tipo: number }) => item.tipo == this.value
    );

    this.checked = this.perguntas.filter(
      (item: { checked: boolean }) => item.checked == false
    );
  }

  onQtdPontosChange(perguntaId: any) {
    if (perguntaId.checked) this.qtdPontos += 1;
    else this.qtdPontos -= 1;
  }

  montaForm() {
    this.form = this.fb.group({
      tipoAtivo: [null, Validators.required],
      nomeAtivo: [null, Validators.required],
      quantidade: [null, Validators.required],
      localAlocado: [null, Validators.required],
      valorAtivoAtual: [null, Validators.required],
    });
  }

  onNoClick(e: any): void {
    const qtdPontos = this.qtdPontos;
    const checked = this.checked.length;

    const percentual = qtdPontos / checked;
    let pontuacao = Math.round(percentual * 10);
    if (this.value == 2) {
      pontuacao = 10;
    }
    const percentualRecomendado =
      ((pontuacao *
        this.form.value.quantidade *
        parseInt(this.form.value.valorAtivoAtual)) /
        100) *
      20;
    const sugestaoInvestimento =
      pontuacao * parseInt(this.form.value.valorAtivoAtual);

    const calculaTotal =
      parseInt(this.form.value.valorAtivoAtual) *
      parseInt(this.form.value.quantidade);

    const model: CadastrarAtivo = {
      idUsuario: this.getIdUser.idUsuario,
      idMeta: this.IdMetaIdUses.idMeta,
      nome: this.form.value.nomeAtivo,
      nota: pontuacao,
      recomendacaoPorcentagem: percentualRecomendado,
      sugestaoInvestimento: sugestaoInvestimento,
      tipoAtivo: this.form.value.tipoAtivo,
      localAlocado: this.form.value.localAlocado,
      quantidadeDeAtivo: parseInt(this.form.value.quantidade),
      valorTotalInvestido: calculaTotal,
      valorAtualDoAtivo: parseInt(this.form.value.valorAtivoAtual),
    };

    this.serviceFinances.cadastrarAtivo(model).subscribe({
      next: (res) => {
        this.toastr.success('O ativo foi cadastrado com sucesso!', 'Sucesso');
        this.serviceFinances.filter(res);
        this.dialogRef.close();
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  editarMeta(e?: any) {
    // this.toastr.success('Deposito foi editado com sucesso!', 'Sucesso');
    // this.serviceMeta.filter(res);
  }

  createItem() {
    //this.verificacaoValid();
    // this.toastr.success('Meta foi cadastrado com sucesso!', 'Sucesso');
    // this.serviceMeta.filter(res);
    // this.dialogRef.close();
  }

  verificacaoValid() {
    if (this.form.invalid) {
      this.toastr.warning(
        'Favor preencher todos os campos obrigatorios',
        'Alerta'
      );
      this.form.markAllAsTouched();
      return;
    }
  }
}
