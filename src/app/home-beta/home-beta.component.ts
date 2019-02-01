import { Component, OnInit,ViewChild } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { DataFilterPipe } from '../pipes/data-filter.pipe';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'app-home-beta',
  templateUrl: './home-beta.component.html',
  styleUrls: ['./home-beta.component.css'],
  providers: [PeticionesService],
})


export class HomeBetaComponent implements OnInit {
  //ceando variables
  public selectedValue: any;
  public selectedCar: string;
  public rank:any[];
	public usserLogged:User;
	public cursos:any[];
	public prom:number=0;
	//Notas por año y curso
  public dat=[2,4,6,9,7,4,6];
  //notas por año 
  public dat2=[2,4,6,9,7,4,6];
  //desviacion por año y curso
  public dat3=[2,4,6,9,7,4,6];
  //desviacion por año 
  public dat4=[2,4,6,9,7,4,6];
  //Arreglo con los años de la tabla
	public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  //Tipo de grafico
  public barChartType:string = 'bar';
  //Leyenda activada
  public barChartLegend:boolean = true;
  //Datos del grafico
  public barChartData:any[] = [
    {data: [], label: 'Series A'},
    {data: [], label: 'Series B'},
    {data: [], label: 'Series C'},
    {data: [], label: 'Series D'} 
  ];
 	constructor(
  		private _peticionesService:PeticionesService
  	){ 
     //Solicitando datos del local storage
  		this.usserLogged=JSON.parse(localStorage.getItem('currentUser'));
  	}

	ngOnInit() {
    //Solicitando los ramos metodo get
  		this._peticionesService.getRamos(this.usserLogged.apiKey)
    	.subscribe(
    		result => {
          //si encuentra los resultados
        		if(result.code != 200){
          			this.cursos = result;
          			//console.log(this.cursos);
        		}else{
	          		alert('Parametros incorrectos');     
      			}
      		},
      		error => {
	        	alert('Error de conexion');
      		}

    	);


      //solicitando estadisticas por año
      this._peticionesService.getAnios(this.usserLogged.apiKey)
    .subscribe(
      res => {
        if(res != 200){
          this.anios = res;
          //vaciar datos de años y notas por defecto
          this.barChartLabels.splice(0, this.barChartLabels.length);
          this.dat2.splice(0, this.dat2.length);
          this.dat4.splice(0, this.dat4.length);
          //For para llenar los años y notas del curso
          for(var i in this.anios){
            this.barChartLabels.push(this.anios[i].year);
            //Agrega años y desviaciones a un arreglo auxiliar
            this.dat2.push(this.anios[i].average);
            this.dat4.push(this.anios[i].stddev);
          }
          //guardando datos en un arreglo auxiliar
          let data =this.dat2;
          //Clonando los datos por defecto del grafico
          let clone = JSON.parse(JSON.stringify(this.barChartData));
          //almacenando valores nuevos en la copia
          clone[0].data = this.dat2;
          clone[0].label="Promedio anual";

          //guardando datos en arreglo de grafico original
          this.barChartData = clone;
          this.barChartData[2].data=this.dat4;
          this.barChartData[2].label="Desviacion anual"
          
        }else{
          alert(res);     }
      },
      error => {
        alert(<any>error);
      }
    );

   
    	
  	}

    //funcion al seleccionar un curso
  	grafic(row){
      //Solicitud para obtener el ranking por curso
  		this._peticionesService.getRank(this.usserLogged.apiKey,row.code)
    //console.log('Row clicked: ', row);
    .subscribe(
      res1 => {
        if(res1 != 200){
          this.rank = res1;
          //vaciando datos de arreglo por defecto
          this.dat.splice(0, this.dat.length);
          this.dat3.splice(0, this.dat3.length);
          //for para recorrer los años
          for(var i=0; i<(this.barChartLabels.length);i++){
            //for para buscar años en comun con el rank del curso
            for (var j = 0; j < this.rank.length; j++) {
              
                //Comprobando similitudes
              if (this.barChartLabels[i]==this.rank[j].year) {
                  //agregando datos al arreglo
                  this.dat.push(this.rank[j].average);
                  this.dat3.push(this.rank[j].stddev);
                  this.op=1;
              }

            }
            if (this.op==0) {
                this.dat.push(0);
                this.dat3.push(0);
              }else{
              this.op=0;
            }
          }

          //almacenando datos en un auxiliar
          let data2 =this.dat;
          //clonando datos
          let clone = JSON.parse(JSON.stringify(this.barChartData));
          clone[1].data = data2;
          clone[1].label="Promedio curso";
           //agregando valores al grafico
          this.barChartData = clone;
          this.barChartData[3].data=this.dat3;
          this.barChartData[3].label="Desviacion por curso";

        }else{
          alert("Error de Conexion");  
        }
      },
      error => {
        alert('No existe registro de notas');
      }
    );

  	}

  	/*
	

  	*/





}
