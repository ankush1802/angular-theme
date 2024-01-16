import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Entity, IManageEntityDialogData } from '../entity.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from '@shared/Models/common.model';

@Component({
  selector: 'app-manage-entity',
  templateUrl: './manage-entity.component.html',
  styleUrls: ['./manage-entity.component.scss'],
})
export class ManageEntityComponent implements OnInit, OnDestroy {
  entityForm: FormGroup;
  public subscription$ = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IManageEntityDialogData,
    public dialog: MatDialogRef<ManageEntityComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    //this.appCodeUpdate = this.data.item.m_strReportApp;
    this.buildEntityForm();
  }

  ngOnDestroy() {
    //this.subscription$.unsubscribe();
  }
  buildEntityForm() {
    this.entityForm = this.formBuilder.group({
      entity_Title: ['', Validators.required],
      entity_Sub_Title: [''],
      entity_Description: [''],
      entity_Address: [''],
      entity_City: [''],
      entity_State: [''],
      entity_Country: [''],
      entity_Zipcode: [''],
      entity_Phone_1: [''],
      entity_Phone_2: [''],
      entity_Phone_3: [''],
      entity_Email_1: ['', [Validators.email]],
      entity_Email_2: ['', [Validators.email]],
      entity_Email_3: ['', [Validators.email]],
      entity_Website: [''],
      entity_Active: [''],
    });
  }
  onSaveEntity(form: FormGroup) {
    debugger;
    console.log(form);
    const entity = {
      entity_Active: form.value.entity_Active,
      entity_Title: form.value.entity_Title,
      entity_Sub_Title: form.value.entity_Sub_Title,
      entity_Description: form.value.entity_Description,
      entity_Address: form.value.entity_Address,
      entity_City: form.value.entity_City,
      entity_State: form.value.entity_State,
      entity_Country: form.value.entity_Country,
      entity_Zipcode: form.value.entity_Zipcode,
      entity_Phone_1: form.value.entity_Phone_1,
      entity_Phone_2: form.value.entity_Phone_2,
      entity_Phone_3: form.value.entity_Phone_3,
      entity_Email_1: form.value.entity_Email_1,
      entity_Email_2: form.value.entity_Email_2,
      entity_Email_3: form.value.entity_Email_3,
      entity_Website: form.value.entity_Website,
      entity_Id: this.data.entityId,
    } as Entity;
    this.data.service.saveEntity(entity).subscribe((response: MessageResponse) => {
      debugger;
      this.dialog.close(true);
    });
  }
}
