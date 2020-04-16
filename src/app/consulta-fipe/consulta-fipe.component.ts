import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Tipos, Marcas, Modelos, AnoModelo, Fipe } from '../_models';
import { FipeService } from '../_services/fipe.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxLoadingComponent } from 'ngx-loading/lib/ngx-loading.component';
import { TabelaReferencia } from '../_models/tabelaReferencia';
import { FipeRequest } from '../_models/fipeRequest';


@Component({
  selector: 'app-consulta-fipe',
  templateUrl: './consulta-fipe.component.html',
  styleUrls: ['./consulta-fipe.component.css']
})
export class ConsultaFipeComponent implements OnInit {

  @ViewChild('ngxLoading', { static: false }) ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate: TemplateRef<any>;
  
  fipeForm: FormGroup;
  modalRef: BsModalRef;

  public listaTipos: Tipos[] = [];
  public listaMarcas: Marcas[] = [];
  public listaModelos: Modelos[] = [];
  public listaAnosModelo: AnoModelo[] = [];

  public listaTabelaReferencia:  TabelaReferencia[] = [];
  public listaFipeMarcas: any;

  public fipe: Fipe;
  public loading: boolean = false;
  
  
  constructor(
    private fipeservice: FipeService
    , private toastr: ToastrService
    , private fb: FormBuilder
    
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getTipos();
    this.getFipeMarcas();
  }

  getTipos() {
    this.listaTipos = this.fipeservice.getTipos();
  }

  getMarcas(tipo: string) {
    this.loading = true;
    this.fipeservice.getMarcas(tipo).subscribe(
      (marcas) => {
        this.listaMarcas = marcas;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error("Erro ao obter Marcas");
      }
    );
  }

  getModelos(tipo: string, codMarca: number) {
    this.loading = true;
    this.fipeservice.getModelos(tipo, codMarca).subscribe(
      (modelos) => {
        this.listaModelos = modelos["modelos"];
        this.listaAnosModelo = modelos["anos"];
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error("Erro ao obter Modelos");
      }
    );
  }

  getAnosModelo(tipo: string, codMarca: number, codModelo:  number) {
    this.loading = true;
    this.fipeservice.getAnosModelo(tipo, codMarca, codModelo).subscribe(
      (anosModelo) => {
        this.listaAnosModelo = anosModelo;
        this.loading = false;
        
      },
      error => {
        this.loading = false;
        this.toastr.error("Erro ao obter Ano/Modelo");
      }
    );
  }

  getFipe(tipo: string, codMarca: number, codModelo:  number, anoModelo: string)
  {
    this.loading = true;
    this.fipeservice.getFipe(tipo, codMarca, codModelo, anoModelo).subscribe(
      (fipe: Fipe) => {
        this.fipe = fipe;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error("Erro ao obter Fipe");
      }
    );
  }

  getTabelaReferencia() {
    this.fipeservice.getFipeTabelaReferencia().subscribe(
      tabela => {
        this.listaTabelaReferencia = tabela;
        console.log(tabela);
      },
      error => { this.toastr.error('Não foi possível obter a tabela referência') }
    );
  }

  getFipeMarcas() {
    let fipeRequest = new FipeRequest();

    fipeRequest.codigoTipoVeiculo = 1;
    fipeRequest.codigoTabelaReferencia = 253;

    this.fipeservice.getFipeMarcas(fipeRequest).subscribe( 
      marcas => {
        this.listaFipeMarcas = marcas;
        console.log(this.listaFipeMarcas);
      },
      error => { this.toastr.error('Não foi possível obter a tabela de marcas da fipe') }
    )
  }


  initForm() {
    this.fipeForm = this.fb.group({
        tipos: [''],
        marcas: [''],
        anos: [''],
        modelos: ['']
    });
  }

  openModal(template) {
    template.show();
  }

  limpaFipe(){
    this.fipe = new Fipe();
  }

  obterFipe(template: any){
    this.limpaFipe();
    this.getFipe(this.fipeForm.get('tipos').value, this.fipeForm.get('marcas').value, this.fipeForm.get('modelos').value , this.fipeForm.get('anos').value);
    this.openModal(template);
  }
}
