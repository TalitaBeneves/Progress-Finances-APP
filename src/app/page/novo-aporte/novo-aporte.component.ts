import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { UsuarioLogado } from 'src/app/core/model/Usuario';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-novo-aporte',
  templateUrl: './novo-aporte.component.html',
  styleUrls: ['./novo-aporte.component.scss'],
})
export class NovoAporteComponent implements OnInit {
  valorInvestimento = new FormControl(null, Validators.required);
  ativos: any;
  getIdUser: UsuarioLogado;

  constructor(
    private seviceFinaces: FinancesService,
    private serviceUsuario: UsuarioService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getIdUser = this.serviceUsuario.getUserLocalStorage();
  }

  calcularInvestimento() {
    this.spinner.show();
    const valor = parseInt(this.valorInvestimento.value);
    if (this.valorInvestimento.invalid) {
      this.toastr.warning('Favor preencher o de valor investimento!', 'Atenção');
      this.spinner.hide();
      return;
    } else if (valor < 100) {
      this.toastr.warning('Valor precisa ser maior ou igual a 100!', 'Atenção');
      this.spinner.hide();
      return;
    }

    this.seviceFinaces
      .calcularRecomendacaoInvestimento(this.getIdUser.usuario_Id, valor)
      .subscribe({
        next: (res) => {
          this.ativos = res;
          this.seviceFinaces.filter(res);
        },

        error: (e) => {
          console.error(e);
          this.toastr.error(
            'Erro ao tentar calcular seus investimentos.',
            'Erro'
          );
        },
      })
      .add(() => this.spinner.hide());
  }
}
