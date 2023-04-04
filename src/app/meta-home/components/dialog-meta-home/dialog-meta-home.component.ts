import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CriarMetasModel, Status } from 'src/core/model/Metas';
import { MetasService } from 'src/core/server/metas.service';
import { EditarMetasModel } from './../../../../core/model/Metas';

@Component({
  selector: 'app-dialog-meta-home',
  templateUrl: './dialog-meta-home.component.html',
  styleUrls: ['./dialog-meta-home.component.scss'],
})
export class DialogMetaHomeComponent implements OnInit {
  @Output() metaCriada = new EventEmitter();
  title: string = 'Criar Meta';
  btnTitle: string = 'Cadastrar';
  teste: any;
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: CriarMetasModel,
    private serveMeta: MetasService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.objetivo != null) {
      this.teste = this.data;
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
    console.log(this.btnTitle);
    if (this.btnTitle == 'Editar') {
      this.editarMeta();
      return;
    } else {
      const model: CriarMetasModel = {
        nomeMeta: this.form.value.nomeMeta,
        valorInicial: this.form.value.valorInicial,
        objetivo: this.form.value.objetivo,
        dataEstimada: this.form.value.dataEstimada,
        status: Status.ANDAMENTO,
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
  }

  editarMeta() {
    const model: EditarMetasModel = {
      nomeMeta: this.form.value.nomeMeta,
      valorInicial: this.form.value.valorInicial,
      objetivo: this.form.value.objetivo,
      dataEstimada: this.form.value.dataEstimada,
    };
    this.serveMeta.editMeta(this.teste.id, model).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
