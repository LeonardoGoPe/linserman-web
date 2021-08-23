import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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

}
