import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleteFoodDialog',
  templateUrl: './deleteFoodDialog.component.html',
  styleUrls: ['./deleteFoodDialog.component.scss']
})
export class DeleteFoodDialogComponent implements OnInit {
    choiceDateDefault = new FormControl();
    choiceDate: Date;
    options: any;
    form = new FormGroup({
            option : new FormControl('', [Validators.required])
        });
    constructor (
        public dialogRef: MatDialogRef<DeleteFoodDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
 
 
    ngOnInit() {
        console.log("data = ",this.data);
        this.choiceDate = new Date();
        this.choiceDateDefault.setValue(this.choiceDate);
        this.getOptions();
    }

    choiceDateChange(event){
        this.choiceDate = event.value;
        this.getOptions();
    }

    noDelete() {
        this.dialogRef.close();
    }

    delete(){
        if (this.form.valid) {
            var foundindex = this.data.foodBackup.indexOf(this.form.value.option);
            let result = {
                index: foundindex
            }
            this.dialogRef.close(result);
        } else {
            this.markFormGroupTouched(this.form);
        }
    }

    getOptions(){
        var found = [];
        this.data.foodBackup.forEach(e => {
            if((e.time.getDate() == this.choiceDate.getDate()) && (e.time.getMonth() == this.choiceDate.getMonth()) && (e.time.getFullYear() == this.choiceDate.getFullYear())){
                var index = this.data.foodBackup.indexOf(e);
                found.push(this.data.foodBackup[index]);
            }
        });
        this.options = found;
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
