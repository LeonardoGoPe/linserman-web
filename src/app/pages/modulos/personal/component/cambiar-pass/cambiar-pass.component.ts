import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.component.html',
  styleUrls: ['./cambiar-pass.component.scss']
})
export class CambiarPassComponent implements OnInit {

  @Input() usuario: any;

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  clave: any;

  constructor(
    private modalService: NgbModal,
    private generalService: GeneralesService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
  }

  actualizarPass(){
    let password: any = {}
    
    password.password = this.clave

    this.usuariosService.postCambioPassUsuario(this.usuario.id,password)?.subscribe((resp: any) =>{
      this.accionMostrarMensaje("Contraseña Cambiada con Éxito",resp.code)
    },error=>{
      this.accionMostrarMensaje("Ha Ocurrido un error",500)
    })
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
