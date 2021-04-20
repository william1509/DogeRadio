import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
    public confirmMessage: string;
    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
        this.confirmMessage = '';
    }

    ngOnInit(): void {
    }

}
