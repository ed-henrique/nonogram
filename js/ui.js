import { board } from "./board.js";
import { RANDOMNESS } from "./constants.js";
import { SQUARE_MODE } from "./mode-switch.js";

const boardHTML = document.querySelector(".board");
const boardValuesVerticalHTML = document.querySelector(
	".board-values-vertical",
);
const boardValuesHorizontalHTML = document.querySelector(
	".board-values-horizontal",
);

const showCross = () => Math.random() < RANDOMNESS / 5;

const showBoard = () => {
	let count = 0;
	boardHTML.innerHTML = "";

	board.gridMask.forEach((line, i) => {
		line.forEach((_cell, j) => {
			const buttonID = `${i}-${j}`;
			const buttonClass = "item draggable-button";

			let buttonInnerHTML = "";
			if (!board.getCellValue(i, j)) {
				const buttonIcon = showCross()
					? "<i class='board-cross fa-solid fa-xmark'></i>"
					: "";
				buttonInnerHTML = `<button id='${buttonID}' class='${buttonClass}'>${buttonIcon}</button>`;
			} else {
				buttonInnerHTML = `<button id='${buttonID}' class='${buttonClass}'></button>`;
			}

			boardHTML.innerHTML += buttonInnerHTML;
			count++;
		});
	});
};

const showBlockCountVertical = () => {
	const blockNumberTotal = board.getBlockCountVertical();

	boardValuesVerticalHTML.innerHTML = blockNumberTotal
		.map(
			(blockCount) => `<p><span>${blockCount.join("</span><span>")}</span></p>`,
		)
		.join("");
};

const showBlockCountHorizontal = () => {
	const blockNumberTotal = board.getBlockCountHorizontal();

	boardValuesHorizontalHTML.innerHTML = blockNumberTotal
		.map(
			(blockCount) =>
				`<p><span class="vertical">${blockCount.join(
					'</span><span class="vertical">',
				)}</span></p>`,
		)
		.join("");
};

const listenBoardButtons = () => {
	const boardButtons = document.querySelectorAll(".item");

	boardButtons.forEach((button) => {
		button.addEventListener("click", (event) => {
			event.preventDefault();
			const [i, j] = event.target.id.match(/\d+/g).map(Number);
			if (SQUARE_MODE && board.getCellValue(i, j)) {
				board.setMaskCellValue(i, j, true);
				const cellHTML = document.getElementById(event.target.id);
				cellHTML.outerHTML = `
				<button class="item2"></button>
				`;
			} else if (!SQUARE_MODE && !board.getCellValue(i, j)) {
				const cellHTML = document.getElementById(event.target.id);
				cellHTML.outerHTML = `
				<button class="item">
					<i class="board-cross fa-solid fa-xmark"></i>
				</button>
				`;
			}
		});
	});
};

export {
	showBoard,
	showBlockCountHorizontal,
	showBlockCountVertical,
	listenBoardButtons,
};
