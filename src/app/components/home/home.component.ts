import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Sort, MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { ToDoListDialogComponent } from '../to-do-list-dialog/to-do-list-dialog.component';

import * as moment from 'moment';
import * as _ from 'lodash';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    displayedColumns: string[] = ['name', 'status', 'taskDate', 'options'];
    isShowTable: boolean;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatSort) sort: MatSort;
    constructor(private db: AngularFirestore, public dialog: MatDialog) { }

    ngOnInit() {
        this.db.collection('toDoList').snapshotChanges()
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as any;
                    const id = a.payload.doc.id;
                    return {
                        id,
                        status: data.status,
                        createDate: data.createDate || moment(),
                        name: data.name,
                        taskDate: moment(data.taskDate).toDate()
                    };
                });
            }).subscribe((response: any) => {
                this.dataSource.data = _.sortBy(response, (x) => {
                    return x.name;
                });
                if (response.length > 0) {
                    this.isShowTable = true;
                } else {
                    this.isShowTable = false;
                }
                this.dataSource.sort = this.sort;
                this.dataSource.sortingDataAccessor = this.customDataSort;
            });
    }

    sortData(sort: Sort) {
        const data = this.dataSource.data;
        const array = _.sortBy(data, (x) => {
            if (_.isObject(x)) {
                return x[sort.active].name;
            }
            return x[sort.active];
        });

        if (sort.direction !== 'asc') {
            this.dataSource.data = array.reverse();
        } else {
            this.dataSource.data = array;
        }
    }

    customDataSort = (data: any, sortHeaderId: string): any => {
        if (sortHeaderId === 'id' || typeof data[sortHeaderId] === 'number') {
            return data[sortHeaderId];
        }
    }

    openModalDelete(item) {
        item.title = 'Deseja realmente excluir tarefa?';
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
            width: '800px',
            data: item
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result && result.id) {
                    this.delete(result);
                }
            });
    }

    delete(item) {
        this.db.doc(`toDoList/${item.id}`).delete()
            .catch(error => { console.log(error); })
            .then(() => {
                console.log(`Deleting question (${item.id}) in (${item.name})`);
            });
    }

    openModal(item?) {
        if (!item) {
            item = {};
        }
        const dialogRef = this.dialog.open(ToDoListDialogComponent, {
            width: '800px',
            data: item
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
