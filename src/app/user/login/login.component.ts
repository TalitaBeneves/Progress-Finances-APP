import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginUsuario } from 'src/app/core/model/Usuario';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: any;
  senha: string;
  requisitos: any = {};

  constructor(
    private fb: FormBuilder,
    private serviceUsuario: UsuarioService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.montaForm();
  }

  montaForm() {
    this.form = this.fb.group({
      email: [null, Validators.required],
      senha: [null, Validators.required],
    });
  }

  login() {
    this.spinner.show();
    const model: LoginUsuario = {
      senha: this.form.value.senha,
      email: this.form.value.email,
    };
    this.serviceUsuario
      .login(model)
      .subscribe({
        next: (res) => {
          this.user = res;
          this.router.navigate(['metas-home']);
          localStorage.setItem('usuario', JSON.stringify(this.user));
          console.log(res);
        },
        error: (e) => {
          console.error(e);
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
