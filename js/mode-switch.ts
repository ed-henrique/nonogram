let SQUARE_MODE = true;

const switchButtonHTML = document.querySelector(".switch");

const toggleMode = () => {
	if (!switchButtonHTML) return;
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

const setupSwitchButton = () => {
	if (!switchButtonHTML) return;
	
	switchButtonHTML.addEventListener("click", (event) => {
		toggleMode();
		event.preventDefault();
	});
};

export { SQUARE_MODE, toggleMode, setupSwitchButton };
