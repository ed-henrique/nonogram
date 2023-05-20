import { board } from "./board";
import { RANDOMNESS } from "./constants";
import { SQUARE_MODE } from "./mode-switch";

const boardHTML = document.querySelector(".board");
const boardValuesVerticalHTML = document.querySelector(
	".board-values-vertical",
);
const boardValuesHorizontalHTML = document.querySelector(
	".board-values-horizontal",
);

const showCross = () => Math.random() < RANDOMNESS / 5;

const showBoard = () => {
	if (!boardHTML) return;
	boardHTML.innerHTML = "";

	board.gridMask.forEach((line, i) => {
		line.forEach((_cell, j) => {
			const buttonID = `${i}-${j}`;
			const buttonClass = "item draggable-button";
			const isCellValueEmpty = !board.getCellValue(i, j);

			let buttonInnerHTML = "";
			if (isCellValueEmpty) {
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
		});
	});
};

const showBlockCount = (blockNumberTotal: number[][], orientation: boolean) =>
	blockNumberTotal
		.map(
			(blockCount) =>
				`<p><span${orientation ? ' class="vertical"' : ""}>${blockCount.join(
					`</span><span ${orientation ? ' class="vertical"' : ""}>`,
				)}</span></p>`,
		)
		.join("");

const showBlockCountVertical = () => {
	if (!boardValuesVerticalHTML) return;
	const blockNumberTotal = board.getBlockCountVertical();
	boardValuesVerticalHTML.innerHTML = showBlockCount(blockNumberTotal, false);
};

const showBlockCountHorizontal = () => {
	if (!boardValuesHorizontalHTML) return;
	const blockNumberTotal = board.getBlockCountHorizontal();
	boardValuesHorizontalHTML.innerHTML = showBlockCount(blockNumberTotal, true);
};

const listenBoardButtons = () => {
	if (!boardHTML) return;

	let prevMouseX = 0;
	let prevMouseY = 0;
	let isDragging = false;
	let rowBounds = { top: Infinity, bottom: Infinity };
	let columnBounds = { left: Infinity, right: Infinity };
	const boardButtons = document.querySelectorAll(".item");

	boardHTML.addEventListener("mousedown", (eventGlobal: MouseEvent) => {
		isDragging = true;

		boardButtons.forEach((button: HTMLButtonElement) => {
			button.addEventListener("click", (event) => {
				event.preventDefault();
				const target = event.target as HTMLElement;

				if (target?.id) {
					const matchResult = target.id.match(/\d+/g);
					if (matchResult && matchResult.length === 2) {
						const [row = 0, column = 0] = matchResult
							.filter(Boolean)
							.map(Number);

						if (SQUARE_MODE && board.getCellValue(row, column)) {
							board.markCell(row, column, true);
							board.setMaskCellValue(row, column, true);
							const cellHTML = document.getElementById(target.id);
							if (!cellHTML) return;
							cellHTML.outerHTML = `
								<button class="item2"></button>
							`;
						} else if (!SQUARE_MODE && !board.getCellValue(row, column)) {
							const cellHTML = document.getElementById(target.id);
							if (!cellHTML) return;
							cellHTML.outerHTML = `
								<button class="item">
								<i class="board-cross fa-solid fa-xmark"></i>
								</button>
							`;
						} else {
							isDragging = false;
						}

						const { vertical, horizontal } = board.checkLines(row, column);

						if (vertical) {
							for (let i = 0; i < board.size; i++) {
								const cellHTML = document.getElementById(`${row}-${i}`);
								if (!cellHTML) continue;
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
								if (!cellHTML) continue;
								board.markCell(i, column, true);
								cellHTML.outerHTML = `
									<button class="item">
									<i class="board-cross fa-solid fa-xmark"></i>
									</button>
								`;
							}
						}
					} else {
						throw new Error("Invalid Target ID");
					}
				}
			});

			button.addEventListener("mousemove", (eventLocal: MouseEvent) => {
				const mouseX = eventGlobal.clientX;
				const mouseY = eventGlobal.clientY;

				if (Math.abs(mouseX - prevMouseX) >= 30) {
					getRowAndColumnBounds(eventLocal, true);
					prevMouseX = mouseX;
				} else if (Math.abs(mouseY - prevMouseY) >= 30) {
					getRowAndColumnBounds(eventLocal, false);
					prevMouseY = mouseY;
				}

				if (isDragging && isMouseOverRowOrColumn(eventLocal)) {
					button.click();
				}
			});
		});
	});

	document.addEventListener("mouseup", (e) => {
		e.preventDefault();
		isDragging = false;
		boardHTML.removeEventListener("mousedown", () => {});
		rowBounds = { top: Infinity, bottom: Infinity };
		columnBounds = { left: Infinity, right: Infinity };
	});

	function getRowAndColumnBounds(event: MouseEvent, orientation: boolean) {
		const matrixRect = boardHTML?.getBoundingClientRect();
		if (
			!matrixRect ||
			matrixRect.left === undefined ||
			matrixRect.top === undefined
		) {
			throw new Error("Failed to calculate border dimensions");
		} else {
			const gap = 3;
			const buttonSize = 30;
			const mouseX = event.clientX - matrixRect.left;
			const mouseY = event.clientY - matrixRect.top;
			const row = Math.floor(mouseY / (buttonSize + gap));
			const col = Math.floor(mouseX / (buttonSize + gap));

			if (orientation) {
				rowBounds = {
					top: row * (buttonSize + gap),
					bottom: row * (buttonSize + gap) + 30,
				};
				columnBounds = {
					left: 0,
					right: matrixRect.right - matrixRect.left,
				};
			} else {
				rowBounds = {
					top: 0,
					bottom: matrixRect.bottom - matrixRect.top,
				};
				columnBounds = {
					left: col * (buttonSize + gap),
					right: col * (buttonSize + gap) + 30,
				};
			}

			if (rowBounds.top === 0) {
				console.log({ mouseX, mouseY, rowBounds, columnBounds });
			}
		}
	}

	function isMouseOverRowOrColumn(event: MouseEvent) {
		const matrixRect = boardHTML?.getBoundingClientRect();
		if (
			!matrixRect ||
			matrixRect.left === undefined ||
			matrixRect.top === undefined
		) {
			throw new Error("Failed to calculate border dimensions");
		} else {
			const mouseX = event.clientX - matrixRect.left;
			const mouseY = event.clientY - matrixRect.top;
			return (
				mouseX >= columnBounds.left &&
				mouseX <= columnBounds.right &&
				mouseY >= rowBounds.top &&
				mouseY <= rowBounds.bottom
			);
		}
	}
};

export {
	showBoard,
	showBlockCountHorizontal,
	showBlockCountVertical,
	listenBoardButtons,
};
