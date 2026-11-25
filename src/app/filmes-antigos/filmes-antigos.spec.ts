import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmesAntigos } from './filmes-antigos';

describe('FilmesAntigos', () => {
  let component: FilmesAntigos;
  let fixture: ComponentFixture<FilmesAntigos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmesAntigos],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmesAntigos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
