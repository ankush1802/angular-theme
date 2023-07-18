import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleContextMenuComponent } from './simple-context-menu.component';

describe('SimpleContextMenuComponent', () => {
  let component: SimpleContextMenuComponent;
  let fixture: ComponentFixture<SimpleContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
