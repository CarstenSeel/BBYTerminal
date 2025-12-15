import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from '../Service/dataShare.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sidebarOpen: Boolean = true;
  constructor(
    private dataShare: DataShareService,
  ) { }

  ngOnInit() {
    this.dataShare.changeSideBarOpen(this.sidebarOpen);
  }

  toggleSidebar(){
    this.sidebarOpen = this.sidebarOpen ? false : true;
    this.dataShare.changeSideBarOpen(this.sidebarOpen);
  }
}
