import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioLogado } from 'src/app/core/model/Usuario';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';
import { DialogPerguntasComponent } from './components/dialog-perguntas/dialog-perguntas.component';
import { FinancesService } from 'src/app/core/server/Finances/finances.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.scss'],
})
export class PerguntasComponent implements OnInit {
  local: any;
  items;
  isChecked = true;
  constructor(
    private serviceUsuario: UsuarioService,
    private serviceFinances: FinancesService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.serviceFinances.listen().subscribe((e) => {
      this.buscarPerguntas();
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.local = this.serviceUsuario.getUserLocalStorage();

    this.buscarPerguntas();
  }

  buscarPerguntas() {
    this.serviceUsuario.buscarPergunta(this.local.idUsuario).subscribe({
      next: (res) => {
        this.items = res;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  openDialogPerguntas(element?) {
    const dialog = this.dialog.open(DialogPerguntasComponent, {
      width: '600px',
      data: {
        element: element,
        userId: this.local.idUsuario,
      },
    });

    dialog.afterClosed().subscribe((result) => {});
  }

  getDadosTabela(e) {
    this.openDialogPerguntas(e);
  }

  deletarAtivo(e) {
    this.spinner.show();
    this.serviceUsuario
      .deletarPergunta(e.id)
      .subscribe({
        next: (res) => {
          this.toastr.success('Pergunta deletada com sucesso!', 'Sucesso');
          this.serviceFinances.filter(res);
        },
        error: (e) => {
          console.log(e);
        },
      })
      .add(() => this.spinner.hide());
  }
}