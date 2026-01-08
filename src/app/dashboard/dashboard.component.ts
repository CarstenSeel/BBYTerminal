import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from '../Service/dataShare.service';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';

interface Appointment{
  title: String,
  appointmentTime: Date,
  doctor: String,
  reason: String,
  notes: String
}
interface Diaper{
  type: string,
  time: Date
}
interface Food{
  type: String,
  amount: number,
  time: Date
}
interface Sleep{
  startDate: Date,
  endDate: Date,
  duration: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  weightChartSubscription: Subscription;
  weightChart: any;
  dataChart: any;
  sizeChartSubscription: Subscription;
  sizeChart: any;
  diaperSubscription: Subscription;
  dataShareStartDateSubscription: Subscription;
  dataShareEndDateSubscription: Subscription;
  startDate: Date;
  endDate: Date;
  diaperChart: any;
  diapers: Diaper[];
  diapersbackup: Diaper[];
  constructor(
    private dataShare: DataShareService,
  ) {
    
  }

  ngOnInit() {
    this.weightChartSubscription = this.dataShare.currentWeightTestChart.subscribe(data =>{
        if(this.weightChart){
          this.weightChart.destroy();
        }
        this.dataChart = data;
        this.weightChart = new Chart("weightChart",this.dataChart);
      });

    this.sizeChartSubscription = this.dataShare.currentSizeTestChart.subscribe(data =>{
      if(this.sizeChart){
        this.sizeChart.destroy();
      }
      this.dataChart = data;
      this.sizeChart = new Chart("sizeChart",this.dataChart);
    });

    this.diaperSubscription = this.dataShare.currentDiaperTestData.subscribe(data =>{
      this.diapersbackup = data;
      this.applyDateFilter();
    });
    this.dataShareStartDateSubscription = this.dataShare.currentStartDate.subscribe(data =>{
      this.startDate = data;
      this.applyDateFilter();
    });
    this.dataShareEndDateSubscription = this.dataShare.currentEndDate.subscribe(data =>{
      this.endDate = data;
      this.applyDateFilter();
    });
  }

  applyDateFilter(){
    if(this.startDate && this.endDate){
      this.diapers = this.diapersbackup;
      var diapersFound = [];
      if(this.diapers){
        this.diapers.forEach(e=>{
          if((e.time.getTime() <= this.endDate.getTime() && e.time.getTime() >= this.startDate.getTime())){
            diapersFound.push(e);
          }
        });
      }
      this.diapers = diapersFound;
      this.createDiaperChart(diapersFound);
    }
  }

  createDiaperChart(found){
    this.diapers = this.diapersbackup;
    var urine = 0;
    var poop = 0;
    var both = 0;

    found.forEach(e =>{
      if(e.type == "Urin"){urine++;}
      if(e.type == "Stuhl"){poop++;}
      if(e.type == "Beides"){both++}
    })

    this.dataChart = {
      type: 'pie',
      data: {
        labels: ["Urin","Stuhl","Beides"],
        datasets: [
          {
            label: "Windeln",
            data: [urine,poop,both],
            backgroundColor: [
              '#00C8FAFF',
              '#00A0C8FF',
              '#2DD5FFFF'
            ],
            hoverOffset: 4
          }
        ]
      }
    };

    if(this.diaperChart){
      this.diaperChart.destroy();
    }
    this.diaperChart = new Chart("diaperChart",this.dataChart);
  }
}
