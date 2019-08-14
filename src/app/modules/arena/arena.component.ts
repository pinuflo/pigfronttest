import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/gameservice.service';
import { Move } from 'src/app/models/move';
import { GameTurn as GameRound } from 'src/app/classes/gameturn';
import { Observable, forkJoin } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {


  moves:Move[] = [];
  moveA:string = null;
  moveB:string = null;

  roundInfo:GameRound = null;
  round:number = 0;

  player1:string;
  player2:string;
  player1Wins:number = 0;
  player2Wins:number = 0;

  turn:number = 0;

  gamePhase:number = 0;
  playerFormgroup: any;
  gameWinner: string;

  errorMsg:string = null;
  loading:boolean = false;

  constructor(public gameService:GameService,
              private fb: FormBuilder,) { }

  ngOnInit()
  {
    this.moves = this.gameService.getMoves();
    this.playerFormgroup = this.fb.group({
      player1Name: [null,Validators.required],
      player2Name: [null,Validators.required],
    });
  }

  reset()
  {
    this.turn = 0;
    this.gamePhase = 0;
  }


  play()
  {
    this.gameService.restartGameInfo();
    this.player1 = this.playerFormgroup.value.player1Name;
    this.player2 = this.playerFormgroup.value.player2Name;

    var tasks$ = [];
    tasks$.push(this.gameService.post(this.player1));
    tasks$.push(this.gameService.post(this.player2));

    this.loading = true;
    forkJoin(...tasks$).subscribe(
    (results: any) => 
    {
      this.beginPlay();
    },
    (error)=>
    {
      this.errorMsg = "Couldn't connect to the game server and start the game";
      console.error(error);
    },
    () =>
    {
      this.loading = false;
    });
  }

  beginPlay()
  {
    this.gamePhase = 1;
    this.round = 1;
    this.turn = 0;
    this.player1Wins = 0;
    this.player2Wins = 0;
    this.roundInfo = null;
    this.errorMsg = null;
  }


  nextTurn()
  {
    this.turn++;
  }

  updateMoves()
  {
    this.moves = this.gameService.Moves;
    console.log(this.moves);
  }

  finishRound()
  {
    let moveA:Move = this.gameService.getMove(this.moveA);
    let moveB:Move = this.gameService.getMove(this.moveB);
    this.roundInfo = new GameRound(moveA,moveB,this.player1,this.player2,this.gameService.Matrix);
    this.gameService.playRound(this.roundInfo);
    this.moveA = null;
    this.moveB = null;
    this.round++;
    this.turn = 0;

    if(this.roundInfo.Winner == 1)
    {
      this.player1Wins++;
      this.gameWinner = this.player1;
    }

    if(this.roundInfo.Winner == 2)
    {
      this.player2Wins++;
      this.gameWinner = this.player2;
    }


    if(this.player1Wins == 3 || this.player2Wins==3)
    {
      this.gamePhase = 2;

      this.loading = true;
      this.gameService.put(this.gameWinner).subscribe(
        (success)=>
        {
          this.roundInfo = null;
        },
        (error)=>
        {
          console.error("ERROR");
        },
        ()=>
        {
          this.loading = false;
        }

      );

      
    }
    


  }

}
