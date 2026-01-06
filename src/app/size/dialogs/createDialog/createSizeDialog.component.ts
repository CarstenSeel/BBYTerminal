import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createSizeDialog',
  templateUrl: './createSizeDialog.component.html',
  styleUrls: ['./createSizeDialog.component.scss']
})
export class CreateSizeDialogComponent implements OnInit {
    inputDate = new FormControl(new Date());
    warning = false;
    form = new FormGroup({
        size : new FormControl('', [Validators.required]),
        sizeTime : new FormControl(new Date(), [Validators.required])
      });

    constructor(public dialogRef: MatDialogRef<CreateSizeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
 
 
    ngOnInit() {
    }

    dateChange(event){
      console.log("form = ",this.form);
      this.warning = false;
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
            if((existingDates.getDate() == event.value.getDate()) && (existingDates.getMonth() == event.value.getMonth()) && (existingDates.getFullYear() == event.value.getFullYear())){
                this.warning = true;
            }
        });
    }
 
    saveChanges() {
        if (this.form.valid) {
          if(!this.warning){
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
