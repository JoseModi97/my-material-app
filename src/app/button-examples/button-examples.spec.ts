import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonExamples } from './button-examples';

describe('ButtonExamples', () => {
  let component: ButtonExamples;
  let fixture: ComponentFixture<ButtonExamples>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonExamples]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonExamples);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
