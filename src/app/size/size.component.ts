import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {
  chart: any;
  constructor(
  ) { }

  ngOnInit() {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("SizeChart",{
      type: 'line',
      data: {
        labels: ["1.6.25", "1.7.25", "1.8.25", "1.9.25", "1.10.25", "1.11.25"],
        datasets: [
          {
            label: "Wachstumsverlauf",
            data: [50,55,58,65,68,74],
            borderColor: 'rgb(0, 200, 250)',
            fill: false
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

}
