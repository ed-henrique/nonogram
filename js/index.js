const BOARD_SIZE = 15;
const RANDOMNESS = 0.5; // Lesser means fewer correct squares
let SQUARE_MODE = false;

const boardHTML = document.querySelector(".board");
const boardValuesVerticalHTML = document.querySelector(
	".board-values-vertical",
);
const boardValuesHorizontalHTML = document.querySelector(
	".board-values-horizontal",
);
const switchButtonHTML = document.querySelector(".switch");

const switchMode = () => {
	if ((SQUARE_MODE = !SQUARE_MODE)) {
		switchButtonHTML.innerHTML = `
		<div class="not-selected">
			<i class="cross fa-solid fa-xmark"></i>
		</div>
		<div class="selected">
			<i class="square fa-solid fa-square"></i>
		</div>
		`;
	} else {
		switchButtonHTML.innerHTML = `
		<div class="selected">
			<i class="cross fa-solid fa-xmark"></i>
		</div>
		<div class="not-selected">
			<i class="square fa-solid fa-square"></i>
		</div>
		`;
	}
};

const cellValue = () => {
	return Math.random() < RANDOMNESS;
};

const board = Array(BOARD_SIZE)
	.fill()
	.map(() => Array(BOARD_SIZE).fill().map(cellValue));

const boardMask = Array(BOARD_SIZE)
	.fill()
	.map(() => Array(BOARD_SIZE).fill(false));

const countBlocksVertical = () => {
	const blockNumberTotal = [];

	for (let i = 0; i < BOARD_SIZE; i++) {
		let counter = 0;
		const blockNumber = [];

		for (let j = 0; j < BOARD_SIZE; j++) {
			if (board[j][i]) {
				counter++;
			} else if (counter !== 0) {
				blockNumber.push(counter);
				counter = 0;
			}
		}

		if (counter !== 0) {
			blockNumber.push(counter);
		}

		blockNumberTotal.push(blockNumber);
	}

	blockNumberTotal.forEach((blockCount) => {
		boardValuesVerticalHTML.innerHTML += `
				<p>${blockCount.join(" ")}</p>
			`;
	});
};

const countBlocksHorizontal = () => {
	const blockNumberTotal = [];

	board.forEach((line) => {
		let counter = 0;
		const blockNumber = [];

		line.forEach((cell) => {
			if (cell) {
				counter++;
			} else if (counter !== 0) {
				blockNumber.push(counter);
				counter = 0;
			}
		});

		if (counter !== 0) {
			blockNumber.push(counter);
		}

		blockNumberTotal.push(blockNumber);
	});

	blockNumberTotal.forEach((blockCount) => {
		boardValuesHorizontalHTML.innerHTML += `
			<p>${blockCount.join(" ")}</p>
		`;
	});
};

const markSquare = (i, j) => {
	if (SQUARE_MODE) {
		if (board[i][j]) {
			boardMask[i][j] = true;

			const cellHTML = document.getElementById(`${i}-${j}`);

			cellHTML.outerHTML = `
			<button class="item2"></button>
			`;
		}
	}
};

const showBoard = () => {
	let count = 0;
	boardHTML.innerHTML = "";

	boardMask.forEach((line, i) => {
		line.forEach((_cell, j) => {
			const cellHTML = `
			<button id="${i}-${j}" class="item" onclick="markSquare(${i}, ${j})"></button>
			`;

			boardHTML.innerHTML += cellHTML;
			count++;
		});
	});
};

showBoard();
countBlocksHorizontal();
countBlocksVertical();
switchMode();
