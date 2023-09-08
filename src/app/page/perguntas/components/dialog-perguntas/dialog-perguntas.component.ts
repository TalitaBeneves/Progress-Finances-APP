import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import {
  AtualizarPergunta,
  CadastrarPergunta,
  ListarPerguntas,
} from 'src/app/core/model/Usuario';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { PerguntasService } from 'src/app/core/server/perguntas/perguntas.service';

@Component({
  selector: 'app-dialog-perguntas',
  templateUrl: './dialog-perguntas.component.html',
  styleUrls: ['./dialog-perguntas.component.scss'],
})
export class DialogPerguntasComponent implements OnInit {
  form: FormGroup;
  title: string = 'Cadastrar';
  checked = false;

  constructor(
    public dialogRef: MatDialogRef<DialogPerguntasComponent>,
    private servicePerguntas: PerguntasService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      element: ListarPerguntas;
      userId: number;
    },
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private serviceFinances: FinancesService
  ) { }

  ngOnInit(): void {
    this.montaForm();

    if (this.data.element) {
      this.title = 'Editar Perguntas';
      this.data.element.tipo = this.data.element.tipo.toString() as any;
      this.form.patchValue(this.data.element);
    }
  }
  montaForm() {
    this.form = this.fb.group({
      pergunta: [null, Validators.required],
      tipo: [null, Validators.required],
      ativo: [null],
    });
  }

  cadastrarPergunta() {
    if (this.form.invalid) {
      this.toastr.warning(
        'Favor preencher todos os campos obrigatorios',
        'Alerta'
      );
      this.form.markAllAsTouched();
      return;
    }
    this.spinner.show();
    const model: CadastrarPergunta = {
      ativo: this.form.value.ativo,
      tipo: parseInt(this.form.value.tipo),
      pergunta: this.form.value.pergunta,
      usuario_Id: this.data.userId,
    };
    this.servicePerguntas
      .cadastrarPergunta(model)
      .subscribe({
        next: (res) => {
          this.toastr.success('Pergunta cadastrada com sucesso!', 'Sucesso');
          this.serviceFinances.filter(res);
          this.dialogRef.close();
        },
        error: (e) => {
          console.error(e);
          this.toastr.error('Erro ao cadastrar pergunta!', 'danger');
        },
      })
      .add(() => this.spinner.hide());
  }

  editarPergunta() {
    if (this.form.invalid) {
      this.toastr.warning(
        'Favor preencher todos os campos obrigatorios',
        'Alerta'
      );
      this.form.markAllAsTouched();
      return;
    }
    this.spinner.show();
    const model: AtualizarPergunta = {
      pergunta_Id: this.data.element.pergunta_Id,
      usuario_Id: this.data.userId,
      ativo: this.form.value.ativo,
      tipo: parseInt(this.form.value.tipo),
      pergunta: this.form.value.pergunta,
    };

    this.servicePerguntas
      .atualizarPergunta(model)
      .subscribe({
        next: (res) => {
          this.toastr.success('Pergunta atualizada com sucesso!', 'Sucesso');
          this.serviceFinances.filter(res);
          this.dialogRef.close();
        },
        error: (e) => {
          console.error(e);
          this.toastr.error('Erro ao atualizar pergunta!', 'danger');
        },
      })
      .add(() => this.spinner.hide());
  }

  salvar() {
    if (this.data.element) this.editarPergunta();
    else this.cadastrarPergunta();
  }

  cancelar() {
    this.dialogRef.close();
  }
}
