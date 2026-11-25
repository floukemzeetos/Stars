import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroGame } from './retro-game';

describe('RetroGame', () => {
  let component: RetroGame;
  let fixture: ComponentFixture<RetroGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroGame],
    }).compileComponents();

    fixture = TestBed.createComponent(RetroGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
