import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllMetasModel } from 'src/app/core/model/Metas';

@Component({
  selector: 'app-metas-concluidas',
  templateUrl: './metas-concluidas.component.html',
  styleUrls: ['./metas-concluidas.component.scss'],
})
export class MetasConcluidasComponent implements OnInit {
  @Input() filtroStatusConcluidas: any;

  constructor(private router: Router) {}

  ngOnInit() {}

  openDetail(item: AllMetasModel) {
    this.router.navigate(['/meta-detalhe', item.id], {
      queryParams: { idMeta: item.id },
    });
  }
}
