import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/services/gameservice.service';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Move } from 'src/app/models/move';
import { Observable } from 'rxjs';

@Component({
  selector: 'configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  moves:Move[] = [];
  formGroup: FormGroup;
  movesArray: FormArray;
  moves$: Observable<Move[]>;
  @Output() change = new EventEmitter();;

  constructor(public gameService:GameService,private fb: FormBuilder,) {

  }
  
  ngOnInit() {
    this.moves = this.gameService.Moves;
    this.loadForm();
  }

  loadForm()
  {
    this.movesArray = this.fb.array(this.getMovesFormControls().map(move => this.fb.group(move)));
    this.formGroup = this.fb.group({
      movesArray: this.movesArray
    });
  }


  getMovesFormControls():any[]
  {
    let moveControlArray = [];

    if(this.moves)
    {
      for (let i = 0; i < this.moves.length; i++) {

        let move = this.moves[i];
        moveControlArray.push(
          {
            move: [ move.move , Validators.required],
            kills: [ move.kills, Validators.required]
          }        
        );
      }
      return moveControlArray;
    }
    return [];
  }

  add()
  {
    let aux = this.fb.group(
      {
        move: [null, Validators.required],
        kills: [null, Validators.required]
      });
    this.movesArray.push(aux);
  }

  remove(index:number){
    this.movesArray.removeAt(index);
  }

  save()
  {
    if(this.movesArray.valid)
    {
      console.log(this.movesArray.value);
      this.moves = this.gameService.getMoves(this.movesArray.value);
      this.change.emit();

      alert("Cambios guardados");
    }

  }

}
