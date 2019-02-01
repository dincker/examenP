import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
       //this.url="http://138.68.23.14/"
       
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
    getRamos(apiKey:string):Observable<any>{
        let option={headers:new HttpHeaders({'X-API-KEY':apiKey})};
        
        return this._http.get<any>(this.url+'/api/v1/courses/subjects/',{headers: new HttpHeaders().set("X-API-KEY", apiKey)})
    }


    getAnios(apiKey:string):Observable<any>{
        let option={headers:new HttpHeaders({'X-API-KEY':apiKey})};
        
        return this._http.get<any>(this.url+'/api/v1/rankings/years/',{headers: new HttpHeaders().set("X-API-KEY", apiKey)})
    }

    getRank(apiKey: string,subjectCode:string):Observable<any>{
        
        let option={headers:new HttpHeaders({'X-API-KEY':apiKey})};
        //let myParams = HttpParams().set("subjectCode", subjectCode);
        let body={
            subjectCode:subjectCode,
        }
        let params: URLSearchParams = new URLSearchParams();
 params.set('subjectCode', subjectCode);
        //let myParams = HttpParams({"subjectCode": subjectCode});
        //let options = new RequestOptions({ headers: option, method: 'get', params: body });
        return this._http.get<any>(this.url+'api/v1/rankings/years/'+subjectCode,{headers: new HttpHeaders().set("X-API-KEY",apiKey),params:new HttpParams().set("subjectCode",subjectCode)})

        
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
