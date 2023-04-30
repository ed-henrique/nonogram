import "../css/index.css";
import {
	showBoard,
	showBlockCountHorizontal,
	showBlockCountVertical,
	listenBoardButtons,
} from "./ui.js";
import { switchMode } from "./mode-switch.js";

showBoard();
showBlockCountVertical();
showBlockCountHorizontal();
switchMode();
listenBoardButtons();
