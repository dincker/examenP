import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeticionesService],
})
export class HomeComponent implements OnInit {
	public usserLogged:User;
	public cursos:any;
  constructor(
  	private _peticionesService:PeticionesService
  	) {
  	this.usserLogged=JSON.parse(localStorage.getItem('currentUser'));
  	}

  ngOnInit() {
  	this._peticionesService.getRamos(this.usserLogged.apiKey)
  	 .subscribe(
            response=>{
            	this.cursos=response;
            console.log(this.cursos);
        //this._peticionesService.setRut(this.rut);
      },
      error=>{
        console.log(<any>error);
      }
            );

  }

}
