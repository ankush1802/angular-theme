import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SimpleContextMenuComponent } from '@shared/components/simple-context-menu/simple-context-menu.component';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  /** Data source for reports table.*/
  /** All retrieved reports with no filtering applied.*/
  private allReports: any[] = [];
  public reportTableDataSource = new MatTableDataSource<any>(this.allReports);
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
          this.reportTableSelection.select(this.reportTableDataSource.data[i]);
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
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
