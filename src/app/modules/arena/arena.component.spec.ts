import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaComponent } from './arena.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GameTurn as GameRound } from 'src/app/classes/gameturn';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Move } from 'src/app/models/move';


const TESTMOVES: Move[] = [
  { move: "paper", kills: "rock"}, 
  { move: "rock", kills: "scissors"}, 
  { move: "scissors", kills: "paper"},
  { move: "octano", kills: "rock"}
];

describe('ArenaComponent', () => {
  let component: ArenaComponent;
  let fixture: ComponentFixture<ArenaComponent>;

  let debugElement:DebugElement;
  let htmlElement:HTMLElement; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArenaComponent, ConfigurationComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,       
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('form'));
    htmlElement = debugElement.nativeElement;
    component.gameService.getMoves(TESTMOVES);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('A player1 should win 1 point after a good move', () => {
    component.beginPlay();
    component.player1 = "PLAYER1";
    component.player2 = "PLAYER2";
    component.moveA = TESTMOVES[0]['move'];
    component.moveB = TESTMOVES[1]['move'];
    component.finishRound();
    expect(component.player1Wins).toBe(1);
  });

  it('A player2 should win 1 point after a good move', () => {
    component.beginPlay();
    component.player1 = "PLAYER1";
    component.player2 = "PLAYER2";
    component.moveA = TESTMOVES[1]['move'];
    component.moveB = TESTMOVES[0]['move'];
    component.finishRound();
    expect(component.player2Wins).toBe(1);
  });

  it('A draw should result in no points for each player', () => {
    component.beginPlay();
    component.player1 = "PLAYER1";
    component.player2 = "PLAYER2";
    component.moveA = TESTMOVES[0]['move'];
    component.moveB = TESTMOVES[0]['move'];
    component.finishRound();
    expect(component.player1Wins+component.player2Wins).toBe(0);
  });


  it('A new game should start with zero wins', () => {
    component.beginPlay();
    let wins = component.player1Wins + component.player2Wins;
    expect(wins).toBe(0);
  });

  it('form should be invalid when players are null', () => {
    component.playerFormgroup.value.player1Name = "";
    component.playerFormgroup.value.player1Name = "";
    expect(component.playerFormgroup.valid).toBeFalsy();
  });


});
