import { BOARD_SIZE, RANDOMNESS } from "./constants.js";

class Cell {
	constructor(value = this.#cellValue()) {
		this.value = value;
		this.marked = false;
	}

	#cellValue() {
		return Math.random() < RANDOMNESS;
	}

	mark() {
		this.marked = true;
	}

	unmark() {
		this.marked = false;
	}

	isMarked() {
		return this.marked;
	}

	getValue() {
		return this.value;
	}

	setValue(value) {
		this.value = value;
	}
}

class Board {
	constructor(size) {
		this.size = size;
		this.grid = Array.from({ length: size }, () =>
			Array.from({ length: size }, () => new Cell()),
		);
		this.gridMask = Array.from({ length: size }, () =>
			Array.from({ length: size }, () => new Cell(false)),
		);
		this.blockCountVertical = this.#blockCountVerticalValues();
		this.blockCountHorizontal = this.#blockCountHorizontalValues();
	}

	getBlockCountVertical() {
		return this.blockCountVertical;
	}

	getBlockCountHorizontal() {
		return this.blockCountHorizontal;
	}

	getCell(x, y, mask = false) {
		const grid = mask ? this.gridMask : this.grid;
		return x < 0 || y < 0 || x >= this.size || y >= this.size
			? null
			: grid[x][y];
	}

	getCellValue(x, y, mask = false) {
		const grid = mask ? this.gridMask : this.grid;
		return x < 0 || y < 0 || x >= this.size || y >= this.size
			? null
			: grid[x][y].value;
	}

	setMaskCellValue(x, y, value) {
		x < 0 || y < 0 || x >= this.size || y >= this.size
			? null
			: this.gridMask[x][y].setValue(value);
	}

	markCell(x, y, mask = false) {
		const cell = mask ? this.getCell(x, y, mask) : this.getCell(x, y);
		if (cell) {
			cell.mark();
		}
	}

	unmarkCell(x, y, mask = false) {
		const cell = mask ? this.getCell(x, y, mask) : this.getCell(x, y);
		if (cell) {
			cell.unmark();
		}
	}

	isCellMarked(x, y, mask = false) {
		const cell = mask ? this.getCell(x, y, mask) : this.getCell(x, y);
		return cell ? cell.isMarked() : false;
	}

	#blockCountVerticalValues() {
		const blockNumberTotal = [];

		for (let i = 0; i < this.size; i++) {
			let counter = 0;
			const blockNumber = [];
			for (let j = 0; j < this.size; j++) {
				const cell = this.getCellValue(j, i);
				if (cell) {
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
		return blockNumberTotal;
	}

	#blockCountHorizontalValues() {
		const blockNumberTotal = [];

		for (let i = 0; i < this.size; i++) {
			let counter = 0;
			const blockNumber = [];
			for (let j = 0; j < this.size; j++) {
				const cell = this.getCellValue(i, j);
				if (cell) {
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
		return blockNumberTotal;
	}

	checkLines(x, y) {
		let checkLinesVertical = true;
		for (let i = 0; i < this.size; i++) {
			const cell = this.getCellValue(x, i);
			const cellMask = this.getCellValue(x, i, true);

			if (cell !== cellMask) {
				checkLinesVertical = false;
				break;
			}
		}

		let checkLinesHorizontal = true;
		for (let i = 0; i < this.size; i++) {
			const cell = this.getCellValue(i, y);
			const cellMask = this.getCellValue(i, y, true);

			if (cell !== cellMask) {
				checkLinesHorizontal = false;
				break;
			}
		}

		return {
			vertical: checkLinesVertical,
			horizontal: checkLinesHorizontal,
		};
	}

	checkWin() {
		return (
			gridMask.length === grid.length &&
			gridMask.every((row, i) => row.every((val, j) => val === grid[i][j]))
		);
	}
}

const board = new Board(BOARD_SIZE);

export { board };
