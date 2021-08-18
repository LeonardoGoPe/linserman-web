import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombrecontrato'
})
export class NombrecontratoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    console.log(value,arg)
    const resultados = [];
    for(const contrato of value){
      if(contrato.nombre_contrato.indexOf(arg) > -1){
        resultados.push(contrato);
      };
    };
    return resultados;
  }

}
