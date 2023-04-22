import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import {
  CreateItemsModel,
  EditarItemsModel,
  Items,
} from 'src/core/model/Metas';

import { MetasService } from 'src/core/server/metas.service';

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
  metas: any;
  minDate: Date = new Date();
  items = [];
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)
    public data: {},
    private fb: FormBuilder,
    private serviceMeta: MetasService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.montaForm();
  }

  montaForm() {
    this.form = this.fb.group({
      tipoAtivo: ['', Validators.required],
      nomeAtivo: [null, Validators.required],
      quantidade: [null, Validators.required],
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
    // this.toastr.success('Deposito foi editado com sucesso!', 'Sucesso');
    // this.serviceMeta.filter(res);
  }

  createItem() {
    this.verificacaoValid();

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
