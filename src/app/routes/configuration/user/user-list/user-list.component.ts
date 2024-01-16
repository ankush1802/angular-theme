import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SimpleContextMenuComponent } from '@shared/components/simple-context-menu/simple-context-menu.component';
import { MessageResponse } from '@shared/Models/common.model';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AppUser } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  /** Holds all entity subscriptions.*/
  public subscription$ = new Subscription();
  displayedColumns = ['entity_Id', 'entity_Title', 'entity_Active'];
  /** All retrieved reports with no filtering applied.*/
  private allEntities: AppUser[] = [];
  dataSource = new MatTableDataSource<AppUser>(this.allEntities);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //#region Angular Life cycle
  constructor(
    private userProvider: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buildAndQuery();
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  //#endregion
  //#region mat-table right click
  /** Data source for reports table.*/
  /** All retrieved reports with no filtering applied.*/
  protected matTableSelection = new SelectionModel<any>(true, []);
  public isMultipleReportsSelected: boolean = false;
  /** Index of anchor row in results table used for range selection. */
  private rangeAnchor: number = 0;

  public async handleRowClick(
    event: MouseEvent,
    row: any,
    index: number,
    contextMenu?: SimpleContextMenuComponent
  ) {
    if (!row) return;
    // if (event.shiftKey) document.getSelection().removeAllRanges();

    // Right click.
    if (event.type === 'contextmenu') {
      if (!contextMenu) return;
      if (!event.ctrlKey && !this.matTableSelection.isSelected(row))
        this.matTableSelection.clear();
      this.rangeAnchor = index;
      this.matTableSelection.select(row);
    } else if (event.ctrlKey) {
      if (event.shiftKey) {
        // Select range and keep all previous selections.
        const direction: number = this.rangeAnchor < index ? 1 : -1;
        // Iterate over range between anchor and row index, selecting all
        for (
          let i = this.rangeAnchor;
          this.between(i, this.rangeAnchor, index, direction);
          i = i + direction
        ) {
          this.matTableSelection.select(this.dataSource.data[i]);
        }
      } else {
        // Ctrl + click. No shift.
        this.matTableSelection.toggle(row);
        if (this.matTableSelection.isSelected(row)) this.rangeAnchor = index;
        if (!this.matTableSelection.isEmpty()) this.rangeAnchor = 0;
      }
    } else {
      this.rangeAnchor = index;
      if (this.matTableSelection.selected.length > 1) {
        this.matTableSelection.clear();
        this.matTableSelection.select(row);
      } else if (this.matTableSelection.isSelected(row)) {
        // Clicked row is the only selected row so deselect it.
        this.matTableSelection.clear();
        this.rangeAnchor = 0;
      } else {
        // Deselect all items and select just the clicked row.
        this.matTableSelection.clear();
        this.matTableSelection.select(row);
      }
    }

    this.isMultipleReportsSelected = this.matTableSelection.selected.length > 1;
  }
  private between(indexToCheck: number, start: number, end: number, direction: number): boolean {
    if (direction === 1 && indexToCheck >= start && indexToCheck <= end) {
      return true;
    } else if (direction === -1 && indexToCheck <= start && indexToCheck >= end) {
      return true;
    }
    return false;
  }
  //#endregion
  //#region Entity CRUD
  openAddEntityDialog() {
    // const dialog = this.dialog.open(ManageEntityComponent, {
    //   width: '60rem',
    //   // autoFocus: false,
    //   // disableClose: false,
    //   // hasBackdrop: false,
    //   data: {
    //     service: this.userProvider,
    //     entityId: 0,
    //   } as IManageEntityDialogData,
    // });
    // this.userProvider.manageUserDialogOpen = true;
    // this.subscription$.add(
    //   dialog.afterClosed().subscribe(response => {
    //     this.userProvider.manageUserDialogOpen = false;
    //     if (response) {
    //       // refresh grid
    //       this.buildAndQuery();
    //     }
    //   })
    // );
  }
  buildAndQuery(){
    this.userProvider
    .getAllUsers({ pagenumber: 1, size: 10 })
    .subscribe((response: MessageResponse) => {
      debugger;
      this.allEntities = response.response.entities as AppUser[];
      this.dataSource.data = this.allEntities;
    });
  }
  //#endregion
}
