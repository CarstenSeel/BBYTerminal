import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  sideBarOpen: boolean = true;
  
  constructor(
    private _router: Router
  ) { }

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
