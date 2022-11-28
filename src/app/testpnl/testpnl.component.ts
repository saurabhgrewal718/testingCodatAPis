import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartType } from 'chart.js';
import { format } from 'path';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { CodatapiService } from 'src/services/codatapi.service';

@Component({
  selector: 'app-testpnl',
  templateUrl: './testpnl.component.html',
  styleUrls: ['./testpnl.component.scss']
})
export class TestpnlComponent implements OnInit {
 

  constructor(private datePipe:DatePipe,private _snackBar: MatSnackBar,private codat:CodatapiService) { }

  comapnyName = "Ronin Global";
  startData!:Date;
  dur:any = [];
  year:any = [];
  endData!:Date;
  currentDateOnNgInit!:Date;
  convertedCurrentDate:string|null = '';
  responseFromAPI:any;
  totalReportsAvailable:number = 0;
  reportsArray:any = [];
  finalChangeOfPercentage:any = 0;
  tempreportsPastSixMonths:any = [];
  
  //selected value for the date
  selectedValue:string = '1';
  selectedYearValue:string = "1";

  //log
  reportsPastSixMonths:any = [];

  //calculate %v change when prev - 0
  tempPrevious:number=0;
  dateToComparePreviousAndNextMonth:any;

  //company financial related
  currentCurrency:string = 'AED';
  //total revenue
  totalRevenues:number = 0;
  totalPreviousRevenue:number = 0;
  revenuePercentChange:any = 0;

  // net revenue
  netRevenues:number = 0;
  netPreviousRevenue:number = 0;
  netRevenuePercentChange:number = 0;

  //gross revenue
  grossRevenues:number = 0;
  grossPreviousRevenue:number=0;
  grossRevenuePercentChange:number = 0;

  //total expense
  totalExpenses:number = 0;
  totalPreviousExpense:number = 0;
  expensePercentChange:number = 0;

  //cogs
  cogs:number = 0
  previousCogs:number = 0;
  cogsPercentChange:number = 0;

  //opex
  opex:number = 0
  previousOpex:number = 0;
  opexPercentChange:number = 0;

  //chart variables
  monthsForLabel:any = [];
  revenueData:any = [];
  expenseData:any = [];
  labelData:any = [];
  netRevenueData:any = [];
  opexData:any = [];
  cogsData:any = [];

