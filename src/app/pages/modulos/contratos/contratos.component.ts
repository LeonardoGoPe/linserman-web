import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { CrearContratoComponent } from './component/crear-contrato/crear-contrato.component';
import { EditarContratoComponent } from './component/editar-contrato/editar-contrato.component';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss']
})
export class ContratosComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 5;

  nombreContrato: string = ''

  arrayContratos: any = []

  constructor(
    private modalService: NgbModal,
    private generalesService: GeneralesService,
  ) { }

  ngOnInit(): void {
    this.arrayContratos = []
    this.generalesService.getContratos()?.subscribe((data: any) =>{

      data.data.forEach((element: any) => {
        this.arrayContratos.unshift(element)
      });
    })
    console.log(this.arrayContratos)
  }

  crearContrato() {
    const modalCrearContrato = this.modalService.open(CrearContratoComponent, {
        windowClass: 'modals modalCrearContrato' 
    });
    modalCrearContrato.componentInstance.tipoModal = "remover";
    /*modalCrearContrato.componentInstance.emitRemoverAfiliado.subscribe((emmitedValue: any) => {
      this.arrayContratos = []
      this.generalesService.getContratos()?.subscribe((data: any) =>{
        this.arrayContratos = data.data
        console.log(data)
      })
    });*/
  }

  editarContrato(id: any){
    const modalCrearContrato = this.modalService.open(EditarContratoComponent, {
      windowClass: 'modals modalGenerales' 
    });
    modalCrearContrato.componentInstance.empresa = id;
    modalCrearContrato.componentInstance.empresaElegida.subscribe((empresa: any) => {
      this.arrayContratos = []
      this.generalesService.getContratos()?.subscribe((data: any) =>{
        this.arrayContratos = data.data
        console.log(data)
      })
    });
  }

}
