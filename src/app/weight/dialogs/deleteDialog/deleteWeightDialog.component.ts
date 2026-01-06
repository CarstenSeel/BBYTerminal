import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleteWeightDialog',
  templateUrl: './deleteWeightDialog.component.html',
  styleUrls: ['./deleteWeightDialog.component.scss']
})
export class DeleteWeightDialogComponent implements OnInit {
    choiceDateDefault = new FormControl();
    choiceDate: Date;
    options: any;
    form = new FormGroup({
            // size : new FormControl('', [Validators.required]),
            size : new FormControl('', [Validators.required])
        });
    constructor (
        public dialogRef: MatDialogRef<DeleteWeightDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
 
 
    ngOnInit() {
        console.log("data = ",this.data);
        this.choiceDate = new Date();
        this.choiceDateDefault.setValue(this.choiceDate);
        this.test();
    }

    choiceDateChange(event){
        this.choiceDate = event.value;
        this.test();
    }

    noDelete() {
        this.dialogRef.close();
    }

    delete(){
        if (this.form.valid) {
            var foundindex = this.data.a.data.datasets[0].data.indexOf(this.form.value.size);
            let result = {
                index: foundindex
            }
            this.dialogRef.close(result);
        } else {
            this.markFormGroupTouched(this.form);
        }
    }

    test(){
        var found = [];
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
            var stringToDelete = newE[2]+"-"+newE[1]+"-"+newE[0]+" 00:00";
            var dateToDelete = new Date(stringToDelete);
            if((dateToDelete.getDate() == this.choiceDate.getDate()) && (dateToDelete.getMonth() == this.choiceDate.getMonth()) && (dateToDelete.getFullYear() == this.choiceDate.getFullYear())){
                var index = this.data.a.data.labels.indexOf(e);
                found.push(this.data.a.data.datasets[0].data[index]);
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
