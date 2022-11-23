import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { CodatapiService } from 'src/services/codatapi.service';

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
  constructor(private codat:CodatapiService){}

  ngOnInit(): void {
    this.fetchComapny();  
    this.fetchInvoicesEarnings();  
    this.fetchBankStatements();
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
