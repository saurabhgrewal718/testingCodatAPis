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
  monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];


  selectedValue:string = '1';
  
  dur:any;
  isLoading:boolean = false;
  totalCards=["Total Revenue","Gross Revenue","Net Revenue","Total Expenses"]; 

  ngOnInit() {
    for(var i = 0; i < 6; i++) {
      this.months.push(this.monthNames[this.myDate.getMonth()] + ' ' + this.myDate.getFullYear());
      this.myDate.setMonth(this.myDate.getMonth() - 1);
    }
    this.dur = this.months;
    console.log(this.dur);
    this.newDate = new Date()
    console.log(this.newDate);
    this.selectedValue = this.monthNames[this.newDate.getMonth()] + ' ' + this.newDate.getFullYear();
    console.log(this.selectedValue);

    const COLORS = [
      '#4dc9f6',
      '#f67019',
      '#f53794',
      '#537bc4',
      '#acc236',
      '#166a8f',
      '#00a950',
      '#58595b',
      '#8549ba'
    ];
    const mychart = new Chart("mychart", {
      type: 'line',
      data: {
        labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun'],
        datasets: [
          {
            label: 'Dataset',
            data: [12, 23, 34, 5,54,43],
            borderColor: COLORS[0],
            backgroundColor: COLORS[1],
            fill: false
          },
          {
            label: 'Dataset',
            data: [122, 233, 34, -5,-54,63],
            borderColor: COLORS[4],
            backgroundColor: COLORS[3],
            fill: false
          }
        ]
      },
      options: {
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
      },
    });

    const mychart2 = new Chart("mychart2", {
      type: 'line',
      data: {
        labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun'],
        datasets: [
          {
            label: 'Dataset',
            data: [12, 23, 34, 5,54,43],
            borderColor: COLORS[0],
            backgroundColor: COLORS[1],
            fill: false
          }
        ]
      },
      options: {
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
      },
    });

    const mychart3 = new Chart("mychart3", {
      type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets:[
      {
        label: 'Dataset 1',
        data: [12, -19, -3, 5, -2, -3],
        borderColor: COLORS[3],
        backgroundColor: COLORS[4],
      },
      {
        label: 'Dataset 2',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: COLORS[5],
        backgroundColor: COLORS[1],
      }
    ]},
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    }
  },
    });

    const mychart4 = new Chart("mychart4", {
      type: 'pie',
      data: {labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      datasets: [
        {
          label: 'Dataset 1',
          data:[12, 19, 3, 5, 2, 3] ,
          backgroundColor: [
            '#4dc9f6',
            '#f67019',
            '#f53794',
            '#537bc4',
            '#acc236',
            '#166a8f',
            '#00a950',
            '#58595b',
            '#8549ba'
          ],
        }
      ]},
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Pie Chart'
          }
        }
      },
    
    });
     
  }

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.changedDate = this.datePipe.transform(event.value,"yyyy-MM-dd")
    console.log(this.changedDate); 
    this.fetchpnl(this.changedDate);
  }

  callApi(selectedValue:any){
    console.log(selectedValue);
    
  }
    
  callDuration(e:any) {  
    console.log(e.value); 
    this.formatMyDate(e.value); 
  }  

  formatMyDate(datee:any){
    const date = new Date(Date.parse(datee));
    this.fetchpnl(this.datePipe.transform(date,"yyyy-MM-dd"));
  }

  async fetchpnl(mydate:any){
    this.isLoading = true;
    (await this.codat.getPnl(mydate)).subscribe((res=>{
      this.pnldata = res;
      console.log("i am pnl data", this.pnldata);
      
      if(res.reports.length > 0){
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




