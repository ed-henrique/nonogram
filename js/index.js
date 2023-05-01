import "../css/index.css";
import {
	showBoard,
	showBlockCountHorizontal,
	showBlockCountVertical,
	listenBoardButtons,
} from "./ui.js";
import { setupSwitchButton } from "./mode-switch.js";

showBoard();
showBlockCountVertical();
showBlockCountHorizontal();
setupSwitchButton();
listenBoardButtons();
