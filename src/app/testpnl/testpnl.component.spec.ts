import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpnlComponent } from './testpnl.component';

describe('TestpnlComponent', () => {
  let component: TestpnlComponent;
  let fixture: ComponentFixture<TestpnlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestpnlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestpnlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
