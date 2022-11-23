import { Component, OnInit } from '@angular/core';
import { CodatapiService } from 'src/services/codatapi.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';  
import { NgxSpinnerService } from "ngx-spinner";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pnl',
  templateUrl: './pnl.component.html',
  styleUrls: ['./pnl.component.scss'],
  providers:[DatePipe]
})
export class PnlComponent implements OnInit {
  
  myDate = new Date();
  newDate: any;
  constructor(private codat:CodatapiService,private datePipe: DatePipe,private spinner: NgxSpinnerService) { 
    let currentDateTime =this.datePipe.transform((new Date), 'MMM/yyyy');
    console.log();
  }

  pnldata:any;
  months:any = [];
  monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  IncomeThisMonth:number=0;
  IncomePreviousMonth:number=0;
  ChangeOfIncome:number=0;
  selectedValue:string = '1';
  dur:any;
  isLoading:boolean = false;
  totalCards=["Total Revenue","Gross Revenue","Net Revenue","Total Expenses"];
  timeDuration: any = ['Javatpoint.com', 'HDTuto.com', 'Tutorialandexample.com']  
  form = new FormGroup({  
    duration: new FormControl('', Validators.required)  
  });  
    
  get f(){  
    return this.form.controls;  
  }  
    
  submit(){  
    console.log(this.form.value);  
  }  

  ngOnInit() {
    for(var i = 0; i < 6; i++) {
      this.months.push(this.monthNames[this.myDate.getMonth()] + ' ' + this.myDate.getFullYear());
      this.myDate.setMonth(this.myDate.getMonth() - 1);
    }
    this.dur = this.months;
    console.log(this.dur);
    this.newDate = new Date()
    this.selectedValue = this.monthNames[this.newDate.getMonth()] + ' ' + this.newDate.getFullYear();
    console.log(this.selectedValue);
    
    this.fetchpnl();
  }

  callApi(e:any){
    console.log(e);

  }
    
  changeDuration(e:any) {  
    console.log('e.target.value');  
  }  

  timesUp(){
    this.isLoading = false;
    //showsome Error messsage
  }

  async fetchpnl(){
    this.isLoading = true;
    (await this.codat.getPnl()).subscribe((res=>{
      this.pnldata = res;
      this.IncomeThisMonth = this.pnldata.reports[0].income.value;
      if(res!=null){
        this.isLoading = false;
      }else{
        this.timesUp();
      }
     
    }))
  }



}
