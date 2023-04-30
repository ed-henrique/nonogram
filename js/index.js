const BOARD_SIZE = 15;
const RANDOMNESS = 0.7; // Lesser means fewer correct squares
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
	SQUARE_MODE = !SQUARE_MODE;

	const crossClass = SQUARE_MODE ? "not-selected" : "selected";
	const squareClass = SQUARE_MODE ? "selected" : "not-selected";

	const crossHTML = `
      <div class="${crossClass}">
        <i class="cross fa-solid fa-xmark"></i>
      </div>
    `;

	const squareHTML = `
      <div class="${squareClass}">
        <i class="square fa-solid fa-square"></i>
      </div>
    `;

	switchButtonHTML.innerHTML = crossHTML + squareHTML;
};

const cellValue = () => Math.random() < RANDOMNESS;

const showCross = () => Math.random() < RANDOMNESS / 5;

const board = Array.from({ length: BOARD_SIZE }, () =>
	Array.from({ length: BOARD_SIZE }, cellValue),
);

const boardMask = Array.from({ length: BOARD_SIZE }, () =>
	Array.from({ length: BOARD_SIZE }, () => false),
);

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

	boardValuesVerticalHTML.innerHTML = blockNumberTotal
		.map(
			(blockCount) => `<p><span>${blockCount.join("</span><span>")}</span></p>`,
		)
		.join("");
};

const countBlocksHorizontal = () => {
	const blockNumberTotal = board.map((line) => {
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

		return blockNumber;
	});

	boardValuesHorizontalHTML.innerHTML = blockNumberTotal
		.map((blockCount) => `<p>${blockCount.join(" ")}</p>`)
		.join("");
};

const markSquare = (i, j) => {
	if (SQUARE_MODE && board[i][j]) {
		boardMask[i][j] = true;
		const cellHTML = document.getElementById(`${i}-${j}`);
		cellHTML.outerHTML = `
      <button class="item2"></button>
    `;
	} else if (!SQUARE_MODE && !board[i][j]) {
		const cellHTML = document.getElementById(`${i}-${j}`);
		cellHTML.outerHTML = `
      <button class="item">
        <i class="board-cross fa-solid fa-xmark"></i>
      </button>
    `;
	}
};

const showBoard = () => {
	let count = 0;
	boardHTML.innerHTML = "";

	boardMask.forEach((line, i) => {
		line.forEach((_cell, j) => {
			const buttonID = `${i}-${j}`;
			const buttonClass = "item";
			const buttonOnClick = `markSquare(${i}, ${j})`;

			let buttonInnerHTML = "";
			if (!board[i][j]) {
				const buttonIcon = showCross()
					? "<i class='board-cross fa-solid fa-xmark'></i>"
					: "";
				buttonInnerHTML = `<button id='${buttonID}' class='${buttonClass}' onclick='${buttonOnClick}'>${buttonIcon}</button>`;
			} else {
				buttonInnerHTML = `<button id='${buttonID}' class='${buttonClass}' onclick='${buttonOnClick}'></button>`;
			}

			boardHTML.innerHTML += buttonInnerHTML;
			count++;
		});
	});
};

showBoard();
countBlocksHorizontal();
countBlocksVertical();
switchMode();
