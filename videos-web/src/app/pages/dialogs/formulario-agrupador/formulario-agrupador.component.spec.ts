import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgrupadorComponent } from './formulario-agrupador.component';

describe('FormularioAgrupadorComponent', () => {
  let component: FormularioAgrupadorComponent;
  let fixture: ComponentFixture<FormularioAgrupadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAgrupadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAgrupadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
