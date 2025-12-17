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

  ngOnInit() {
    this.dataShareAppointSubscription = this.dataShare.currentAppointments.subscribe(data =>{
      this.appointments = data;
      this.appointmentsBackup = this.appointments;
      this.applyDateFilter();
      //possible to filter here
    });
    this.dataShareStartDateSubscription = this.dataShare.currentStartDate.subscribe(data =>{
      this.startDate = data;
      this.applyDateFilter();
    });
    this.dataShareEndDateSubscription = this.dataShare.currentEndDate.subscribe(data =>{
      this.endDate = data;
      this.applyDateFilter();
    })
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

  applyDateFilter(){
    if(this.startDate && this.endDate){
      this.appointments = this.appointmentsBackup;
      var found = [];
      var startDateDay = this.startDate.getDate();
      var startDateMonth = this.startDate.getMonth() + 1;
      var startDateYear = this.startDate.getFullYear();
      var endDateDay = this.endDate.getDate();
      var endDateMonth = this.endDate.getMonth() + 1;
      var endDateYear = this.endDate.getFullYear();
      if(this.appointments){
        this.appointments.forEach(e =>{
          if((e.appointmentTime.getFullYear() >= startDateYear && e.appointmentTime.getMonth() + 1 > startDateMonth) || (e.appointmentTime.getMonth() + 1 == startDateMonth && e.appointmentTime.getDate() >= startDateDay)){
            if((e.appointmentTime.getFullYear() <= endDateYear && e.appointmentTime.getMonth() + 1 < endDateMonth) || (e.appointmentTime.getMonth() + 1 == endDateMonth && e.appointmentTime.getDate() <= endDateDay)){
              found.push(e);
            }
          }
        });
      }
      this.appointments = found;
      this.reArrangeAppointments();
    }
  }

  reArrangeAppointments(){
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
