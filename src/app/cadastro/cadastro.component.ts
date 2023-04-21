import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastrarUsuario } from 'src/core/model/Usuario';
import { UsuarioService } from 'src/core/server/usuario/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
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
      usuario: [null, Validators.required],
    });
  }

  cadastrarUsuario() {
    const model: CadastrarUsuario = {
      nome: this.form.value.usuario,
      senha: this.form.value.senha,
      email: this.form.value.email,
    };

    this.serviceUsuario.cadastrarUsuario(model).subscribe({
      next: (res) => {
        this.router.navigate(['metas-home']);
        console.log(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
