import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PnlComponent } from './pnl/pnl.component';
import { TestpnlComponent } from './testpnl/testpnl.component';

const routes: Routes = [
  {path:'',component:AppComponent},  
  {path:'pnl',component:PnlComponent,pathMatch:'full'},
  {path:'testpnl',component:TestpnlComponent,pathMatch:'full'},
  {path:'*',component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
