import { Component, ElementRef, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/server/usuario/usuario.service';

@Component({
  selector: 'app-dialog-perguntas',
  templateUrl: './dialog-perguntas.component.html',
  styleUrls: ['./dialog-perguntas.component.scss'],
})
export class DialogPerguntasComponent implements OnInit {
  constructor(
    private serviceUser: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // if(data == )
  }

  cadastrarPergunta() {}
  editarPergunta() {}
}
