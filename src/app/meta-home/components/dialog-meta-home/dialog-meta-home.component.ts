import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CriarMetasModel, MetasModel, Status } from 'src/core/model/Metas';
import { MetasService } from 'src/core/server/metas.service';

@Component({
  selector: 'app-dialog-meta-home',
  templateUrl: './dialog-meta-home.component.html',
  styleUrls: ['./dialog-meta-home.component.scss'],
})
export class DialogMetaHomeComponent implements OnInit {
  @Output() metaCriada = new EventEmitter();
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: CriarMetasModel,
    private serveMeta: MetasService,
    private fb: FormBuilder
  ) {}

  montaForm() {
    this.form = this.fb.group({
      nomeMeta: [null, Validators.required],
      valor: [null],
      objetivo: [null, Validators.required],
      dataEstimada: [null, Validators.required],
    });
  }

  onNoClick(): void {
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

  ngOnInit() {
    this.montaForm();
  }
}
