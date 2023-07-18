//
// +==========================================================================+
//
// Copyright:   Copyright (C) 2023 AIS
//              Chandigarh, INDIA.
//              All Rights Reserved.
//
// Filename:    simple-context-menu.component.ts
//
// Author(s):   Ankush Agnihotri
//
// DateCreated: 2023-06-06
//
// -==========================================================================-

import { Component, HostBinding, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'simple-context-menu',
  template: '<ng-content></ng-content>'
})
export class SimpleContextMenuComponent extends MatMenuTrigger {


  @HostBinding('style.position') private position = 'fixed';
  @HostBinding('style.pointer-events') private events = 'none';
  @HostBinding('style.left') private x: string;
  @HostBinding('style.top') private y: string;

  @Input() public mouseXOffset: string = '0px';
  @Input() public mouseYOffset: string = '0px';

  /**
   * Opens context menu
   * @param current x and y mouse position
   * @param data Needed for interfaces or objects
   * @returns Return type only to prevent default behavior
   */
  public open({ x, y }: MouseEvent, data?: any): boolean {
    // lazily-rendered content - only if data exists
    if (data) {
      this.menuData = data;
    }

    // menu position
    this.x = (x - parseInt(this.mouseXOffset)).toString() + "px";
    this.y = (y - parseInt(this.mouseYOffset)).toString() + "px";

    // open menu
    this.openMenu();

    // prevents default
    return false;
  }

}
