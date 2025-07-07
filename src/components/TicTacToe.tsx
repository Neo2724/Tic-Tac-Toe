"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

const emptyBoard = Array(9).fill("");

function calculateWinner(squares: string[]): string | null {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

const PLAYER = {
  X: { name: "Beaver", emoji: "🦫" },
  O: { name: "Log", emoji: "🪵" },
};

export default function TicTacToe() {
  const [board, setBoard] = useState<string[]>([...emptyBoard]);
  const [xIsNext, setXIsNext] = useState(true);
  const [bounce, setBounce] = useState<number | null>(null);
  const [restartBounce, setRestartBounce] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [drawShake, setDrawShake] = useState(false);
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell);
  const current = xIsNext ? "X" : "O";

  // Celebration effect for WIN
  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } else if (isDraw) {
      setDrawShake(true);
      setTimeout(() => setDrawShake(false), 1000);
    }
  }, [winner, isDraw]);

  function handleClick(idx: number) {
    if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setBounce(idx);
    setTimeout(() => setBounce(null), 400);
  }

  function handleReset() {
    setBoard([...emptyBoard]);
    setXIsNext(true);
    setBounce(null);
    setRestartBounce(true);
    setTimeout(() => setRestartBounce(false), 400);
  }

  return (
    <div className={`flex flex-col items-center gap-8 animate-fade-in ${drawShake ? "animate-shake" : ""}`}>
      <h1
        className="text-5xl font-bold mb-2 text-[#5b3a1b] outlined-brown-thin"
      >
        Neo&apos;s Tic-Tac-Toe
      </h1>
      {/* Player display under title */}
      <div className="flex gap-8 mb-2">
        <div className="flex items-center gap-2 text-2xl font-bold text-[#5b3a1b] outlined-brown-thin">
          <span className="text-5xl outlined-brown-thin text-[#5b3a1b]">{PLAYER.X.emoji}</span> {PLAYER.X.name}
        </div>
        <div className="flex items-center gap-2 text-2xl font-bold text-[#5b3a1b] outlined-brown-thin">
          <span className="text-5xl outlined-brown-thin text-[#5b3a1b]">{PLAYER.O.emoji}</span> {PLAYER.O.name}
        </div>
      </div>
      {/* Winner/Draw/Current Turn under title */}
      {winner && (
        <div className="mt-2 animate-winner-pop flex flex-col items-center justify-center w-full transition-all duration-500">
          <div className="px-8 py-6 sm:px-12 sm:py-8 rounded-3xl bg-yellow-100 shadow-2xl flex flex-col items-center justify-center border-4 border-amber-800 w-full">
            <span className="text-7xl sm:text-8xl outlined-brown-thin text-[#5b3a1b] mb-2">{PLAYER[winner as "X" | "O"].emoji}</span>
            <span className="text-3xl sm:text-4xl font-bold outlined-brown-thin text-[#5b3a1b]">{PLAYER[winner as "X" | "O"].name} Wins!</span>
          </div>
        </div>
      )}
      {!winner && isDraw && (
        <div className="mt-2 animate-draw-pop flex flex-col items-center justify-center">
          <div className="px-10 py-6 rounded-3xl bg-yellow-100 shadow-xl border-4 border-amber-800">
            <span className="text-4xl font-bold text-[#5b3a1b] outlined-brown-thin">It&apos;s a Draw!</span>
          </div>
        </div>
      )}
      {!winner && !isDraw && (
        <div className="min-h-6 text-3xl font-bold animate-fade-in text-[#5b3a1b] outlined-brown-thin">
          {`Current Turn: ${PLAYER[current as "X" | "O"].name} ${PLAYER[current as "X" | "O"].emoji}`}
        </div>
      )}
      <div className="flex flex-col items-center gap-2 w-full">
        <Button
          onClick={handleReset}
          variant="secondary"
          className={`rounded-full px-8 py-3 text-2xl font-bold bg-animated-brown-gradient text-white border-amber-700 shadow-md transition-transform ${restartBounce ? "animate-bounce-btn" : ""}`}
        >
          Restart Game
        </Button>
      </div>
      <div className="relative flex items-center justify-center w-full min-h-[320px] transition-all duration-500">
        <div className="absolute w-[320px] h-[320px] sm:w-[340px] sm:h-[340px] rounded-full bg-animated-brown-gradient shadow-2xl animate-float-slow z-0 transition-all duration-500" />
        <div className="grid grid-cols-3 gap-4 p-4 sm:p-6 rounded-full z-10 w-full transition-all duration-500">
          {board.map((cell, idx) => (
            <Button
              key={idx}
              variant="outline"
              className={`w-28 h-28 text-7xl font-bold flex items-center justify-center p-0 border-2 border-amber-800 bg-white hover:outline-brown transition-all duration-300 outlined-brown-thin
                ${bounce === idx ? "animate-bounce-box" : ""}
              `}
              onClick={() => handleClick(idx)}
              disabled={!!cell || !!winner}
            >
              {cell === "X" ? PLAYER.X.emoji : cell === "O" ? PLAYER.O.emoji : ""}
            </Button>
          ))}
        </div>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-20 animate-celebrate">
            {[...Array(16)].map((_, i) => (
              <span
                key={i}
                className={`absolute text-4xl animate-confetti${(i % 4) + 1}`}
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              >
                {['🎉','🎊','✨','🪅','💥','🥳','🎈','🌟'][i % 8]}
              </span>
            ))}
          </div>
        )}
      </div>
      <style jsx global>{`
        .bg-animated-brown-gradient {
          background: linear-gradient(270deg, #a9743a, #e2b07a, #5b3a1b, #e2b07a, #a9743a);
          background-size: 400% 400%;
          animation: gradient-x 6s ease-in-out infinite;
        }
        .outlined-brown-thin {
          -webkit-text-stroke: 1.2px #5b3a1b;
          text-stroke: 1.2px #5b3a1b;
        }
        .hover\:outline-brown:hover {
          box-shadow: 0 0 0 4px #a9743a, 0 0 0 8px #e2b07a;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.03); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @keyframes bounce-box {
          0% { transform: scale(1); }
          30% { transform: scale(1.15); }
          50% { transform: scale(0.95); }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-bounce-box {
          animation: bounce-box 0.4s;
        }
        @keyframes bounce-btn {
          0% { transform: scale(1); }
          30% { transform: scale(1.15); }
          50% { transform: scale(0.95); }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-bounce-btn {
          animation: bounce-btn 0.4s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s;
        }
        @keyframes celebrate {
          0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          10% { opacity: 1; transform: scale(1.2) rotate(10deg); }
          20% { transform: scale(1) rotate(-10deg); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: scale(0.5) rotate(10deg); }
        }
        .animate-celebrate {
          animation: celebrate 2.5s ease-in-out;
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(120px) rotate(30deg); opacity: 0; }
        }
        .animate-confetti1 { animation: confetti 1.5s ease-in-out; }
        .animate-confetti2 { animation: confetti2 1.5s ease-in-out; }
        .animate-confetti3 { animation: confetti3 1.5s ease-in-out; }
        .animate-confetti4 { animation: confetti4 1.5s ease-in-out; }
        @keyframes confetti2 {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100px) rotate(-20deg); opacity: 0; }
        }
        @keyframes confetti3 {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(80px) rotate(20deg); opacity: 0; }
        }
        @keyframes confetti4 {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110px) rotate(-10deg); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.7s;
        }
        @keyframes winner-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-winner-pop {
          animation: winner-pop 0.8s cubic-bezier(0.23, 1.12, 0.32, 1);
        }
        @keyframes draw-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-draw-pop {
          animation: draw-pop 0.8s cubic-bezier(0.23, 1.12, 0.32, 1);
        }
      `}</style>
    </div>
  );
} 