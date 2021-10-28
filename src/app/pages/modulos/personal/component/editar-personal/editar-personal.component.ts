import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-personal',
  templateUrl: './editar-personal.component.html',
  styleUrls: ['./editar-personal.component.scss']
})
export class EditarPersonalComponent implements OnInit {

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

  @Input() usuario: any;
  @Output() usuarioElegido: EventEmitter<any> = new EventEmitter();

  usuarioData: any = {};

  constructor(
    private modalService: NgbModal,
    private generalService: GeneralesService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuariosService.getUsuario(this.usuario)?.subscribe((data: any) =>{
      this.usuarioData = data.data
      this.usuarioData.empresa = data.data.empresa.id_empresa
      console.log(data)
    })

    this.generalService.getEmpresas()?.subscribe((data: any) =>{
      this.arrayEmpresas = data.data
    })
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  actualizarUsuario(){

    console.log(this.usuario)

    this.usuariosService.putUsuario(this.usuario,this.usuarioData)?.subscribe((data: any) =>{
      console.log(data)
      this.usuarioElegido.emit(true)
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
