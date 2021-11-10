import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VisualizarSectoresComponent } from '../visualizar-sectores/visualizar-sectores.component';

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

  arrayEmpresas: any = []

  data: any = {
    sectores: [],
    descripcion: null,
    nombre_contrato: null
  }

  sectorTexto: any = []

  botonDisabled = true;

  nombreContrato: any;
  descripcionContrato: any;
  codigoEmpresa: any;

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

    this.generalesService.getEmpresas()?.subscribe((data: any) =>{
      data.data.forEach((empresa: any) => {
        if(empresa.empresaActiva){
          this.arrayEmpresas.push(empresa)
        }
      });
    })

    this.generalesService.getZonas()?.subscribe((data: any) =>{
      data.data.forEach((zonas: any) => {
        if(zonas.sectorActivo){
          this.UbicacionList.push(zonas)
        }
      });
      console.log(data)
    })

    this.generalesService.getActividades()?.subscribe((data: any) =>{
      data.data.forEach((actividad: any) => {
        if(actividad.actividadActiva){
          this.ActividadesList.push(actividad)
        }
      });
      console.log(data)
    })

    //Codigo 2 es fiscalizador
    this.usuariosServices.getUsuariosPorRol(2)?.subscribe((data: any) =>{
      data.data.forEach((usuarioRol: any) => {
        if(usuarioRol.is_active){
          this.arrayFiscalizadores.push(usuarioRol)
        }
      });
      console.log(data)
    })

    //Codigo 1 es supervisor
    this.usuariosServices.getUsuariosPorRol(1)?.subscribe((data: any) =>{
      data.data.forEach((usuarioRol: any) => {
        if(usuarioRol.is_active){
          this.arraySupervisores.push(usuarioRol)
        }
      });
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

    let sectoresText: any = {
      sector_data: null,
      usuarios_supervisores: [],
      usuarios_fiscalizadores: [],
      actividades: [],
      nombre_sector: null
    }

    let fiscalizadorIndex: any = []
    let fiscalizadorText: any = []
    this.fiscalizadoresAsignados.forEach((fisAsignado: any) => {
      fiscalizadorIndex.push(fisAsignado[0])
      fiscalizadorText.push(fisAsignado[1]+" "+fisAsignado[2])
    });

    let supervisorIndex: any = []
    let supervisorText: any = []
    this.supervisoresAignados.forEach((supAsignado: any) => {
      supervisorIndex.push(supAsignado[0])
      supervisorText.push(supAsignado[1]+" "+supAsignado[2])
    });

    let actividadesIndex: any = []
    let actividadText: any = []
    this.actividadesAsignadas.forEach((actAsignada: any) => {
      actividadesIndex.push(actAsignada[0])
      actividadText.push(actAsignada[1])
    });

    sectores.nombre_sector = this.sectorIngresado
    sectores.sector_data = this.zonaReferencial[0]
    sectores.usuarios_fiscalizadores = fiscalizadorIndex
    sectores.usuarios_supervisores = supervisorIndex
    sectores.actividades = actividadesIndex

    console.log(sectores)
    this.data.sectores.push(sectores)


    sectoresText.nombre_sector = this.sectorIngresado
    sectoresText.sector_data = this.zonaReferencial[1]
    sectoresText.usuarios_fiscalizadores = fiscalizadorText
    sectoresText.usuarios_supervisores = supervisorText
    sectoresText.actividades = actividadText

    console.log(sectoresText)
    this.sectorTexto.push(sectoresText)


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
    this.data.empresa = this.codigoEmpresa
    
    console.log(this.data)

    this.generalesService.postContratos(this.data)?.subscribe((data: any) =>{
      console.log(data)
      this.accionMostrarMensaje("Contrato creado con éxito",200)
      this.modalService.dismissAll();
    })
  }

  visualizarSectores(){
    const modalVisualizarSector = this.modalService.open(VisualizarSectoresComponent, {
      windowClass: 'modals modalVisualizacion' 
    });
    modalVisualizarSector.componentInstance.arraySectores = this.sectorTexto;
    modalVisualizarSector.componentInstance.respuesta.subscribe((respuesta: any) =>{
      console.log(respuesta)
      if(respuesta.length > 0){
        respuesta.forEach((index: any) => {
          console.log("this.sectorTexto",this.sectorTexto)
          console.log(" this.data.sectores", this.data.sectores)
          this.sectorTexto.splice(index,1)
          this.data.sectores.splice(index,1)
        });
      }
      console.log(this.sectorTexto)
      console.log(this.data)
    })
  }
}