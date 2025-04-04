import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempeturaComponent } from './tempetura.component';

describe('TempeturaComponent', () => {
  let component: TempeturaComponent;
  let fixture: ComponentFixture<TempeturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempeturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempeturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
