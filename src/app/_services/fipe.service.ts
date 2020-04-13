import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Marcas,Fipe, AnoModelo, Modelos, Tipos } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class FipeService {

  baseUrl = "https://parallelum.com.br/fipe/api/v1/";
  marcasEndpoint = "marcas";
  modelosEndpoint = "modelos";
  anosEndpoint = "anos";

  constructor(private httpClient: HttpClient) {}

  getTipos(): Tipos[] 
  {
    let _tipos: Tipos[] = [];
    _tipos.push({"nome": "carros"});
    _tipos.push({"nome": "motos"});
    _tipos.push({"nome": "caminhoes"});
    
    return _tipos;
  }


  getMarcas(tipo: Tipos): Observable<Marcas[]> 
  {
      return this.httpClient.get<Marcas[]>(this.baseUrl + tipo.nome + "/" + this.marcasEndpoint);
  }

  getModelos(tipo: Tipos, marca: Marcas): Observable<Modelos[]>
  {
    return this.httpClient.get<Modelos[]>(this.baseUrl + tipo.nome + "/" + this.marcasEndpoint + "/" + marca.codigo + "/" + this.modelosEndpoint);
  }

  getAnosModelo(tipo: Tipos, marca: Marcas, modelo:  Modelos): Observable<AnoModelo[]>
  {
    return this.httpClient.get<Modelos[]>
      (
        this.baseUrl + 
        tipo.nome + 
        "/" + 
        this.marcasEndpoint +
        "/" + 
        marca.codigo + 
        "/" + 
        this.modelosEndpoint + 
        "/" + 
        modelo.codigo
      );
  }

  getFipe(tipo: Tipos, marca: Marcas, modelo:  Modelos, anoModelo: AnoModelo): Observable<Fipe> 
  {
    return this.httpClient.get<Fipe>
      (
        this.baseUrl + 
        tipo.nome + 
        "/" + 
        this.marcasEndpoint +
        "/" + 
        marca.codigo + 
        "/" + 
        this.modelosEndpoint + 
        "/" + 
        modelo.codigo +
        this.anosEndpoint +
        "/" +
        anoModelo.codigo
      );
  }




  


}
