import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElementDetailComponent } from './element-detail/element-detail.component';
import { ElementsComponent } from './elements/elements.component';


const routes: Routes = [
  { path: '', redirectTo: '/elements', pathMatch: 'full'},
  { path: 'element/:name', component: ElementDetailComponent },
  { path: 'elements', component: ElementsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
