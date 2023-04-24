import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import {
  CreateItemsModel,
  EditarItemsModel,
  Items,
} from 'src/core/model/Metas';

import { MetasService } from 'src/core/server/metas.service';
import { PerguntasService } from '../../perguntas.service';

@Component({
  selector: 'app-dialog-meus-ativos',
  templateUrl: './dialog-meus-ativos.component.html',
  styleUrls: ['./dialog-meus-ativos.component.scss'],
})
export class DialogMeusAtivosComponent implements OnInit {
  @Output() metaCriada = new EventEmitter();
  title: string = 'Aportar';
  btnTitle: string = 'Cadastrar';
  getId: number;
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

  ativos = [
    { value: 'acoes', viewValue: 'Ações' },
    { value: 'fiis', viewValue: 'Fundos Imobiliários' },
    { value: 'renda_Fixa', viewValue: 'Renda Fixa' },
  ];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)
    public data: {},
    private fb: FormBuilder,
    private serviceMeta: MetasService,
    private toastr: ToastrService,
    private servicePergunta: PerguntasService
  ) {}

  ngOnInit() {
    this.montaForm();
  }

  onSelectionChange() {
    this.perguntas = this.servicePergunta.getPerguntas();

    this.perguntas = this.perguntas.filter(
      (item: { tipo: string }) => item.tipo == this.value
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
    });
  }

  onNoClick(e: any): void {
    const qtdPontos = this.qtdPontos;
    const checked = this.checked.length;

    const percentual = qtdPontos / checked;
    const pontuacao = Math.round(percentual * 10);
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
