import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pharma } from './pharma';

describe('Pharma', () => {
  let component: Pharma;
  let fixture: ComponentFixture<Pharma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pharma],
    }).compileComponents();

    fixture = TestBed.createComponent(Pharma);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
