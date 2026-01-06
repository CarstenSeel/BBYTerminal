import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { CreateSizeDialogComponent } from './dialogs/createDialog/createSizeDialog.component';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';
import { DeleteSizeDialogComponent } from './dialogs/deleteDialog/deleteSizeDialog.component';

interface Chart{
  type: String,
  data:{
    labels: String[],
    datasets: [{
      label: String,
      data: number[],
      borderColor: String,
      fill: boolean
    }]
  },
  options:{
    aspectRatio: number
  }
}

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {
  chart: any;
  chartSubscription: Subscription;
  testChart: Chart;
  testChartBackup: Chart;
  newChart: Chart;
  constructor(
    private dataShare: DataShareService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.chartSubscription = this.dataShare.currentSizeTestChart.subscribe(data =>{
      if(this.chart){
        this.chart.destroy();
      }
      this.testChart = data;
      this.testChartBackup = this.testChart;
      this.chart = new Chart("SizeChart",this.testChart);
    });
  }

  removeSize(){
    var a = this.testChart
    let dialogRef = this.dialog.open(DeleteSizeDialogComponent, {data: {a}});
        dialogRef.afterClosed().subscribe((result) => {
          if(result){
            console.log("delete entry ",result);
            this.newChart = this.testChart;
            this.newChart.data.datasets[0].data.splice(result.index,1);
            this.newChart.data.labels.splice(result.index,1);
            console.log("new",this.newChart);
            this.dataShare.changeSizeTestChart(this.newChart);
          }
          else{
            console.log("keep");
          }
        });
  }

  addSize(){
    var a = this.testChart;
    let dialogRef = this.dialog.open(CreateSizeDialogComponent, {data: {a}});
        dialogRef.afterClosed().subscribe((result) =>{
          if(result){
            console.log("result = ",result);
              var label = result.sizeTime.getDate() + "." + (result.sizeTime.getMonth() + 1) + "." + result.sizeTime.getFullYear();
              this.newChart = this.testChart;
              this.newChart.data.labels.push(label);
              this.newChart.data.datasets[0].data.push(result.size);
              this.dataShare.changeSizeTestChart(this.newChart);
          }
        });
  }
}
