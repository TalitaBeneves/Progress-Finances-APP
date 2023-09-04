/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PerguntasService } from './perguntas.service';

describe('Service: Perguntas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerguntasService]
    });
  });

  it('should ...', inject([PerguntasService], (service: PerguntasService) => {
    expect(service).toBeTruthy();
  }));
});
