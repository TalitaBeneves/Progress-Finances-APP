import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioLogado } from 'src/app/core/model/Usuario';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';
import { DialogPerguntasComponent } from './components/dialog-perguntas/dialog-perguntas.component';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.scss'],
})
export class PerguntasComponent implements OnInit {
  local: any;
  items;
  constructor(
    private serviceUsuario: UsuarioService,
    private dialog: MatDialog
  ) {}

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
      data: element,
    });

    dialog.afterClosed().subscribe((result) => {});
  }
}
