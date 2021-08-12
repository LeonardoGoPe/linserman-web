import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralesService } from 'src/app/services/generales.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sectores',
  templateUrl: './sectores.component.html',
  styleUrls: ['./sectores.component.scss']
})
export class SectoresComponent implements OnInit {

  sectoresList: any = []

  constructor(
    private modalService: NgbModal,
    private generalesService: GeneralesService,
    private usuariosServices: UsuariosService
  ) { }

  ngOnInit(): void {
    this.generalesService.getSectores()?.subscribe((data: any) =>{
      this.sectoresList = data.data
      console.log(data)
    })
  }

}
