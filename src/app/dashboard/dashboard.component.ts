import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from '../Service/dataShare.service';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
//Iinterface Area start
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
//Interface area end
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
  ngOnDestroy(): void { //unsubscribe all and destroy all charts when site is closed
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
      //create appointmentevent in Calendar for each appointment
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
      //find every day that the baby was fed
      this.foods.forEach(e =>{
        if(days.length == 0){ // if first entry add day to days
          days.push(e.time);
        }
        else{
          //if feeding day does not exist in days add day to days
          if(!days.find((element) => element.getTime() == e.time.getTime())){
            days.push(e.time);
          }
        }
      });
      //add calendar event for every day that the baby was fed
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
        var startDay = new Date(e.startDate); //create copy of the day where the baby slept
        startDay.setHours(0,0,0,0); //set the sleep time to 0 to filter for days
        if(days.length == 0){ // if first entry add day to days
          days.push(startDay);
        }
        else{
          //check if day the baby slept exists in days, if not add it
          if(!days.find((element) => element.getTime() == startDay.getTime())){
            days.push(startDay);
          }
        }
      });
      //add calendar event for every day the baby has slept
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

      //check if diapers inside the given timespan exist
      if(this.diapers){
        this.diapers.forEach(e=>{
          if((e.time.getTime() <= this.endDate.getTime() && e.time.getTime() >= this.startDate.getTime())){
            diapersFound.push(e);
          }
        });
      }
      this.diapers = diapersFound;
      this.createDiaperChart(diapersFound);

      //check if sizes inside the given timespan exist
      if(this.sizes){
        this.sizes.forEach(e=>{
          if((e.time.getTime() <= this.endDate.getTime() && e.time.getTime() >= this.startDate.getTime())){
            sizesFound.push(e);
          }
        });
      }
      this.sizes = sizesFound;
      this.createSizeChart(sizesFound);

      //check if weights inside the given timespan exist
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

    found.forEach(e =>{ //count how often the baby had which type in its diaper
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
            data: [urine,poop,both], //fill chart data with counted numbers from earlier
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
      this.diaperChart.destroy(); // destroy old diaper chart
    }
    this.diaperChart = new Chart("diaperChart",this.dataChart); //create new diaper chart
  }

  createSizeChart(sizesFound){
    if(this.sizeChart){
      this.sizeChart.destroy(); //destroy old sizeChart
    }
    var labels = [];
    var data = [];
    //change format of date to get the label
    sizesFound.forEach(e =>{
      var label = e.time.getDate() + "." + (e.time.getMonth() + 1) + "." + e.time.getFullYear();
      labels.push(label); //collect all labels
      data.push(e.size); //collect all data entries
    });
    var newChart = {
      type: 'line',
      data: {
        labels: labels, //fill labels with labels from above
        datasets: [
          {
            label: "Wachstumsverlauf",
            data: data, //fill data with data from above
            borderColor: 'rgb(0, 200, 250)',
            fill: false
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    };

    this.sizeChart = new Chart("sizeChart",newChart); //create new SizeChart
  }

  createWeightChart(weightsFound){
    if(this.weightChart){
      this.weightChart.destroy(); //Destroy old weightChart
    }
    var labels = [];
    var data = [];
    //change format of date to get the label
    weightsFound.forEach(e =>{
      var label = e.time.getDate() + "." + (e.time.getMonth() + 1) + "." + e.time.getFullYear();
      labels.push(label); //collect all labels
      data.push(e.weight); //collect all data
    });
    var newChart = {
      type: 'line',
      data: {
        labels: labels, //fill labels with labels from above
        datasets: [
          {
            label: "Gewichtsverlauf",
            data: data, //fill data with data from above
            borderColor: 'rgb(0, 200, 250)',
            fill: false
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    };

    this.weightChart = new Chart("weightChart",newChart); //create new weightChart
  }

  //functions to alter the calendar dates start
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
  //functions to alter the calendar dates end

  //calendar clickevent handler start
  appointEventClicked(event){
    //alter filterdates start
    var newStartDate = new Date(event.event.start);
    var newEndDate = new Date(event.event.start);
    newStartDate.setHours(0,0,0,0); //start date at 00:00
    newEndDate.setHours(23,59,59,99); //enddate at 23:59
    this.dataShare.changeEndDate(newEndDate);
    this.dataShare.changeStartDate(newStartDate);
    //alter filterdates end
    this._router.navigateByUrl("/apointments"); //change site to appointmentPage
  }

  sleepEventClicked(event){
    //alter filterdates start
    this.dataShare.changeStartDate(event.event.start);
    var newEndDate = new Date();
    newEndDate.setTime(event.event.start.getTime() + (3600000 * 24)); //enddate = startdate + 24 hours
    this.dataShare.changeEndDate(newEndDate);
    //alter filterdates end
    this._router.navigateByUrl("/sleep");
  }

  foodEventClicked(event){
    this.dataShare.changeEndDate(event.event.start); //alter filterStartDate day where food was given
    this.dataShare.changeStartDate(event.event.start); //alter filterEndDate day where food was given
    this._router.navigateByUrl("/food");
  }
  //calendar clickevent handler end
}
