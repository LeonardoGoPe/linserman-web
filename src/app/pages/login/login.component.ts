import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'angular';
  isSignedIn = false;
  showPassword=false;
  passwordIcon='eye';
  contrasenia: any;
  cargando=false;

  @Output() isLogout = new EventEmitter<void>();
  @Output() isSignin = new EventEmitter<boolean>();
  user:any;
  email:any;

  constructor(
    //private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    /*if(localStorage.getItem('correo')!== null){
      this.isSignedIn= true
      this.isSignin.emit(true);
    }else{
      this.isSignedIn = false
      this.isSignin.emit(false);
    }*/
  }

  signIn(){
    this.router.navigateByUrl('/generacion-reportes');
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

