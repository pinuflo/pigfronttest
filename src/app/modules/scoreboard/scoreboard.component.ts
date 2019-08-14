import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/gameservice.service';
import { Move } from 'src/app/models/move';
import { GameTurn as GameRound } from 'src/app/classes/gameturn';
import { Observable, forkJoin } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  playersInfo:any[] = []
  constructor(public gameService:GameService,) { }

  refresh()
  {
    this.gameService.getAll().subscribe(
      (result:any)=>
      {
        if(result.success == true)
        {
          this.playersInfo = result.data;
        }
      },
      (error)=>
      {
        console.error("ERROR");
      }
    );
  }

  ngOnInit() 
  {
    this.refresh();
  }

}
