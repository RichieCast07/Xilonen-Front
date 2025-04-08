import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadAireComponent } from './calidad-aire.component';

describe('CalidadAireComponent', () => {
  let component: CalidadAireComponent;
  let fixture: ComponentFixture<CalidadAireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalidadAireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalidadAireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
