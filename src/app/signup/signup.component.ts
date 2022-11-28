import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/services/database.service';
import { MyAuthService } from 'src/services/my-auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  
  signup: FormGroup;
  restdata:any;
  error: string = '';

  constructor(public router:Router,fb: FormBuilder,private auth:MyAuthService,private db:DatabaseService) {
    this.signup = fb.group({
      fullName:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required,Validators.email]],
      comapnyId:['',[Validators.required,Validators.minLength(3)]],
      // restPhone:[null,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password:['',[Validators.required,Validators.minLength(3)]]
    });
   }


  ngOnInit() {
  }

  onSubmit(){
    if(this.signup.valid){
      console.log(this.signup.value); 
      this.auth.singUp(this.signup.value.email,this.signup.value.password).then((res)=>{
        console.log('insdie onsubmit');
        var user = {
          'name':this.signup.value.fullName,
          'email':this.signup.value.email,
          'companyId':this.signup.value.comapnyId,
          'phone' : 'this.signup.value.fullName',
          'photoUrl':'this.signup.value.fullName',
          'address':'',
          'industry':'',
          'uid':"1",
          'onboardingDate':new Date()
        };
        this.db.addUser(user).subscribe((res)=>{
          console.log(res);
          console.log('saved the data in the db');
        });
        this.router.navigate(['dashboard']);
        console.log("i am signedup now moving to the dashboard");
      }).catch((err)=>{
        console.log(err);
      });
        // this.router.navigate(['dashboard',1,'dsh-home'])
    }else{
      alert('Please fill your Credentials first');
    }
    
  }

  gotoHome(){
    this.router.navigate(['dashboard',1,'dsh-home'])
  }

}
