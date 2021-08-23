import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.scss']
})
export class CrearActividadComponent implements OnInit {

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  formulario: any ; 

  @Output() actividadElegida: EventEmitter<any> = new EventEmitter();

  actividadData: any = {};

  constructor(
    private modalService: NgbModal,
    private generalService: GeneralesService
  ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  crearActividad(){

    this.generalService.postActividad(this.actividadData)?.subscribe((data: any) =>{
      console.log(data)
      this.actividadElegida.emit(true)
      this.closeModal();
    })
  }


  accionMostrarMensaje(mensaje:string,codigo:number){
    this.mensaje = mensaje;
    this.codigoRespuestaHttp = codigo;
    this.mostrarMensaje = true;
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 500);
  }

}
