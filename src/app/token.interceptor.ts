import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loader:LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // this.loader.setLoading()
    const authToken = localStorage.getItem('token') as string;
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next.handle(authReq);
  }
}
