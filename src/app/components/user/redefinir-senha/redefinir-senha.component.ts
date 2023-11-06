import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss'],
})
export class RedefinirSenhaComponent implements OnInit {
  form: FormGroup;

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
      novaSenha: [null, Validators.required],
    });
  }

  redefinir() {
    this.spinner.show();
    this.serviceUsuario
      .redefinirSenha(this.form.value)
      .subscribe({
        next: () => {
          this.toastr.success('Você redefiniu sua senha', 'Sucesso');
          this.router.navigate(['login']);
        },
        error: (e) => {
          this.toastr.error(`${e.error}`, 'danger');
        },
      })
      .add(() => this.spinner.hide());
  }
}
