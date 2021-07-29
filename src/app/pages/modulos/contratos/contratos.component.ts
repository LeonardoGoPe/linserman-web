import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCrearContratoComponent } from './components/modal-crear-contrato/modal-crear-contrato.component';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss']
})
export class ContratosComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  crearContrato() {
    const inactivarModal = this.modalService.open(ModalCrearContratoComponent, {
        size: "md", 
        windowClass: '' 
    });
    inactivarModal.componentInstance.tipoModal = "remover";
    inactivarModal.componentInstance.emitRemoverAfiliado.subscribe((emmitedValue: any) => {
      
    });
}

}
