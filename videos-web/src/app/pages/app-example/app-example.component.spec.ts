import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExampleComponent } from './app-example.component';

describe('AppExampleComponent', () => {
  let component: AppExampleComponent;
  let fixture: ComponentFixture<AppExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
