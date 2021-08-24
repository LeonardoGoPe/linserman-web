import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';

@Component({
  selector: 'app-elegir-contrato',
  templateUrl: './elegir-contrato.component.html',
  styleUrls: ['./elegir-contrato.component.scss']
})
export class ElegirContratoComponent implements OnInit {

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  page: number = 1;
  itemsPerPage: number = 5;

  listContratos: any = []

  @Output() contratoElegido: EventEmitter<any> = new EventEmitter();

  constructor(
    private generalService: GeneralesService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.generalService.getContratos()?.subscribe((data: any) =>{
      this.listContratos = data.data
      console.log(this.listContratos)
    })
  }

  contratoFunc(contrato: any){
    console.log(contrato)
    this.contratoElegido.emit(contrato)
    this.closeModal();
  }

  closeModal(){
    this.modalService.dismissAll();
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
