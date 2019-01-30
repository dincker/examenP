import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import { User, setUser , getDatos,GetSubject} from '../models/user.model';

@Injectable({providedIn:'root'})
export class PeticionesService{
    public rut:string;
    public url:string;
    constructor( public _http: HttpClient){

       this.url="https://api.sebastian.cl/academia/"
    }

    login(rut: string, password: string) {
        return this._http.post<any>(this.url+'api/v1/authentication/authenticate', { rut, password })
            .pipe(map(user => {
                // login successful if there's a user in the response
                if (user) {
                    // store user details and basic auth credentials in local storage
                    // to keep user logged in between page refreshes
                    user.authdata = window.btoa(rut + ':' + password);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        //localStorage.getItem(rut)
    }

    //Obtener todas las asignaturas
    getRamos(apiKey:string){
        let option={headers:new HttpHeaders({'X-API-KEY':apiKey})};
        
        return this._http.get<any>(this.url+'/api/v1/courses/subjects/',{headers: new HttpHeaders().set("X-API-KEY", apiKey)})
    }

    /*getProfe(apiKey: string,rut:string){
        //let params = JSON.stringify(user);
        let option={headers:new HttpHeaders({'X-API-KEY':apiKey})};
        return this._http.get<any>(this.url+'api/v1/courses/teachers/'+rut+'/stats/',{headers: new HttpHeaders().set("X-API-KEY", apiKey)})

        .subscribe(
            response=>{
            console.log(response);
        //this._peticionesService.setRut(this.rut);
      },
      error=>{
        console.log(<any>error);
      }
            );
    }*/
  


}
