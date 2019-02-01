import { Component, OnInit,ViewChild } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { DataFilterPipe } from '../pipes/data-filter.pipe';
import {MatPaginator, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeticionesService],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name','code'];
  private matdatasource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //Variable para local storage
	public usserLogged:User;
  //Definicion de variables a usar
	public cursos:any[];
  public anios:any[];
  public anios2:any[];
  public rank:any[];
  public prom:number=0;
  public cont:number=0;
  public desv:number=0;
  public op:number=0;
  //Notas por año y curso
  public dat=[2,4,6,9,7,4,6];
  //notas por año 
  public dat2=[2,4,6,9,7,4,6];
  //desviacion por año y curso
  public dat3=[2,4,6,9,7,4,6];
  //desviacion por año 
  public dat4=[2,4,6,9,7,4,6];
  

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  //Variable para los años
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  //tipo de grafico
  public barChartType:string = 'bar';
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
    //variable para los cursos en el select
    this.matdatasource = new MatTableDataSource([]);
    //solicitar datos del local storage
    this.usserLogged=JSON.parse(localStorage.getItem('currentUser'));
  }
  //Funcion que se ejecuta cuando se carga la pagina
  ngOnInit() {
    //Folicitud de ramos a metodo get
    this._peticionesService.getRamos(this.usserLogged.apiKey)
    .subscribe(
      result => {
        //Cuando existe un valor
        if(result.code != 200){
          //Almacenando resultados del get en una variable
          this.cursos = result;
          //Almacenando los datos a utilizar en el list
          this.matdatasource.data = result;
        }else{
          alert('Problema en la conexion');     
        }
      },
      error => {
        alert(<any>error);
      }
    );
    //Solicitando los años por metodo get
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
  //Funcion para paginar los datos de la tabla
  ngAfterViewInit() {
    this.matdatasource.paginator = this.paginator;
  }
  //Funcion para seleccionar un dato del list
  onRowClicked(row) {
    //Peticion de ranking de notas por curso
    this._peticionesService.getRank(this.usserLogged.apiKey,row.code)
    //console.log('Row clicked: ', row);
    .subscribe(
      res1 => {
        if(res1 != 200){
          this.rank = res1;
          //Vaciando variables de arreglos
          this.dat.splice(0, this.dat.length);
          this.dat3.splice(0, this.dat3.length);
          //for para rrecorrer los años
          for(var i=0; i<(this.barChartLabels.length);i++){
            //for para rrecorrer las notas
            for (var j = 0; j < this.rank.length; j++) {
              //buscando los años en los que existen datos
              if (this.barChartLabels[i]==this.rank[j].year) {
                  //almacenando los datos
                  this.dat.push(this.rank[j].average);
                  this.dat3.push(this.rank[j].stddev);
                  //variable para saber si encontro una similitud entre los años  o no
                  this.op=1;
              }

            }
            //Verificando si encontro datos o no y agregando 0 cuando no los encuentre
            if (this.op==0) {
                this.dat.push(0);
                this.dat3.push(0);
              }else{
                //reiniciando opcion
              this.op=0;
            }
          }
          //Creando variable con los ranks
          let data2 =this.dat;
          //Clonando datos
          let clone = JSON.parse(JSON.stringify(this.barChartData));
          //Agregando datos y label al grafico
          clone[1].data = data2;
          clone[1].label="Promedio curso";
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
  applyFilter(filterValue: string) {
    this.matdatasource.filter = filterValue.trim().toLowerCase();
  }









}