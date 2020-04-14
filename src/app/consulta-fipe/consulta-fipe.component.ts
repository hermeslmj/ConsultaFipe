import { Component, OnInit } from '@angular/core';
import { Tipos, Marcas, Modelos, AnoModelo, Fipe } from '../_models';
import { FipeService } from '../_services/fipe.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-consulta-fipe',
  templateUrl: './consulta-fipe.component.html',
  styleUrls: ['./consulta-fipe.component.css']
})
export class ConsultaFipeComponent implements OnInit {

  fipeForm: FormGroup;
  modalRef: BsModalRef;

  public listaTipos: Tipos[] = [];
  public listaMarcas: Marcas[] = [];
  public listaModelos: Modelos[] = [];
  public listaAnosModelo: AnoModelo[] = [];
  public fipe: Fipe;
  
  
  constructor(
    private fipeservice: FipeService
    , private toastr: ToastrService
    , private fb: FormBuilder
    , private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getTipos();
  }

  getTipos() {
    this.listaTipos = this.fipeservice.getTipos();
  }

  getMarcas(tipo: string) {
    this.fipeservice.getMarcas(tipo).subscribe(
      (marcas) => {
        this.listaMarcas = marcas;
        //console.log(marcas);
      },
      error => {
        this.toastr.error("Erro ao obter Marcas");
      }
    );
  }

  getModelos(tipo: string, codMarca: number) {
    this.fipeservice.getModelos(tipo, codMarca).subscribe(
      (modelos) => {
        this.listaModelos = modelos["modelos"];
        this.listaAnosModelo = modelos["anos"];
        //console.log(modelos);
      },
      error => {
        this.toastr.error("Erro ao obter Modelos");
      }
    );
  }

  getAnosModelo(tipo: string, codMarca: number, codModelo:  number) {
    this.fipeservice.getAnosModelo(tipo, codMarca, codModelo).subscribe(
      (anosModelo) => {
        this.listaAnosModelo = anosModelo;
        //console.log(anosModelo);
      },
      error => {
        this.toastr.error("Erro ao obter Ano/Modelo");
      }
    );
  }

  getFipe(tipo: string, codMarca: number, codModelo:  number, anoModelo: string)
  {
    this.fipeservice.getFipe(tipo, codMarca, codModelo, anoModelo).subscribe(
      (fipe: Fipe) => {
        this.fipe = fipe;
        console.log(this.fipe);
      },
      error => {
        this.toastr.error("Erro ao obter Fipe");
      }
    );
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
