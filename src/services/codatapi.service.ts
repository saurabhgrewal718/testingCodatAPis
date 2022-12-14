import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodatapiService {

  constructor(private http:HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Basic RkVqUU1mQ0lYcUZYOFpqUVA5VXE1UzZYbjF1dEpUWVN2STlCRDFBWQ==',
      "Access-Control-Allow-Origin": "*"
    }),
  };
  endpoint = "https://api.codat.io"; 

  getData(){
    this.http.get("/companies/37aca907-fa24-4505-8774-32d4c137c1a4/data/financials/balanceSheet?endMonth=2020-12-01T00%3A00%3A00&periodLength=1&periodsToCompare=6",this.httpHeader).subscribe((res)=>{
      return res;
    });
  }

  getCompanyData(): Observable<any> {
    return this.http
      .get<any>("/companies/37aca907-fa24-4505-8774-32d4c137c1a4/data/financials/balanceSheet?endMonth=2020-12-01T00%3A00%3A00&periodLength=1&periodsToCompare=12",this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  getInvoicesEarnings(): Observable<any> {
    return this.http
        .get<any>("/companies/37aca907-fa24-4505-8774-32d4c137c1a4/data/invoices?page=1&pageSize=20",this.httpHeader)
        .pipe(retry(1), catchError(this.processError));
  }

  getBankStatements(): Observable<any> {
    return this.http
        .get<any>("/companies/37aca907-fa24-4505-8774-32d4c137c1a4/connections/a7dad48f-52b3-4745-803c-c902c3c1e4fc/data/bankAccounts/562555f2-8cde-4ce9-8203-0363922537a4/bankTransactions?page=1&pageSize=20",this.httpHeader)
        .pipe(retry(1), catchError(this.processError));
  }


  async getPnl(myDate:any): Promise<Observable<any>> {
    if(myDate!=null){
      return await this.http
      .get<any>(`http://ec2-3-110-165-125.ap-south-1.compute.amazonaws.com:3000/getAPIResponse/${myDate}`,this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
    }else{
      var myNewDate = new Date();
      return await this.http
      .get<any>(`http://ec2-3-110-165-125.ap-south-1.compute.amazonaws.com:3000/getAPIResponse/${myNewDate}`,this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
    }

    // http://localhost:9092/codatpnl 
    // .get<any>(`/companies/37aca907-fa24-4505-8774-32d4c137c1a4/data/financials/profitAndLoss?periodLength=1&periodsToCompare=12&startMonth=${myNewDate}%20`,this.httpHeader)
    
    
   
  }

  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }
}
