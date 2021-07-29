import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-crear-contrato',
  templateUrl: './modal-crear-contrato.component.html',
  styleUrls: ['./modal-crear-contrato.component.scss']
})
export class ModalCrearContratoComponent implements OnInit {

  ngOnInit(): void {
  }
  title = 'Template driven forms';
 
  UbicacionList:Ubicacion[] = [
    new Ubicacion("1", "Garzota"),
    new Ubicacion('2', 'Alborada'),
    new Ubicacion('3', 'Urdesa'),
    new Ubicacion('3', 'Samanes 6'),
    new Ubicacion('3', 'Sauces 7'),
    new Ubicacion('3', 'Guayacanes'),
  ];

  ActividadesList:Actividad[] = [
    new Actividad("1", "Limpieza profunda"),
    new Actividad('2', 'Limpieza superficial'),
    new Actividad('3', 'Limpieza de interiores')
  ];
}
 
export class Ubicacion {
  id:string;
  name:string;
 
  constructor(id:string, name:string) {
    this.id=id;
    this.name=name;
  }
}

export class Actividad {
  id:string;
  name:string;
 
  constructor(id:string, name:string) {
    this.id=id;
    this.name=name;
  }
}
