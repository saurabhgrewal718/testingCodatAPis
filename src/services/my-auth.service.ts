import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  isLoggedin = false;
  constructor(public myauth:AngularFireAuth){
  }
  async singin(email:string,password:string){
    await this.myauth.signInWithEmailAndPassword(email,password).then((res)=>{
      this.isLoggedin = true;
      console.log(res);
    }).catch((error)=>{
      console.log(error);
    });
  }

  async singUp(email:string,password:string){
    await this.myauth.createUserWithEmailAndPassword(email,password).then((res)=>{
      this.isLoggedin = true;
      console.log(res);
    }).catch((error)=>{
      console.log(error);
    });
  }

  async signout(){
    this.isLoggedin = false;
    this.myauth.signOut();
  }
}
