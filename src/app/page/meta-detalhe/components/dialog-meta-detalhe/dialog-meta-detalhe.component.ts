import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  CreateItemsModel,
  EditarItemsModel,
  Items,
} from 'src/app/core/model/Metas';
import { MetasService } from 'src/app/core/server/metas.service';

@Component({
  selector: 'app-dialog-meta-detalhe',
  templateUrl: './dialog-meta-detalhe.component.html',
  styleUrls: ['./dialog-meta-detalhe.component.scss'],
})
export class DialogMetaDetalheComponent implements OnInit {
  @Output() metaCriada = new EventEmitter();
  title: string = 'Adicionar Deposito';
  btnTitle: string = 'Cadastrar';
  getId: number;
  progresso: number;
  form: FormGroup;
  metas: any;
  minDate: Date = new Date();
  items = [];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dados: any;
      cadastro: boolean;
      inputs: Items;
    },
    private fb: FormBuilder,
    private serviceMeta: MetasService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.data.cadastro != true) {
      this.getId = this.data.inputs.id;
      this.title = 'Editar Deposito';
      this.btnTitle = 'Editar';
    }

    this.montaForm();
  }

  montaForm() {
    this.form = this.fb.group({
      dataDeposito: ['', Validators.required],
      valorDeposito: [null, Validators.required],
    });
  }

  onNoClick(e: any): void {
    if (this.btnTitle == 'Editar') {
      this.editarMeta();
      return;
    } else {
      this.createItem();
    }
  }

  editarMeta(e?: any) {
    this.verificacaoValid();
    const model: EditarItemsModel = {
      id: this.getId,
      valorDepositado: Number(this.form.value.valorDeposito),
      dataDeposito: this.form.value.dataDeposito,
      idMeta: this.data.dados.id,
      progressFinanceModelId: this.data.dados.id,
    };
    this.serviceMeta.editarItem(model).subscribe({
      next: (res) => {
        this.toastr.success('Deposito foi editado com sucesso!', 'Sucesso');
        this.serviceMeta.filter(res);
        this.dialogRef.close();
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  createItem() {
    this.verificacaoValid();
    const model: CreateItemsModel = {
      valorDepositado: Number(this.form.value.valorDeposito),
      dataDeposito: this.form.value.dataDeposito,
      idMeta: this.data.dados.id,
      progressFinanceModelId: this.data.dados.id,
    };
    this.serviceMeta.createItem(model).subscribe({
      next: (res) => {
        this.toastr.success('Meta foi cadastrado com sucesso!', 'Sucesso');
        this.serviceMeta.filter(res);
        this.dialogRef.close();
      },
      error: (e) => {
        console.error(e);
      },
    });
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
