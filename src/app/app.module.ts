import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxLoadingModule } from 'ngx-loading';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultaFipeComponent } from './consulta-fipe/consulta-fipe.component';

import { OrdenaFipePipe } from './_pipes/ordenaFipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConsultaFipeComponent,
    OrdenaFipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxLoadingModule.forRoot({})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
