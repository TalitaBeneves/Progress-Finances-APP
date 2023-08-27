import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioLogado } from 'src/app/core/model/Usuario';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deletar-conta',
  templateUrl: './deletar-conta.component.html',
  styleUrls: ['./deletar-conta.component.scss'],
})
export class DeletarContaComponent implements OnInit {
  dadosUser: UsuarioLogado;

  constructor(
    private serviceUsuario: UsuarioService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.dadosUser = this.serviceUsuario.getUserLocalStorage();
  }

  deletarConta() {
    Swal.fire({
      title: 'Tem certeza de que deseja deletar essa conta?',
      text: 'Você não conseguirá recuperar, todos os seus dados serão apagados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Deletar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceUsuario.deletarConta(this.dadosUser.idUsuario).subscribe({
          next: () => {
            this.toastr.success('Conta deletada com sucesso', 'sucess');
          },
          error: (e) => {
            console.error(e);
            this.toastr.error('Erro ao deletar conta', 'danger');
          },
        });
      }
    });
  }
}
