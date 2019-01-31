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
	public usserLogged:User;
	public cursos:any[];
  public anios:any[];
  public rank:any[];
  public dat=[2,4,6,9,7,4,6];
	//public filterQuery = "";
  //public rowsOnPage = 5;
  //public sortBy = "email";
  //public sortOrder = "asc";
  //public nombre=[];
  //public lala:any;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
   public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [
    {data: [], label: 'Series A'},
    
  ];
  constructor(
    private _peticionesService:PeticionesService

  ){
    this.matdatasource = new MatTableDataSource([]);
    this.usserLogged=JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this._peticionesService.getRamos(this.usserLogged.apiKey)
    .subscribe(
      result => {
        if(result.code != 200){
          this.cursos = result;
          this.matdatasource.data = result;
          //console.log("Cursos");
          //console.log(this.cursos[0]);
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

    this._peticionesService.getAnios(this.usserLogged.apiKey)
    .subscribe(
      res => {
        if(res != 200){
          this.anios = res;
          //console.log("años");
          //console.log(this.anios[0]);
          //for(var i in this.cursos){
          //this.nombre.push(this.cursos[i].name);
          //this.nombre.push(this.cursos[i].code);}
          //console.log(this.nombre);
        }else{
          alert(res);     }
      },
      error => {
        alert(<any>error);
      }
    );



  }
  ngAfterViewInit() {
    this.matdatasource.paginator = this.paginator;
  }

  onRowClicked(row) {
    this._peticionesService.getRank(this.usserLogged.apiKey,row.code)
    //console.log('Row clicked: ', row);
    .subscribe(
      res1 => {
        if(res1 != 200){
          this.rank = res1;
          //console.log("Rank");
          //console.log(this.rank[0].average);
          this.barChartLabels.splice(0, this.barChartLabels.length);
          this.dat.splice(0, this.dat.length);
          //this.barChartLabels.
          //console.log(this.dat);
          for(var i in this.rank){
            //console.log(this.rank[i].average);
            //console.log(this.rank[i].average);
            //this.nombre.push(this.cursos[i].name);
            this.barChartLabels.push(this.rank[i].year);
            this.dat.push(this.rank[i].average);
            //console.log(this.dat);
          }
          let data =this.dat;
          let clone = JSON.parse(JSON.stringify(this.barChartData));
          clone[0].data = this.dat;
          clone[0].label=row.name;
          this.barChartData = clone;
          //console.log(this.nombre);
        }else{
          alert(res1);  
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