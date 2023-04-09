import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { AllMetasModel, CriarMetasModel, Status } from 'src/core/model/Metas';
import { MetasService } from 'src/core/server/metas.service';
import { EditarMetasModel } from './../../../../core/model/Metas';

@Component({
  selector: 'app-dialog-meta-home',
  templateUrl: './dialog-meta-home.component.html',
  styleUrls: ['./dialog-meta-home.component.scss'],
})
export class DialogMetaHomeComponent implements OnInit {
  title: string = 'Criar Meta';
  btnTitle: string = 'Cadastrar';

  getId: number;

  form: FormGroup;
  minDate: Data = new Date();

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: AllMetasModel,
    private serveMeta: MetasService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.valorInicial != null) {
      this.getId = this.data.id;
      this.title = 'Editar Meta';
      this.btnTitle = 'Editar';
    }
    this.montaForm();
  }

  montaForm() {
    this.form = this.fb.group({
      nomeMeta: [null, Validators.required],
      valorInicial: [null],
      objetivo: [null, Validators.required],
      dataEstimada: [null, Validators.required],
    });
  }

  onNoClick(e: any): void {
    if (this.btnTitle == 'Editar') {
      this.editarMeta();
      return;
    } else {
      this.criarMeta();
    }
  }

  editarMeta() {
    const model: EditarMetasModel = {
      id: this.getId,
      nomeMeta: this.form.value.nomeMeta,
      valorInicial: this.form.value.valorInicial,
      valorMeta: this.form.value.objetivo,
      dataAlvo: this.form.value.dataEstimada,
      dataCadastro: new Date(),
      porcentagem: this.formulaPorcentagem(),
    };

    this.serveMeta.editMeta(model).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  criarMeta() {
    const model: CriarMetasModel = {
      nomeMeta: this.form.value.nomeMeta,
      valorInicial: this.form.value.valorInicial,
      valorMeta: this.form.value.objetivo,
      dataAlvo: this.form.value.dataEstimada,
      porcentagem: this.formulaPorcentagem(),
      dataCadastro: new Date(),
      status: Status.ANDAMENTO,
      items: [],
    };
    this.serveMeta.addMeta(model).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  formulaPorcentagem() {
    const formula =
      (this.form.value.valorInicial / this.form.value.objetivo) * 100;

    return formula;
  }
}
