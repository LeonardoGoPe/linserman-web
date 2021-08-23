import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';

@Component({
  selector: 'app-crear-zona',
  templateUrl: './crear-zona.component.html',
  styleUrls: ['./crear-zona.component.scss']
})
export class CrearZonaComponent implements OnInit {

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  formulario: any ; 

  @Output() zonaElegida: EventEmitter<any> = new EventEmitter();

  zonaData: any = {};

  constructor(
    private modalService: NgbModal,
    private generalService: GeneralesService
  ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  crearZona(){

    this.generalService.postZona(this.zonaData)?.subscribe((data: any) =>{
      console.log(data)
      this.zonaElegida.emit(true)
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
