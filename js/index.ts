import "../css/index.css";
import {
	showBoard,
	showBlockCountHorizontal,
	showBlockCountVertical,
	listenBoardButtons,
} from "./ui";
import { setupSwitchButton } from "./mode-switch";

showBoard();
showBlockCountVertical();
showBlockCountHorizontal();
setupSwitchButton();
listenBoardButtons();
