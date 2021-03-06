import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnescapePipe } from './pipes/unescape.pipe';
import { ImageDialogComponent } from './dialogs/image-dialog/image-dialog.component';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { ConvertDatePipe } from './pipes/convert-date.pipe';
import { GeoLocationService } from './services/geo-location.service';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AvatarPipe } from './pipes/avatar.pipe';

@NgModule({
  declarations: [ImageDialogComponent, UnescapePipe, MessageDialogComponent, ConfirmDialogComponent, ConvertDatePipe, DropZoneDirective,
    FileUploadComponent,
    AvatarPipe],
  imports: [CommonModule],
  exports: [UnescapePipe, MessageDialogComponent, ConvertDatePipe, FileUploadComponent, AvatarPipe],
  providers: [GeoLocationService]
})
export class SharedModule {}
