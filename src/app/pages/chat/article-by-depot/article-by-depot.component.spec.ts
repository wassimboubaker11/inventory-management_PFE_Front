import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleByDepotComponent } from './article-by-depot.component';

describe('ArticleByDepotComponent', () => {
  let component: ArticleByDepotComponent;
  let fixture: ComponentFixture<ArticleByDepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleByDepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleByDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
