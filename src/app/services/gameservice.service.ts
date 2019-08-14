import { Injectable, OnInit } from '@angular/core';
import { Move } from '../models/move';
import { finalize, catchError, tap, debounceTime, switchMap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { GameTurn } from '../classes/gameturn';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const MOVES: Move[] = [
  { move: "paper", kills: "rock"}, 
  { move: "rock", kills: "scissors"}, 
  { move: "scissors", kills: "paper"},
]


@Injectable({
  providedIn: 'root'
})
export class GameService {


  private _moves:Move[];
  private _matrix:number[][];
  private _rounds:GameTurn[] = [];

  
  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get(`${environment.backend_url}/players`);
  }

  post(player:string)
  {
    return this.http.post(`${environment.backend_url}/players`,{name:player});
  }

  put(player:string)
  {
    return this.http.put(`${environment.backend_url}/players`,{name:player});
  }

  public get Matrix() :number[][]
  {
    return this._matrix;
  }

  public set Matrix(value)
  {
    this._matrix = value;
  }


  public get Rounds() : GameTurn[]
  {
    return this._rounds
  }

  public get Moves() : Move[]
  {
    return this._moves
  }

  public getMove(moveName:string) : Move{
    return this._moves.find((x:Move)=>x.move==moveName);
  }

  public getMoves(movesArray:Move[]=null) :  Move[]
  {
    let moves = (!movesArray) ? MOVES : movesArray;
    this._moves = moves;

    this.generateMatrix(moves);
    return moves;
  }

  private generateMatrix(data:Move[])
  {
    this._moves = data;

    let matrix:any[][] = [];

    for(let move_i of data){
      matrix[move_i.move] = [];
    }

    for(let move_i of data){
      for(let move_j of data){
        if(move_i.move == move_j.move)
        {
          matrix[move_i.move][move_j.move] = 0;
        }
        else
        {
          if( move_i.kills == move_j.move )
          {
            matrix[move_i.move][move_j.move] = 1;
          }
          else if(move_i.move == move_j.kills)
          {
            matrix[move_i.move][move_j.move] = -1;
          }
          else
          {
            matrix[move_i.move][move_j.move] = 0;
          }

        }
      }
    }

    this._matrix = matrix;

  }
  
  public playRound(turn:GameTurn)
  {
    this._rounds.push(turn)
  }

  public restartGameInfo()
  {
    this._rounds.splice(0);
  }


}
