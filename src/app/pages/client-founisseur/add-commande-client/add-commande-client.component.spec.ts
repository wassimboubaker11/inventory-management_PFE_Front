import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommandeClientComponent } from './add-commande-client.component';

describe('AddCommandeClientComponent', () => {
  let component: AddCommandeClientComponent;
  let fixture: ComponentFixture<AddCommandeClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommandeClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommandeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
