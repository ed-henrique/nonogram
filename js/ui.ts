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
		});
	});
};

const showBlockCountVertical = () => {
	if (!boardValuesVerticalHTML) return;
	const blockNumberTotal = board.getBlockCountVertical();

	boardValuesVerticalHTML.innerHTML = blockNumberTotal
		.map(
			(blockCount) => `<p><span>${blockCount.join("</span><span>")}</span></p>`,
		)
		.join("");
};

const showBlockCountHorizontal = () => {
	if (!boardValuesHorizontalHTML) return;
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
	if (!boardHTML) return;

	let isDragging = false;
	const boardButtons = document.querySelectorAll(".item");

	boardHTML.addEventListener("mousedown", () => {
		isDragging = true;

		boardButtons.forEach((button: HTMLButtonElement) => {
			button.addEventListener("click", (event: Event) => {
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
					} else {
						throw new Error("Invalid Target ID");
					}
				}
			});

			button.addEventListener("mousemove", (event) => {
				//if (isDragging && isMouseOverButton(event, button)) {
				if (isDragging && isMouseOverRowOrColumn(event, board.size)) {
					button.click();
				}
			});
		});
	});

	document.addEventListener("mouseup", () => {
		isDragging = false;
	});

	function isMouseOverRowOrColumn(event: MouseEvent, N: number) {
		const fallbackValue = 10;
		const matrixRect = boardHTML?.getBoundingClientRect();
		const gap = 3;
		const totalGapWidth = gap * (N - 1);
		const buttonWidth =
			(matrixRect?.width ?? fallbackValue - totalGapWidth) / N;
		const buttonHeight =
			(matrixRect?.height ?? fallbackValue - totalGapWidth) / N;
		const mouseX = event.clientX - (matrixRect?.left ?? fallbackValue);
		const mouseY = event.clientY - (matrixRect?.top ?? fallbackValue);
		const row = Math.floor(mouseY / (buttonHeight + gap));
		const col = Math.floor(mouseX / (buttonWidth + gap));
		const rowBounds = {
			top: row * (buttonHeight + gap),
			bottom: (row + 1) * buttonHeight + row * gap,
		};
		const colBounds = {
			left: col * (buttonWidth + gap),
			right: (col + 1) * buttonWidth + col * gap,
		};

		// console.log(rowBounds, colBounds);

		if (mouseX >= colBounds.left && mouseX <= colBounds.right) {
			for (let i = 0; i < N; i++) {
				const buttonTop = i * (buttonHeight + gap);
				const buttonBottom = (i + 1) * buttonHeight + i * gap;
				if (mouseY >= buttonTop && mouseY <= buttonBottom) {
					return true;
				}
			}
		} else if (mouseY >= rowBounds.top && mouseY <= rowBounds.bottom) {
			for (let i = 0; i < N; i++) {
				const buttonLeft = i * (buttonWidth + gap);
				const buttonRight = (i + 1) * buttonWidth + i * gap;
				if (mouseX >= buttonLeft && mouseX <= buttonRight) {
					return true;
				}
			}
		}

		return false;
	}

	/*function isMouseOverButton(event, button) {
		const rect = button.getBoundingClientRect();
		const mouseX = event.clientX;
		const mouseY = event.clientY;
		return (
			mouseX >= rect.left &&
			mouseX <= rect.right &&
			mouseY >= rect.top &&
			mouseY <= rect.bottom
		);
	}*/
};

export {
	showBoard,
	showBlockCountHorizontal,
	showBlockCountVertical,
	listenBoardButtons,
};
