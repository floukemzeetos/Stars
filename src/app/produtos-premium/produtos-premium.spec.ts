import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosPremium } from './produtos-premium';

describe('ProdutosPremium', () => {
  let component: ProdutosPremium;
  let fixture: ComponentFixture<ProdutosPremium>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosPremium],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosPremium);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
