import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testpnl',
  templateUrl: './testpnl.component.html',
  styleUrls: ['./testpnl.component.scss']
})
export class TestpnlComponent implements OnInit {

  constructor() { }

  comapnyName = "Ronin Global";
  startData!:Date;
  endData!:Date;

  //company financial related
  currentCurrency:string = 'AED';
  //total revenue
  totalRevenues:number = 0;
  revenuePercentChange:number = 0;

  // net revenue
  netRevenues:number = 0;
  netRevenuePercentChange:number = 0;

  //gross revenue
  grossRevenues:number = 0;
  grossRevenuePercentChange:number = 0;

  //total expense
  totalExpenses:number = 0
  expensePercentChange:number = 0;

  //cogs
  cogs:number = 0
  cogsPercentChange:number = 0;

   //opex
   opex:number = 0
   opexPercentChange:number = 0;


  ngOnInit(): void {
  }

}
