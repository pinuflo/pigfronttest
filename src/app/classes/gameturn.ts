import { Move } from '../models/move';

export class GameTurn
{
    private _moveA : Move = null;
    private _moveB : Move = null;
    private _names:string[] = ["",""];
    private _player2Name:string = "";
    private _winner : number = 0;

    constructor(moveA:Move,moveB:Move,player1Name:string, player2Name:string, matrix:number[][])
    {
        this._moveA  = moveA;
        this._moveB  = moveB;
        this._names[0] = player1Name;
        this._names[1] = player2Name;

        switch(matrix[moveA.move][moveB.move])
        {
            case 1:
                {
                    this._winner = 1; //Player 1 wins
                    break;
                }
            case -1:
                {
                    this._winner = 2; //player 2 wins
                    break;
                }
            case 0:
                {
                    this._winner = 0; //Draw
                    break;
                }
                
        }

    }

    public get Winner( ) : number
    {
        return this._winner;
    }

    public getWinnerName() : string
    {
        return this._names[this._winner];
    }

    public get Detail() : string{

        let winner:string = "";
        let losser:string = "";
        let winnerMove:string = "";
        let losserMove:string = "";

        if(this.Winner == 1)
        {
            winner = "Player 1";
            losser = "Player 2";
            winnerMove = this._moveA.move;
            losserMove = this._moveB.move;
        }
        else
        {
            winner = "Player 2";
            losser = "Player 1";
            winnerMove = this._moveB.move;
            losserMove = this._moveA.move;
        }
    
        
        if(this.Winner == 0)
        {
            return "Game turn has ended in draw"
        }
        else
        {
            return winner + " has played [" + winnerMove + "] against " + losser + " with [" + losserMove + "] and won!";
        }

    }

}