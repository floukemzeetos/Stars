import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Atacadista } from './atacadista';

describe('Atacadista', () => {
  let component: Atacadista;
  let fixture: ComponentFixture<Atacadista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atacadista],
    }).compileComponents();

    fixture = TestBed.createComponent(Atacadista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
