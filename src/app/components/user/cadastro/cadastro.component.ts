import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CadastrarUsuario } from 'src/app/core/model/Usuario';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

export class MeuComponente {
  senha: string;
  requisitos: any = {
    tamanho: false,
    letraMaiuscula: false,
    letraMinuscula: false,
    numero: false,
    caractereEspecial: false,
  };
}
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  form: FormGroup;
  senha: string;
  requisitos: any = {};
  constructor(
    private fb: FormBuilder,
    private serviceUsuario: UsuarioService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.montaForm();
  }

  montaForm() {
    this.form = this.fb.group({
      email: [null, Validators.required],
      senha: [null, Validators.required],
      nome: [null, Validators.required],
    });
  }

  cadastrarUsuario() {
    this.spinner.show();
    const model: CadastrarUsuario = {
      nome: this.form.value.nome,
      senha: this.form.value.senha,
      email: this.form.value.email,
    };

    this.serviceUsuario
      .cadastrarUsuario(model)
      .subscribe({
        next: (res) => {
          this.router.navigate(['metas-home']);
        },
        error: (e) => {
          console.error(e);
          this.toastr.error(`${e.error}`, 'danger');
        },
      })
      .add(() => this.spinner.hide());
  }

  verificarSenha(): void {
    this.requisitos = {
      tamanho: this.senha.length >= 8,
      letraMaiuscula: /[A-Z]/.test(this.senha),
      letraMinuscula: /[a-z]/.test(this.senha),
      numero: /\d/.test(this.senha),
      caractereEspecial: /[!@#$%^&*]/.test(this.senha),
    };
  }
}
