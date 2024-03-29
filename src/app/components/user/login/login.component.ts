import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/core/model/Usuario';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: any;
  mostraRedefinir: boolean = false;
  constructor(
    private fb: FormBuilder,
    private serviceUsuario: UsuarioService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
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
        },
        error: (e) => {
          console.error(e);
          this.toastr.error(`${e.error}`, 'danger');
          this.mostraRedefinir = true;
        },
      })
      .add(() => this.spinner.hide());
  }
}
