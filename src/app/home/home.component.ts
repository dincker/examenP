import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

import { DataFilterPipe } from '../pipes/data-filter.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeticionesService],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name','code'];
  dataSource = Element;
	public usserLogged:User;
	public cursos:any[];
	public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "email";
  public sortOrder = "asc";
  //public nombre=[];
  //public lala:any;
  constructor(
    private _peticionesService:PeticionesService
  ){
    this.usserLogged=JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this._peticionesService.getRamos(this.usserLogged.apiKey)
    .subscribe(
      result => {
        if(result.code != 200){
          this.cursos = result;
          //console.log("hola");
          //console.log(this.cursos);
          //for(var i in this.cursos){
          //this.nombre.push(this.cursos[i].name);
          //this.nombre.push(this.cursos[i].code);}
          //console.log(this.nombre);
        }else{
          alert(result);     }
      },
      error => {
        alert(<any>error);
      }
    );
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}

//OTRO MODO
/*ngOnInit() {
    this._peticionesService.getRamos(this.usserLogged.apiKey)
     .subscribe(
            response=>{

              this.cursos=response;
              /*this.cursos.forEach((elemento,index,data)=>{
                this.holas.push(curso);
              });
              console.log(this.cursos);
              for(var i in this.cursos)
                this.holas.push(this.cursos[i].name);
            console.log(this.holas);
           //console.log(this.holas.replace(/['"]+/g, ''));

        //this._peticionesService.setRut(this.rut);
      },
      error=>{
        console.log(<any>error);
      }
            );



  }*/