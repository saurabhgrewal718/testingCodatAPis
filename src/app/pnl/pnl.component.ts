import { Component, OnInit } from '@angular/core';
import { CodatapiService } from 'src/services/codatapi.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormBuilder} from '@angular/forms';  
import { NgxSpinnerService } from "ngx-spinner";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatePipe, formatDate } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-pnl',
  templateUrl: './pnl.component.html',
  styleUrls: ['./pnl.component.scss'],
  providers:[DatePipe]
})
export class PnlComponent implements OnInit {
  newDate: Date | undefined;
  
  constructor(private codat:CodatapiService,private datePipe: DatePipe,private fb: FormBuilder) { 
  }

  changedDate!:string | null;
  pnldata:any;
  startDate:Date = new Date();
  
  IncomeThisMonth:number=0;
  IncomePreviousMonth:number=0;
  ChangeOfIncome:any=0;

  ExpenseThisMonth:number=0;
  ExpensePreviousMonth:number=0;
  ChangeOfExpense:any=0;

  GPThisMonth:number=0;
  GPPreviousMonth:number=0;
  ChangeOfGP:any=0;

  NPThisMonth:number=0;
  NPPreviousMonth:number=0;
  ChangeOfNP:any=0;

  months:any = [];
  myDate:Date = new Date();
  monthsForLabel:any = [];
  expenseData:any = [];
  revenueData:any = [];
  monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];


  selectedValue:string = '1';
  
  dur:any;
  isLoading:boolean = false;
  totalCards=["Total Revenue","Gross Revenue","Net Revenue","Total Expenses"]; 

  ngOnInit() {
    for(var i = 0; i < 6; i++) {
      this.months.push(this.monthNames[this.myDate.getMonth()] + ' ' + this.myDate.getFullYear());
      this.monthsForLabel.push(this.monthNames[this.myDate.getMonth()]);
      this.myDate.setMonth(this.myDate.getMonth() - 1);
    }
    this.monthsForLabel = this.monthsForLabel.reverse();
   
    this.dur = this.months;
    this.newDate = new Date()
    this.selectedValue = this.monthNames[this.newDate.getMonth()] + ' ' + this.newDate.getFullYear();
    this.fetchpnl(this.datePipe.transform(this.newDate,"yyyy-MM-dd"));
   
  }

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.changedDate = this.datePipe.transform(event.value,"yyyy-MM-dd")
    console.log(this.changedDate); 
    this.fetchpnl(this.changedDate);
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements:{
      line: {
        tension:0.4
      }
    },
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: "thxv"
      }
    },
    interaction: {
      intersect: false,
    }
    
  };
  public barChartLabels: string[] = this.monthsForLabel;
  public barChartLegend: boolean = true;
  public lineChartType: ChartType = "line";
  public barChartData: any[] = [
    { data: this.revenueData, label: 'Revenue' },
    { data: this.expenseData, label: 'Expense' }
  ];

  // events
  public chartClicked(e: any): void {
      console.log(e);
  }

  public chartHovered(e: any): void {
      console.log(e);
  }

  callApi(selectedValue:any){
    console.log(selectedValue);
    
  }
    
  callDuration(e:any) {  
    console.log(e.value); 
    this.formatMyDate(e.value);
  }  

  async formatMyDate(datee:any){
    var date = new Date(Date.parse(datee));
    await this.fetchpnl(this.datePipe.transform(date,"yyyy-MM-dd"));
    if(this.monthsForLabel.length > 0){
      this.monthsForLabel = [];
      for(let m=0; m < 6; m++){
        this.monthsForLabel.push(this.monthNames[date.getMonth()]);
        date.setMonth(date.getMonth() - 1);
      }
      //reversing the array = 
      this.barChartLabels = this.monthsForLabel.reverse();

    }
    
    
  }

  async fetchpnl(mydate:any){
    this.isLoading = true;
    (await this.codat.getPnl(mydate)).subscribe((res=>{
      this.pnldata = res;

      //data for chart data
      this.revenueData = [];
      this.expenseData = [];
    
      if(res.reports.length > 0){

        for(let n=0;n<6;n++){
          this.revenueData.push(this.pnldata.reports[n].income.value);
          this.expenseData.push(this.pnldata.reports[n].expenses.value);
        }
        this.revenueData = this.revenueData.reverse();
        this.expenseData = this.expenseData.reverse()
        console.log("i am Revenue", this.revenueData);
        console.log("i am Expense", this.expenseData);
        //setting the data values in the line chart
        this.barChartData[0].data = this.revenueData;
        this.barChartData[1].data = this.expenseData;
        this.barChartData[0].label = "Revenue";
        this.barChartData[1].label = "Expense";


        this.IncomeThisMonth = parseInt(this.pnldata.reports[0].income.value);
        this.IncomePreviousMonth = this.pnldata.reports[1].income.value;
        if(this.IncomePreviousMonth > 0 && this.IncomeThisMonth > 0){
          this.ChangeOfIncome = (((this.IncomeThisMonth - this.IncomePreviousMonth)/this.IncomePreviousMonth)*100).toFixed(2);
          console.log(this.ChangeOfIncome);
        }else{
          console.log("cannot find enough data"); 
          this.ChangeOfIncome = 0;
        }

        this.ExpenseThisMonth = parseInt(this.pnldata.reports[0].expenses.value);
        this.ExpensePreviousMonth = this.pnldata.reports[1].expenses.value;
        if(this.ExpensePreviousMonth > 0 && this.ExpenseThisMonth > 0){
          this.ChangeOfExpense = (((this.ExpenseThisMonth - this.ExpensePreviousMonth)/this.ExpensePreviousMonth)*100).toFixed(2);
          console.log(this.ChangeOfExpense);
        }else{
          console.log("cannot find enough data"); 
          this.ChangeOfExpense = 0;
        }

        this.GPThisMonth = parseInt(this.pnldata.reports[0].grossProfit);
        this.GPPreviousMonth = this.pnldata.reports[1].grossProfit;
        if(this.GPPreviousMonth > 0 && this.GPThisMonth > 0){
          this.ChangeOfGP = (((this.GPThisMonth - this.GPPreviousMonth)/this.GPPreviousMonth)*100).toFixed(2);
          console.log(this.ChangeOfGP);
        }else{
          console.log("cannot find enough data"); 
          this.ChangeOfGP = 0;
        }

        this.NPThisMonth = parseInt(this.pnldata.reports[0].netProfit);
        this.NPPreviousMonth = this.pnldata.reports[1].netProfit;
        if(this.NPPreviousMonth != 0 && this.NPThisMonth != 0){
          this.ChangeOfNP = (((this.NPThisMonth - this.NPPreviousMonth)/this.NPPreviousMonth)*100).toFixed(2);
          console.log(this.ChangeOfNP);
        }else{
          console.log("cannot find enough data"); 
          this.ChangeOfExpense = 0;
        }

       
      }else{
        console.log("cannot find report data for this month");
        
      }
     
      
      if(res!=null){
        this.isLoading = false;
      }else{
        //do something
      }
     
    }))
  }



}




