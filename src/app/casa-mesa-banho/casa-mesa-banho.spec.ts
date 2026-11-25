import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasaMesaBanho } from './casa-mesa-banho';

describe('CasaMesaBanho', () => {
  let component: CasaMesaBanho;
  let fixture: ComponentFixture<CasaMesaBanho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasaMesaBanho],
    }).compileComponents();

    fixture = TestBed.createComponent(CasaMesaBanho);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
