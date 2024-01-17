//
// +==========================================================================+
//
// Copyright:   Copyright (C) 2023 AIS
//              Chandigarh, INDIA.
//              All Rights Reserved.
//
// Filename:    simple-paginator.component.ts
//
// Author(s):   Ankush Agnihotri
//
// DateCreated: 2023-06-06
//
// -==========================================================================-
import { Component, EventEmitter, Input, Output } from '@angular/core';

/** A heavily-simplified version of the standard paginator that only supports
 *  page size selection, next button and previous button. */
@Component({
  selector: 'app-simple-paginator',
  templateUrl: './simple-paginator.component.html',
  styleUrls: ['./simple-paginator.component.scss']
})
export class SimplePaginatorComponent {
  /** Selected page size. */
  @Input() public pageSize = 5;
  /** List of page size options. */
  @Input() public pageSizeOptions = [5, 10, 15, 20];
  /** Emits when page size changes. */
  @Output() public pageSizeChange = new EventEmitter<number>();

  /** True previous page button is disabled. */
  @Input() public prevDisabled = false;
  /** True if next page button is disabled. */
  @Input() public nextDisabled = false;

  /** Emits whenever prev page is clicked. */
  @Output() public prevPage = new EventEmitter();
  /** Emits whenever next page is clicked. */
  @Output() public nextPage = new EventEmitter();

  constructor() { }
}
