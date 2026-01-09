import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editDialog',
  templateUrl: './editDialog.component.html',
  styleUrls: ['./editDialog.component.scss']
})
export class EditDialogComponent implements OnInit {
    form = new FormGroup({
        title : new FormControl(this.data.dataSource.title, [Validators.required]),
        appointmentTime : new FormControl(this.data.dataSource.appointmentTime, [Validators.required]),
        doctor : new FormControl(this.data.dataSource.doctor, [Validators.required]),
        reason : new FormControl(this.data.dataSource.reason, [Validators.required]),
        notes : new FormControl(this.data.dataSource.notes)
      });

    constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
 
 
    ngOnInit() {
    }
 
    saveChanges() {
        if (this.form.valid) {
            let result = {
                title:  this.form.value.title,
                appointmentTime: this.form.value.appointmentTime,
                doctor: this.form.value.doctor,
                reason: this.form.value.reason,
                notes: this.form.value.notes
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
