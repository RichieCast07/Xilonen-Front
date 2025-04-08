import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumedadSueloComponent } from './humedad-suelo.component';

describe('HumedadSueloComponent', () => {
  let component: HumedadSueloComponent;
  let fixture: ComponentFixture<HumedadSueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumedadSueloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumedadSueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
