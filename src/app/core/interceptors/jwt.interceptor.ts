import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UsuarioService } from '../server/usuario/usuario.service';
import { UsuarioLogado } from '../model/Usuario';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.usuarioService.getUserLocalStorage();

    if (token && token.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
