import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from '../Service/dataShare.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  startDateDefault = new FormControl();
  endDateDefault = new FormControl();
  sidebarOpen: Boolean = true;
  constructor(
    private dataShare: DataShareService,
  ) { }

  ngOnInit() {
    this.dataShare.changeSideBarOpen(this.sidebarOpen);
    this.endDate = new Date();
    this.startDate = new Date();
    if(this.startDate.getMonth() > 0){
      this.startDate.setMonth(this.startDate.getMonth() - 1);
    }
    else{
      this.startDate.setFullYear(this.startDate.getFullYear() - 1);
      this.startDate.setMonth(11);
    }
    this.startDateDefault.setValue(this.startDate);
    this.endDateDefault.setValue(this.endDate);
    this.dataShare.changeStartDate(this.startDate);
    this.dataShare.changeEndDate(this.endDate);
  }

  toggleSidebar(){
    this.sidebarOpen = this.sidebarOpen ? false : true;
    this.dataShare.changeSideBarOpen(this.sidebarOpen);
  }

  startDateChange(event){
    this.startDate = event.value;
    this.dataShare.changeStartDate(this.startDate);
  }

  endDateChange(event){
    this.endDate = event.value;
    this.dataShare.changeEndDate(this.endDate);
  }
}
