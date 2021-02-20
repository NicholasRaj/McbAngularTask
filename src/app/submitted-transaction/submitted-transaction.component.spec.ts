import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedTransactionComponent } from './submitted-transaction.component';

describe('SubmittedTransactionComponent', () => {
  let component: SubmittedTransactionComponent;
  let fixture: ComponentFixture<SubmittedTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
