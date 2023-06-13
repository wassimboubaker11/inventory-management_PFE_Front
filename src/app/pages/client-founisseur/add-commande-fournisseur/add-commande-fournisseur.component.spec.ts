import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommandeFournisseurComponent } from './add-commande-fournisseur.component';

describe('AddCommandeFournisseurComponent', () => {
  let component: AddCommandeFournisseurComponent;
  let fixture: ComponentFixture<AddCommandeFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommandeFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommandeFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
