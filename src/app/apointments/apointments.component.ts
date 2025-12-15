import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';
import { DeleteDialogComponent } from './dialogs/deleteDialog/deleteDialog.component';
import { MatDialog } from '@angular/material';
import { CreateDialogComponent } from './dialogs/createDialog/createDialog.component';
import { EditDialogComponent } from './dialogs/editDialog/editDialog.component';

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
    let dialogRef = this.dialog.open(EditDialogComponent, {data: {dataSource: appoint}});
    dialogRef.afterClosed().subscribe((result) =>{
      // check if dialog was saved
      if(result){
        console.log("result = ",result);
        console.log("appoint = ",appoint);
        // check if values have changed
        if(result.title != appoint.title || result.doctor != appoint.doctor || appoint.notes != result.notes || appoint.reason != result.reason || appoint.appointmentTime != result.appointmentTime){
          this.appointments[this.appointments.indexOf(appoint)] = result;
          this.dataShare.changeAppointments(this.appointments);
        }
      }
    });
  }

  deleteDialog(appoint){
    var name = appoint.title;
    let dialogRef = this.dialog.open(DeleteDialogComponent, {data: {name}});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.appointments.splice(this.appointments.indexOf(appoint),1);
      }
    });
  }

  addAppointment(){
    let dialogRef = this.dialog.open(CreateDialogComponent);
    dialogRef.afterClosed().subscribe((result) =>{
      if(result){
        this.appointments.push(result);
        this.dataShare.changeAppointments(this.appointments);
      }
    });
  }
}
