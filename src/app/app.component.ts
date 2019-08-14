import { Component, OnInit } from '@angular/core';
import { GameService } from './services/gameservice.service';
import { Observable } from 'rxjs';
import { Move } from './models/move';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'octano';
  moves: Move[];

  constructor(public gameService:GameService)
  {
    setTheme('bs3');
    this.moves = this.gameService.getMoves();
   
  }

  ngOnInit(): void 
  {
    
  }

}
