import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from '../Service/dataShare.service';

interface Appointment{
  title: String,
  appointmentTime: Date,
  doctor: String,
  reason: String,
  notes: String
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  appointmentsTestData: Appointment[]
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
        appointmentTime: new Date("2025-12-05T14:00:00"),
        doctor: "Dr. Schmidt",
        reason: "Hörtest",
        notes: "Kontrolle des Hörvermögens."
      }
    ];
    return appointmentsTestData;
  }
}
