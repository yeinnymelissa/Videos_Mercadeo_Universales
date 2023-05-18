import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioVideoComponent } from './formulario-video.component';

describe('FormularioVideoComponent', () => {
  let component: FormularioVideoComponent;
  let fixture: ComponentFixture<FormularioVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
