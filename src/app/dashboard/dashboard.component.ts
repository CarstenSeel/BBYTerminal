import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from '../Service/dataShare.service';
import { Chart } from 'chart.js';

interface Appointment{
  title: String,
  appointmentTime: Date,
  doctor: String,
  reason: String,
  notes: String
}
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
interface Diaper{
  type: string,
  time: Date
}
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
  },
  options: {
    radius: 200
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  appointmentsTestData: Appointment[];
  sizeTestChart: Chart;
  weightTestChart: Chart;
  diaperTestData: Diaper[];
  diaperTestChart: PieChart;
  chart: any;
  constructor(
    private dataShare: DataShareService,
  ) {
    
  }

  ngOnInit() {
    // this.dataShareSubscription = this.dataShare.currentAppointments.subscribe(data =>{
    //   this.appointments = data;
    //   //possible to filter here
    // })
    this.appointmentsTestData = this.createDummyappointments(this.appointmentsTestData);
    this.dataShare.changeAppointments(this.appointmentsTestData);
    this.sizeTestChart = this.createDummySizeChart(this.sizeTestChart);
    this.dataShare.changeSizeTestChart(this.sizeTestChart);
    this.weightTestChart = this.createDummyWeightChart(this.weightTestChart);
    this.dataShare.changeWeightTestChart(this.weightTestChart);
    this.diaperTestData = this.createDummyDiaper(this.diaperTestData);
    this.dataShare.changeDiapers(this.diaperTestData);
  }



  createDummyappointments(appointmentsTestData){
    appointmentsTestData = [
      {
        title: "Termin 1",
        appointmentTime: new Date("2025-10-19T10:00:00"),
        doctor: "Dr. Müller",
        reason: "Impfung",
        notes: "Erste Impfung des Babys."
      },
      {
        title: "Termin 2",
        appointmentTime: new Date("2025-10-25T14:30:00"),
        doctor: "Dr. Schmidt",
        reason: "Kontrolluntersuchung",
        notes: "Wachstum und Entwicklung beobachten."
      },
      {
        title: "Termin 3",
        appointmentTime: new Date("2025-11-01T09:00:00"),
        doctor: "Dr. Becker",
        reason: "Ultraschall",
        notes: "Überprüfung des allgemeinen Zustands."
      },
      {
        title: "Termin 4",
        appointmentTime: new Date("2025-11-05T11:15:00"),
        doctor: "Dr. Fischer",
        reason: "Allergietest",
        notes: "Test auf mögliche Allergien bei Babys."
      },
      {
        title: "Termin 5",
        appointmentTime: new Date("2025-11-10T13:00:00"),
        doctor: "Dr. Müller",
        reason: "Hörtest",
        notes: "Prüfung des Hörvermögens des Babys."
      },
      {
        title: "Termin 6",
        appointmentTime: new Date("2025-11-15T15:00:00"),
        doctor: "Dr. Schmidt",
        reason: "Impfung",
        notes: "Zweite Impfung des Babys."
      },
      {
        title: "Termin 7",
        appointmentTime: new Date("2025-11-20T16:30:00"),
        doctor: "Dr. Becker",
        reason: "Kontrolluntersuchung",
        notes: "Überprüfung der motorischen Fähigkeiten."
      },
      {
        title: "Termin 8",
        appointmentTime: new Date("2025-11-25T08:45:00"),
        doctor: "Dr. Fischer",
        reason: "Ultraschall",
        notes: "Überprüfung der körperlichen Entwicklung."
      },
      {
        title: "Termin 9",
        appointmentTime: new Date("2025-12-01T10:30:00"),
        doctor: "Dr. Müller",
        reason: "Allergietest",
        notes: "Erneuter Test auf mögliche Allergien."
      },
      {
        title: "Termin 10",
        appointmentTime: new Date("2025-12-20T14:00:00"),
        doctor: "Dr. Schmidt",
        reason: "Hörtest",
        notes: "Kontrolle des Hörvermögens."
      }
    ];
    return appointmentsTestData;
  }

  createDummySizeChart(sizeTestChart){
    sizeTestChart = {
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
        };
    return sizeTestChart;
  }

  createDummyWeightChart(weightTestChart){
    weightTestChart = {
          type: 'line',
          data: {
            labels: ["1.6.25", "1.7.25", "1.8.25", "1.9.25", "1.10.25", "1.11.25"],
            datasets: [
              {
                label: "Gewichtverlauf",
                data: [5,6.5,7,6.8,7.7,9.6],
                borderColor: '#00c8faff',
                fill: false
              }
            ]
          },
          options: {
            aspectRatio: 2.5
          }
        };
    return weightTestChart;
  }

  createDummyDiaper(diaperTestData){
    diaperTestData = [
      {
        type: "Urin",
        time: new Date('2026-01-05T08:00:00.000Z')
      },
      {
        type: "Stuhl",
        time: new Date('2026-01-05T12:30:00.000Z')
      },
      {
        type: "Beides",
        time: new Date('2026-01-05T15:45:00.000Z')
      },
      {
        type: "Urin",
        time: new Date('2026-01-05T18:10:00.000Z')
      },
      {
        type: "Stuhl",
        time: new Date('2026-01-06T08:20:00.000Z')
      },
      {
        type: "Urin",
        time: new Date('2026-01-06T11:40:00.000Z')
      },
      {
        type: "Beides",
        time: new Date('2026-01-06T14:50:00.000Z')
      },
      {
        type: "Urin",
        time: new Date('2026-01-07T08:05:00.000Z')
      },
      {
        type: "Stuhl",
        time: new Date('2026-01-07T12:15:00.000Z')
      },
      {
        type: "Beides",
        time: new Date('2026-01-07T16:30:00.000Z')
      },
      {
        type: "Urin",
        time: new Date('2026-01-08T08:40:00.000Z')
      },
      {
        type: "Stuhl",
        time: new Date('2026-01-08T11:20:00.000Z')
      },
      {
        type: "Urin",
        time: new Date('2026-01-09T08:10:00.000Z')
      },
      {
        type: "Beides",
        time: new Date('2026-01-09T13:45:00.000Z')
      },
      {
        type: "Stuhl",
        time: new Date('2026-01-10T08:50:00.000Z')
      },
      {
        type: "Urin",
        time: new Date('2026-01-10T12:25:00.000Z')
      },
      {
        type: "Beides",
        time: new Date('2026-01-11T00:00:00.000Z')
      }
    ];
    return diaperTestData;
  }
}
