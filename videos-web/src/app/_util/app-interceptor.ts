import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    iniciadas = 0;
    finalizadas = 0;

    constructor(
        private cookieService: CookieService,
        public spinner:NgxSpinnerService,
        public messageService: MessageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const authToken = this.getSessionId();
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        this.spinner.show();
        this.iniciadas++;
        return next.handle(authReq).pipe(catchError(err => {  
            if (err.status === 401) {
                window.location.href = environment.urlLogin;
            }
            let msgError = '';
            let serverity = 'warn'
            if(err.error.msg){
                msgError = err.error.msg;
            }else{
                msgError = err.message
                serverity = 'error'
            }
            this.messageService.add({severity: serverity, summary: err.status, detail: msgError, life: 60000});
            return throwError(err);
        }),
        finalize(() => {
            this.finalizadas++;
            if(this.iniciadas == this.finalizadas){
                this.iniciadas = 0;
                this.finalizadas = 0;
                this.spinner.hide();
            }        
        })
      );
    }

    getSessionId() {
        return 's';
        //PRODUCCIÓN
       /* const value: string = this.cookieService.get('SESSIONID');        
        if (!value) {
            window.location.href = environment.urlLogin;
        }
        return 'Bearer ' + value;*/
    }
}
