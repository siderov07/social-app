import { MatDialogConfig } from '@angular/material/dialog';

export const primaryModalConfig = new MatDialogConfig();
primaryModalConfig.width = '80%';
primaryModalConfig.maxWidth = '1100px';
primaryModalConfig.maxHeight = '95vh';
primaryModalConfig.autoFocus = false;

export const postModalConfig = new MatDialogConfig();
postModalConfig.width = 'fit-content';
postModalConfig.maxHeight = '95vh';
