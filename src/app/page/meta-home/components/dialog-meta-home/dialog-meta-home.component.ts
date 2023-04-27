import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';

import { MetaHomeComponent } from './../../meta-home.component';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Status } from 'src/app/core/model/Enums';
import {
  AllMetasModel,
  CriarMetasModel,
  EditarMetasModel,
} from 'src/app/core/model/Metas';
import { MetasService } from 'src/app/core/server/metas.service';

@Component({
  selector: 'app-dialog-meta-home',
  templateUrl: './dialog-meta-home.component.html',
  styleUrls: ['./dialog-meta-home.component.scss'],
})
export class DialogMetaHomeComponent implements OnInit {
  @ViewChild(MetaHomeComponent) component: MetaHomeComponent;
  update: Subject<any> = new Subject<any>();
  title: string = 'Criar Meta';
  btnTitle: string = 'Cadastrar';

  getId: number;

  form: FormGroup;
  minDate: Data = new Date();

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: AllMetasModel,
    private serveMeta: MetasService,
    private toastr: ToastrService,
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
    this.verificacaoValid();
    const model: EditarMetasModel = {
      id: this.getId,
      nomeMeta: this.form.value.nomeMeta,
      valorInicial: this.form.value.valorInicial,
      valorMeta: this.form.value.objetivo,
      dataAlvo: this.form.value.dataEstimada,
      dataCadastro: new Date(),
    };

    this.serveMeta.editMeta(model).subscribe({
      next: (res) => {
        this.toastr.success('Meta foi editada com sucesso!', 'Sucesso');
        this.serveMeta.filter(res);
        this.dialogRef.close();
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  criarMeta() {
    if (this.form.invalid) {
      this.toastr.warning(
        'Favor preencher todos os campos obrigatorios',
        'Alerta'
      );
      this.form.markAllAsTouched();
      return;
    }
    const model: CriarMetasModel = {
      nomeMeta: this.form.value.nomeMeta,
      valorInicial: this.form.value.valorInicial,
      valorMeta: this.form.value.objetivo,
      dataAlvo: this.form.value.dataEstimada,
      dataCadastro: new Date(),
      status: Status.ANDAMENTO,
      items: [],
    };
    this.serveMeta.addMeta(model).subscribe({
      next: (res) => {
        this.toastr.success('Meta foi criada com sucesso!', 'Sucesso');
        this.serveMeta.filter(res);
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
