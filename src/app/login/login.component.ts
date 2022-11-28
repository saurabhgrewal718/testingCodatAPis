import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAuthService } from 'src/services/my-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signup: FormGroup;
  restdata:any;
  error: string = '';

  constructor(public router:Router,fb: FormBuilder,private auth:MyAuthService) {
    this.signup = fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3)]]
    });
   }


  ngOnInit() {
    if(this.auth.isLoggedin){
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit(){
    if(this.signup.valid){
      console.log(this.signup.value); 
      this.auth.singin(this.signup.value.email,this.signup.value.password).then((res)=>{
        console.log(res);
        this.router.navigate(['dashboard']);
      }).catch((error)=>{
        console.log("i am getting an error");
      })
    }else{
      console.log('Please fill your Credentials first');
    }
    
  }

  gotoHome(){
    this.router.navigate(['dashboard',1,'dsh-home'])
  }

}
