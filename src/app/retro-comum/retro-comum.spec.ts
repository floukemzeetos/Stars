import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroComum } from './retro-comum';

describe('RetroComum', () => {
  let component: RetroComum;
  let fixture: ComponentFixture<RetroComum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroComum],
    }).compileComponents();

    fixture = TestBed.createComponent(RetroComum);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
