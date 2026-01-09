import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Chart } from 'chart.js';
import { CreateSizeDialogComponent } from './dialogs/createDialog/createSizeDialog.component';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';
import { DeleteSizeDialogComponent } from './dialogs/deleteDialog/deleteSizeDialog.component';

interface Size{
  size: number;
  time: Date;
}

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit, OnDestroy {
  chart: any;
  sizeSubscription: Subscription;
  dataShareStartDateSubscription: Subscription;
  dataShareEndDateSubscription: Subscription;
  startDate: Date;
  endDate: Date;
  sizes: Size[];
  sizeBackup: Size[];
  constructor(
    private dataShare: DataShareService,
    public dialog: MatDialog,
  ) { }
  ngOnDestroy(): void {
    this.sizeSubscription.unsubscribe();
    this.dataShareStartDateSubscription.unsubscribe();
    this.dataShareEndDateSubscription.unsubscribe();
    this.chart.destroy();
  }

  ngOnInit() {
    this.sizeSubscription = this.dataShare.currentSizeTestData.subscribe(data =>{
      this.sizes = data;
      this.sizeBackup = data;
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
      this.sizes = this.sizeBackup;
      var sizesFound = [];
      if(this.sizes){
        this.sizes.forEach(e=>{
          if((e.time.getTime() <= this.endDate.getTime() && e.time.getTime() >= this.startDate.getTime())){
            sizesFound.push(e);
          }
        });
      }
      this.sizes = sizesFound;
      this.createSizeChart(sizesFound);
    }
  }

  createSizeChart(sizesFound){
    if(this.chart){
      this.chart.destroy();
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

      this.chart = new Chart("SizeChart",newChart);
    }

  removeSize(){
    var a = this.chart
    let dialogRef = this.dialog.open(DeleteSizeDialogComponent, {data: {a}});
        dialogRef.afterClosed().subscribe((result) => {
          if(result){
            this.sizeBackup.splice(result.index,1);
            this.dataShare.changeSize(this.sizeBackup);
          }
        });
  }

  addSize(){
    var a = this.chart;
    let dialogRef = this.dialog.open(CreateSizeDialogComponent, {data: {a}});
        dialogRef.afterClosed().subscribe((result) =>{
          if(result){
            var newEntry = {
              size: result.size,
              time: result.sizeTime,
            };
            this.sizeBackup.push(newEntry);
            this.dataShare.changeSize(this.sizeBackup);
          }
        });
  }
}
