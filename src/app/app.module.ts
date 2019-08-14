import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylogComponent } from './modules/playlog/playlog.component';
import { ArenaComponent } from './modules/arena/arena.component';
import { GameService } from './services/gameservice.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfigurationComponent } from './modules/configuration/configuration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HttpClientModule } from '@angular/common/http';
import { ScoreboardComponent } from './modules/scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylogComponent,
    ArenaComponent,
    ConfigurationComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonsModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
