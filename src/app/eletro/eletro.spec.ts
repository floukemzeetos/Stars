import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Eletro } from './eletro';

describe('Eletro', () => {
  let component: Eletro;
  let fixture: ComponentFixture<Eletro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eletro],
    }).compileComponents();

    fixture = TestBed.createComponent(Eletro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
