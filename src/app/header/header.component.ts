import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from '../Service/dataShare.service';
import { FormControl } from '@angular/forms';

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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  startDateDefault = new FormControl();
  endDateDefault = new FormControl();
  sidebarOpen: Boolean = true;
  appointmentsTestData: Appointment[];
  sizeTestChart: Chart;
  weightTestChart: Chart;
  diaperTestData: Diaper[];
  foodTestData: Food[];
  sleepTestData: Sleep[];
  constructor(
    private dataShare: DataShareService,
  ) { }

  ngOnInit() {
    this.dataShare.changeSideBarOpen(this.sidebarOpen);
    this.endDate = new Date();
    this.startDate = new Date();
    if(this.startDate.getMonth() > 0){
      this.startDate.setMonth(this.startDate.getMonth() - 1);
    }
    else{
      this.startDate.setFullYear(this.startDate.getFullYear() - 1);
      this.startDate.setMonth(11);
    }
    this.startDateDefault.setValue(this.startDate);
    this.endDateDefault.setValue(this.endDate);
    this.dataShare.changeStartDate(this.startDate);
    this.dataShare.changeEndDate(this.endDate);
    this.appointmentsTestData = this.createDummyappointments(this.appointmentsTestData);
    this.dataShare.changeAppointments(this.appointmentsTestData);
    this.sizeTestChart = this.createDummySizeChart(this.sizeTestChart);
    this.dataShare.changeSizeTestChart(this.sizeTestChart);
    this.weightTestChart = this.createDummyWeightChart(this.weightTestChart);
    this.dataShare.changeWeightTestChart(this.weightTestChart);
    this.diaperTestData = this.createDummyDiaper(this.diaperTestData);
    this.dataShare.changeDiapers(this.diaperTestData);
    this.foodTestData = this.createDummyFood(this.foodTestData);
    this.dataShare.changeFood(this.foodTestData);
    this.sleepTestData = this.createDummySleep(this.sleepTestData);
    this.dataShare.changeSleep(this.sleepTestData);
  }

  toggleSidebar(){
    this.sidebarOpen = this.sidebarOpen ? false : true;
    this.dataShare.changeSideBarOpen(this.sidebarOpen);
  }

  startDateChange(event){
    this.startDate = event.value;
    this.dataShare.changeStartDate(this.startDate);
  }

  endDateChange(event){
    this.endDate = event.value;
    this.dataShare.changeEndDate(this.endDate);
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

  createDummyFood(foodTestData){
    foodTestData = [
      {
        type: "Milch",
        amount: 150,
        time: new Date("2026-01-05T00:00:00")
      },
      {
        type: "Beikost",
        amount: 50,
        time: new Date("2026-01-05T00:00:00")
      },
      {
        type: "Milch",
        amount: 100,
        time: new Date("2026-01-06T00:00:00")
      },
      {
        type: "Beikost",
        amount: 30,
        time: new Date("2026-01-07T00:00:00")
      },
      {
        type: "Milch",
        amount: 120,
        time: new Date("2026-01-08T00:00:00")
      },
      {
        type: "Beikost",
        amount: 40,
        time: new Date("2026-01-09T00:00:00")
      },
      {
        type: "Milch",
        amount: 80,
        time: new Date("2026-01-10T00:00:00")
      },
      {
        type: "Beikost",
        amount: 20,
        time: new Date("2026-01-05T00:00:00")
      },
      {
        type: "Milch",
        amount: 90,
        time: new Date("2026-01-06T00:00:00")
      },
      {
        type: "Beikost",
        amount: 60,
        time: new Date("2026-01-08T00:00:00")
      },
      {
        type: "Milch",
        amount: 110,
        time: new Date("2026-01-09T00:00:00")
      },
      {
        type: "Beikost",
        amount: 25,
        time: new Date("2026-01-11T00:00:00")
      },
      {
        type: "Milch",
        amount: 70,
        time: new Date("2026-01-06T00:00:00")
      },
      {
        type: "Beikost",
        amount: 35,
        time: new Date("2026-01-10T00:00:00")
      }
    ];
    return foodTestData;
  }

  createDummySleep(sleepTestData){
    sleepTestData = [
      {
        startDate: new Date("2026-01-05T20:00:00"),
        endDate: new Date("2026-01-06T02:00:00"),
        duration: 6
      },
      {
        startDate: new Date("2026-01-06T09:00:00"),
        endDate: new Date("2026-01-06T11:30:00"),
        duration: 2.5
      },
      {
        startDate: new Date("2026-01-06T14:00:00"),
        endDate: new Date("2026-01-06T16:30:00"),
        duration: 2.5
      },
      {
        startDate: new Date("2026-01-06T19:00:00"),
        endDate: new Date("2026-01-07T01:00:00"),
        duration: 6
      },
      {
        startDate: new Date("2026-01-07T09:30:00"),
        endDate: new Date("2026-01-07T12:00:00"),
        duration: 2.5
      },
      {
        startDate: new Date("2026-01-07T15:00:00"),
        endDate: new Date("2026-01-07T17:30:00"),
        duration: 2.5
      },
      {
        startDate: new Date("2026-01-07T20:00:00"),
        endDate: new Date("2026-01-08T02:30:00"),
        duration: 6.5
      },
      {
        startDate: new Date("2026-01-08T09:00:00"),
        endDate: new Date("2026-01-08T11:30:00"),
        duration: 2.5
      },
      {
        startDate: new Date("2026-01-08T14:30:00"),
        endDate: new Date("2026-01-08T17:00:00"),
        duration: 2.5
      },
      {
        startDate: new Date("2026-01-08T19:30:00"),
        endDate: new Date("2026-01-09T02:00:00"),
        duration: 6.5
      },
      {
        startDate: new Date("2026-01-09T09:30:00"),
        endDate: new Date("2026-01-09T12:00:00"),
        duration: 2.5
      },
      {
        startDate: new Date("2026-01-09T15:00:00"),
        endDate: new Date("2026-01-09T17:30:00"),
        duration: 2.5
      },
      {
        startDate: new Date("2026-01-10T20:00:00"),
        endDate: new Date("2026-01-11T02:30:00"),
        duration: 6.5
      },
      {
        startDate: new Date("2026-01-10T09:00:00"),
        endDate: new Date("2026-01-10T11:30:00"),
        duration: 2.5
      },
      {
        startDate: new Date("2026-01-11T14:00:00"),
        endDate: new Date("2026-01-11T16:30:00"),
        duration: 2.5
      }
    ];
    return sleepTestData
  }
}
