import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CriarMetasModel, Items, Status } from 'src/core/model/Metas';
import { MetasService } from 'src/core/server/metas.service';

@Component({
  selector: 'app-dialog-meta-detalhe',
  templateUrl: './dialog-meta-detalhe.component.html',
  styleUrls: ['./dialog-meta-detalhe.component.scss'],
})
export class DialogMetaDetalheComponent implements OnInit {
  @Output() metaCriada = new EventEmitter();
  title: string = 'Criar Meta';
  btnTitle: string = 'Cadastrar';
  teste: any;
  progresso: number = 0;
  form: FormGroup;
  metas: any;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serveMeta: MetasService,
    private fb: FormBuilder,
    private serviceMeta: MetasService
  ) {}

  ngOnInit() {
    if (this.data.valor != null) {
      this.teste = this.data;
      this.title = 'Editar Meta';
      this.btnTitle = 'Editar';
    }

    this.montaForm();
  }

  montaForm() {
    this.form = this.fb.group({
      data: [null, Validators.required],
      valor: [null],
      hora: [null, Validators.required],
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
    // const model: Items = {
    //   id: 0,
    //   data: '',
    //   hora: '',
    //   valor: 0,
    // };
    // this.serviceMeta.editItemMeta(e, model).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (e) => {
    //     console.error(e);
    //   },
    // });
  }

  // criarMeta() {
  //   const formula =
  //     (this.form.value.valorInicial / this.form.value.objetivo) * 100;
  //   // const model: CriarMetasModel = {
  //   //   nomeMeta: this.form.value.nomeMeta,
  //   //   valorInicial: this.form.value.valorInicial,
  //   //   objetivo: this.form.value.objetivo,
  //   //   dataEstimada: this.form.value.dataEstimada,
  //   //   status: Status.ANDAMENTO,
  //   //   porcentagem: formula,
  //   //   items: [],
  //   // };
  //   const model: Items = {
  //     data: this.form.value.data,
  //     hora: this.form.value.hora,
  //     valor: this.form.value.valor,
  //   };
  //   this.serveMeta.cadastrarItem(this.data.id, model).subscribe({
  //     next: (res) => {
  //       this.progresso = 30;
  //       this.dialogRef.close();
  //     },
  //     error: (e) => {
  //       console.error(e);
  //     },
  //   });
  // }

  createItem(metaId?: number, item?: any) {
    this.serveMeta
      .createItem(this.data.metaId, this.data.items)
      .subscribe((data) => {
        if (this.metas && this.metas.length) {
          const metaIndex = this.metas.findIndex(
            (meta: any) => meta.id === this.data.metaId
          );
          if (metaIndex > -1) {
            this.metas[metaIndex].items.push(data);
          }
        }
      });
  }
}
