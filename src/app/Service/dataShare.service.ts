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

    

    private appointments = new BehaviorSubject(null);
    currentAppointments = this.appointments.asObservable();

    constructor(){}

    changeAppointments(appointments: any){
        console.log("change detected ",appointments);
        this.appointments.next(appointments);
    }
}