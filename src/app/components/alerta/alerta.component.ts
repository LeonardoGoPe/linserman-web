import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  @Input() message: any;
  @Input() tiempo: number = 3000;
  @Input() codigo: number = 200;

  icono:any = 'success';

constructor() { }

ngOnInit(): void {
    this.showToast();
}

showToast(){
  if( this.codigo >= 200 && this.codigo < 300   ){
      this.icono = 'success';
    }
    if( this.codigo >= 400 && this.codigo < 500   ){
      this.icono = 'error';
    }
    if( this.codigo >= 500 && this.codigo < 600   ){
      this.icono = 'warning';
    }
  const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: this.tiempo,
      timerProgressBar: true,
    })
    
    Toast.fire({
      icon: this.icono,
      title: this.message
    })
}

}
