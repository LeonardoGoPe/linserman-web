import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CrearZonaComponent } from './component/crear-zona/crear-zona.component';
import { EditarZonaComponent } from './component/editar-zona/editar-zona.component';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.scss']
})
export class ZonasComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 5;

  sectoresList: any = []

  constructor(
    private modalService: NgbModal,
    private generalesService: GeneralesService,
    private usuariosServices: UsuariosService
  ) { }

  ngOnInit(): void {
    this.generalesService.getZonas()?.subscribe((data: any) =>{
      this.sectoresList = data.data
      console.log(data)
    })
  }

  editarZona(id: any){
    const modalZona = this.modalService.open(EditarZonaComponent, {
      windowClass: 'modals modalGenerales' 
    });
    modalZona.componentInstance.zona = id;
    modalZona.componentInstance.zonaElegida.subscribe((zona: any) => {
      console.log(zona)
      if(zona){
        this.generalesService.getZonas()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
          console.log(data)
          this.sectoresList = data.data
        }, err =>{
          console.log(err)
        })
      }
    });
  }

  crearZona(){
    const modalZona = this.modalService.open(CrearZonaComponent, {
      windowClass: 'modals modalGenerales' 
    });
    modalZona.componentInstance.zonaElegida.subscribe((zona: any) => {
      console.log(zona)
      if(zona){
        this.generalesService.getZonas()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
          console.log(data)
          this.sectoresList = data.data
        }, err =>{
          console.log(err)
        })
      }
    });
  }

}
