import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.scss']
})
export class CrearContratoComponent implements OnInit {

  UbicacionList: any = []
  ActividadesList: any = []

  arrayFiscalizadores: any = []
  arraySupervisores: any = []

  data: any = {
    sectores: [],
    descripcion: null,
    nombre_contrato: null
  }

  botonDisabled = true;

  nombreContrato: any;
  descripcionContrato: any;

  sectorIngresado: any;
  zonaReferencial: any;
  supervisoresAignados: any = [];
  fiscalizadoresAsignados: any = [];
  actividadesAsignadas: any = [];

  constructor(
    private modalService: NgbModal,
    private generalesService: GeneralesService,
    private usuariosServices: UsuariosService
  ) { }

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  ngOnInit(): void {

    this.generalesService.getZonas()?.subscribe((data: any) =>{
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

  agregarOtroSector(){
    let sectores: any = {
      sector_data: null,
      usuarios_supervisores: [],
      usuarios_fiscalizadores: [],
      actividades: [],
      nombre_sector: null
    }

    sectores.nombre_sector = this.sectorIngresado
    sectores.sector_data = this.zonaReferencial 
    sectores.usuarios_fiscalizadores = this.fiscalizadoresAsignados
    sectores.usuarios_supervisores = this.supervisoresAignados
    sectores.actividades = this.actividadesAsignadas

    console.log(sectores)
    this.data.sectores.push(sectores)

    this.sectorIngresado = null
    this.zonaReferencial = null
    this.fiscalizadoresAsignados = null
    this.supervisoresAignados = null
    this.actividadesAsignadas = null

    console.log(this.data)
    this.botonDisabled = false;
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

    this.data.nombre_contrato = this.nombreContrato
    this.data.descripcion = this.descripcionContrato
    
    console.log(this.data)

    this.generalesService.postContratos(this.data)?.subscribe((data: any) =>{
      console.log(data)
      this.accionMostrarMensaje("Contrato creado con éxito",200)
      this.modalService.dismissAll();
    })
  }
}