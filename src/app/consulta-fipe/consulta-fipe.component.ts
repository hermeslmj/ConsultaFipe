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

  public listaTabelaReferencia:  TabelaReferencia[] = [];
  public listaFipeMarcas: any;
  public listaFipeModelos: any;
  public listaFipeAnosModelo: any;
  public listaFipeTipos: any;
  
  public fipeRequest = new FipeRequest();

  public fipe: Fipe;
  public loading: boolean = false;
  
  
  constructor(
    private fipeservice: FipeService
    , private toastr: ToastrService
    , private fb: FormBuilder
    
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getFipeTipos();
    this.getTabelaReferencia();
    
  }

  setLoading(state: boolean = true){
    this.loading = state;
  }

  // FUNCOES DE BUSCA DE TABELA FIPE DIRETO DA FIPE OFICIAL

  getFipeTipos() {
    this.listaFipeTipos = this.fipeservice.getFipeTipos();
  }

  getTabelaReferencia() {
    this.setLoading();
    this.fipeservice.getFipeTabelaReferencia().subscribe(
      tabela => {
        this.listaTabelaReferencia = tabela;
        
        this.setLoading(false);
      },
      error => { this.toastr.error('Não foi possível obter a tabela referência') }
    );
  }

  getFipeMarcas() {
    this.setLoading();
    this.fipeservice.getFipeMarcas(this.fipeRequest).subscribe( 
      marcas => {
        this.listaFipeMarcas = marcas;
        
        this.setLoading(false);
      },
      error => { this.toastr.error('Não foi possível obter a tabela de marcas da fipe') }
    )
  }

  getFipeModelos() {
    this.setLoading();
    this.fipeservice.getFipeModelos(this.fipeRequest).subscribe( 
      modelos => {
        this.listaFipeModelos = modelos.Modelos;
        this.setLoading(false);
      },
      error => { this.toastr.error('Não foi possível obter a tabela de modelos da fipe') }
    )
  }

  getFipeAnosModelo() {
    this.setLoading();
    this.fipeservice.getFipeAnosModelo(this.fipeRequest).subscribe( 
      anosModelo => {
        this.listaFipeAnosModelo = anosModelo;
        this.setLoading(false);
      },
      error => { this.toastr.error('Não foi possível obter a tabela de modelos da fipe') }
    )
  }

  getFipeValores() {
    
    this.setLoading();
    let anoModeloArray = this.fipeRequest.anoModelo.toString().split('-');

    this.fipeRequest.anoModelo = parseInt(anoModeloArray[0]);
    this.fipeRequest.codigoTipoCombustivel = parseInt(anoModeloArray[1]);
    this.fipeRequest.tipoVeiculo = this.listaFipeTipos.find(x =>  x.id.toString() == this.fipeRequest.codigoTipoVeiculo.toString()).nome;
    this.fipeRequest.tipoConsulta = "tradicional";



    if(this.fipeForm.get('variacao').value){
      let referencia = this.fipeRequest.codigoTabelaReferencia;
      for (let index = 0; index < 3; index++) {
        this.fipeRequest.codigoTabelaReferencia = referencia - index;
        this.fipeservice.getFipeValores(this.fipeRequest).subscribe( 
          valores => {
            this.fipe = valores;
            this.setLoading(false);
            console.log(this.fipe);
          },
          error => { this.toastr.error('Não foi possível obter os valores da fipe') }
        )
      }
    }
    else{
      this.fipeservice.getFipeValores(this.fipeRequest).subscribe( 
        valores => {
          this.fipe = valores;
          this.setLoading(false);
          console.log(this.fipe);
        },
        error => { this.toastr.error('Não foi possível obter os valores da fipe') }
      )
    }
   
    
  }


  initForm() {
    this.fipeForm = this.fb.group({
        variacao: [''],
        referencia: [''],
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
    //this.getFipe(this.fipeForm.get('tipos').value, this.fipeForm.get('marcas').value, this.fipeForm.get('modelos').value , this.fipeForm.get('anos').value);
    this.getFipeValores();
    this.openModal(template);
  }
}
