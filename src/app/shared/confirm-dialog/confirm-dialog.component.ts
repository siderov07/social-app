import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(private dialog: MatDialogRef<ConfirmDialogComponent>) { }

  onSubmit(response: boolean): void {
    this.dialog.close(response);
  }

  closeDialog(): void {
    this.dialog.close();
  }
}
