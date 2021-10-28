import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { CrearEmpresaComponent } from './component/crear-empresa/crear-empresa.component';
import { EditarEmpresaComponent } from './component/editar-empresa/editar-empresa.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 5;

  listaEmpresas: any = []

  constructor(
    private modalService: NgbModal,
    private generalService: GeneralesService,
  ) { }

  ngOnInit(): void {
    this.generalService.getEmpresas()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
      console.log(data)
      this.listaEmpresas = data.data
    }, err =>{
      console.log(err)
    })
  }

  crearEmpresa(){
    const modalCrearContrato = this.modalService.open(CrearEmpresaComponent, {
      windowClass: 'modals modalGenerales' 
    });
    modalCrearContrato.componentInstance.usuarioCreado.subscribe((empresa: any) => {
      console.log(empresa)
      if(empresa){
        this.generalService.getEmpresas()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
          console.log(data)
          this.listaEmpresas = data.data
        }, err =>{
          console.log(err)
        })
      }
    });
  }

  editarEmpresa(id: any){
    const modalCrearContrato = this.modalService.open(EditarEmpresaComponent, {
      windowClass: 'modals modalGenerales' 
    });
    modalCrearContrato.componentInstance.empresa = id;
    modalCrearContrato.componentInstance.empresaElegida.subscribe((empresa: any) => {
      console.log(empresa)
      if(empresa){
        this.generalService.getEmpresas()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
          console.log(data)
          this.listaEmpresas = data.data
        }, err =>{
          console.log(err)
        })
      }
    });
  }

}
