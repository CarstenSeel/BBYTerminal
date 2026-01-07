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
    private sizeTestChart = new BehaviorSubject(null);
    private weightTestChart = new BehaviorSubject(null);
    private diaperTestData = new BehaviorSubject(null);
    currentStartDate = this.startDate.asObservable();
    currentEndDate = this.endDate.asObservable();
    currentSideBarOpen = this.sideBarOpen.asObservable();
    currentAppointments = this.appointments.asObservable();
    currentSizeTestChart = this.sizeTestChart.asObservable();
    currentWeightTestChart = this.weightTestChart.asObservable();
    currentDiaperTestData = this.diaperTestData.asObservable();

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

    changeSizeTestChart(sizeTestChart: any){
        this.sizeTestChart.next(sizeTestChart);
    }

    changeWeightTestChart(weightTestChart: any){
        this.weightTestChart.next(weightTestChart);
    }

    changeDiapers(diaperTestData: any){
        this.diaperTestData.next(diaperTestData);
    }
}