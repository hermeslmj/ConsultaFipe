import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaFipeComponent } from './consulta-fipe/consulta-fipe.component';


const routes: Routes = [
  { path: "fipe", component: ConsultaFipeComponent },
  { path: "**", redirectTo: "fipe" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
