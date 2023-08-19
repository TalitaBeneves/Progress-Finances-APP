import { Component, OnInit } from '@angular/core';
import { UsuarioLogado } from 'src/app/core/model/Usuario';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.scss'],
})
export class PerguntasComponent implements OnInit {
  local: any;
  constructor(private serviceUsuario: UsuarioService) {}

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
        console.log(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
