import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SimpleContextMenuComponent } from '@shared/components/simple-context-menu/simple-context-menu.component';
import { Entity } from '../entity.model';
import { EntityService } from '../entity.service';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent {
  displayedColumns = ['Entity_Id', 'Entity_Title', 'Entity_Active'];
  /** All retrieved reports with no filtering applied.*/
  private allEntities: Entity[] = [];
  dataSource = new MatTableDataSource<Entity>(this.allEntities);

  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private entityProvider: EntityService) {}

  ngOnInit(): void {
    this.entityProvider.getAllEntities({}).subscribe((response : Entity[])=>{
      this.allEntities = response;
    });
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  /** Data source for reports table.*/
  /** All retrieved reports with no filtering applied.*/
  protected reportTableSelection = new SelectionModel<any>(true, []);
  public isMultipleReportsSelected: boolean = false;
  /** Index of anchor row in results table used for range selection. */
  private rangeAnchor: number = 0;

  public async handleRowClick(event: MouseEvent, row: any, index: number, contextMenu?: SimpleContextMenuComponent) {
    if (!row) return;
    // if (event.shiftKey) document.getSelection().removeAllRanges();

    // Right click.
    if (event.type === 'contextmenu') {
      if (!contextMenu) return;
      if (!event.ctrlKey && !this.reportTableSelection.isSelected(row)) this.reportTableSelection.clear();
      this.rangeAnchor = index;
      this.reportTableSelection.select(row);
    }

    else if (event.ctrlKey) {
      if (event.shiftKey) { // Select range and keep all previous selections.
        const direction: number = this.rangeAnchor < index ? 1 : -1;
        // Iterate over range between anchor and row index, selecting all
        for (let i = this.rangeAnchor; this.between(i, this.rangeAnchor, index, direction); i = i + direction) {
          this.reportTableSelection.select(this.dataSource.data[i]);
        }
      } else { // Ctrl + click. No shift.
        this.reportTableSelection.toggle(row);
        if (this.reportTableSelection.isSelected(row)) this.rangeAnchor = index;
        if (!this.reportTableSelection.isEmpty()) this.rangeAnchor = 0;
      }
    }
    else {
      this.rangeAnchor = index;
      if (this.reportTableSelection.selected.length > 1) {
        this.reportTableSelection.clear();
        this.reportTableSelection.select(row);
      } else if (this.reportTableSelection.isSelected(row)) { // Clicked row is the only selected row so deselect it.
        this.reportTableSelection.clear();
        this.rangeAnchor = 0;
      } else { // Deselect all items and select just the clicked row.
        this.reportTableSelection.clear();
        this.reportTableSelection.select(row);
      }
    }

    this.isMultipleReportsSelected = this.reportTableSelection.selected.length > 1;


  }
  private between(indexToCheck: number, start: number, end: number, direction : number): boolean {
    if (direction === 1 && indexToCheck >= start && indexToCheck <= end) {
      return true;
    }
    else if (direction === -1 && indexToCheck <= start && indexToCheck >= end) {
      return true;
    }
    return false;
  }
}
