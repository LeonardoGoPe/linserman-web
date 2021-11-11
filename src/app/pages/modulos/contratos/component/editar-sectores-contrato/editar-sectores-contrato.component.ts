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

  quitarSector(sectorElegido: any){
    let indexSectorRemover: any;
    this.arrayReferenciaSectores.forEach((sector: any, index: any) => {
      if(sector.nombre_sector === sectorElegido.nombre_sector){
        indexSectorRemover = index
        this.arrayIndexRemovidos.push(index)
      }
    });

    this.arrayReferenciaSectores.splice(indexSectorRemover,1)
  }

}
