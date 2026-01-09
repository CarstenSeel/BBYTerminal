import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-createSleepDialog',
  templateUrl: './createSleepDialog.component.html',
  styleUrls: ['./createSleepDialog.component.scss']
})
export class CreateSleepDialogComponent implements OnInit {
    form = new FormGroup({
        starttime : new FormControl(new Date(), [Validators.required]),
        endtime : new FormControl(new Date(), [Validators.required])
      });

    constructor(public dialogRef: MatDialogRef<CreateSleepDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
 
 
    ngOnInit() {
    }
 
    saveChanges() {
        if (this.form.valid) {
          //calculate duration of sleep
          var duration = ((this.form.value.endtime.getTime() - this.form.value.starttime.getTime()) / 3600000);
          let result = {
              startDate: this.form.value.starttime,
              endDate: this.form.value.endtime,
              duration: duration
              };
          this.dialogRef.close(result);
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
