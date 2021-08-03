import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Packer } from "docx";

import { informacion, contrato, experiences, education, skills, achievements } from "src/app/components/generador_archivo/docx/cv";
import { DocumentCreator } from "src/app/components/generador_archivo/docx/generador_docx";

import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generacion-reportes',
  templateUrl: './generacion-reportes.component.html',
  styleUrls: ['./generacion-reportes.component.scss']
})
export class GeneracionReportesComponent implements OnInit {


  cargando=false;

  arrayExample:any=[]

  arrayImages: any = []



  constructor(
    private usuariosService: UsuariosService,
    private firebaseService: FirebaseService,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.arrayExample.push({"id":1,"descripcion":"algo","add":false})
    this.arrayExample.push({"id":2,"descripcion":"algo","add":false})
    this.arrayExample.push({"id":3,"descripcion":"algo","add":false})
    this.arrayExample.push({"id":4,"descripcion":"algo","add":false})

    this.http.get('./assets/img-example.jpg', { responseType: 'blob' }).subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var base64data = reader.result;                
            console.log(base64data);
      }

      reader.readAsDataURL(res); 
      console.log(res);
      this.arrayImages.push(res)
    });





    this.firebaseService.getContratos().subscribe((data: any) =>{
      console.log(data)
    })
    /*this.cargando=true;
    setTimeout(()=>{
      this.cargando=false;
    },3000);*/

    let params: any = {}

    this.usuariosService.getUsuarios()?.subscribe((data: any) =>{ //Signo ? para eliminar error de null
      console.log(data)
    }, err =>{
      console.log(err)
    })
  }

  agregarItem(item: any){
    let index = this.arrayExample.findIndex((element: any) => element.id == item.id )
    this.arrayExample[index].add = true;
    console.log(this.arrayExample)
  }

  quitarItem(item: any){
    let index = this.arrayExample.findIndex((element: any) => element.id == item.id )
    this.arrayExample[index].add = false;
    console.log(this.arrayExample)
  }

  public getBase64(event:any) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  public download(): void {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      this.arrayImages,
      contrato,
      informacion,
      experiences,
      education,
      skills,
      achievements
    ]);

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
}
