export class LogUsuario{
	constructor(
		public password:string,
		public rut:string
	){}

}

export class GetSubject{
	constructor(
		public ordinal:number,
		public subjectCode:string,
		public year:number
	){}

}



export class User{
	constructor(
		public apiKey:string,
		public authdata:string,
		public email:string,
		public role:string,
		public rut:string
	){}

}

export class getDatos{
	constructor(
		public rut:string,
		public firstName:string,
		public lastName:string,
		public gender:string,
		public birthdate:string
	){}
}

export class getRanking{
	constructor(
		public average:number,
		public position:number,
		public stdev:number
//falta definir estudiante
	){}

}

export class setUser{

	constructor(
		public apiKey:string,
		public rut:string

	) {}
}
