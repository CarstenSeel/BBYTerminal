import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-createWeightDialog',
  templateUrl: './createWeightDialog.component.html',
  styleUrls: ['./createWeightDialog.component.scss']
})
export class CreateWeightDialogComponent implements OnInit {
    inputDate = new FormControl(new Date());
    warning = false;
    form = new FormGroup({
        size : new FormControl('', [Validators.required]),
        sizeTime : new FormControl(new Date(), [Validators.required])
      });

    constructor(public dialogRef: MatDialogRef<CreateWeightDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
 
 
    ngOnInit() {
    }

    dateChange(event){
      this.warning = false;
      //alter labels to dates
      this.data.a.data.labels.forEach(e => {
            var newE = e.split(".",3);
            if(newE[2].length == 2){
                newE[2] = "20"+newE[2];
            }
            if(newE[1].length == 1){
                newE[1]= "0"+newE[1];
            }
            if(newE[0].length == 1){
                newE[0]= "0"+newE[0];
            }
            var dateString = newE[2]+"-"+newE[1]+"-"+newE[0]+" 00:00";
            var existingDates = new Date(dateString);
            //check if new Entry Date allready exists
            if((existingDates.getDate() == event.value.getDate()) && (existingDates.getMonth() == event.value.getMonth()) && (existingDates.getFullYear() == event.value.getFullYear())){
                this.warning = true;
            }
        });
    }
 
    saveChanges() {
        if (this.form.valid) {
          if(!this.warning){ //only allow new Entry if Warning is false
            let result = {
                size:  parseInt(this.form.value.size),
                sizeTime: this.form.value.sizeTime
                };
            this.dialogRef.close(result);
          }
        } else {
            this.markFormGroupTouched(this.form);
        }
    }
 
    closeDialog(){
        this.dialogRef.close();
    }
 
    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach(control => {
          if (control instanceof FormGroup) {
            this.markFormGroupTouched(control);
          } else {
            control.markAsTouched();
          }
        });
      }
}
