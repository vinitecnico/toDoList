import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { AngularFirestore } from 'angularfire2/firestore';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: 'app-to-do-list-dialog',
    templateUrl: 'to-do-list-dialog.component.html',
})
export class ToDoListDialogComponent implements OnInit {
    form: any;
    status: any;
    constructor(
        public dialogRef: MatDialogRef<ToDoListDialogComponent>,
        private formBuilder: FormBuilder,
        private formService: FormService,
        private db: AngularFirestore,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.form = formBuilder.group({
            id: null,
            name: [null, Validators.required],
            status: [null, Validators.required],
            taskDate: [moment(), Validators.required],
            createDate: moment()
        });
    }

    ngOnInit() {
        this.db.collection('status').snapshotChanges()
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as any;
                    const id = a.payload.doc.id;
                    return {
                        id,
                        name: data.name,
                    };
                });
            }).subscribe((response: any) => {
                this.status = response;
                if (this.data && this.data.id) {
                    const data = this.data;
                    if (data.taskDate) {
                        data.taskDate = moment(this.data.taskDate, 'YYYY-MM-DDTHH:mm:ssZ');
                    }
                    this.form.setValue(this.data);
                }
            });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    createOrUpdate() {
        if (!this.form.valid) {
            this.formService.validateAllFormFields(this.form);
            return;
        }

        let data = this.form.value;
        data.taskDate = data.taskDate.format();
        if (this.data && this.data.id) {
            data.createDate = moment().format();
            this.db.doc(`toDoList/${data.id}`).update(data)
                .catch(error => { console.log(error); })
                .then(() => console.log(`Deleting question (${data.id}) in (${data.name})`));
        } else {
            data = _.omit(data, ['id']);
            data.createDate = moment().format();
            this.db.collection('toDoList').add(data);
        }

        this.closeDialog();
    }
}
