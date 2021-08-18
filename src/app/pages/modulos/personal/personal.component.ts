import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 5;

  listaPersonal: any = []

  constructor(
    private usuariosService: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarios()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
      console.log(data)
      this.listaPersonal = data.data
    }, err =>{
      console.log(err)
    })
  }

}
