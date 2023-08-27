import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AtualizarDadosUsuarioModel } from 'src/app/core/model/Usuario';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-form-senha',
  templateUrl: './form-senha.component.html',
  styleUrls: ['./form-senha.component.scss'],
})
export class FormSenhaComponent implements OnInit {
  form: FormGroup;
  hideSenhaAtual: boolean = true;
  hideNovaSenha: boolean = true;
  hideConfirmarSenha: boolean = true;

  constructor(
    private fb: FormBuilder,
    private serviceUsuario: UsuarioService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.montaFormSenha();
  }

  montaFormSenha() {
    this.form = this.fb.group({
      senhaAtual: [null],
      novaSenha: [null],
      confirmaSenha: [null],
    });
  }

  editarUser() {
    if (this.form.invalid || this.form.invalid) {
      this.toastr.warning('Favor preencher os dados!', 'Atenção');
    }

    if (this.form.value.senhaAtual == this.form.value.novaSenha) {
      this.toastr.warning(
        'A senha não pode ser a mesma que a atual!',
        'Atenção'
      );
    }

    if (this.form.value.novaSenha !== this.form.value.confirmaSenha) {
      this.toastr.warning('As senhas não correspondem!', 'Atenção');
    }

    this.spinner.show();
    // const model: AtualizarDadosUsuarioModel = {
    //   idUsuario: this.dadosUser.idUsuario,
    //   email: this.form.value.email,
    //   nome: this.form.value.nome,
    //   senhaAtual: this.form.value.senhaAtual,
    //   novaSenha: this.form.value.novaSenha ? this.form.value.novaSenha : null,
    //   imagemUrl: this.dadosUser.imagemUrl ? this.dadosUser.imagemUrl : '',
    // };

    // this.serviceUsuario
    //   .atualizarDados(model)
    //   .subscribe({
    //     next: (res) => {
    //       this.serviceUsuario.setCurrentUser(res);
    //       this.toastr.success('Dados atualizados com sucesso', 'Sucesso!');
    //     },
    //     error: (e) => {
    //       this.toastr.error('Erro ao atualizr dados perfil', 'Erro!');
    //     },
    //   })
    //   .add(() => this.spinner.hide());
  }
}
