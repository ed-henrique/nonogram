let SQUARE_MODE = false;

const switchMode = () => {
	SQUARE_MODE = !SQUARE_MODE;

	const switchButtonHTML = document.querySelector(".switch");

	switchButtonHTML.addEventListener("click", (event) => {
		SQUARE_MODE = !SQUARE_MODE;

		event.preventDefault();
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
	});
};

export { SQUARE_MODE, switchMode };
