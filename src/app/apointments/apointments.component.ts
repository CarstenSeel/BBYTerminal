import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
export class ApointmentsComponent implements OnInit, OnDestroy {
  dataShareAppointSubscription: Subscription;
  dataShareStartDateSubscription: Subscription;
  dataShareEndDateSubscription: Subscription;
  appointments: Appointment[];
  appointmentsBackup: Appointment[];
  startDate: Date;
  endDate: Date;

  constructor(
    private dataShare: DataShareService,
    public dialog: MatDialog,
  ) { }

  ngOnDestroy(): void { //unsubscribe all if site is closed
    this.dataShareAppointSubscription.unsubscribe();
    this.dataShareEndDateSubscription.unsubscribe();
    this.dataShareStartDateSubscription.unsubscribe();
  }

  ngOnInit() {
    this.dataShareAppointSubscription = this.dataShare.currentAppointments.subscribe(data =>{
      this.appointments = data;
      this.appointmentsBackup = this.appointments;
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

  editDialog(appoint){
    //open Dialog with data from appointment that should be edited
    let dialogRef = this.dialog.open(EditDialogComponent, {data: {dataSource: appoint}});
    dialogRef.afterClosed().subscribe((result) =>{
      // check if dialog was saved
      if(result){
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
    //open Dialog with name from appointment that should be deleted
    let dialogRef = this.dialog.open(DeleteDialogComponent, {data: {name}});
    dialogRef.afterClosed().subscribe((result) => {
      //if true was clicked
      if(result){
        this.appointments.splice(this.appointments.indexOf(appoint),1);
      }
    });
  }

  addAppointment(){
    let dialogRef = this.dialog.open(CreateDialogComponent);
    dialogRef.afterClosed().subscribe((result) =>{
      //if appointment was saved
      if(result){
        this.appointments.push(result);
        this.dataShare.changeAppointments(this.appointments);
      }
    });
  }

  applyDateFilter(){
    if(this.startDate && this.endDate){
      this.appointments = this.appointmentsBackup;
      var found = [];
      if(this.appointments){
        //loop through every appointment to filter appointments with the given datespan
        this.appointments.forEach(e=>{
          if((e.appointmentTime.getTime() <= this.endDate.getTime() && e.appointmentTime.getTime() >= this.startDate.getTime())){
            found.push(e);
          }
        });
      }
      this.appointments = found;
      this.reArrangeAppointments();
    }
  }

  reArrangeAppointments(){
    //sort appointments based on the appointment time
    this.appointments = this.appointments.sort((n1,n2) =>{
      if(n1.appointmentTime > n2.appointmentTime){
        return 1;
      }
      if(n1.appointmentTime < n2.appointmentTime){
        return -1;
      }
      return 0;
    });
  }
}
