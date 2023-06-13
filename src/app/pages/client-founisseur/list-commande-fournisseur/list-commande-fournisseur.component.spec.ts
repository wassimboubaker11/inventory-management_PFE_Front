import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandeFournisseurComponent } from './list-commande-fournisseur.component';

describe('ListCommandeFournisseurComponent', () => {
  let component: ListCommandeFournisseurComponent;
  let fixture: ComponentFixture<ListCommandeFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommandeFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommandeFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
