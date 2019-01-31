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
import { HomeBetaComponent } from './home-beta/home-beta.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
//import {MatFormFieldModule} from '@angular/material/form-field'
//import { MatButtonModule } from '@angular/material/button';
//import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule,MatFormFieldModule,MatListModule,MatButtonModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule} from '@angular/material';
import {  MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {DataTableModule} from "angular2-datatable";
import { DataFilterPipe } from './pipes/data-filter.pipe';

//import { routing, appRoutingProviders } from './app.routing';
//import { routing, appRoutingProviders } from './app.routing';
//import { MatSidenavModule } from '@angular/material/sidenav';
/*@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule,MatIconModule],
  exports: [MatButtonModule, MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule],
  declarations: [DataFilterPipe, HomeBetaComponent]
})*/

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
    LoginComponent,
    HomeBetaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    //BrowserModule,
    routing,
    //ChartsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatListModule, 
    BrowserModule, 
    DataTableModule,
    //AppRoutingModule, 
    BrowserAnimationsModule,
    MatPaginatorModule, 
    MatSortModule, 
    MatTableModule, 
    ChartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
  	appRoutingProviders,
    PeticionesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
