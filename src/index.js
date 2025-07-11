import "./styles.css";
import { initDialogListeners } from "./dialog.js";
import { initProjectsDisplay } from "./interface.js";

const initApp = (() => {
  initProjectsDisplay();
  initDialogListeners();
})();