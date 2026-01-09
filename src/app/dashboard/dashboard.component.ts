import { Component, OnDestroy, OnInit } from '@angular/core';
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

interface Size{
  size: number;
  time: Date;
}

interface Weight{
  weight: number;
  time: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  appointmentViewDate: Date  = new Date();
  weightSubscription: Subscription;
  weights: Weight[];
  weightBackup: Weight[];
  weightChart: any;
  dataChart: any;
  sizeSubscription: Subscription;
  sizes: Size[];
  sizeBackup: Size[];
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
  ngOnDestroy(): void {
    this.weightSubscription.unsubscribe();
    this.sizeSubscription.unsubscribe();
    this.sleepSubscription.unsubscribe();
    this.foodSubscription.unsubscribe();
    this.appointmentSubscription.unsubscribe();
    this.diaperSubscription.unsubscribe();
    this.dataShareStartDateSubscription.unsubscribe();
    this.dataShareEndDateSubscription.unsubscribe();
    this.diaperChart.destroy();
    this.sizeChart.destroy();
    this.weightChart.destroy();
  }

  ngOnInit() {
    this.weightSubscription = this.dataShare.currentWeightTestData.subscribe(data =>{
        this.weights = data;
        this.weightBackup = data;
        this.applyDateFilter();
      });

    this.sizeSubscription = this.dataShare.currentSizeTestData.subscribe(data =>{
      this.sizes = data;
      this.sizeBackup = data;
      this.applyDateFilter();
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
      this.sizes = this.sizeBackup;
      this.weights = this.weightBackup;
      var sizesFound = [];
      var diapersFound = [];
      var weightsFound = [];

      if(this.diapers){
        this.diapers.forEach(e=>{
          if((e.time.getTime() <= this.endDate.getTime() && e.time.getTime() >= this.startDate.getTime())){
            diapersFound.push(e);
          }
        });
      }
      this.diapers = diapersFound;
      this.createDiaperChart(diapersFound);

      if(this.sizes){
        this.sizes.forEach(e=>{
          if((e.time.getTime() <= this.endDate.getTime() && e.time.getTime() >= this.startDate.getTime())){
            sizesFound.push(e);
          }
        });
      }
      this.sizes = sizesFound;
      this.createSizeChart(sizesFound);

      if(this.weights){
        this.weights.forEach(e=>{
          if((e.time.getTime() <= this.endDate.getTime() && e.time.getTime() >= this.startDate.getTime())){
            weightsFound.push(e);
          }
        });
      }
      this.weights = weightsFound;
      this.createWeightChart(weightsFound);
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

  createSizeChart(sizesFound){
    if(this.sizeChart){
      this.sizeChart.destroy();
    }
    var labels = [];
    var data = [];
    sizesFound.forEach(e =>{
      var label = e.time.getDate() + "." + (e.time.getMonth() + 1) + "." + e.time.getFullYear();
      labels.push(label);
      data.push(e.size);
    });
    var newChart = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Wachstumsverlauf",
            data: data,
            borderColor: 'rgb(0, 200, 250)',
            fill: false
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    };

    this.sizeChart = new Chart("sizeChart",newChart);
  }

  createWeightChart(weightsFound){
    if(this.weightChart){
      this.weightChart.destroy();
    }
    var labels = [];
    var data = [];
    weightsFound.forEach(e =>{
      var label = e.time.getDate() + "." + (e.time.getMonth() + 1) + "." + e.time.getFullYear();
      labels.push(label);
      data.push(e.weight);
    });
    var newChart = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Gewichtsverlauf",
            data: data,
            borderColor: 'rgb(0, 200, 250)',
            fill: false
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    };

    this.weightChart = new Chart("weightChart",newChart);
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
    var newStartDate = new Date(event.event.start);
    var newEndDate = new Date(event.event.start);
    newStartDate.setHours(0,0,0,0);
    newEndDate.setHours(23,59,59,99);
    this.dataShare.changeEndDate(newEndDate);
    this.dataShare.changeStartDate(newStartDate);
    console.log("new Dates = ",this.startDate,this.endDate)
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
