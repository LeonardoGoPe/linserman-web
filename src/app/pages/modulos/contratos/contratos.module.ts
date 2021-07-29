import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratosRoutingModule } from './contratos-routing.module';
import { ModalCrearContratoComponent } from './components/modal-crear-contrato/modal-crear-contrato.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModalCrearContratoComponent
  ],
  imports: [
    CommonModule,
    ContratosRoutingModule,
    FormsModule, ReactiveFormsModule
    
  ]
})
export class ContratosModule { }
