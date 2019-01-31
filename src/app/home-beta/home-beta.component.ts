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
	private cursoControl;
  	private selectFormControl;
  	public selectedValue: any;
  	public selectedCar: string;
  	public rank:any[];
	public usserLogged:User;
	public cursos:any[];
	public dat=[2,4,6,9,7,4,6];
	public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  	public barChartType:string = 'bar';
  	public barChartLegend:boolean = true;
  	public barChartData:any[] = [
    	{data: [], label: 'Series A'}
    ];
 	constructor(
  		private _peticionesService:PeticionesService
  	){ 
  		this.cursoControl = new FormControl('', [Validators.required]);
  		this.selectFormControl = new FormControl('', Validators.required);
  		this.usserLogged=JSON.parse(localStorage.getItem('currentUser'));
  	}

	ngOnInit() {
  		this._peticionesService.getRamos(this.usserLogged.apiKey)
    	.subscribe(
    		result => {
        		if(result.code != 200){
          			this.cursos = result;
          			//console.log(this.cursos);
        		}else{
	          		alert(result);     
      			}
      		},
      		error => {
	        	alert(<any>error);
      		}

    	);

   
    	
  	}


  	grafic(row){
  		this._peticionesService.getRank(this.usserLogged.apiKey,row.code)
    //console.log('Row clicked: ', row);
    	.subscribe(
      		res1 => {
        		if(res1 != 200){
          			this.rank = res1;
          			//console.log(this.rank);
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

  	/*
	

  	*/





}
