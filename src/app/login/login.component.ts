import { Component, OnInit } from '@angular/core';
import { Router, Routes,RouterModule } from '@angular/router';
import { LogUsuario } from '../models/user.model';
import { FormsModule }   from '@angular/forms';
import { PeticionesService } from '../services/peticiones.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [PeticionesService],
})
export class LoginComponent implements OnInit {
  //definiendo variables
	loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  rut:string;
  role:string;
  apiKey:string;
  public usuario:LogUsuario;
  constructor(
    //dando valores a algunas variables
  		private router:Router,
      private _http: HttpClient,
      private _peticionesService:PeticionesService
  	) {
    //arreglo para almacenar datos
  		this.usuario = new LogUsuario('','')
  	}

  ngOnInit() {
    //cerrando la session al salir
    this._peticionesService.logout();
    this.returnUrl = this.router.navigate['/login'];
  }


  onSubmit(form){
    //solicitando datos del login
    this._peticionesService.login(this.usuario.rut,this.usuario.password)
    .pipe(first())
    .subscribe(
      response=>{
        //console.log(response);

        this.role=response.role;
        if(response.role=='Estudiante'){
          this.router.navigate(['/home']);
        }
    	else if (response.role=='Docente') {
          this.router.navigate(['/home']);
        }


      },
      error=>{
        console.log("Error al ingresar");
      }

      );
    console.log("evento enviado");
    console.log(this.usuario);

  }

}
