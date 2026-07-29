import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  // Don't attach token to auth endpoints
  if (req.url.includes('/api/auth/login') || req.url.includes('/api/auth/register')) {
    return next.handle(req);
  }

  const token = localStorage.getItem('token');

  if (token && token !== 'undefined' && token !== 'null') {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next.handle(req);
}
}
