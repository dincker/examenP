import { Component, OnInit } from '@angular/core';
import { Router, Routes,RouterModule } from '@angular/router';
//import { PeticionesService } from './services/peticiones.service';
import { LogUsuario } from './models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'examen';
  public usuario:LogUsuario;
  returnUrl: string;
  role:string;
  rut:string;
  //role:string;
  apiKey:string;
  constructor (
  	private router:Router,
    private _http: HttpClient,
    //private _peticionesService:PeticionesService
  	){
  	this.usuario = new LogUsuario('','')
  }
  ngOnInit(){
  	//this._peticionesService.logout();
    //this.returnUrl = this.router.navigate['/login'];
  }



}
