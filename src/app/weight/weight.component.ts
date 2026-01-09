import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';
import { Chart } from 'chart.js';
import { CreateWeightDialogComponent } from './dialogs/createDialog/createWeightDialog.component';
import { DeleteWeightDialogComponent } from './dialogs/deleteDialog/deleteWeightDialog.component';

interface Weight{
  weight: number;
  time: Date;
}

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  chart: any;
  weightSubscription: Subscription;
  weights: Weight[];
  weightBackup: Weight[];
  startDate: Date;
  endDate: Date;
  dataShareStartDateSubscription: Subscription;
  dataShareEndDateSubscription: Subscription;
  constructor(
    private dataShare: DataShareService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.weightSubscription = this.dataShare.currentWeightTestData.subscribe(data =>{
      this.weights = data;
      this.weightBackup = data;
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
      this.weights = this.weightBackup;
      var weightsFound = [];
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

  createWeightChart(weightsFound){
    if(this.chart){
      this.chart.destroy();
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

    this.chart = new Chart("WeightChart",newChart);
  }

  removeSize(){
    var a = this.chart
    let dialogRef = this.dialog.open(DeleteWeightDialogComponent, {data: {a}});
        dialogRef.afterClosed().subscribe((result) => {
          if(result){
            this.weightBackup.splice(result.index,1);
            this.dataShare.changeWeight(this.weightBackup);
          }
        });
  }

  addSize(){
    var a = this.chart;
    let dialogRef = this.dialog.open(CreateWeightDialogComponent, {data: {a}});
        dialogRef.afterClosed().subscribe((result) =>{
          if(result){
            var newEntry = {
              weight: result.size,
              time: result.sizeTime
            };
            this.weightBackup.push(newEntry);
            this.dataShare.changeWeight(this.weightBackup);
          }
        });
  }
}
