import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';
import { Chart } from 'chart.js';
import { DeleteDiaperDialogComponent } from './dialogs/deleteDialog/deleteDiaperDialog.component';
import { CreateDiaperDialogComponent } from './dialogs/createDialog/createDiaperDialog.component';

interface PieChart{
  type: String,
  data:{
    labels: String[],
    datasets: [{
      label: String,
      data: number[],
      backgroundColor: [
                  String,
                  String,
                  String
                ],
      hoverOffset: number
    }]
  }
}

interface Diaper{
  type: string,
  time: Date
}

@Component({
  selector: 'app-diapers',
  templateUrl: './diapers.component.html',
  styleUrls: ['./diapers.component.scss']
})
export class DiapersComponent implements OnInit {
  chart: any;
  diaperSubscription: Subscription;
  dataShareStartDateSubscription: Subscription;
  dataShareEndDateSubscription: Subscription;
  diapersbackup: Diaper[];
  diapers: Diaper[];
  startDate: Date;
  endDate: Date;
  diaperChart: PieChart;
  constructor(
    private dataShare: DataShareService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
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
      var found = [];
      if(this.diapers){
        this.diapers.forEach(e=>{
          if((e.time.getTime() <= this.endDate.getTime() && e.time.getTime() >= this.startDate.getTime())){
            found.push(e);
          }
        });
      }
      this.diapers = found;
      this.createDiaperChart(found);
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

    this.diaperChart = {
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

    if(this.chart){
      this.chart.destroy();
    }
    this.chart = new Chart("DiaperChart",this.diaperChart);
  }

  removeDiaper(){
    var diapersbackup = this.diapersbackup;
    let dialogRef = this.dialog.open(DeleteDiaperDialogComponent, {data: {diapersbackup}});
        dialogRef.afterClosed().subscribe((result) => {
          if(result){
            this.diapersbackup.splice(result.index,1);
            this.dataShare.changeDiapers(this.diapersbackup);
          }
        });
  }

  addDiaper(){
    let dialogRef = this.dialog.open(CreateDiaperDialogComponent);
        dialogRef.afterClosed().subscribe((result) =>{
          if(result){
            this.diapersbackup.push(result);
            this.dataShare.changeDiapers(this.diapersbackup);
          }
        });
  }
}
