import {
   AlignmentType,
   Document,
   HeadingLevel,
   Packer,
   Paragraph,
   TabStopPosition,
   TabStopType,
   TextRun,
   ImageRun,
   HorizontalPositionRelativeFrom,
   VerticalPositionRelativeFrom,
   TextWrappingSide,
   TextWrappingType,
 } from "docx";
 
  export class DocumentCreator {
    // tslint:disable-next-line: typedef
    public create([arrayImg, contrato, informacion, experiences, educations, skills, achivements]:any): Document {
      const document = new Document({
        sections: [
          {
            children: [
              /*Titulo documento*/
              new Paragraph({
                text: informacion.nombreEmpresa,
                heading: HeadingLevel.TITLE
              }),

              /*Detalles debajo del título*/
              this.createContactInfo(informacion.celular, informacion.contacto, informacion.correoElectronico, informacion.direccion),

              /*Cabecera*/
              this.createHeading("Contrato de prueba"),

              this.createSubHeading("Sector 1"),
              ...contrato
                .map((dataContrato:any) => {
                  const arr: Paragraph[] = [];
                  arr.push(
                    this.crearNombreActividad(
                      dataContrato.actividad,
                    )
                  );
                  arr.push(
                    this.crearAutorImagen(
                      dataContrato.autor
                    )
                  );

                  const datosVinietas = this.separadorVinieta(
                    dataContrato.detalles
                  );
                  datosVinietas.forEach(dato => {
                    arr.push(this.insertarDatoVinieta(dato));
                  });

                  datosVinietas.forEach(dato => {
                    arr.push(this.insertarImagen(arrayImg[0]))
                  });

                  return arr;
                }).reduce((prev:any, curr:any) => prev.concat(curr), []),


              /*
              this.createHeading("Contrato de prueba"),
              ...educations
                .map((education:any) => {
                  const arr: Paragraph[] = [];
                  arr.push(
                    this.createInstitutionHeader(
                      education.schoolName,
                      `${education.startDate.year} - ${education.endDate.year}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `${education.fieldOfStudy} - ${education.degree}`
                    )
                  );

                  const bulletPoints = this.splitParagraphIntoBullets(
                    education.notes
                  );
                  bulletPoints.forEach(bulletPoint => {
                    arr.push(this.createBullet(bulletPoint));
                  });

                  arr.push(this.createImage(arrayImg[0]))

                  return arr;
                }).reduce((prev:any, curr:any) => prev.concat(curr), []),

              
              this.createHeading("Experience"),
              ...experiences
                .map((position:any) => {
                  const arr: Paragraph[] = [];

                  arr.push(
                    this.createInstitutionHeader(
                      position.company.name,
                      this.createPositionDateText(
                        position.startDate,
                        position.endDate,
                        position.isCurrent
                      )
                    )
                  );
                  arr.push(this.createRoleText(position.title));

                  const bulletPoints = this.splitParagraphIntoBullets(
                    position.summary
                  );

                  bulletPoints.forEach(bulletPoint => {
                    arr.push(this.createBullet(bulletPoint));
                  });

                  return arr;
                })
                .reduce((prev:any, curr:any) => prev.concat(curr), []),
              this.createHeading("Skills, Achievements and Interests"),
              this.createSubHeading("Skills"),
              this.createSkillList(skills),
              this.createSubHeading("Achievements"),
              ...this.createAchivementsList(achivements),
              this.createSubHeading("Interests"),
              this.createInterests(
                "Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."
              ),
              this.createHeading("References"),
              new Paragraph(
                "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk"
              ),
              new Paragraph("More references upon request"),
              new Paragraph({
                text:
                  "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.",
                alignment: AlignmentType.CENTER
              })*/
            ]
          }
        ]
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

    public createContactInfo(
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

    public createHeading(text: string): Paragraph {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_1,
        thematicBreak: true
      });
    }

    public createSubHeading(text: string): Paragraph {
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

  public insertarImagen(img: any): Paragraph{
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        before: 220,
      },
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX
        }
      ],
      children: [
        new ImageRun({
            data: img,
            transformation: {
              width: 450,
              height:450,
            },
        })
      ]
    });
    }





    public createInstitutionHeader(
      institutionName: string,
      dateText: string
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
            text: institutionName,
            bold: true
          }),
          new TextRun({
            text: `\t${dateText}`,
            bold: true
          })
        ]
      });
    }

    public createRoleText(roleText: string): Paragraph {
      return new Paragraph({
        children: [
          new TextRun({
            text: roleText,
            italics: true
          })
        ]
      });
    }

    public createBullet(text: string): Paragraph {
      return new Paragraph({
        text: text,
        bullet: {
          level: 0
        }
      });
    }

    public createImage(img: any): Paragraph{
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX
        }
      ],
      children: [
        new ImageRun({
            data: img,
            transformation: {
              width: 100,
              height:100,
            }
        })
      ]
    });
    }

    // tslint:disable-next-line:no-any
    public createSkillList(skills: any[]): Paragraph {
      return new Paragraph({
        children: [new TextRun(skills.map(skill => skill.name).join(", ") + ".")]
      });
    }

    // tslint:disable-next-line:no-any
    public createAchivementsList(achivements: any[]): Paragraph[] {
      return achivements.map(
        achievement =>
          new Paragraph({
            text: achievement.name,
            bullet: {
              level: 0
            }
          })
      );
    }

    public createInterests(interests: string): Paragraph {
      return new Paragraph({
        children: [new TextRun(interests)]
      });
    }

    public splitParagraphIntoBullets(text: string): string[] {
      return text.split("\n\n");
    }

    // tslint:disable-next-line:no-any
    public createPositionDateText(
      startDate: any,
      endDate: any,
      isCurrent: boolean
    ): string {
      const startDateText =
        this.getMonthFromInt(startDate.month) + ". " + startDate.year;
      const endDateText = isCurrent
        ? "Present"
        : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

      return `${startDateText} - ${endDateText}`;
    }

    public getMonthFromInt(value: number): string {
      switch (value) {
        case 1:
          return "Jan";
        case 2:
          return "Feb";
        case 3:
          return "Mar";
        case 4:
          return "Apr";
        case 5:
          return "May";
        case 6:
          return "Jun";
        case 7:
          return "Jul";
        case 8:
          return "Aug";
        case 9:
          return "Sept";
        case 10:
          return "Oct";
        case 11:
          return "Nov";
        case 12:
          return "Dec";
        default:
          return "N/A";
      }
    }
  }