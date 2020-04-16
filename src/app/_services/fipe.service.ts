import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Marcas,Fipe, AnoModelo, Modelos, Tipos } from '../_models';
import { TabelaReferencia } from '../_models/tabelaReferencia';
import { FipeRequest } from '../_models/fipeRequest';

@Injectable({
  providedIn: 'root'
})
export class FipeService {

 

  constructor(private httpClient: HttpClient) {}


  /*
    FUNCOES E DADOS UTILIZADOS PARA CONSULTA FIPE DIRETAMENTE DO SITE, SIMULANDO AS REQUESTS OBSERVADAS NO SITE
  */
 fipeUrlDireto = "https://veiculos.fipe.org.br/api/veiculos/";
 fipeTabelaReferenciaEndpoint = "/ConsultarTabelaDeReferencia";
 fipeMarcasEndpoint = "/ConsultarMarcas";
 fipeModelosEndpoint= "/ConsultarModelos";
 fipeAnoModeloEndpoint = "/ConsultarAnoModelo";

 getFipeTabelaReferencia(): Observable<TabelaReferencia[]> {
    return this.httpClient.post<TabelaReferencia[]>(this.fipeUrlDireto + this.fipeTabelaReferenciaEndpoint, empty);
 }

 getFipeMarcas(fipeRequest: FipeRequest): Observable<any> {
   let formData = new FormData();
   formData.append("codigoTabelaReferencia", fipeRequest.codigoTabelaReferencia.toString());
   formData.append("codigoTipoVeiculo", fipeRequest.codigoTipoVeiculo.toString());

   return this.httpClient.post(this.fipeUrlDireto + this.fipeMarcasEndpoint, formData);
 }


  /*
    FUNCOES E DADOS UTILIZADOS PARA CONSULTA DA FIPE ATRAVES API DE TERCEIROS
  */

 baseUrl = "https://parallelum.com.br/fipe/api/v1/";
 marcasEndpoint = "marcas";
 modelosEndpoint = "modelos";
 anosEndpoint = "anos";

  getTipos(): Tipos[] 
  {
    let _tipos: Tipos[] = [];

    let T1 = new Tipos();
    let T2 = new Tipos();
    let T3 = new Tipos();
    T1.nome = "carros";
    T2.nome = "motos";
    T3.nome = "caminhoes";

    _tipos.push(T1);
    _tipos.push(T2);
    _tipos.push(T3);

    
    return _tipos;
  }


  getMarcas(tipo: string): Observable<Marcas[]> 
  {
      return this.httpClient.get<Marcas[]>(this.baseUrl + tipo + "/" + this.marcasEndpoint);
  }

  getModelos(tipo: string, codMarca: number): Observable<any>
  {
    return this.httpClient.get<any>(this.baseUrl + tipo + "/" + this.marcasEndpoint + "/" + codMarca + "/" + this.modelosEndpoint);
  }

  getAnosModelo(tipo: string, codMarca: number, codModelo:  number): Observable<AnoModelo[]>
  {
    return this.httpClient.get<AnoModelo[]>
      (
        this.baseUrl + 
        tipo + 
        "/" + 
        this.marcasEndpoint +
        "/" + 
        codMarca + 
        "/" + 
        this.modelosEndpoint + 
        "/" + 
        codModelo +
        "/" + 
        this.anosEndpoint
      );
  }

  getFipe(tipo: string, codMarca: number, codModelo:  number, anoModelo: string): Observable<Fipe> 
  {
    return this.httpClient.get<Fipe>
      (
        this.baseUrl + 
        tipo + 
        "/" + 
        this.marcasEndpoint +
        "/" + 
        codMarca + 
        "/" + 
        this.modelosEndpoint + 
        "/" + 
        codModelo +
        "/" +
        this.anosEndpoint +
        "/" +
        anoModelo
      );
  }




  


}
