import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';
import { DeleteDialogComponent } from '../dialogs/deleteDialog.component';
import { MatDialog } from '@angular/material';

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
  appointments: Appointment[];

  constructor(
    private dataShare: DataShareService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.dataShareSubscription = this.dataShare.currentAppointments.subscribe(data =>{
      this.appointments = data;
      //possible to filter here
    });
  }

  editDialog(appoint){
    console.log("edit ", appoint);
  }

  deleteDialog(appoint){
    var name = appoint.title;
    let dialogRef = this.dialog.open(DeleteDialogComponent, {data: {name}})
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        console.log("Delete");
      }
      else{
        console.log("keep");
      }
    });
  }

  addAppointment(){
    console.log("addAppointment");
    //openDialog
  }
}
