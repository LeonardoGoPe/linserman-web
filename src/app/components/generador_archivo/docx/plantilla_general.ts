import {
   AlignmentType,
   Document,
   HeadingLevel,
   Paragraph,
   TabStopPosition,
   TabStopType,
   TextRun,
   ImageRun,
} from "docx";

export class PlantillaGeneral {
   // tslint:disable-next-line: typedef
   public crearDocumento([contratoFinal, informacion]:any): Document {
      let contadorImg: number = 0;
      let listaImg: any = []

      const document = new Document({
         sections: [{
            children: [
               /*Titulo documento*/
               new Paragraph({
                  text: contratoFinal.nombreEmpresa,
                  heading: HeadingLevel.TITLE
               }),

               /*Detalles debajo del título*/
               /*this.crearDetallesEmpresa(informacion.celular, informacion.contacto, informacion.correoElectronico, informacion.direccion),*/

               /*Cabecera*/
               this.crearCabecera(contratoFinal.nombre),

               ...contratoFinal.sectores
                  .map((sector:any) => {
                     const arr: Paragraph[] = [];
                     if(sector.cantidadImagenes > 0){
                        arr.push(
                           this.crearSubCabecera(
                              sector.nombre,
                           )
                        );
   
                        sector.actividades.forEach((actividad:any) => {
                           if(actividad.imagenes.length > 0){
                              arr.push(
                                 this.crearNombreActividad(
                                    actividad.nombre,
                                 )
                              );
                              actividad.imagenes.forEach((imagen: any) => {
                                 listaImg.push(imagen.res)
                                 if(listaImg.length == 2){
                                    console.log(listaImg)
                                    arr.push(this.insertarDosImagen(listaImg))
                                    listaImg = []
                                 }
                              })
                              
                              if(listaImg.length != 0){
                                 arr.push(this.insertarUnaImagen(listaImg))
                                 listaImg = []
                              }
                           }
                        });
                     }
                     return arr;
                  }).reduce((prev:any, curr:any) => prev.concat(curr), []),
            ]
         }]
      });
      return document;
   }

   public crearNombreActividad(
      nombreActividad: string
      ): Paragraph {
      return new Paragraph({
         tabStops: [
            {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX
            }
         ],
         children: [
            new TextRun({
            text: nombreActividad,
            bold: true
            }),
         ]
      });
      }

   public crearAutorImagen(
      nombreSupervisor: string
      ): Paragraph {
      return new Paragraph({
         children: [
            new TextRun({
            text: nombreSupervisor,
            italics: true
            })
         ]
      });
   }

   public crearDetallesEmpresa(
      celular: string,
      contacto: string,
      correoElectronico: string,
      direccion: string,
      ): Paragraph {
      return new Paragraph({
         alignment: AlignmentType.CENTER,
         children: [
            new TextRun(
            `Celular: ${celular} | Página web: ${contacto} | Correo electrónico: ${correoElectronico}`
            ),
            new TextRun({
            text: direccion,
            break: 1
            })
         ]
      });
   }

   public crearCabecera(text: string): Paragraph {
      return new Paragraph({
         text: text,
         heading: HeadingLevel.HEADING_1,
         thematicBreak: true
      });
   }

   public crearSubCabecera(text: string): Paragraph {
      return new Paragraph({
         text: text,
         heading: HeadingLevel.HEADING_2
      });
   }

   public separadorVinieta(texto: string): string[] {
      return texto.split("\n\n");
   }

   public insertarDatoVinieta(texto: string): Paragraph {
      return new Paragraph({
         text: texto,
         bullet: {
            level: 0
         }
      });
   }

   public insertarDosImagen(img: any): Paragraph{
      return new Paragraph({
         alignment: AlignmentType.CENTER,
         spacing: {
            before:250,
         },
         children: [
            new ImageRun({
               data: img[0],
               transformation: {
                  width: 200,
                  height:200,
               },
            }),
            new TextRun({
               text:"           "
            }),
            new ImageRun({
               data: img[1],
               transformation: {
                  width: 200,
                  height:200,
               },
            })
         ]
      });
   }

   public insertarUnaImagen(img: any): Paragraph{
      return new Paragraph({
         alignment: AlignmentType.CENTER,
         spacing: {
            before:250,
         },
         children: [
            new ImageRun({
               data: img[0],
               transformation: {
                  width: 200,
                  height:200,
               },
            }),
            new TextRun({
               text:"           "
            }),
         ]
      });
   }
}