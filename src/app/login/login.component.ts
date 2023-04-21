import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginUsuario } from 'src/core/model/Usuario';
import { UsuarioService } from 'src/core/server/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private serviceUsuario: UsuarioService,
    private router: Router
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
    const model: LoginUsuario = {
      senha: this.form.value.senha,
      email: this.form.value.email,
    };
    this.serviceUsuario.login(model).subscribe({
      next: (res) => {
        this.router.navigate(['metas-home']);
        console.log(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
    console.log();
  }
}
