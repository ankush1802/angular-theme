import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IManageEntityDialogData } from '../entity.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-entity',
  templateUrl: './manage-entity.component.html',
  styleUrls: ['./manage-entity.component.scss'],
})
export class ManageEntityComponent implements OnInit, OnDestroy {
  public subscription$ = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IManageEntityDialogData,
    public dialog: MatDialogRef<ManageEntityComponent>,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    //this.appCodeUpdate = this.data.item.m_strReportApp;
  }

  ngOnDestroy() {
    //this.subscription$.unsubscribe();
  }
}
