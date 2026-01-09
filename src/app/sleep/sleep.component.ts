import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';
import { CreateSleepDialogComponent } from './dialogs/createDialog/createSleepDialog.component';
import { DeleteSleepDialogComponent } from './dialogs/deleteDialog/deleteSleepDialog.component';

interface SleepChart{
  type: String,
  data: {
    labels: String[],
    datasets: [{
      axis: String,
      label: String,
      data: number[],
      fill: boolean,
      backgroundColor: String[],
      borderColor: String[],
      borderWidth: number
    }]
  },
  options: {
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: boolean
        }
      }]
    }
  }
}

interface Sleep{
  startDate: Date,
  endDate: Date,
  duration: number
}

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.scss']
})
export class SleepComponent implements OnInit, OnDestroy {
  chart: any;
  sleepChart: SleepChart;
  sleepSubscription: Subscription;
  dataShareStartDateSubscription: Subscription;
  dataShareEndDateSubscription: Subscription;
  sleepbackup: Sleep[];
  sleep: Sleep[];
  startDate: Date;
  endDate: Date;

  constructor(
    private dataShare: DataShareService,
    public dialog: MatDialog,
  ) { }
  ngOnDestroy(): void {
    this.sleepSubscription.unsubscribe();
    this.dataShareEndDateSubscription.unsubscribe();
    this.dataShareStartDateSubscription.unsubscribe();
    this.chart.destroy();
  }

  ngOnInit() {
    this.sleepSubscription = this.dataShare.currentSleepTestData.subscribe(data =>{
      this.sleepbackup = data;
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
      this.sleep = this.sleepbackup;
      var found = [];
      if(this.sleep){
        this.sleep.forEach(e=>{
          if((e.startDate.getTime() <= this.endDate.getTime() && e.startDate.getTime() >= this.startDate.getTime())){
            found.push(e);
          }
        });
      }
      this.sleep = found;
      this.createSleepChart(found);
    }
  }

  createSleepChart(found){
    var label = [];
    var data = [];
    var backgroundColor = [];
    var borderColor = [];
    var i = 1;
    console.log("found = ",found);
    found.forEach(e =>{
      var newLabel = "Schläfchen " + i;
      label.push(newLabel);
      data.push(e.duration);
      backgroundColor.push("rgba(0, 200, 250, 1)");
      borderColor.push("rgb(0, 200, 250)");
      i++;
    });
    this.sleepChart = {
      type: 'horizontalBar',
      data: {
        labels: label,
        datasets: [{
          axis: 'y',
          label: 'Schlafdauer in stunden',
          data: data,
          fill: false,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };
    if(this.chart){
          this.chart.destroy();
    }
    this.chart = new Chart("SleepChart",this.sleepChart);
  }

  addSleep(){
    let dialogRef = this.dialog.open(CreateSleepDialogComponent);
    dialogRef.afterClosed().subscribe((result) =>{
      if(result){
        this.sleepbackup.push(result);
        this.dataShare.changeSleep(this.sleepbackup);
      }
    });
  }

  removeSleep(){
    var sleepbackup = this.sleepbackup;
    let dialogRef = this.dialog.open(DeleteSleepDialogComponent, {data: {sleepbackup}});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.sleepbackup.splice(result.index,1);
        this.dataShare.changeSleep(this.sleepbackup);
      }
    });
  }
}
