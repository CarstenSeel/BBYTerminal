import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from '../Service/dataShare.service';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

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
  
  appointmentViewDate: Date  = new Date();
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
  appointEvents: CalendarEvent[] = []; //start, title, color
  appointments: Appointment[];
  appointmentSubscription: Subscription;
  foodEvents: CalendarEvent[] = [];
  foods: Food[];
  foodSubscription: Subscription;
  foodViewDate: Date = new Date();
  sleepEvents:CalendarEvent[] = [];
  sleeps: Sleep[];
  sleepSubscription: Subscription;
  sleepViewDate: Date = new Date();
  constructor(
    private dataShare: DataShareService,
    private _router: Router,
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

    this.appointmentSubscription = this.dataShare.currentAppointments.subscribe(data =>{
      this.appointments = data;
      this.appointments.forEach(e =>{
        var color = {
          primary: 'rgba(0, 200, 250, 0.3)',
          secondary : 'rgba(0, 200, 250, 0.3)'
        }
        var event = {
          title: e.title.toString(),
          start: e.appointmentTime,
          color: color
        };
        this.appointEvents.push(event);
      });
    });

    this.foodSubscription = this.dataShare.currentFoodTestData.subscribe(data =>{
      this.foods = data;
      var days = [];
      this.foods.forEach(e =>{
        if(days.length == 0){
          days.push(e.time);
        }
        else{
          if(!days.find((element) => element.getTime() == e.time.getTime())){
            days.push(e.time);
          }
        }
      });
      days.forEach(d =>{
        var color = {
          primary: 'rgba(0, 200, 250, 0.3)',
          secondary : 'rgba(0, 200, 250, 0.3)'
        };
        var event = {
          title: 'gefüttert',
          start: d,
          color: color
        };
        this.foodEvents.push(event);
      });
    });

    this.sleepSubscription = this.dataShare.currentSleepTestData.subscribe(data =>{
      this.sleeps = data;
      var days = [];
      this.sleeps.forEach(e =>{
        var startDay = new Date(e.startDate);
        startDay.setHours(0);
        startDay.setMinutes(0);
        startDay.setSeconds(0);
        startDay.setMilliseconds(0);
        if(days.length == 0){
          days.push(startDay);
        }
        else{
          if(!days.find((element) => element.getTime() == startDay.getTime())){
            days.push(startDay);
          }
        }
      });
      days.forEach(d =>{
        var color = {
          primary: 'rgba(0, 200, 250, 0.3)',
          secondary : 'rgba(0, 200, 250, 0.3)'
        };
        var event = {
          title: 'geschlafen',
          start: d,
          color: color
        };
        this.sleepEvents.push(event);
      });
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

  appointDateMinusOneMnth(){
    this.appointmentViewDate = new Date(new Date(this.appointmentViewDate).setMonth(this.appointmentViewDate.getMonth() - 1));
  }

  appointDatePlusOneMnth(){
    this.appointmentViewDate = new Date(new Date(this.appointmentViewDate).setMonth(this.appointmentViewDate.getMonth() + 1));
  }

  sleepDateMinusOneMnth(){
    this.sleepViewDate = new Date(new Date(this.sleepViewDate).setMonth(this.sleepViewDate.getMonth() - 1));
  }

  sleepDatePlusOneMnth(){
    this.sleepViewDate = new Date(new Date(this.sleepViewDate).setMonth(this.sleepViewDate.getMonth() + 1));
  }

  foodDateMinusOneMnth(){
    this.foodViewDate = new Date(new Date(this.foodViewDate).setMonth(this.foodViewDate.getMonth() - 1));
  }

  foodDatePlusOneMnth(){
    this.foodViewDate = new Date(new Date(this.foodViewDate).setMonth(this.foodViewDate.getMonth() + 1));
  }

  appointEventClicked(event){
    this.dataShare.changeEndDate(event.event.start);
    this.dataShare.changeStartDate(event.event.start);
    this._router.navigateByUrl("/apointments");
  }

  sleepEventClicked(event){
    this.dataShare.changeStartDate(event.event.start);
    var newEndDate = new Date();
    newEndDate.setTime(event.event.start.getTime() + (3600000 * 24));
    this.dataShare.changeEndDate(newEndDate);
    this._router.navigateByUrl("/sleep");
  }

  foodEventClicked(event){
    this.dataShare.changeEndDate(event.event.start);
    this.dataShare.changeStartDate(event.event.start);
    this._router.navigateByUrl("/food");
  }

  //on destroy hinzufügen
}
