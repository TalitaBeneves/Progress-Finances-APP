import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meta-detalhes',
  templateUrl: './meta-detalhes.component.html',
  styleUrls: ['./meta-detalhes.component.scss']
})
export class MetaDetalhesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  edit() {
    alert('Editar Meta');
  }

}
