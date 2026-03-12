import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketDialog } from './create-ticket-dialog';

describe('CreateTicketDialog', () => {
  let component: CreateTicketDialog;
  let fixture: ComponentFixture<CreateTicketDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTicketDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTicketDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
