import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylogComponent } from './playlog.component';
import { HttpClientModule } from '@angular/common/http';

describe('PlaylogComponent', () => {
  let component: PlaylogComponent;
  let fixture: ComponentFixture<PlaylogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylogComponent ],
      imports: [
        HttpClientModule,       
      ]     
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
