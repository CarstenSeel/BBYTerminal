import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  date: FormControl;
  sideBarOpen: boolean = true;

  constructor(
    private _router: Router
  ) {
    this.date = new FormControl();
  }

  ngOnInit() {
  }

  toggleSidebar(){
    this.sideBarOpen = this.sideBarOpen ? false : true;
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
