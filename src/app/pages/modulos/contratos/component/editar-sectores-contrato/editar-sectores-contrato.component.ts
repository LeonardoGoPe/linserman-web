import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  @Input() arraySectores: any;
  @Output() respuesta: EventEmitter<any> = new EventEmitter();

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
    private generalesService: GeneralesService,
    private usuariosServices: UsuariosService
  ) { }
  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;
  ngOnInit(): void {

    console.log("this.arraySectores",this.arraySectores)

    this.generalesService.getContrato(this.empresa)?.subscribe((data: any) =>{
      this.dataContrato = data.data
      console.log("this.dataContrato",this.dataContrato)
      this.nombreContrato = data.data.nombre_contrato
      this.descripcionContrato = data.data.descripcion
      this.codigoEmpresa = data.data.empresa.id_empresa

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

  closeModal(){
    this.modalService.dismissAll();
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

    data.sector = sector


    let params: any = {}
    params.id_sector = sectorElegido.id

    this.generalesService.putContratosXSector(this.codigoContrato,data,params)?.subscribe((resp: any) =>{
      this.accionMostrarMensaje("Sector Actualizado Con Éxito",resp.code)
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
