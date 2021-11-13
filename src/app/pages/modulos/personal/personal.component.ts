import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CambiarPassComponent } from './component/cambiar-pass/cambiar-pass.component';
import { CrearPersonalComponent } from './component/crear-personal/crear-personal.component';
import { EditarPersonalComponent } from './component/editar-personal/editar-personal.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 5;

  listaPersonal: any = []

  constructor(
    private modalService: NgbModal,
    private usuariosService: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarios()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
      console.log(data)
      this.listaPersonal = data.data
    }, err =>{
      console.log(err)
    })
  }

  crearUsuario(){
    const modalCrearContrato = this.modalService.open(CrearPersonalComponent, {
      windowClass: 'modals modalGenerales' 
    });
    modalCrearContrato.componentInstance.usuarioCreado.subscribe((usuario: any) => {
      console.log(usuario)
      if(usuario){
        this.usuariosService.getUsuarios()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
          console.log(data)
          this.listaPersonal = data.data
        }, err =>{
          console.log(err)
        })
      }
    });
  }

  editarUsuario(id: any){
    const modalCrearContrato = this.modalService.open(EditarPersonalComponent, {
      windowClass: 'modals modalGenerales' 
    });
    modalCrearContrato.componentInstance.usuario = id;
    modalCrearContrato.componentInstance.usuarioElegido.subscribe((usuario: any) => {
      console.log(usuario)
      if(usuario){
        this.usuariosService.getUsuarios()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
          console.log(data)
          this.listaPersonal = data.data
        }, err =>{
          console.log(err)
        })
      }
    });
  }

  actualizarPassword(usuario: any){
    const modalCrearContrato = this.modalService.open(CambiarPassComponent, {
      windowClass: 'modals modalGenerales' 
    });
    modalCrearContrato.componentInstance.usuario = usuario;
    modalCrearContrato.componentInstance.usuarioElegido.subscribe((usuario: any) => {
      console.log(usuario)
      if(usuario){
        this.usuariosService.getUsuarios()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
          console.log(data)
          this.listaPersonal = data.data
        }, err =>{
          console.log(err)
        })
      }
    });
  }



}
