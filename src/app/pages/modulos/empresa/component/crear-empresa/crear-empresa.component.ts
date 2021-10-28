import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.scss']
})
export class CrearEmpresaComponent implements OnInit {

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  formulario: any ; 

  @Output() empresaCreada: EventEmitter<any> = new EventEmitter();

  empresaData: any = {};

  constructor(
    private modalService: NgbModal,
    private generalService: GeneralesService
  ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  crearEmpresa(){

    this.generalService.postEmpresa(this.empresaData)?.subscribe((data: any) =>{
      console.log(data)
      this.empresaCreada.emit(true)
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
