import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterLoginComponent } from './footer-login.component';

describe('FooterLoginComponent', () => {
  let component: FooterLoginComponent;
  let fixture: ComponentFixture<FooterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
