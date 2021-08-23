import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { CrearContratoComponent } from './component/crear-contrato/crear-contrato.component';

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
    this.generalesService.getContratos()?.subscribe((data: any) =>{
      this.arrayContratos = data.data
      console.log(data)
    })
  }

  crearContrato() {
    const modalCrearContrato = this.modalService.open(CrearContratoComponent, {
        windowClass: 'modals modalCrearContrato' 
    });
    modalCrearContrato.componentInstance.tipoModal = "remover";
    modalCrearContrato.componentInstance.emitRemoverAfiliado.subscribe((emmitedValue: any) => {
      this.generalesService.getContratos()?.subscribe((data: any) =>{
        this.arrayContratos = data.data
        console.log(data)
      })
    });
}

}
