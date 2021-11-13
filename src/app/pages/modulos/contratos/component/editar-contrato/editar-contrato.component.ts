import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EditarSectoresContratoComponent } from '../editar-sectores-contrato/editar-sectores-contrato.component';
import { VisualizarSectoresComponent } from '../visualizar-sectores/visualizar-sectores.component';
@Component({
  selector: 'app-editar-contrato',
  templateUrl: './editar-contrato.component.html',
  styleUrls: ['./editar-contrato.component.scss']
})
export class EditarContratoComponent implements OnInit {

  @Input() empresa: any;
  @Output() empresaElegida: EventEmitter<any> = new EventEmitter();

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

  arrayDataSector: any = []
  empresaId: any;

  botonDisabled = true;

  nombreContrato: any;
  descripcionContrato: any;
  codigoEmpresa: any;
  codigoContrato: any;
  contratoActivo: boolean = false;

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

    this.generalesService.getContrato(this.empresa)?.subscribe((data: any) =>{
      console.log(data.data)
      this.nombreContrato = data.data.nombre_contrato
      this.descripcionContrato = data.data.descripcion
      this.codigoEmpresa = data.data.empresa.id_empresa
      this.contratoActivo = data.data.contratoActivo
      this.codigoContrato = data.data.id

      data.data.sectores.forEach((sector: any) => {
        let actividades: any = []
        let supervisores: any = []
        let fiscalizadores: any = []

        let sectorData: any = {}

        sector.actividades.forEach((actividad: any) => {
          actividades.push(actividad.id_actividad)
        });

        sector.usuarios_fiscalizadores.forEach((usuario: any) => {
          fiscalizadores.push(usuario.id)
        });

        sector.usuarios_supervisores.forEach((usuario: any) => {
          supervisores.push(usuario.id)
        });

        sectorData.id = sector.id
        sectorData.sector_data = sector.sector_data
        sectorData.nombre_sector = sector.nombre_sector
        sectorData.actividades = actividades
        sectorData.usuarios_fiscalizadores = fiscalizadores
        sectorData.usuarios_supervisores = supervisores

        this.arrayDataSector.push(sectorData)
      });

      this.generalesService.getEmpresas()?.subscribe((data: any) =>{
        this.arrayEmpresas = data.data
      })
  
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

  visualizarSectores(){
    const modalVisualizarSector = this.modalService.open(EditarSectoresContratoComponent, {
      windowClass: 'modals modalEditarSectores' 
    });
    modalVisualizarSector.componentInstance.arraySectores = this.arrayDataSector;
    modalVisualizarSector.componentInstance.empresa = this.empresa;
    modalVisualizarSector.componentInstance.codigoContrato = this.codigoContrato;
    modalVisualizarSector.componentInstance.respuesta.subscribe((respuesta: any) =>{
      console.log(respuesta)
      if(respuesta.length > 0){
      }
    })
  }

  actualizarCabecera(){
    this.data.nombre_contrato = this.nombreContrato
    this.data.descripcion = this.descripcionContrato
    this.data.empresa = this.codigoEmpresa
    this.data.contratoActivo = this.contratoActivo
  }
}
