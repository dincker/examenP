import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
//import { AppComponent } from './app.component';
import { Observable,throwError } from 'rxjs';
import { PeticionesService } from './services/peticiones.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
//import { ChartsModule } from 'ng2-charts';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
//import { routing, appRoutingProviders } from './app.routing';
//import { routing, appRoutingProviders } from './app.routing';



@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.authdata) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${currentUser.authdata}`
                }
            });
        }

        return next.handle(request);
    }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: PeticionesService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}

const appRoutes:Routes=[
    {
      path: '',
      component:LoginComponent
    },

    {
      path: 'login',component:LoginComponent
    }
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    //BrowserModule,
    routing,
    //ChartsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
  	appRoutingProviders,
    PeticionesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
