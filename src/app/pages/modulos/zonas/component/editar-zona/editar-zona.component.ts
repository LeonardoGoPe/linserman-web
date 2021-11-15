import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';

@Component({
  selector: 'app-editar-zona',
  templateUrl: './editar-zona.component.html',
  styleUrls: ['./editar-zona.component.scss']
})
export class EditarZonaComponent implements OnInit {

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  formulario: any ; 

  @Input() zona: any;
  @Output() zonaElegida: EventEmitter<any> = new EventEmitter();

  zonaData: any = {};

  constructor(
    private modalService: NgbModal,
    private generalService: GeneralesService
  ) { }

  ngOnInit(): void {
    this.generalService.getZona(this.zona)?.subscribe((data: any) =>{
      this.zonaData = data.data
      console.log(data)
    })
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  actualizarZona(){

    this.generalService.putZona(this.zona,this.zonaData)?.subscribe((data: any) =>{
      this.accionMostrarMensaje("Zona referencial actualizada con éxito",200)
      console.log(data)
      this.zonaElegida.emit(true)
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

