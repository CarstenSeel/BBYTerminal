import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { DataShareService } from '../Service/dataShare.service';
import { CreateFoodDialogComponent } from './dialogs/createDialog/createFoodDialog.component';
import { DeleteFoodDialogComponent } from './dialogs/deleteDialog/deleteFoodDialog.component';

interface PieChart{
  type: String,
  data:{
    labels: String[],
    datasets: [{
      label: String,
      data: number[],
      backgroundColor: [
                  String,
                  String,
                  String,
                  String
                ],
      hoverOffset: number
    }]
  }
}

interface Food{
  type: String,
  amount: number,
  time: Date
}

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit, OnDestroy {
  options = [1,2,3,4,5,6,7,8,9,10,11,12];
  selected = "7";
  dailyFood = 600;
  dailyHardFood = 100;
  chart: any;
  foodChart: PieChart;
  food: Food[];
  foodBackup: Food[];
  foodSubscription: Subscription;
  dataShareStartDateSubscription: Subscription;
  dataShareEndDateSubscription: Subscription;
  startDate: Date;
  endDate: Date;
  constructor(
    private dataShare: DataShareService,
    public dialog: MatDialog,
  ) { }
  ngOnDestroy(): void { //unsubscribe all and destroy all charts when site is closed
    this.foodSubscription.unsubscribe();
    this.dataShareEndDateSubscription.unsubscribe();
    this.dataShareStartDateSubscription.unsubscribe();
    this.chart.destroy();
  }

  ngOnInit() {
    this.foodSubscription = this.dataShare.currentFoodTestData.subscribe(data =>{
      this.foodBackup = data;
      this.applyDateFilter();
    });
    this.dataShareStartDateSubscription = this.dataShare.currentStartDate.subscribe(data =>{
      this.startDate = data;
      this.applyDateFilter();
    });
    this.dataShareEndDateSubscription = this.dataShare.currentEndDate.subscribe(data =>{
      this.endDate = data;
      this.applyDateFilter();
    });
  }

  applyDateFilter(){
    if(this.startDate && this.endDate){
      this.food = this.foodBackup;
      var found = [];
      //find each food within the date range
      if(this.food){
        this.food.forEach(e=>{
          if((e.time.getTime() <= this.endDate.getTime() && e.time.getTime() >= this.startDate.getTime())){
            found.push(e);
          }
        });
      }
      this.food = found;
      this.createFoodChart(found);
    }
  }

  createFoodChart(found){
    var foodAmount = 0;
    var hardFoodAmount = 0;

    found.forEach(e =>{
      if(e.type == "Milch"){
        foodAmount = foodAmount + e.amount; //add up all drinked milk
      }
      if(e.type == "Beikost"){
        hardFoodAmount = hardFoodAmount + e.amount; //add up all hard Food
      }
    });

    //calc how many days are in the date range
    var diff = Math.abs(this.startDate.getTime() - this.endDate.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    var diffFoodAmount = 0;
    var diffHardFoodAmount = 0;
    if(diffDays <= 0){ //if 0 => one day
      diffDays = 1;
    }
    diffFoodAmount = (this.dailyFood * diffDays) - foodAmount; //calc how much milk is missing in the date range
    diffHardFoodAmount = (this.dailyHardFood * diffDays) - hardFoodAmount;//calc how much hard food is missing in the date range

    //if negativ amounts => set to zero
    if(diffFoodAmount < 0){diffFoodAmount = 0;} 
    if(diffHardFoodAmount < 0 ){diffHardFoodAmount = 0;}


    this.foodChart = {
      type: 'pie',
      data: {
        labels: ["Fehlende Trinkmenge in ml","Getrunkene Menge in ml","Fehlende Beikost in g", "Beikostmenge in g"],
        datasets: [
          {
            label: "Essen",
            data: [diffFoodAmount,foodAmount,diffHardFoodAmount,hardFoodAmount],
            backgroundColor: [
              '#00c8fa80',
              '#00c8faff',
              '#00a0c880',
              '#00a0c8ff',
            ],
            hoverOffset: 4
          }
        ]
      }
    };

    if(this.chart){
      this.chart.destroy(); //delete old food chart
    }
    this.chart = new Chart("FoodChart",this.foodChart); //create new food chart
  }
  
  selectedChange(){ //set the daily amount of hardfood and milk depending of the age of the baby
    switch( this.selected ){
      case "1":
        this.dailyFood = 600;
        this.dailyHardFood = 0;
        break;
      case "2":
        this.dailyFood = 740;
        this.dailyHardFood = 0;
        break;
      case "3":
        this.dailyFood = 810;
        this.dailyHardFood = 0;
        break;
      case "4":
        this.dailyFood = 830;
        this.dailyHardFood = 0;
        break;
      case "5":
        this.dailyFood = 735;
        this.dailyHardFood = 0;
        break;
      case "6":
        this.dailyFood = 655;
        this.dailyHardFood = 0;
        break;
      case "7":
        this.dailyFood = 600;
        this.dailyHardFood = 100;
        break;
      case "8":
        this.dailyFood = 530;
        this.dailyHardFood = 190;
        break;
      case "9":
        this.dailyFood = 490;
        this.dailyHardFood = 260;
        break;
      case "10":
        this.dailyFood = 400;
        this.dailyHardFood = 320;
        break;
      case "11":
        this.dailyFood = 335;
        this.dailyHardFood = 355;
        break;
      case "12":
        this.dailyFood = 250;
        this.dailyHardFood = 400;
        break;
    }
    this.applyDateFilter();
  }

  addFood(){
    let dialogRef = this.dialog.open(CreateFoodDialogComponent);
    dialogRef.afterClosed().subscribe((result) =>{
      if(result){
        this.foodBackup.push(result);
        this.dataShare.changeFood(this.foodBackup);
      }
    });
  }

  removeFood(){
    var foodBackup = this.foodBackup;
    let dialogRef = this.dialog.open(DeleteFoodDialogComponent, {data: {foodBackup}});
    dialogRef.afterClosed().subscribe((result) => {
      if(result){ //delete food with index from result
        this.foodBackup.splice(result.index,1);
        this.dataShare.changeFood(this.foodBackup);
      }
    });
  }
}
