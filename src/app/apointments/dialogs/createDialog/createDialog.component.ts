import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createDialog',
  templateUrl: './createDialog.component.html',
  styleUrls: ['./createDialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
    form = new FormGroup({
        title : new FormControl('', [Validators.required]),
        appointmentTime : new FormControl(new Date(), [Validators.required]),
        doctor : new FormControl('', [Validators.required]),
        reason : new FormControl('', [Validators.required]),
        notes : new FormControl('')
      });

    constructor(public dialogRef: MatDialogRef<CreateDialogComponent>,
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
