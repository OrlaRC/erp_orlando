import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailDialog } from './ticket-detail-dialog';

describe('TicketDetailDialog', () => {
  let component: TicketDetailDialog;
  let fixture: ComponentFixture<TicketDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketDetailDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketDetailDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
