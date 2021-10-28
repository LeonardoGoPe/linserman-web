import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-crear-personal',
  templateUrl: './crear-personal.component.html',
  styleUrls: ['./crear-personal.component.scss']
})
export class CrearPersonalComponent implements OnInit {

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  arrayTiposUsuarios = [
    {
      id:1,
      descripcion: "Supervisor"
    },
    {
      id:2,
      descripcion: "Fiscalizador"
    },
    {
      id:3,
      descripcion: "Administrador"
    }
  ]

  arrayEmpresas: any = []

  formulario: any ; 

  @Output() usuarioCreado: EventEmitter<any> = new EventEmitter();

  usuarioData: any = {};

  constructor(
    private modalService: NgbModal,
    private generalService: GeneralesService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {

    this.generalService.getEmpresas()?.subscribe((data: any) =>{
      this.arrayEmpresas = data.data
    })

  }

  closeModal(){
    this.modalService.dismissAll();
  }

  crearUsuario(){

    this.usuariosService.postUsuario(this.usuarioData)?.subscribe((data: any) =>{
      console.log(data)
      this.usuarioCreado.emit(true)
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