import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ArenaComponent } from './modules/arena/arena.component';
import { ConfigurationComponent } from './modules/configuration/configuration.component';
import { PlaylogComponent } from './modules/playlog/playlog.component';
import { ScoreboardComponent } from './modules/scoreboard/scoreboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from 'ngx-bootstrap/buttons/public_api';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,       
      ],
      declarations: [
        AppComponent,
        PlaylogComponent,
        ArenaComponent,
        ConfigurationComponent,
        ScoreboardComponent      
      ],
    }).compileComponents().then(
      ()=>
      {
        
      }
    );
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
