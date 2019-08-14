import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/gameservice.service';
import { GameTurn } from 'src/app/classes/gameturn';

@Component({
  selector: 'playlog',
  templateUrl: './playlog.component.html',
  styleUrls: ['./playlog.component.scss']
})
export class PlaylogComponent implements OnInit {

  turns:GameTurn[] = [];
  
  constructor(public gameService:GameService) { 
    this.turns = this.gameService.Rounds;
  }

  ngOnInit() 
  {
    
  }

}
