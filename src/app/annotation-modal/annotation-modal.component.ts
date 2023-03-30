import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-annotation-modal',
  templateUrl: './annotation-modal.component.html',
  styleUrls: ['./annotation-modal.component.scss']
})
export class AnnotationModalComponent {

  constructor(
    private dialogRef: MatDialogRef<AnnotationModalComponent>,
    private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    annotation: ['', Validators.required],
    image: [null]
  });

  submit(): void {
    this.dialogRef.close(this.form.value);
  }
}
