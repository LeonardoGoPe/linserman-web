import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generacion-reportes',
  templateUrl: './generacion-reportes.component.html',
  styleUrls: ['./generacion-reportes.component.scss']
})
export class GeneracionReportesComponent implements OnInit {


  cargando=false;


  constructor() { }

  ngOnInit(): void {
    this.cargando=true;
    setTimeout(()=>{
      this.cargando=false;
    },3000);
  }
}
