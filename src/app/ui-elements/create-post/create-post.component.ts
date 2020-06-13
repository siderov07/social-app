import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';
import { PostsService } from 'src/app/core/services/posts.service';
import { IPost } from 'src/app/core/entities/posts/post.interface';
import { GeoLocationService } from 'src/app/shared/services/geo-location.service';
import { IGeoLocation } from 'src/app/shared/entities/geoLocation/geoLocation.interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss', '../../../styles/ng-modificators/_mat-select.scss']
})
export class CreatePostComponent implements OnInit {
  selectedFile: File;
  postForm: FormGroup;
  showLocation = false;
  fileUrl: string;
  formMode = 'Create a post';
  isLoading = false;

  constructor(
      private fb: FormBuilder,
      private dialog: MatDialog,
      private dialogRef: MatDialogRef<CreatePostComponent>,
      private postsService: PostsService,
      private geoLocationService: GeoLocationService,
      @Optional() @Inject(MAT_DIALOG_DATA) private postToEdit: IPost
    ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      public: ['false'],
      image: [''],
      location: [''],
      description: ['']
    });

    // checks if postToEdit is provided
    if (this.postToEdit) {
      this.formMode = 'Edit post';

      this.postForm.controls.public.patchValue(String(this.postToEdit.public));
      this.postForm.controls.description.patchValue(unescape(this.postToEdit.description));
      this.fileUrl = this.postToEdit.image.directLink;

      if (this.postToEdit.location !== '') {
        this.postForm.controls.location.patchValue(this.postToEdit.location);
        this.showLocation = true;
      }
    }

  }

  updateDescription(description: string): void {
    this.postForm.controls.description.patchValue(description);
  }

  onSubmit(): void {
    this.isLoading = true;
    this.postForm.disable();
    this.dialogRef.disableClose = true;

    const formData = new FormData();

    const description = escape(this.postForm.get('description').value);

    formData.append('description', description);
    formData.append('public', this.postForm.get('public').value);
    formData.append('image', this.selectedFile);
    formData.append('location', this.postForm.get('location').value);

    this.postsService.createPost(formData).subscribe(
      (onSuccess: IPost) => {
        this.isLoading = false;
        this.postForm.enable();

        this.postForm.reset();
        this.selectedFile = null;
        this.dialogRef.close(onSuccess);

        if (this.postToEdit) {
          this.postsService.deletePost(this.postToEdit.id).subscribe();
        }
     },
    (onError) => {
      this.isLoading = false;
      this.postForm.enable();
      this.dialogRef.disableClose = false;

      this.dialog.open(MessageDialogComponent, {
        data: 'Something went wrong, please try again'
      });
    });
  }

  toggleLocation(): void {
    this.showLocation = !this.showLocation;

    if (this.showLocation) {
      this.setGeoLocation();
    } else {
      this.postForm.get('location').patchValue('');
    }
  }

  setGeoLocation(): void {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.geoLocationService.getCurrentLocation(latitude, longitude).subscribe((result: IGeoLocation) => {
          this.postForm.get('location').patchValue(result.principalSubdivision);
        });
      });
  }

  onFileSelected(file: File): void {
    this.selectedFile = file;
    this.postForm.controls.image.patchValue(this.selectedFile);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
