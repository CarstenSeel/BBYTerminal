import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';
import { Chart } from 'chart.js';
import { DeleteDiaperDialogComponent } from './dialogs/deleteDialog/deleteDiaperDialog.component';
import { CreateDiaperDialogComponent } from './dialogs/createDialog/createDiaperDialog.component';
//interface area start
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
//interface area end
@Component({
  selector: 'app-diapers',
  templateUrl: './diapers.component.html',
  styleUrls: ['./diapers.component.scss']
})
export class DiapersComponent implements OnInit, OnDestroy {
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
  ngOnDestroy(): void { //unsubscribe all and destroy chart if site is closed
    this.diaperSubscription.unsubscribe();
    this.dataShareStartDateSubscription.unsubscribe();
    this.dataShareEndDateSubscription.unsubscribe();
    this.chart.destroy();
  }

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
        //find all diaper entries in given datespan
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

    found.forEach(e =>{ //count how many of each type
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
            data: [urine,poop,both], //fill with data from counting
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
      this.chart.destroy(); //delete old diaper chart
    }
    this.chart = new Chart("DiaperChart",this.diaperChart); //create new diaper chart
  }

  removeDiaper(){
    var diapersbackup = this.diapersbackup;
    //open dialog with all diapers as data
    let dialogRef = this.dialog.open(DeleteDiaperDialogComponent, {data: {diapersbackup}});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        //delete diaper with index from result
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
