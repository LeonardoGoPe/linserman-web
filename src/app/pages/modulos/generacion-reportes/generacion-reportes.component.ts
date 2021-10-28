import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Packer } from "docx";

import { informacion, contrato, experiences, education, skills, achievements } from "src/app/components/generador_archivo/docx/cv";
import { PlantillaContrato } from "src/app/components/generador_archivo/docx/plantilla_contrato";
import { PlantillaGeneral } from "src/app/components/generador_archivo/docx/plantilla_general";

import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElegirContratoComponent } from './component/elegir-contrato/elegir-contrato.component';
import { GeneralesService } from 'src/app/services/generales.service';

@Component({
  selector: 'app-generacion-reportes',
  templateUrl: './generacion-reportes.component.html',
  styleUrls: ['./generacion-reportes.component.scss']
})
export class GeneracionReportesComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 8;

  cargando=false;

  arrayExample:any=[]

  arrayImages: any = []
  cloudFiles:any=[]

  arraySectores: any = []
  arrayActividades: any = []

  contratoElegido: any;
  idContratoElegido: any;

  idSectorElegido: any;
  idActividadElegida: any;

  fechaInicial: any;
  fechaFinal: any;

  contratoFinal: any = {};

  arrayEmpresas: any = []
  empresaElegida: any;

  constructor(
    private usuariosService: UsuariosService,
    private firebaseService: FirebaseService,
    public http: HttpClient,
    private fStorage: AngularFireStorage,
    private modalService: NgbModal,
    private generalService: GeneralesService
  ) { }

  ngOnInit(): void {

    this.generalService.getEmpresas()?.subscribe((data: any) =>{
      this.arrayEmpresas = data.data
    })


    this.arrayExample.push({"id":1,"descripcion":"algo","add":false})
    this.arrayExample.push({"id":2,"descripcion":"algo","add":false})
    this.arrayExample.push({"id":3,"descripcion":"algo","add":false})
    this.arrayExample.push({"id":4,"descripcion":"algo","add":false})

    //this.getAllImages();

    /*this.http.get('./assets/img-example.jpg', { responseType: 'blob' }).subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var base64data = reader.result;                
            //console.log(base64data);
      }
      
      reader.readAsDataURL(res); 
      console.log(res);
      //this.arrayImages.push(res)
      console.log(this.arrayImages);
    });*/

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

  buscarContrato(){
    const modalBuscarContrato = this.modalService.open(ElegirContratoComponent, {
      windowClass: 'modals modalGenerales' 
    });
    modalBuscarContrato.componentInstance.empresaElegida = this.empresaElegida
    modalBuscarContrato.componentInstance.contratoElegido.subscribe((contrato: any) => {
      if(contrato != null){
        console.log(contrato)

        let empresa = this.arrayEmpresas.find((element: any) => element.id_empresa == this.empresaElegida);

        this.contratoFinal.nombre = contrato.nombre_contrato
        this.contratoFinal.nombreEmpresa = empresa.nombre_empresa
        this.contratoFinal.sectores = []

        contrato.sectores.forEach((element: any) => {
          let sectorData: any = {}
          sectorData.cantidadImagenes = 0
          sectorData.nombre = element.nombre_sector
          sectorData.id = element.id
          sectorData.actividades = []

          element.actividades.forEach((element: any) => {
            let actividadData: any = {}
            actividadData.nombre = element.texto_descripcion
            actividadData.id = element.id_actividad
            actividadData.imagenes = []
            sectorData.actividades.push(actividadData)
          });
          this.contratoFinal.sectores.push(sectorData)
        });

        this.contratoElegido = contrato.nombre_contrato
        this.idContratoElegido = contrato.id;
        console.log(this.idContratoElegido)
        this.arraySectores = contrato.sectores
      }
    });
  }

  actualizarActividades(event: any){

    console.log(this.idSectorElegido)
    let sectorData = this.arraySectores.find((element: any) => this.idSectorElegido == element.id )
    console.log(sectorData)

    this.arrayActividades = sectorData.actividades
  }

  buscarImagenes(){
    let id: number = 0;
    console.log(this.idContratoElegido)
    console.log(this.idSectorElegido)
    console.log(this.idActividadElegida)
    this.cloudFiles = []
    this.cargando = true;

    console.log(this.contratoFinal)


    this.fStorage.ref(`Limpiaseguro/contratos/${this.idContratoElegido}/${this.idSectorElegido}/${this.idActividadElegida}`).listAll().subscribe((res)=>{
      this.cargando = false;
      console.log(res);
      res.items.forEach(element => {
        element.getMetadata().then(data=>  {
          let metaData: any = {}
          console.log(data);
          metaData = data.customMetadata
            element.getDownloadURL().then(url=>  {


              let add: boolean = false;
              let index = this.arrayImages.findIndex((element: any) => element.id == metaData.idFoto )
              if(index !== -1){
                add = true
              }

              /*this.contratoFinal.sectores.forEach((sector: any) => {
                console.log("ENTRAAAA",sector)
                if(sector.id == this.idSectorElegido){
                  sector.actividades.forEach((actividad: any) => {
                    if(actividad.id == this.idActividadElegida){
                      console.log("ENTRAAAA",actividad.imagenes)
                      actividad.imagenes.forEach((imagen: any) => {
                        if(imagen.id == id ){

                        }
                      });
                    }
                  });
      
                  sector.cantidadImagenes = sector.cantidadImagenes + 1;
                }
              });*/

              //console.log(url)
              //this.arrayImages.push(url)
              this.cloudFiles.push({
                id:metaData.idFoto,
                url:url,
                add:add,
                hidden:false,
                datos:metaData
              })
              console.log(this.cloudFiles)
            })
          })
        })
      });
  }

  filtrarPorFechas(){
    console.log(this.cloudFiles)
    let startDate = "2021-08-18";
    let endDate = "2021-08-29";

    this.cloudFiles.forEach((element: any)  => {
      if(!(new Date(element.datos.fecha) >= new Date(this.fechaInicial) && new Date(element.datos.fecha) <= new Date(this.fechaFinal))){
        element.hidden = true
      }
    })

  }

  limpiarFechas(){
    this.fechaInicial = null
    this.fechaFinal = null
    
    this.cloudFiles.forEach((element: any)  => {
      element.hidden = false
    })
  }
  
  agregarItem(item: any){
    console.log(this.cloudFiles)
    console.log(item)
    item.add=true;
    
    this.http.get(item.url, { responseType: 'blob' }).subscribe(res => {
      const reader = new FileReader();
      /*reader.onloadend = () => {
        var base64data = reader.result;                
            //console.log(base64data);
      }*/
      reader.readAsDataURL(res); 
      console.log(res);
      this.arrayImages.push({id:item.id,res:res})
      console.log(this.arrayImages)

        this.contratoFinal.sectores.forEach((sector: any) => {
          console.log("ENTRAAAA",sector)
          if(sector.id == this.idSectorElegido){
            sector.actividades.forEach((actividad: any) => {
              if(actividad.id == this.idActividadElegida){
                console.log("ENTRAAAA")
                actividad.imagenes.push({id:item.idFoto,res:res})
              }
            });

            sector.cantidadImagenes = sector.cantidadImagenes + 1;
          }
        });

      console.log("IMPROOO",this.arrayImages,item)
      let index = this.arrayImages.findIndex((element: any) => element.id == item.id )
      this.arrayImages[index].add = true;
      console.log(this.arrayImages)
    });
  }

  quitarItem(item: any){
    item.add=false;

    this.contratoFinal.sectores.forEach((sector: any) => {
      console.log("ENTRAAAA",sector)
      if(sector.id == this.idSectorElegido){
        sector.actividades.forEach((actividad: any) => {
          if(actividad.id == this.idActividadElegida){
            console.log("ENTRAAAA")
            let index = actividad.imagenes.findIndex((element: any) => element.id == item.id )
            actividad.imagenes.splice(index, 1);
            console.log(actividad.imagenes)
          }
        });

        sector.cantidadImagenes = sector.cantidadImagenes - 1;
      }
    });

    let index = this.arrayImages.findIndex((element: any) => element.id == item.id )
    this.arrayImages.splice(index, 1);
    console.log(this.arrayImages)
  }

  public descargaPlantillaGeneral(): void{
    console.log(this.contratoFinal)

    this.contratoFinal.sectores.forEach((sector: any) => {
      let tieneImagenes: boolean = true;
      sector.actividades.forEach((actividad: any) => {
        if(actividad.imagenes.length == 0){
          tieneImagenes = false;
        }
      });
    });


    const generarPlantillaGeneral = new PlantillaGeneral();
    const documento = generarPlantillaGeneral.crearDocumento([
      this.contratoFinal,
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
