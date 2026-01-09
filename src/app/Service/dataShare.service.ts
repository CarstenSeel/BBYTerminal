import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class DataShareService{

    
    private sideBarOpen = new BehaviorSubject(null);
    private appointments = new BehaviorSubject(null);
    private startDate = new BehaviorSubject(null);
    private endDate = new BehaviorSubject(null);
    private weightTestData = new BehaviorSubject(null);
    private diaperTestData = new BehaviorSubject(null);
    private foodTestData = new BehaviorSubject(null);
    private sleepTestData = new BehaviorSubject(null);
    private sizeTestData = new BehaviorSubject(null);
    currentStartDate = this.startDate.asObservable();
    currentEndDate = this.endDate.asObservable();
    currentSideBarOpen = this.sideBarOpen.asObservable();
    currentAppointments = this.appointments.asObservable();
    currentWeightTestData = this.weightTestData.asObservable();
    currentDiaperTestData = this.diaperTestData.asObservable();
    currentFoodTestData = this.foodTestData.asObservable();
    currentSleepTestData = this.sleepTestData.asObservable();
    currentSizeTestData = this.sizeTestData.asObservable();

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

    changeWeight(weightTestData: any){
        this.weightTestData.next(weightTestData);
    }

    changeDiapers(diaperTestData: any){
        this.diaperTestData.next(diaperTestData);
    }

    changeFood(foodTestData: any){
        this.foodTestData.next(foodTestData);
    }

    changeSleep(sleepTestData: any){
        this.sleepTestData.next(sleepTestData);
    }

    changeSize(sizeTestData: any){
        this.sizeTestData.next(sizeTestData);
    }
}