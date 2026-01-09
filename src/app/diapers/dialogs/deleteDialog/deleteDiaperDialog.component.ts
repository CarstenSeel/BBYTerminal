import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-deleteDiaperDialog',
  templateUrl: './deleteDiaperDialog.component.html',
  styleUrls: ['./deleteDiaperDialog.component.scss']
})
export class DeleteDiaperDialogComponent implements OnInit {
    choiceDateDefault = new FormControl();
    choiceDate: Date;
    options: any;
    form = new FormGroup({
            size : new FormControl('', [Validators.required])
        });
    constructor (
        public dialogRef: MatDialogRef<DeleteDiaperDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
 
 
    ngOnInit() {
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
            var foundindex = this.data.diapersbackup.indexOf(this.form.value.size);
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
        //Find all diaper entries on given Date
        this.data.diapersbackup.forEach(e => {
            if((e.time.getDate() == this.choiceDate.getDate()) && (e.time.getMonth() == this.choiceDate.getMonth()) && (e.time.getFullYear() == this.choiceDate.getFullYear())){
                var index = this.data.diapersbackup.indexOf(e);
                found.push(this.data.diapersbackup[index]);
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
