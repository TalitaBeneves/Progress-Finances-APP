import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllMetasModel, CreateItemsModel, Items } from 'src/core/model/Metas';
import { MetasService } from 'src/core/server/metas.service';

@Component({
  selector: 'app-dialog-meta-detalhe',
  templateUrl: './dialog-meta-detalhe.component.html',
  styleUrls: ['./dialog-meta-detalhe.component.scss'],
})
export class DialogMetaDetalheComponent implements OnInit {
  @Output() metaCriada = new EventEmitter();
  title: string = 'Adicionar Deposito';
  btnTitle: string = 'Cadastrar';
  teste: any;
  progresso: number;
  form: FormGroup;
  metas: any;
  minDate: Date = new Date();
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dados: any;
      cadastro: boolean;
    },
    private serveMeta: MetasService,
    private fb: FormBuilder,
    private serviceMeta: MetasService
  ) {}

  ngOnInit() {
    console.log(this.data);
    if (this.data.cadastro != true) {
      this.teste = this.data;
      this.title = 'Editar Deposito';
      this.btnTitle = 'Editar';
    }

    this.montaForm();
  }

  montaForm() {
    this.form = this.fb.group({
      dataDeposito: [null, Validators.required],
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
    const model: CreateItemsModel = {
      valorDepositado: Number(this.form.value.valorDeposito),
      dataDeposito: this.form.value.dataDeposito,
      idMeta: this.data.dados.id,
      progressFinanceModelId: this.data.dados.id,
    };
    this.serviceMeta.createItem(model).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  createItem() {
    const model: CreateItemsModel = {
      valorDepositado: Number(this.form.value.valorDeposito),
      dataDeposito: this.form.value.dataDeposito,
      idMeta: this.data.dados.id,
      progressFinanceModelId: this.data.dados.id,
    };
    this.serviceMeta.createItem(model).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
