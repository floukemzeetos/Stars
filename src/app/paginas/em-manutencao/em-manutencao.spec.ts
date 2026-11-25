import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmManutencao } from './em-manutencao';

describe('EmManutencao', () => {
  let component: EmManutencao;
  let fixture: ComponentFixture<EmManutencao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmManutencao],
    }).compileComponents();

    fixture = TestBed.createComponent(EmManutencao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
