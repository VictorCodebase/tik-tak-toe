import { useState } from "react";

function Square({ value, onSquareClick }: { value: string; onSquareClick: () => void }) {
	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}

function calculateWinner(squares: number[]) {
	const combinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < combinations.length; i++) {
		const [a, b, c] = combinations[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares;
		}
	}
	return null;
}

export default function Board() {
	const [xIsNext, setxIsNext] = useState(true);
	const [squares, setSquares] = useState(Array(9).fill(null));

	function handleClick(i: number) {
		if (squares[i] || calculateWinner(squares)) return;
		const nextSquares = squares.slice();
		xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "0");
		setSquares(nextSquares);
		setxIsNext(!xIsNext);
	}

	const winner = calculateWinner(squares);
	const status = winner ? "WINNER!!!!": "Next Player is " + (xIsNext ? "X" : "0");

	return (
		<>
      <div className="Status">{status}</div>
			<div className="board-row">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
}
