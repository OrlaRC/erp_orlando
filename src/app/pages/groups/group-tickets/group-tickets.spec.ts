import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTickets } from './group-tickets';

describe('GroupTickets', () => {
  let component: GroupTickets;
  let fixture: ComponentFixture<GroupTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupTickets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
