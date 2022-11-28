import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PnlComponent } from './pnl/pnl.component';
import { SignupComponent } from './signup/signup.component';
import { TestpnlComponent } from './testpnl/testpnl.component';

const routes: Routes = [
  { path:'', redirectTo: 'signin', pathMatch: 'full' }, 
  {path:'pnl',component:PnlComponent,pathMatch:'full'},
  {path:'dashboard',component:TestpnlComponent,pathMatch:'full'},
  {path:'signin',component:LoginComponent,pathMatch:'full'},
  {path:'signup',component:SignupComponent,pathMatch:'full'},
  {path:'*',component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
