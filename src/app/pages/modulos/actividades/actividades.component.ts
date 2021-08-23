import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CrearActividadComponent } from './component/crear-actividad/crear-actividad.component';
import { EditarActividadComponent } from './component/editar-actividad/editar-actividad.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 5;

  actividadesList: any = []

  constructor(
    private modalService: NgbModal,
    private generalesService: GeneralesService,
    private usuariosServices: UsuariosService
  ) { }

  ngOnInit(): void {
    this.generalesService.getActividades()?.subscribe((data: any) =>{
      this.actividadesList = data.data
      console.log(data)
    })
  }

  editarActividad(id: any){
    const modalActividad = this.modalService.open(EditarActividadComponent, {
      windowClass: 'modals modalGenerales' 
    });
    modalActividad.componentInstance.actividad = id;
    modalActividad.componentInstance.actividadElegida.subscribe((actividad: any) => {
      console.log(actividad)
      if(actividad){
        this.generalesService.getActividades()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
          console.log(data)
          this.actividadesList = data.data
        }, err =>{
          console.log(err)
        })
      }
    });
  }

  crearActividad(){
    const modalActividad = this.modalService.open(CrearActividadComponent, {
      windowClass: 'modals modalGenerales' 
    });
    modalActividad.componentInstance.actividadElegida.subscribe((actividad: any) => {
      console.log(actividad)
      if(actividad){
        this.generalesService.getActividades()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
          console.log(data)
          this.actividadesList = data.data
        }, err =>{
          console.log(err)
        })
      }
    });
  }

}
