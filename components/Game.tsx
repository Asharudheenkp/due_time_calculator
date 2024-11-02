"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialBoard: (string | null)[] = Array(9).fill(null);

const Game: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(initialBoard);
  const [isXNext, setIsXNext] = useState<boolean>(true); 
  const winner = calculateWinner(board);

  useEffect(() => {
    if (winner || board.every(Boolean) || isXNext) return; 
    const computerMove = getComputerMove(board);
    if (computerMove !== null) {
      makeMove(computerMove); 
    }
  }, [board, isXNext, winner]);

  const makeMove = (index: number) => {
    if (board[index]) {
      alert("This cell is already filled. Please choose another cell."); 
      return;
    }
    if (winner) return; 

    const newBoard:any = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O'; 
    setBoard(newBoard);
    setIsXNext(!isXNext); 
  };

  const handleClick = (index: number) => {
    if (!isXNext) return; 
    makeMove(index);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true); 
  };

  return (
    <div>
         <Card>
            <CardHeader>
            <CardTitle>Tic-Tac-Toe </CardTitle>
            </CardHeader>
        <CardContent >
            
            <div className="grid grid-cols-3 gap-1.5">
                {board.map((cell, index) => (
                <div key={index} className="w-[100%] h-[80px] transition-colors active:bg-gray-400 cursor-pointer hover:bg-gray-100 text-xl items-center justify-center flex border  border-gray-500 rounded-md dark:border-white dark:hover:bg-slate-500" onClick={() => handleClick(index)}>
                    {cell}
                </div>
                ))}
            </div>
        <h2 className='mt-4 text-xl '>{winner ? `Winner: ${winner}` : ''}</h2>
        <button onClick={resetGame} className='border mt-5 px-4 py-2 rounded-lg bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'>Reset Game</button>
        </CardContent>
        </Card>
      
      <style jsx>{`
        .board {
          display: grid;
            grid-template-columns: repeat(3, 33.33%);
          gap: 5px;
        }
        .cell {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          border: 1px solid #000;
          background-color: #f9f9f9;
          transition: background-color 0.3s;
        }
        .cell:hover {
          background-color: #e0e0e0;
        }
        .cell:active {
          background-color: #ccc;
        }
      `}</style>
    </div>
  );
};

const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }
  return null;
};

const getComputerMove = (board: (string | null)[]) => {
  const computerMove = findWinningMove(board, 'O');
  if (computerMove !== null) return computerMove;

  const playerMove = findWinningMove(board, 'X');
  if (playerMove !== null) return playerMove;

  const availableMoves = board.map((value, index) => (value ? null : index)).filter((index) => index !== null);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

const findWinningMove = (board: (string | null)[], player: string) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = board.slice();
      newBoard[i] = player; 
      if (calculateWinner(newBoard) === player) {
        return i; 
      }
    }
  }
  return null;
};

export default Game;
