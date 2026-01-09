import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  sideBarOpen: boolean;
  dataShareSubscription: Subscription;

  constructor(
    private _router: Router,
    private dataShare: DataShareService,
  ) { }
  ngOnDestroy(): void { //unsubscribe all on destroy
    this.dataShareSubscription.unsubscribe();
  }

  ngOnInit() {
    this.dataShareSubscription = this.dataShare.currentSideBarOpen.subscribe(data =>{
      this.sideBarOpen = data;
    });
  }

  //navigation methods start
  moveToDashboard(){
    this._router.navigateByUrl("/dashboard");
  }

  moveToAppointments(){
    this._router.navigateByUrl("/apointments");
  }

  moveToSize(){
    this._router.navigateByUrl("/size");
  }

  moveToWeight(){
    this._router.navigateByUrl("/weight");
  }

  moveToDiapers(){
    this._router.navigateByUrl("/diapers");
  }

  moveToFood(){
    this._router.navigateByUrl("/food");
  }

  moveToSleep(){
    this._router.navigateByUrl("/sleep");
  }
  //navigation methods end

}
