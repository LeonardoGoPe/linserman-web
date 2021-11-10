import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-visualizar-sectores',
  templateUrl: './visualizar-sectores.component.html',
  styleUrls: ['./visualizar-sectores.component.scss']
})
export class VisualizarSectoresComponent implements OnInit {

  @Input() arraySectores: any;
  @Output() respuesta: EventEmitter<boolean> = new EventEmitter();

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
    this.arraySectores.forEach((sector: any) => {
      this.arrayReferenciaSectores.push(sector)
    });
    console.log(this.arraySectores)
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
    this.respuesta.emit( this.arrayIndexRemovidos);
    this.activeModal.dismiss();
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
