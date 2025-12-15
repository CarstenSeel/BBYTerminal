import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';

interface Appointment{
  title: String,
  appointmentTime: Date,
  doctor: String,
  reason: String,
  notes: String
}

@Component({
  selector: 'app-apointments',
  templateUrl: './apointments.component.html',
  styleUrls: ['./apointments.component.scss']
})
export class ApointmentsComponent implements OnInit {

  dataShareSubscription: Subscription;
  dataShares: any;
  appointments: Appointment[];

  constructor(
    private dataShare: DataShareService,
  ) { }

  ngOnInit() {
    this.dataShareSubscription = this.dataShare.currentAppointments.subscribe(data =>{
      console.log("change detected new appointments = ",data);
      this.appointments = data;
      //possible to filter here
    });
  }

  editDialog(appoint){
    console.log("edit ", appoint);
  }

  deleteDialog(appoint){
    console.log("delete ", appoint);
  }

  addAppointment(){
    console.log("addAppointment");
    //openDialog
  }
}
