import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSystemPageComponent } from './design-system-page.component';

describe('DesignSystemPageComponent', () => {
  let component: DesignSystemPageComponent;
  let fixture: ComponentFixture<DesignSystemPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignSystemPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignSystemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
