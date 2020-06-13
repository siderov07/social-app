import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';
import { UserStoreService } from 'src/app/store/user-store.service';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeAvatarComponent implements OnInit {
  avatarForm: FormGroup;
  selectedFile: File;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ChangeAvatarComponent>,
    private userStore: UserStoreService
    ) { }

  ngOnInit(): void {
    this.avatarForm = this.formBuilder.group({
      avatarImage: ['']
    });
  }

  onFileSelected(file: File): void {
    this.selectedFile = file;
    this.avatarForm.controls.avatarImage.patchValue(file);
  }

  onSubmit(): void {
    this.isLoading = true;
    this.avatarForm.disable();
    this.dialogRef.disableClose = true;

    const formData = new FormData();

    formData.append('avatar', this.avatarForm.controls.avatarImage.value);

    this.userService.changeAvatar(formData).subscribe(
      (onSuccess: IUser) => {
        this.userStore.setUser(onSuccess);
        this.isLoading = false;
        this.dialogRef.disableClose = true;
        this.dialogRef.close(onSuccess);
      },
      onError => {
        this.isLoading = false;
        this.avatarForm.enable();
        this.dialogRef.disableClose = true;

        this.dialog.open(MessageDialogComponent, {
          data: 'Something went wrong, please try again'
        });
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
