import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mostrarMensaje: boolean = false;
  mensaje: any;
  codigoRespuestaHttp: any;

  isSignedIn = false;
  showPassword=false;
  passwordIcon='eye';
  contrasenia: any;
  cargando=false;

  servicio: any;
  notificacionTransporter: any;
  uploadForm: any ; 
  esReserva = false;
  formaPago:any;
  tipovehiculo:any;

  correo: any;
  clave: any;

  @Output() isLogout = new EventEmitter<void>();
  @Output() isSignin = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    /*if(localStorage.getItem('correo')!== null){
      this.isSignedIn= true
      this.isSignin.emit(true);
    }else{
      this.isSignedIn = false
      this.isSignin.emit(false);
    }*/

    this.uploadForm = this.formBuilder.group({
      correo: [''],
      password: [''],
    });
  }

  accionMostrarMensaje(mensaje:string,codigo:number){
    this.mensaje = mensaje;
    this.codigoRespuestaHttp = codigo;
    this.mostrarMensaje = true;
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 500);

  }

  signIn(correo: any,clave: any){

    this.uploadForm.get('correo').setValue(correo);
    this.uploadForm.get('password').setValue(clave);
    console.log(this.uploadForm)

    var formData: any = new FormData();
    formData.append("correo", this.uploadForm.get('correo').value);
    formData.append("password", this.uploadForm.get('password').value);
    console.log(formData)

    this.cargando=true;
    this.authService.apiLogin(formData).subscribe((data: any) =>{
      console.log(data.data.tipo_usuario)
      localStorage.setItem('token',data.data.token);

      console.log(localStorage.getItem('token'))

      if(data.data.tipo_usuario != 3){
        this.accionMostrarMensaje("El usuario existe, pero no es administrador",data.code)
      }else{
        this.router.navigateByUrl('/generacion-reportes');
      }
      this.cargando=false;
    }, err =>{
      this.accionMostrarMensaje(err.error.data,err.error.code)
      this.cargando=false;
    })
  }

  iconPassword(){
    this.showPassword=!this.showPassword;
    if(this.passwordIcon=='eye'){
      this.passwordIcon='eye-off';
    }
    else{
      this.passwordIcon='eye';
    }
  }

  async onLogin(email:string,password:string) {
    this.isSignin.emit(true);
  }

 /* async onLogin(email:string,password:string) {
    let credentials = {
      username: email,
      password: password,
    };
  }
    
    this.authService.login(credentials).then((result) => {
      if (result == "ok") {
        this.isSignedIn = true;
        this.isSignin.emit(true);
        this.user=JSON.parse(localStorage.getItem('user'));
        //this.email=this.user.email;
      } else {
        alert("F");
        //this.presentToastFeedback();
      }
    });
  }
/*
  async onSignin(email:string,password:string){
    await this.authService.signin(email,password)
    if(this.authService.isLogged){
      this.isSignedIn = true;
      this.isSignin.emit(true);
      this.user=JSON.parse(localStorage.getItem('user'));
      //console.log('blabla',this.user);
      this.email=this.user.email;
      //console.log('correo'+email);
    }
  }*/


  /*logout(){
    this.isSignedIn=false;
    this.authService.logout();
    this.isLogout.emit();
  }*/
}

