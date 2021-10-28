import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss']
})
export class EditarEmpresaComponent implements OnInit {

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  formulario: any ; 

  @Input() empresa: any;
  @Output() empresaElegida: EventEmitter<any> = new EventEmitter();

  empresaData: any = {};

  constructor(
    private modalService: NgbModal,
    private generalService: GeneralesService
  ) { }

  ngOnInit(): void {
    this.generalService.getEmpresa(this.empresa)?.subscribe((data: any) =>{
      this.empresaData = data.data
      console.log(data)
    })
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  actualizarEmpresa(){

    this.generalService.putEmpresa(this.empresa,this.empresaData)?.subscribe((data: any) =>{
      console.log(data)
      this.empresaElegida.emit(true)
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
