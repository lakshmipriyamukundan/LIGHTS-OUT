import React, { useState, Fragment } from "react";
import {Cell} from "./Cell";
import './Board.css';

export const Board = (props) => {

  const {nCols, nRows} = props;
  const chanceLightStartsOn = 0.25; 

  const createBoard = () => {
    let board = [];
    for (let y=0; y < nRows; y++){
      let row = [];
      for (let x=0; x < nCols; x++){
        row.push(Math.random() < chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  };

  const [ hasWon, setHasWon ] = useState(false);
  const [ board, setBoard ] = useState(createBoard());


  if(hasWon){
    return (
      <div className='winner'>
      <span className='neon-orange'>YOU</span>
      <span className='neon-blue'>WIN!</span>
    </div>
    )
  }
  const flipCellsAround = (coord) => {
    let newBoard = [...board];
    let newHasWon = false;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        newBoard[y][x] = !newBoard[y][x];
      }
    }
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    setBoard(newBoard);
    // console.log('borrr', board)
    newHasWon = board.every(row => row.every(cell => !cell));
    setHasWon(newHasWon );
  };

  let tblBoard = [];

  for(let y=0; y<nRows; y++ ){
    let row = [];
    for(let x=0; x<nCols; x++ ){
      const coord = `${y}-${x}`;
      row.push(<Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={()=> flipCellsAround(coord)} />);
    };
    tblBoard.push(<tr key={y}>{row}</tr>);
  };

  return(
    <Fragment>
          <div className='Board-title'>
              <div className='neon-orange'>Lights</div>
              <div className='neon-blue'>Out</div>
            </div>
          <table className='Board'>
            <tbody>
              {tblBoard}
            </tbody>
          </table>
    </Fragment>
  )
};

