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
    currentSideBarOpen = this.sideBarOpen.asObservable();
    currentAppointments = this.appointments.asObservable();
    // sideBarOpen: Boolean = true;

    constructor(){}

    changeAppointments(appointments: any){
        this.appointments.next(appointments);
    }

    changeSideBarOpen(sideBarOpen: any){
        this.sideBarOpen.next(sideBarOpen);
    }
}