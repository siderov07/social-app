import { Component, Output, Input, Optional, OnInit } from '@angular/core';
import { validateImage } from 'src/app/validations/image-validation';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { postModalConfig } from 'src/app/core/config/constants/modals-config';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  selectedFile: File = null;
  previewUrl: string | ArrayBuffer;

  @Input () @Optional () fileUrl: string;
  @Output () emittedFile = new EventEmitter<File>();

  constructor(private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    // checks if the file url is provided, fetches the img and converts it to file
    if (this.fileUrl) {
      const blob = await fetch(this.fileUrl).then(r => r.blob());
      const file = new File([blob], 'img', {type: 'image/jpeg', lastModified: Date.now()});

      this.onFileChange(file);
    }
  }

  onFileChange(file: File): void {

    if (!file) {
      return;
    }

    const hasErrors = validateImage(file);

    if (hasErrors) {
      this.dialog.open(MessageDialogComponent, {
        data: hasErrors
      });

    } else {

      this.selectedFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);

      reader.onload = () => {
      this.previewUrl = reader.result;
      this.emittedFile.emit(this.selectedFile);
      };
    }
  }

  openSelectedImage(): void {
    this.dialog.open(ImageDialogComponent, {
      ...postModalConfig,
      data: this.previewUrl
    });
  }

  removeSelection(): void {
    this.selectedFile = null;
  }
}
