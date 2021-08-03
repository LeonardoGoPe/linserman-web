import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-crear-contrato',
  templateUrl: './modal-crear-contrato.component.html',
  styleUrls: ['./modal-crear-contrato.component.scss']
})
export class ModalCrearContratoComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
  ) { }

  showMessageConfirm = false;
  message='¡El contrato no ha podido ser creado!';
  codigoRespuestaHttp:number=400;

  tiempo: number = 3000;
  codigo: number = 500;
  icono:any = 'success';

  ngOnInit(): void {
  }
 
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

  showToast(){
    console.log("toas")
    if( this.codigo >= 200 && this.codigo < 300   ){
        this.icono = 'success';
      }
      if( this.codigo >= 400 && this.codigo < 500   ){
        this.icono = 'error';
      }
      if( this.codigo >= 500 && this.codigo < 600   ){
        this.icono = 'warning';
      }
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: this.tiempo,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: this.icono,
        title: this.message
      })
  }

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
