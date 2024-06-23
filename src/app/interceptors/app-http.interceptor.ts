import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthServiceService} from "../services/auth-service.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes('login')) {
      return next.handle(req);
    }
    const request = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.authService.accessToken}`
      }
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
