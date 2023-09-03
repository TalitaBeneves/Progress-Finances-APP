import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {
  AtualizarDadosUsuarioModel,
  UsuarioLogado,
} from 'src/app/core/model/Usuario';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-dados',
  templateUrl: './form-dados.component.html',
  styleUrls: ['./form-dados.component.scss'],
})
export class FormDadosComponent implements OnInit {
  @Output() changeName = new EventEmitter<string>();
  form: FormGroup;
  dadosUser: UsuarioLogado;
  file: File;
  imagemURL: string = '';

  constructor(
    private fb: FormBuilder,
    private serviceUsuario: UsuarioService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.montaForm();

    this.dadosUser = this.serviceUsuario.getUserLocalStorage();

    if (this.dadosUser) this.form.patchValue(this.dadosUser);
    if (this.dadosUser.imagemUrl !== '') {
      this.imagemURL =
        environment.urlBase + 'resources/images/' + this.dadosUser.imagemUrl;
    }
  }

  montaForm() {
    this.form = this.fb.group({
      nome: [this.dadosUser?.nome],
      email: [null],
    });

    this.form.get('nome')?.valueChanges.subscribe((nome) => {
      this.dadosUser.nome = nome;
      this.changeName.emit(this.dadosUser?.nome);
    });
  }

  editarUser() {
    if (this.form.invalid)
      this.toastr.warning('Favor preencher os dados!', 'Atenção');

    this.spinner.show();
    const model: AtualizarDadosUsuarioModel = {
      usuario_Id: this.dadosUser.usuario_Id,
      email: this.form.value.email,
      nome: this.form.value.nome,
      imagemUrl: this.dadosUser.imagemUrl ? this.dadosUser.imagemUrl : '',
    };

    this.serviceUsuario
      .atualizarDados(model)
      .subscribe({
        next: (res) => {
          this.serviceUsuario.setCurrentUser(res);
          this.toastr.success('Dados atualizados com sucesso', 'Sucesso!');
        },
        error: (e) => {
          this.toastr.error('Erro ao atualizr dados perfil', 'Erro!');
        },
      })
      .add(() => this.spinner.hide());
  }
}
