import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sideBarOpen: boolean;
  dataShareSubscription: Subscription;

  constructor(
    private _router: Router,
    private dataShare: DataShareService,
  ) { }

  ngOnInit() {
    this.dataShareSubscription = this.dataShare.currentSideBarOpen.subscribe(data =>{
      console.log("change detected new sidebar = ",data);
      this.sideBarOpen = data;
    });
  }

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

}
