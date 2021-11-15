import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.scss']
})
export class EditarActividadComponent implements OnInit {

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  formulario: any ; 

  @Input() actividad: any;
  @Output() actividadElegida: EventEmitter<any> = new EventEmitter();

  actividadData: any = {};

  constructor(
    private modalService: NgbModal,
    private generalService: GeneralesService
  ) { }

  ngOnInit(): void {
    this.generalService.getActividad(this.actividad)?.subscribe((data: any) =>{
      this.actividadData = data.data
      console.log(data)
    })
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  actualizarActividad(){

    this.generalService.putActividad(this.actividad,this.actividadData)?.subscribe((data: any) =>{
      this.accionMostrarMensaje("Actividad actualizada con éxito",200)
      console.log(data)
      this.actividadElegida.emit(true)
      this.closeModal();
    }, error =>{
      this.accionMostrarMensaje("Ha ocurrido un error",400)
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
