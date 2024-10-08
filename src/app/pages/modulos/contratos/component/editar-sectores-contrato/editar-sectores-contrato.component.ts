import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-editar-sectores-contrato',
  templateUrl: './editar-sectores-contrato.component.html',
  styleUrls: ['./editar-sectores-contrato.component.scss']
})
export class EditarSectoresContratoComponent implements OnInit {

  @Input() empresa: any;
  @Input() codigoContrato: any;
  //@Input() arraySectores: any;
  @Output() respuesta: EventEmitter<any> = new EventEmitter();

  arraySectores: any = []

  UbicacionList: any = []
  ActividadesList: any = []

  arrayFiscalizadores: any = []
  arraySupervisores: any = []

  arrayEmpresas: any = []

  dataContrato: any = {}

  botonDisabled = true;

  nombreContrato: any;
  descripcionContrato: any;
  codigoEmpresa: any;

  sectorIngresado: any;
  zonaReferencial: any;
  supervisoresAignados: any = [];
  fiscalizadoresAsignados: any = [];
  actividadesAsignadas: any = [];

  arrayIndexRemovidos: any = []
  arrayReferenciaSectores: any = []

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private generalesService: GeneralesService,
    private usuariosServices: UsuariosService
  ) { }
  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;
  ngOnInit(): void {

    this.arraySectores = []

    this.generalesService.getContrato(this.empresa)?.subscribe((data: any) =>{
      console.log(data.data)
      this.nombreContrato = data.data.nombre_contrato
      this.descripcionContrato = data.data.descripcion
      this.codigoEmpresa = data.data.empresa.id_empresa
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
        sectorData.contratoXSectorActivo = sector.contratoXSectorActivo
        sectorData.contratoXSectorActivoPendiente = sector.contratoXSectorActivo

        this.arraySectores.push(sectorData)
      });
      console.log("this.arraySectores",this.arraySectores)

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

  mostrarSectores(){
    this.arraySectores.forEach((sector: any) => {
      sector.contratoXSectorActivoPendiente = true;
    });
    console.log(this.arraySectores)
  }

  closeModal(){
    this.activeModal.dismiss();
  }

  actualizarSector(sectorElegido: any){
    console.log(sectorElegido)
    console.log(sectorElegido.sector_data.id_sector)
    let data: any = {}
    let sector: any = {}

    sector.sector_data = sectorElegido.sector_data.id_sector
    sector.usuarios_supervisores = sectorElegido.usuarios_supervisores
    sector.usuarios_fiscalizadores = sectorElegido.usuarios_fiscalizadores
    sector.actividades = sectorElegido.actividades
    sector.nombre_sector = sectorElegido.nombre_sector
    sector.contratoXSectorActivo = sectorElegido.contratoXSectorActivo

    data.sector = sector


    let params: any = {}
    params.id_sector = sectorElegido.id

    this.generalesService.putContratosXSector(this.codigoContrato,data,params)?.subscribe((resp: any) =>{
      this.accionMostrarMensaje("Sector Actualizado Con Éxito",resp.code)
    })
  }

  agregarSectorXContrato(sectorElegido: any){
    let data: any = []
    let sector: any = {}
    let sectores: any = {}

    sector.sector_data = sectorElegido.sector_data.id_sector
    sector.usuarios_supervisores = sectorElegido.usuarios_supervisores
    sector.usuarios_fiscalizadores = sectorElegido.usuarios_fiscalizadores
    sector.actividades = sectorElegido.actividades
    sector.nombre_sector = sectorElegido.nombre_sector
    data.push(sector)
    sectores.sectores = data
    console.log(sectores)

    this.generalesService.postAgregarSectorXContratoExistente(this.codigoContrato,sectores)?.subscribe((resp: any) =>{
      this.accionMostrarMensaje("Sector Agregado Con Éxito",resp.code)
    })
  }



  agregarNuevoSector(){
    let sectorData: any = {}

    let sector_data: any = {}
    sector_data.id_sector = null
    
    sectorData.sector_data = sector_data
    sectorData.actividades = null
    sectorData.usuarios_fiscalizadores = null
    sectorData.usuarios_supervisores = null
    sectorData.contratoXSectorActivo = true
    sectorData.esNuevoSector = true
    this.arraySectores.push(sectorData)
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
