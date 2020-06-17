import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsmanagerComponent } from './productsmanager.component';

describe('ShowproductsComponent', () => {
  let component: ProductsmanagerComponent;
  let fixture: ComponentFixture<ProductsmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
