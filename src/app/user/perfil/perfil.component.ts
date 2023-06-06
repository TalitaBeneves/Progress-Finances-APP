import { Component, OnInit } from '@angular/core';
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
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  form: FormGroup;
  formSenha: FormGroup;
  dadosUser: UsuarioLogado;
  hideSenhaAtual: boolean = true;
  hideNovaSenha: boolean = true;
  hideConfirmarSenha: boolean = true;

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
    this.montaFormSenha();

    this.dadosUser = this.serviceUsuario.getUserLocalStorage();

    if (this.dadosUser) this.form.patchValue(this.dadosUser);
    if (this.dadosUser.imagemUrl !== '') {
      this.imagemURL =
        environment.urlBase + 'resources/images/' + this.dadosUser.imagemUrl;
    }
  }
  montaFormSenha() {
    this.formSenha = this.fb.group({
      senhaAtual: [null],
      novaSenha: [null],
      confirmaSenha: [null],
    });
  }

  montaForm() {
    this.form = this.fb.group({
      nome: [null],
      email: [null],
    });
  }

  editarUser() {
    if (this.formSenha.invalid || this.form.invalid) {
      this.toastr.warning('Favor preencher os dados!', 'Atenção');
    }

    if (this.formSenha.value.senhaAtual == this.formSenha.value.novaSenha) {
      this.toastr.warning(
        'A senha não pode ser a mesma que a atual!',
        'Atenção'
      );
    }

    if (this.formSenha.value.novaSenha !== this.formSenha.value.confirmaSenha) {
      this.toastr.warning('As senhas não correspondem!', 'Atenção');
    }

    this.spinner.show();
    const model: AtualizarDadosUsuarioModel = {
      idUsuario: this.dadosUser.idUsuario,
      email: this.form.value.email,
      nome: this.form.value.nome,
      senhaAtual: this.formSenha.value.senhaAtual,
      novaSenha: this.formSenha.value.novaSenha
        ? this.formSenha.value.novaSenha
        : null,
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

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => (this.imagemURL = event.target.result);

    this.file = ev.target.files;

    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  private uploadImagem(): void {
    this.spinner.show();
    this.serviceUsuario
      .atualizarImagem(this.dadosUser.idUsuario, this.file)
      .subscribe({
        next: (res) => {
          this.toastr.success('Imagem atualizada com Sucesso', 'Sucesso!');
          this.serviceUsuario.setCurrentUser(res);
        },
        error: (e) => {
          this.toastr.error('Erro ao atualizr imagem', 'Erro!');
        },
      })
      .add(() => this.spinner.hide());
  }
}
