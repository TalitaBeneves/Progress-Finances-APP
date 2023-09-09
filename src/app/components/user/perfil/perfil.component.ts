import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuarioLogado } from 'src/app/core/model/Usuario';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  dadosUser: UsuarioLogado;
  teste: string;
  file: File;
  imagemURL: string = '';

  constructor(
    private serviceUsuario: UsuarioService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.dadosUser = this.serviceUsuario.getUserLocalStorage();

    if (this.dadosUser.imagemUrl !== '' && this.dadosUser.imagemUrl !== null) {
      this.imagemURL =
        environment.urlImg + this.dadosUser.imagemUrl;
    } else {
      this.imagemURL = 'assets/img/avatar.jpg'
    }
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => (this.imagemURL = event.target.result);

    this.file = ev.target.files;

    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  private uploadImagem(): void {
    this.spinner.show();
    this.serviceUsuario
      .atualizarImagem(this.dadosUser.usuario_Id, this.file)
      .subscribe({
        next: (res) => {
          this.toastr.success('Imagem atualizada com Sucesso', 'Sucesso!');
          this.serviceUsuario.setCurrentUser(res);
        },
        error: (e) => {
          this.toastr.error('Erro ao atualizr imagem', 'Erro!');
        },
      })
      .add(() => this.spinner.hide());
  }
}