  //chartdata
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
        text: "Revenue V/S Expense"
      }
    },
    interaction: {
      intersect: false,
    }
  };
   public barChartOptionsNetRevenue: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements:{
      line: {
        tension:0.4,
        borderWidth:8,
        borderCapStyle:"rounded"
      }
    },
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: "Net Revenue"
      }
    },
    interaction: {
      intersect: false,
    }
  };
  public barChartOptionsOPEXvsCOGS: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements:{
      line: {
        tension:0.4,
        // borderWidth:6,
        borderCapStyle:"rounded",
        // borderColor:"red"
      }
    },
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: "Net Revenue"
      }
    },
    interaction: {
      intersect: false,
    }
  };
  public barChartLabels: string[] = [];
  public barChartLegend: boolean = true;
  public lineChartType: ChartType = "line";
  public barChartData: any[] = [
    { data: [], label: 'Revenue' },
    { data: [], label: 'Expense' }
  ]
  public netRevenueDatas: any[] = [
    { data: [], label: 'Net Revenue' }
  ]
  public opexVscogsDatas: any[] = [
    { data: [], label: 'Opex' },
    { data: [], label: 'Cogs' },
  ]


  ngOnInit(): void {

    //check weather you are logged in or not

    //if not logged in send back to sign in page

    // steps to show card after the ngOnInit method-     
    // 1) get the current date

    this.currentDateOnNgInit = new Date()

    // 2) format the date in yyyy-mm-dd 
    this.convertedCurrentDate = this.datePipe.transform(this.currentDateOnNgInit,"yyyy-MM-dd");

    this.dur = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    this.year = ["2022","2021","2020","2019","2018"];

     // 3) set this date as the current selector in the dropdown

    this.selectedValue = this.datePipe.transform(this.currentDateOnNgInit,"MMM")!;
    this.selectedYearValue = this.datePipe.transform(this.currentDateOnNgInit,"YYYY")!;

    // TODO: solve for the future date showing data problem -
    // 1) dont let them select the time which is in future


    // 4) call the api with current date, our api takes the yyyy-mm-dd format and get the response from the api and save it in a variable
    this.fetchCardsChartsData(`${this.selectedYearValue}-${this.selectedValue}-01`);
    //setting the data inside this fetch function
  }

  callDuration(e:any) {  
    console.log(e.value); 
  }  

  makeTheDataZero(){
    this.totalRevenues= 0;
    this.totalPreviousRevenue = 0;
    this.revenuePercentChange = 0;

    //making chart zero
    this.revenueData = [];
    this.expenseData = [];
    this.labelData = [];
    this.netRevenueData = [];
    this.opexData = [];

    //setting the data in the chart
    this.barChartData[0].data = this.revenueData;
    this.barChartData[1].data = this.expenseData;
    this.netRevenueDatas[0].data = this.netRevenueData;
    this.opexVscogsDatas[0].data = this.opexData;
    this.opexVscogsDatas[1].data = this.cogsData;

    // net revenue
    this.netRevenues = 0;
    this.netPreviousRevenue = 0;
    this.netRevenuePercentChange = 0;

    //gross revenue
    this.grossRevenues = 0;
    this.grossPreviousRevenue=0;
    this.grossRevenuePercentChange = 0;

    //total expense
    this.totalExpenses = 0;
    this.totalPreviousExpense = 0;
    this.expensePercentChange = 0;

    //cogs
    this.cogs = 0
    this.previousCogs = 0;
    this.cogsPercentChange = 0;

    //opex
    this.opex = 0
    this.previousOpex = 0;
    this.opexPercentChange = 0;
  }

  isOdd(element:any) {
    return element == element;
  }

  
  searchNewDate(monthh:any,yearr:any){
    if(monthh == "1" || yearr == "1"){
      alert("Please Select Month and Year");
    }else{
      var monthIndex = 0;
      for(let i=0;i<12;i++){
        console.log(i+1,this.dur[i]);
         if(this.dur[i]==monthh){
           monthIndex = i+1
         }
      }
      this.fetchCardsChartsData(`${yearr}-${monthIndex}-01`);     
      console.log(monthh,yearr);
    }      
  }

  calculateExpenseRevenueChartsData(res:any){
      //empty the arrays in case they already have some data
      this.revenueData = [];
      this.expenseData = [];
      this.labelData = [];
      this.netRevenueData = [];
      this.opexData = [];

      //loop through the values of the reports and find the values for the chart
      for(let i in res){
        this.revenueData.push(res[i].income.value);
        this.expenseData.push(res[i].expenses.value);
        this.labelData.push(this.datePipe.transform(res[i].fromDate,"MMM"));
        this.netRevenueData.push(res[i].netProfit);
        this.opexData.push(res[i].expenses.value);
        this.cogsData.push(res[i].costOfSales.value);
      }

      //reversing all our arrys to show the data in a proper format
      this.revenueData = this.revenueData.reverse();
      this.expenseData = this.expenseData.reverse();
      this.labelData = this.labelData.reverse();
      this.netRevenueData = this.netRevenueData.reverse();
      this.opexData = this.opexData.reverse();
      this.cogsData = this.cogsData.reverse();

      //setting the data in the chart
      this.barChartData[0].data = this.revenueData;
      this.barChartData[1].data = this.expenseData;
      this.netRevenueDatas[0].data = this.netRevenueData;
      this.opexVscogsDatas[0].data = this.opexData;
      this.opexVscogsDatas[1].data = this.cogsData;

      //calculate the labels for the chart
      this.barChartLabels = this.labelData
  }

  async fetchCardsChartsData(currentDate:string){
    //fetch the api here
    console.log(currentDate);
    
    (await this.codat.getPnl(currentDate)).subscribe((res=>{
        this.responseFromAPI = res;        
        console.log(this.responseFromAPI);
        
        this.reportsPastSixMonths = this.tempreportsPastSixMonths;
        if(this.responseFromAPI.reports.length > 0){
          for(let m=0;m<6;m++){
            this.tempreportsPastSixMonths.push(this.responseFromAPI.reports[m].costOfSales.value);
          }
           // 9) show how many reports avaibale (just for testing --- len of RepositionScrollStrategy, instead of all the json data)
           this.totalReportsAvailable = this.responseFromAPI.reports.length;
           this.reportsArray = this.responseFromAPI.reports;
           this.calculateRevenueValues(this.reportsArray);
           this.calculateTotalExpenses(this.reportsArray);
           this.calculateNetRevenue(this.reportsArray);
           this.calculateGrossRevenue(this.reportsArray);
           this.calculateCOGS(this.reportsArray);
           this.calculateOPEX(this.reportsArray);
           //functions for the charts
           this.calculateExpenseRevenueChartsData(this.reportsArray);
        }else{
          //better to show some snackbar/tpast for thiis error message
          console.log("no reports found for current date");
          this.makeTheDataZero();
          this.openSnackBar("Cannot Find Data For Selected Items", "Close");
        }

    }));
   
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  percentChangeCalculator(current:number,previous:number,res:any,need:string){
    if(current !=0 && previous!= 0){
      return (((current - previous)/previous)*100).toFixed(2);
    }else if(current ==0 && previous!= 0){
      return -100;
    }else{
      this.finalChangeOfPercentage = this.calculatePercentChangeWhenPreviousIsZero(current,res,need);
      if(this.finalChangeOfPercentage != 1){
        return this.finalChangeOfPercentage;
      }
      
      return null;
    }    
  }

  calculatePercentChangeWhenPreviousIsZero(current:number,res:any,need:string){
    for(let i=2;i<6;i++){
      if(need == "totalRevenue"){
        this.tempPrevious = res[i].income.value;
      }else if(need == "netRevenue"){
        this.tempPrevious = res[i].netProfit;
      }else if(need == "grossRevenue"){
        this.tempPrevious = res[i].grossProfit;
      }else if(need == "totalExpense"){
        this.tempPrevious = res[i].expenses.value;
      }
      
      if(this.tempPrevious != 0){
        return this.percentChangeCalculator(current,this.tempPrevious,res,need);
      }
    }
    console.log("cannot find any previous record");
    return 1;
    
  }
  

  calculateRevenueValues(res:any[]){
      console.log("my reports are: ",res);
      this.totalRevenues = res[0].income.value;
      this.totalPreviousRevenue = res[1].income.value;
      this.revenuePercentChange = this.percentChangeCalculator(this.totalRevenues,this.totalPreviousRevenue,res,"totalRevenue");
  }

  calculateTotalExpenses(res:any[]){
    this.totalExpenses = res[0].expenses.value;
    this.totalPreviousExpense = res[1].expenses.value;
    this.expensePercentChange = this.percentChangeCalculator(this.totalExpenses,this.totalPreviousExpense,res,"totalExpense");
  }

  calculateNetRevenue(res:any[]){
    this.netRevenues = res[0].netProfit;
    this.netPreviousRevenue = res[1].netProfit;
    this.netRevenuePercentChange = this.percentChangeCalculator(this.netRevenues,this.netPreviousRevenue,res,"netRevenue");
  }

  calculateGrossRevenue(res:any[]){
    this.grossRevenues = res[0].grossProfit;
    this.grossPreviousRevenue = res[1].grossProfit;
    this.grossRevenuePercentChange = this.percentChangeCalculator(this.grossRevenues,this.grossPreviousRevenue,res,"grossRevenue");
  }

  calculateCOGS(res:any[]){
    this.cogs = res[0].costOfSales.value;
    this.previousCogs = res[1].costOfSales.value;
    this.cogsPercentChange = this.percentChangeCalculator(this.cogs,this.previousCogs,res,"grossRevenue");
  }

  calculateOPEX(res:any[]){
    this.opex = res[0].expenses.value;
    this.previousOpex = res[1].expenses.value;
    this.opexPercentChange = this.percentChangeCalculator(this.opex,this.previousOpex,res,"grossRevenue");
  }

}
