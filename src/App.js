import {useState} from "react";

export default function Game(){
  
  const [turn, setTurn] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moves, setMoves] = useState([Array(9).fill(null)]);
  const currentSquares = history[currentMove];
  const [sortOrder, setSortOrder] = useState(true);

  function gameLoop(currentSquares, clickedIndex){
    const nextHistory = [...history.slice(0, currentMove + 1),currentSquares];
    setHistory(nextHistory);
    const nextMoves = [...moves.slice(0, turn+1), clickedIndex];
    setMoves(nextMoves)
    console.log("List of moves : ",moves);
    setCurrentMove(nextHistory.length - 1);
    setTurn(turn+1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  function generateMoves(){
    let Moves = history.map((squares, move) => {
      let description;
      if (move == currentMove){
        if((Math.floor(moves[move]/3))>=0 && (Math.floor(moves[move]/3))<3)
            description = 'You are currently at move #'+move+ "\n at ( "+(Math.floor(moves[move]/3))+", "+(moves[move]%3)+" )";
        else
            description = 'You are currently at move #'+move;
      } 
      else {
        if(move > 0)
          description = 'Go to move #' + move+ "\n at ( "+(Math.floor(moves[move]/3))+", "+(moves[move]%3)+" )";
        else
          description = 'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });
    if(sortOrder)
      return Moves;
    else {
      let newMoves = [];
      for(let i = Moves.length-1; i>=0; i--)
        newMoves.push(Moves[i]);
      return newMoves;
    }
  }

  function sortMoves(){
    setSortOrder(!sortOrder);
  }

  const sortButton = (<button id = "sort" onClick={sortMoves}>Sort Moves</button>);


  return (
    <div className="game">
      <div className="game-board">
        <Board turn = {turn} squares = {currentSquares} onplay = {gameLoop}/>
      </div>
      <div className="game-info">
        <span>{sortButton}</span>
        <ol>{generateMoves()}</ol>
      </div>
    </div>
  );
}

function Board({turn, squares, onplay}){

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = 'Winner: ' + squares[winner[0]];
    highlightWinner(winner);
  }
  else{
    if(turn >9)
      status = 'It is a tie!!';
    else
      status = 'Next player: ' + (turn%2 == 0 ? 'X' : 'O');
  }

  function highlightWinner(){

    let board = [];
    let index = 0;
    let winnerIndex = 0;
    console.log(winner);

    for(let i = 0; i < 3; i++){
      let row = []
      for(let j = 0; j < 3; j++){
        if(index == winner[winnerIndex] ){
          board.push(<Square key={index} value = {squares[index]} onSquareClick={onSquareClick} index={index} won ={true} winnerExists={true}/>);
          console.log(winner[winnerIndex]);
          winnerIndex++;
        }
        else
          board.push(<Square key={index} value = {squares[index]} onSquareClick={onSquareClick} index={index} won ={false} winnerExists={true}/>);
       
        index++;
      }
      board.push(
        <div key={i+100} className="status">
          {row}
        </div>
      )
    }
    return board;  
  }

  function onSquareClick(index){
    if(squares[index] != null || calculateWinner(squares) != null)
      return;

    const newSquares = [...squares];
    if(turn%2 == 0)
      newSquares[index] = 'X';
    else
      newSquares[index] = 'O';

    onplay(newSquares, index);
  }
  function renderBoard(){      
    let board = []
    let index = 0
    for(let i = 0; i < 3; i++){
      let row = []
      for(let j = 0; j < 3; j++){
        board.push(<Square key={index} value = {squares[index]} onSquareClick={onSquareClick} index={index} />);
        index++;
      }
      board.push(
        <div key={i+100} className="status">
          {row}
        </div>
      )
    }
    return board;
  }
  let renderedBoard = null;
  if(winner)
    renderedBoard = highlightWinner();
  else
    renderedBoard = renderBoard();

  const BoardRender = renderedBoard.slice();
  return <>
      <div className="status">
        {status}
      </div>
      {BoardRender}
      </>;
}

function Square({value, onSquareClick, index, won, winnerExists=false}){
  if(!won && winnerExists){
    if(index%2 ==0)
      return <button className="square" onClick={() => onSquareClick(index)}
              style={
                {backgroundColor: '#ad94c7',
                color: 'rgb(105, 64, 105)'
                }
              }
              >{value}</button>
    else
        return <button className="square" onClick={() => onSquareClick(index)}
        style={
          {backgroundColor: 'rgb(93, 145, 132)',
            color: 'rgb(37, 77, 37)'
          }
        }
        >{value}</button>
  }
  else{
    if(index%2 ==0)
      return <button className="square" onClick={() => onSquareClick(index)}
              style={
                {backgroundColor: 'rgb(230,215,245)',
                 color: 'purple'
                }
              }
              >{value}</button>
    else
        return <button className="square" onClick={() => onSquareClick(index)}
        style={
          {backgroundColor: 'rgb(215,255,245)',
            color: 'darkgreen'
          }
        }
        >{value}</button>
  
  }
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return lines[i];
    }
  }
  return null;
}
