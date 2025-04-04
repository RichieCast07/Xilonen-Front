import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturaHumedadComponent } from './temperatura-humedad.component';

describe('TemperaturaHumedadComponent', () => {
  let component: TemperaturaHumedadComponent;
  let fixture: ComponentFixture<TemperaturaHumedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemperaturaHumedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperaturaHumedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
