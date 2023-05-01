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
				if (showCross()) {
					board.markCell(i, j, true);

					buttonInnerHTML = `
					<button class="item">
						<i class="board-cross fa-solid fa-xmark"></i>
					</button>
					`;
				} else {
					buttonInnerHTML = `<button id='${buttonID}' class='${buttonClass}'></button>`;
				}
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
	let isDragging = false;
	const boardButtons = document.querySelectorAll(".item");

	boardHTML.addEventListener("mousedown", () => {
		isDragging = true;
	});

	boardHTML.addEventListener("mouseup", () => {
		isDragging = false;
	});

	boardButtons.forEach((button) => {
		button.addEventListener("click", (event) => {
			event.preventDefault();

			if (event.target.id) {
				const [row, column] = event.target.id.match(/\d+/g).map(Number);
				if (SQUARE_MODE && board.getCellValue(row, column)) {
					board.markCell(row, column, true);
					board.setMaskCellValue(row, column, true);
					const cellHTML = document.getElementById(event.target.id);
					cellHTML.outerHTML = `
					<button class="item2"></button>
					`;
				} else if (!SQUARE_MODE && !board.getCellValue(row, column)) {
					const cellHTML = document.getElementById(event.target.id);
					cellHTML.outerHTML = `
					<button class="item">
						<i class="board-cross fa-solid fa-xmark"></i>
					</button>
					`;
				}

				const { vertical, horizontal } = board.checkLines(row, column);

				if (vertical) {
					for (let i = 0; i < board.size; i++) {
						const cellHTML = document.getElementById(`${row}-${i}`);

						if (cellHTML === null) continue;

						board.markCell(row, i, true);

						cellHTML.outerHTML = `
						<button class="item">
							<i class="board-cross fa-solid fa-xmark"></i>
						</button>
						`;
					}
				}

				if (horizontal) {
					for (let i = 0; i < board.size; i++) {
						const cellHTML = document.getElementById(`${i}-${column}`);

						if (cellHTML === null) continue;

						board.markCell(i, column, true);

						cellHTML.outerHTML = `
						<button class="item">
							<i class="board-cross fa-solid fa-xmark"></i>
						</button>
						`;
					}
				}
			}
		});

		button.addEventListener("mousemove", (event) => {
			if (isDragging && isMouseOverButton(event, button)) {
				button.click();
			}
		});
	});

	function isMouseOverButton(event, button) {
		const rect = button.getBoundingClientRect();
		const mouseX = event.clientX;
		const mouseY = event.clientY;
		return (
			mouseX >= rect.left &&
			mouseX <= rect.right &&
			mouseY >= rect.top &&
			mouseY <= rect.bottom
		);
	}
};

export {
	showBoard,
	showBlockCountHorizontal,
	showBlockCountVertical,
	listenBoardButtons,
};
