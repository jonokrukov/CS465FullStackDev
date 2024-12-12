import { Injectable, Provider} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class jwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
  var isAuthApi: boolean;

  if(request.url.startsWith('login') ||
      request.url.startsWith('register')) {
        isAuthApi = true;
      } else {
        isAuthApi = false;
      }

      if(this.authenticationService.isLoggedIn() && !isAuthApi) {
        let token = this.authenticationService.getToken();
        // console.log(token);

        const authReq = request.clone({
          setHeaders: {
            Authorization: 'Bearer ${token}'
          }
        });
        return next.handle(authReq);
      }
      return next.handle(request);
    }
}

export const authInterceptProvider: Provider = 
  { provide: HTTP_INTERCEPTORS,
    useClass: jwtInterceptor, multi: true };