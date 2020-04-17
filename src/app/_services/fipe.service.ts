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
 fipeValoresEndpoint = "/ConsultarValorComTodosParametros";

  getFipeTipos(){
    let _tipos = [];
    _tipos.push({"id": 1, "nome": "carros"});
    _tipos.push({"id": 2, "nome": "motos"});
    _tipos.push({"id": 3, "nome": "caminhões"});

    return _tipos;
  }

 getFipeTabelaReferencia(): Observable<TabelaReferencia[]> {
    return this.httpClient.post<TabelaReferencia[]>(this.fipeUrlDireto + this.fipeTabelaReferenciaEndpoint, empty);
 }

 getFipeMarcas(fipeRequest: FipeRequest): Observable<any> {
   let formData = new FormData();
   formData.append("codigoTabelaReferencia", fipeRequest.codigoTabelaReferencia.toString());
   formData.append("codigoTipoVeiculo", fipeRequest.codigoTipoVeiculo.toString());

   return this.httpClient.post(this.fipeUrlDireto + this.fipeMarcasEndpoint, formData);
 }

 getFipeModelos(fipeRequest: FipeRequest): Observable<any> {
  let formData = new FormData();
  formData.append("codigoTabelaReferencia", fipeRequest.codigoTabelaReferencia.toString());
  formData.append("codigoTipoVeiculo", fipeRequest.codigoTipoVeiculo.toString());
  formData.append("codigoMarca", fipeRequest.codigoMarca.toString());

  return this.httpClient.post(this.fipeUrlDireto + this.fipeModelosEndpoint, formData);

 }

 getFipeAnosModelo(fipeRequest: FipeRequest): Observable<any> {
  let formData = new FormData();
  formData.append("codigoTabelaReferencia", fipeRequest.codigoTabelaReferencia.toString());
  formData.append("codigoTipoVeiculo", fipeRequest.codigoTipoVeiculo.toString());
  formData.append("codigoMarca", fipeRequest.codigoMarca.toString());
  formData.append("codigoModelo", fipeRequest.codigoModelo.toString());

  return this.httpClient.post(this.fipeUrlDireto + this.fipeAnoModeloEndpoint, formData);

 }

 getFipeValores(fipeRequest: FipeRequest): Observable<any> {
  let formData = new FormData();

  formData.append("codigoTabelaReferencia", fipeRequest.codigoTabelaReferencia.toString());
  formData.append("codigoTipoVeiculo", fipeRequest.codigoTipoVeiculo.toString());
  formData.append("codigoMarca", fipeRequest.codigoMarca.toString());
  formData.append("codigoModelo", fipeRequest.codigoModelo.toString());
  formData.append("anoModelo", fipeRequest.anoModelo.toString());
  
  formData.append("codigoTipoCombustivel", fipeRequest.codigoTipoCombustivel.toString());
  formData.append("tipoVeiculo", fipeRequest.tipoVeiculo.toString());
  formData.append("tipoConsulta", fipeRequest.tipoConsulta.toString());

  

  return this.httpClient.post(this.fipeUrlDireto + this.fipeValoresEndpoint, formData);

 }

}
