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

  inputTextOpened = false;
  inputImageOpened = false;
  file: any = null;

  textForm: FormGroup = this.fb.group({
    annotation: ['', Validators.required],
  });

  imageForm: FormGroup = this.fb.group({
    image: [null, Validators.required],
  });

  openTextInput(): void {
    this.inputTextOpened = true;
    this.inputImageOpened = false;
  }

  openImageInput(): void {
    this.inputImageOpened = true;
    this.inputTextOpened = false;
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }
  
  submitText(): void {
    this.dialogRef.close(this.textForm.value);
  }

  submitImage(): void {
    this.dialogRef.close({ image: this.file} );
  }
}
