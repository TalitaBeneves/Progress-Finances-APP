import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AllMetasModel } from 'src/core/model/Metas';

@Component({
  selector: 'app-meta-detalhes',
  templateUrl: './meta-detalhes.component.html',
  styleUrls: ['./meta-detalhes.component.scss'],
})
export class MetaDetalhesComponent implements OnInit {
  id: number;
  progresso: number;
  items: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      const arrString = params.dados;
      this.items = JSON.parse(arrString);
      this.progresso = this.items.porcentagem;
      console.log(this.items);
    });
  }

  edit() {
    alert('Editar Meta');
  }
  addDadosGrid() {
    alert('addDadosGrid Meta');
  }
}
