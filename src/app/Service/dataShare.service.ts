import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface Appointment{
  title: String,
  appointmentTime: Date,
  doctor: String,
  reason: String,
  notes: String
}

@Injectable({
    providedIn: 'root',
})

export class DataShareService{

    
    private sideBarOpen = new BehaviorSubject(null);
    private appointments = new BehaviorSubject(null);
    private startDate = new BehaviorSubject(null);
    private endDate = new BehaviorSubject(null);
    currentStartDate = this.startDate.asObservable();
    currentEndDate = this.endDate.asObservable();
    currentSideBarOpen = this.sideBarOpen.asObservable();
    currentAppointments = this.appointments.asObservable();

    constructor(){}

    changeAppointments(appointments: any){
        this.appointments.next(appointments);
    }

    changeSideBarOpen(sideBarOpen: any){
        this.sideBarOpen.next(sideBarOpen);
    }

    changeStartDate(startDate: any){
        this.startDate.next(startDate);
    }

    changeEndDate(endDate: any){
        this.endDate.next(endDate);
    }
}