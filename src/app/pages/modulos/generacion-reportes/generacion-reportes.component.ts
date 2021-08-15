import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Packer } from "docx";

import { informacion, contrato, experiences, education, skills, achievements } from "src/app/components/generador_archivo/docx/cv";
import { PlantillaContrato } from "src/app/components/generador_archivo/docx/plantilla_contrato";
import { PlantillaGeneral } from "src/app/components/generador_archivo/docx/plantilla_general";
import { map } from 'rxjs/operators';

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

  fileUploads: any = [];



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

    this.firebaseService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key}))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });

    console.log(this.fileUploads)

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

  public descargaPlantillaGeneral(): void{
    const generarPlantillaGeneral = new PlantillaGeneral();
    const documento = generarPlantillaGeneral.crearDocumento([
      this.arrayImages,
      contrato,
      informacion
    ]);

    Packer.toBlob(documento).then(blob => {
      console.log(blob);
      saveAs(blob, "ejemplGeneral.docx");
      console.log("Document created successfully");
    });
  }



  public descargaPlantillaContrato(): void{
    const generarPlantillaContrato = new PlantillaContrato();
    const documento = generarPlantillaContrato.crearDocumento([
      this.arrayImages,
      contrato,
      informacion
    ]);

    Packer.toBlob(documento).then(blob => {
      console.log(blob);
      saveAs(blob, "ejemploContrato.docx");
      console.log("Document created successfully");
    });
  }

  public download(): void {

    const generarPlantillaContrato = new PlantillaContrato();
    const documento = generarPlantillaContrato.crearDocumento([
      this.arrayImages,
      contrato,
      informacion
    ]);


    /*const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      this.arrayImages,
      contrato,
      informacion,
      experiences,
      education,
      skills,
      achievements
    ]);*/

    Packer.toBlob(documento).then(blob => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
}
