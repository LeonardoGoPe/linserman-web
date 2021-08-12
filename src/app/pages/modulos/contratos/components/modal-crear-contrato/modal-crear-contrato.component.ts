import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-crear-contrato',
  templateUrl: './modal-crear-contrato.component.html',
  styleUrls: ['./modal-crear-contrato.component.scss']
})
export class ModalCrearContratoComponent implements OnInit {

  UbicacionList: any = []
  ActividadesList: any = []

  arrayFiscalizadores: any = []
  arraySupervisores: any = []

  fiscalizadorSeleccionado: any;
  supervisorSeleccionado: any;
  sectorSeleccionado: any;
  actividadesSeleccionadas: any = [];

  data: any = {
    usuarios: null,
    sectores: [],
    descripcion: null,
    nombre_contrato: null
  }

  constructor(
    private modalService: NgbModal,
    private generalesService: GeneralesService,
    private usuariosServices: UsuariosService
  ) { }

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  ngOnInit(): void {

    this.generalesService.getSectores()?.subscribe((data: any) =>{
      this.UbicacionList = data.data
      console.log(data)
    })

    this.generalesService.getActividades()?.subscribe((data: any) =>{
      this.ActividadesList = data.data
      console.log(data)
    })

    //Codigo 2 es fiscalizador
    this.usuariosServices.getUsuariosPorRol(2)?.subscribe((data: any) =>{
      this.arrayFiscalizadores = data.data
      console.log(data)
    })

    //Codigo 1 es supervisor
    this.usuariosServices.getUsuariosPorRol(1)?.subscribe((data: any) =>{
      this.arraySupervisores = data.data
      console.log(data)
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

  closeModal(){
    this.modalService.dismissAll();
  }

  crearContrato(){
    console.log(this.fiscalizadorSeleccionado, this.supervisorSeleccionado)
    console.log(this.actividadesSeleccionadas, this.supervisorSeleccionado)
    
    let usuarios: any = []
    usuarios.push(this.fiscalizadorSeleccionado)
    usuarios.push(this.supervisorSeleccionado)

    let sectores: any = {
      sector_data: null,
      actividades: null,
    }

    sectores.sector_data = this.sectorSeleccionado
    sectores.actividades = this.actividadesSeleccionadas

    this.data.usuarios = usuarios
    this.data.sectores.push(sectores)

    console.log(this.data)

    this.generalesService.postContratos(this.data)?.subscribe((data: any) =>{
      console.log(data)
      this.accionMostrarMensaje("Contrato creado con éxito",200)
      this.modalService.dismissAll();
    })
  }
}