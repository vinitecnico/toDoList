import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { AngularFirestore } from 'angularfire2/firestore';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: 'app-delete-confirm-dialog.component',
    templateUrl: 'delete-confirm-dialog.component.html',
})
export class DeleteConfirmDialogComponent implements OnInit {
    form: any;
    status: any;
    constructor(
        public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {}

    closeDialog(item): void {
        this.dialogRef.close(item);
    }
}
