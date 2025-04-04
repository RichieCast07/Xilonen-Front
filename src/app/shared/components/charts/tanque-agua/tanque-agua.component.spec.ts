import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TanqueAguaComponent } from './tanque-agua.component';

describe('TanqueAguaComponent', () => {
  let component: TanqueAguaComponent;
  let fixture: ComponentFixture<TanqueAguaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TanqueAguaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TanqueAguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
