import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { CodatapiService } from 'src/services/codatapi.service';
import { MyAuthService } from 'src/services/my-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'testingCoadat';
  response:any;
  earningInvoices:any;
  bankStatements:any;
  constructor(private codat:CodatapiService,private auth:MyAuthService,private router:Router){}

  ngOnInit(): void {
    // this.fetchComapny();  
    // this.fetchInvoicesEarnings();  
    // this.fetchBankStatements();
  }

  logoutApp(){
    console.log("logging out");
    this.auth.signout();
    this.router.navigate(['signin']);
    //logout and then redirect to the sign in page

    
  }

  fetchComapny() {
    return this.codat.getCompanyData().subscribe((res: {}) => {
       this.response = res;
       this.response = this.response.reports;
       console.log(this.response);
    });
  }

  fetchBankStatements(){
    return this.codat.getBankStatements().subscribe((res:{})=>{
      this.bankStatements = res;
      console.log(this.bankStatements);
    })
  }

  fetchInvoicesEarnings(){
    return this.codat.getInvoicesEarnings().subscribe((res:{})=>{
      this.earningInvoices = res;
      console.log(this.earningInvoices);
      
    })
  }

  
}
