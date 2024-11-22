/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./sudoku/src/Event.js":
/*!*****************************!*\
  !*** ./sudoku/src/Event.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Event)\n/* harmony export */ });\nclass Event {\n  constructor(app, viewer) {\n    this.app = app;\n    this.viewer = viewer;\n    this.appClickHandler;\n    this.numberPanelClickHandler;\n    this.backButtonClickHandler;\n    this.deleteButtonClickHandler;\n    this.selectHandler;\n  }\n  static init(app, viewer) {\n    return new Event(app, viewer);\n  }\n  setEvents() {\n    this.appClickHandler = event => {\n      let target = event.target;\n      if (target.classList.contains('sudoku__greed-item-empty')) {\n        this.viewer.removeFocus();\n        this.viewer.removeErrors();\n        this.viewer.setFocus(target);\n      }\n    };\n    this.numberPanelClickHandler = event => {\n      let target = event.target;\n      if (target.classList.contains('sudoku__panel-numbers-item')) {\n        let item = this.viewer.getFocusItem();\n        this.viewer.removeErrors();\n        if (item && !item.textContent) {\n          let value = target.textContent;\n          if (!this.app.checkError(item, value)) {\n            let coords = item.getAttribute('data-coords');\n            this.app.history.push([coords, value]);\n            coords = coords.split(this.viewer.split);\n            let y = coords[0];\n            let x = coords[1];\n            let i = coords[2];\n            this.app.greedList[y][x][i] = +value;\n            item.textContent = value;\n            this.viewer.removeFocus();\n          }\n        }\n      }\n    };\n    this.deleteButtonClickHandler = event => {\n      let item = this.viewer.getFocusItem();\n      this.viewer.removeFocus();\n      this.viewer.removeErrors();\n      this.viewer.clearValue(item);\n      this.viewer.removeFocus();\n      let coords = item.getAttribute('data-coords');\n      coords = coords.split(this.viewer.split);\n      let y = coords[0];\n      let x = coords[1];\n      let i = coords[2];\n      this.app.greedList[y][x][i] = 0;\n    };\n    this.backButtonClickHandler = event => {\n      if (this.app.history.length) {\n        this.viewer.removeFocus();\n        this.viewer.removeErrors();\n        let data = this.app.history.pop();\n        let coords = data[0].split(this.viewer.split);\n        let y = coords[0];\n        let x = coords[1];\n        let i = coords[2];\n        this.app.greedList[y][x][i] = 0;\n        this.viewer.setValueByCoords(y, x, i);\n      }\n    };\n    this.selectHandler = event => {\n      if (confirm('Start a new game?')) {\n        this.app.level = event.target.value;\n        this.removeEvents();\n        this.viewer.clear();\n        this.app.start();\n      } else {\n        this.viewer.setLevelToSelect(this.app.level);\n      }\n    };\n    this.viewer.app.addEventListener('click', this.appClickHandler);\n    this.viewer.numberPanel.addEventListener('click', this.numberPanelClickHandler);\n    this.viewer.backButton.addEventListener('click', this.backButtonClickHandler);\n    this.viewer.deleteButton.addEventListener('click', this.deleteButtonClickHandler);\n    this.viewer.levelSelect.addEventListener('change', this.selectHandler);\n  }\n  removeEvents() {\n    this.viewer.app.removeEventListener('click', this.appClickHandler);\n    this.viewer.numberPanel.removeEventListener('click', this.numberPanelClickHandler);\n    this.viewer.backButton.removeEventListener('click', this.backButtonClickHandler);\n    this.viewer.deleteButton.removeEventListener('click', this.deleteButtonClickHandler);\n    this.viewer.levelSelect.removeEventListener('change', this.selectHandler);\n  }\n}\n\n//# sourceURL=webpack://sudokugame/./sudoku/src/Event.js?");

/***/ }),

/***/ "./sudoku/src/Generator.js":
/*!*********************************!*\
  !*** ./sudoku/src/Generator.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Generator)\n/* harmony export */ });\nclass Generator {\n  constructor(greed) {\n    this.greed = greed;\n    this._greedList = [];\n  }\n  static init(greed) {\n    return new Generator(greed);\n  }\n  get greedList() {\n    return this._greedList;\n  }\n  generate() {\n    this.generateFirstRow();\n    this.generateBaseGreed();\n    this.flipVertically();\n    this.shuffleTheLines();\n    this.shuffleTheVerticalLines();\n    this.shuffleTheAreas();\n  }\n  random(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n  }\n  generateBaseGreed() {\n    for (let i = 1; i < this.greed; i++) {\n      let arr, part;\n      if (i < 3) {\n        arr = this._greedList[i - 1].concat([]);\n        part = arr.splice(0, 3);\n      } else {\n        arr = this._greedList[i - 3].concat([]);\n        part = arr.splice(0, 1);\n      }\n      this._greedList[i] = arr.concat(part);\n    }\n  }\n  generateFirstRow() {\n    let row = [];\n    while (true) {\n      let num = this.random(1, 9);\n      if (!row.includes(num)) {\n        row.push(num);\n      }\n      if (row.length === this.greed) {\n        break;\n      }\n    }\n    this._greedList.push(row);\n  }\n  flipVertically() {\n    let newList = [];\n    for (let y = 0; y < this.greed; y++) {\n      newList[y] = [];\n      for (let x = 0; x < this.greed; x++) {\n        newList[y][x] = this._greedList[x][y];\n      }\n    }\n    this._greedList = newList;\n  }\n  shuffleTheLines() {\n    let row0 = this._greedList[0];\n    this._greedList[0] = this._greedList[2];\n    this._greedList[2] = row0;\n    let row3 = this._greedList[3];\n    this._greedList[3] = this._greedList[5];\n    this._greedList[5] = row3;\n    let row6 = this._greedList[6];\n    this._greedList[6] = this._greedList[8];\n    this._greedList[8] = row6;\n  }\n  shuffleTheVerticalLines() {\n    for (let y = 0; y < this.greed; y++) {\n      let x0 = this._greedList[y][0];\n      this._greedList[y][0] = this._greedList[y][2];\n      this._greedList[y][2] = x0;\n      let x3 = this._greedList[y][3];\n      this._greedList[y][3] = this._greedList[y][5];\n      this._greedList[y][5] = x3;\n      let x6 = this._greedList[y][6];\n      this._greedList[y][6] = this._greedList[y][8];\n      this._greedList[y][8] = x6;\n    }\n  }\n  shuffleTheAreas() {\n    let row0 = this._greedList[0];\n    let row1 = this._greedList[1];\n    let row2 = this._greedList[2];\n    this._greedList[0] = this._greedList[3];\n    this._greedList[1] = this._greedList[4];\n    this._greedList[2] = this._greedList[5];\n    this._greedList[3] = row0;\n    this._greedList[4] = row1;\n    this._greedList[5] = row2;\n  }\n}\n\n//# sourceURL=webpack://sudokugame/./sudoku/src/Generator.js?");

/***/ }),

/***/ "./sudoku/src/Sudoku.js":
/*!******************************!*\
  !*** ./sudoku/src/Sudoku.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Sudoku)\n/* harmony export */ });\n/* harmony import */ var _Generator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Generator.js */ \"./sudoku/src/Generator.js\");\n/* harmony import */ var _Viewer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Viewer.js */ \"./sudoku/src/Viewer.js\");\n/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Event.js */ \"./sudoku/src/Event.js\");\n\n\n\nclass Sudoku {\n  constructor(elem, level) {\n    this.elem = elem;\n    this.greed = 9;\n    this.greedList = [];\n    this.greedOriginList = [];\n    this.generator = _Generator_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(this.greed);\n    this._level = level || 1;\n  }\n  static init(elem, level) {\n    return new Sudoku(elem, level);\n  }\n  start() {\n    this.correctAnswers = {};\n    this._history = [];\n    this.generator.generate();\n    this.greedOriginList = this.generator.greedList;\n    this.greedList = this.arrayClone(this.greedOriginList);\n    this.greedList = this.toChunk(this.greedList);\n    this.viewer = _Viewer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init(this.elem, this.greedList, this);\n    this.addGaps();\n    this.viewer.render();\n    this.event = _Event_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init(this, this.viewer);\n    this.event.setEvents();\n  }\n  toChunk(array) {\n    let greed = [];\n    let length = array.length;\n    for (let y = 0; y < length; y++) {\n      greed[y] = this.chunkArray(array[y], 3);\n    }\n    for (let y = 1; y < length; y++) {\n      if (y < 3) {\n        greed[0][0] = greed[0][0].concat(greed[y][0]);\n        greed[0][1] = greed[0][1].concat(greed[y][1]);\n        greed[0][2] = greed[0][2].concat(greed[y][2]);\n      }\n      if (y >= 4 && y <= 5) {\n        greed[3][0] = greed[3][0].concat(greed[y][0]);\n        greed[3][1] = greed[3][1].concat(greed[y][1]);\n        greed[3][2] = greed[3][2].concat(greed[y][2]);\n      }\n      if (y >= 7) {\n        greed[6][0] = greed[6][0].concat(greed[y][0]);\n        greed[6][1] = greed[6][1].concat(greed[y][1]);\n        greed[6][2] = greed[6][2].concat(greed[y][2]);\n      }\n    }\n    greed.splice(1, 2);\n    greed.splice(2, 2);\n    greed.splice(3, 2);\n    return greed;\n  }\n  chunkArray(array, chunkSize) {\n    let results = [];\n    while (array.length) {\n      results.push(array.splice(0, chunkSize));\n    }\n    return results;\n  }\n  addGaps() {\n    let gaps = Math.round(this.greed * this.greed / 2);\n    if (+this._level === 2) {\n      gaps += 10;\n    }\n    if (+this._level === 3) {\n      gaps += 20;\n    }\n    let occupiedCells = [];\n    while (true) {\n      let y = this.generator.random(0, 2);\n      let x = this.generator.random(0, 2);\n      let i = this.generator.random(0, this.greed - 1);\n      let key = y + this.viewer.split + x + this.viewer.split + i;\n      if (!occupiedCells.includes(key)) {\n        occupiedCells.push(key);\n        this.correctAnswers[key] = this.greedList[y][x][i];\n        this.greedList[y][x][i] = 0;\n      }\n      if (occupiedCells.length === gaps) {\n        break;\n      }\n    }\n  }\n  arrayClone(array) {\n    return JSON.parse(JSON.stringify(array));\n  }\n  checkError(item, value) {\n    let hasError = false;\n    let coords = item.getAttribute('data-coords');\n    let data = coords.split(this.viewer.split);\n    let y = +data[0];\n    let x = +data[1];\n    let i = +data[2];\n    this.greedList[y][x].forEach((item, index) => {\n      if (+value === item) {\n        this.viewer.setErrorByCoords(y, x, index);\n        hasError = true;\n      }\n    });\n\n    /*let yIndexes = [i, i+3, i-3];\r\n    let xIndexes = [i, i+1, i-1, i-2];*/\n    let yIndexes = [i, i + 3, i - 3];\n    let xIndexes = [i];\n    if ([0, 3, 6].includes(i)) {\n      xIndexes.push(i + 2);\n      xIndexes.push(i + 1);\n    }\n    if ([1, 5, 7].includes(i)) {\n      xIndexes.push(i + 1);\n    }\n    if ([2, 5, 8].includes(i)) {\n      xIndexes.push(i - 2);\n      xIndexes.push(i - 1);\n    }\n    if ([1, 4, 7].includes(i)) {\n      xIndexes.push(i - 1);\n    }\n    for (let j = 0; j < 3; j++) {\n      yIndexes.forEach(item => {\n        try {\n          if (y !== j && this.greedList[j][x][item] === +value) {\n            this.viewer.setErrorByCoords(j, x, item);\n            hasError = true;\n          }\n        } catch (e) {}\n      });\n      xIndexes.forEach(item => {\n        try {\n          if (x !== j && this.greedList[y][j][item] === +value) {\n            this.viewer.setErrorByCoords(y, j, item);\n            hasError = true;\n          }\n        } catch (e) {}\n      });\n    }\n    return hasError;\n  }\n  get history() {\n    return this._history;\n  }\n  get level() {\n    return this._level;\n  }\n  set level(value) {\n    this._level = value;\n  }\n}\n\n//# sourceURL=webpack://sudokugame/./sudoku/src/Sudoku.js?");

/***/ }),

/***/ "./sudoku/src/Viewer.js":
/*!******************************!*\
  !*** ./sudoku/src/Viewer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Viewer)\n/* harmony export */ });\nclass Viewer {\n  constructor(appTag, greedList, app) {\n    this.appSudoku = app;\n    this.greedList = greedList;\n    this.box;\n    this.numberGreed;\n    this._numberPanel;\n    this.panel;\n    this._app = document.querySelector(appTag);\n    this._split = ':';\n    this.backButton;\n    this.deleteButton;\n    this.levelSelect;\n  }\n  static init(appTag, greedList, app) {\n    return new Viewer(appTag, greedList, app);\n  }\n  render() {\n    this.box = this.createElement('div', 'sudoku__app');\n    this.numberGreed = this.createElement('div', 'sudoku__greed');\n    this.panel = this.createElement('div', 'sudoku__panel');\n    this.drawGreed();\n    this.drawPanel();\n    this.appendChild(this.box, [this.numberGreed, this.panel]);\n    this.app.appendChild(this.box);\n  }\n  drawPanel() {\n    this._numberPanel = this.createElement('div', 'sudoku__panel-numbers');\n    for (let i = 1; i < 10; i++) {\n      let item = this.createElement('div', 'sudoku__panel-numbers-item');\n      item.appendChild(document.createTextNode(i));\n      this._numberPanel.appendChild(item);\n    }\n    let controls = this.createElement('div', 'sudoku__controls');\n    this.backButton = this.createElement('div', 'sudoku__back-control');\n    this.deleteButton = this.createElement('div', 'sudoku__delete-control');\n    let divControlsWrapper = this.createElement('div', 'sudoku__wrapper-controls');\n    this.appendChild(divControlsWrapper, [this.backButton, this.deleteButton]);\n    this.levelSelect = this.createElement('select', 'sudoku__level-select-control');\n    let option1 = this.createElement('option');\n    let option2 = this.createElement('option');\n    let option3 = this.createElement('option');\n    switch (+this.appSudoku.level) {\n      case 1:\n        option1.setAttribute('selected', 'selected');\n        break;\n      case 2:\n        option2.setAttribute('selected', 'selected');\n        break;\n      case 3:\n        option3.setAttribute('selected', 'selected');\n        break;\n      default:\n        option1.setAttribute('selected', 'selected');\n        break;\n    }\n    option1.setAttribute('value', 1);\n    option2.setAttribute('value', 2);\n    option3.setAttribute('value', 3);\n    option1.textContent = 1;\n    option2.textContent = 2;\n    option3.textContent = 3;\n    let label = this.createElement('label');\n    label.textContent = 'Choose level: ';\n    let divSelectWrapper = this.createElement('div', 'sudoku__select-wrapper-control');\n    this.appendChild(divSelectWrapper, [label, this.levelSelect]);\n    this.appendChild(this.levelSelect, [option1, option2, option3]);\n    this.appendChild(controls, [divControlsWrapper, divSelectWrapper]);\n    this.appendChild(this.panel, [this._numberPanel, controls]);\n  }\n  drawGreed() {\n    for (let y = 0; y < this.greedList.length; y++) {\n      let row = this.createElement('div', 'sudoku__greed-row');\n      for (let x = 0; x < this.greedList[y].length; x++) {\n        let col = this.createElement('div', 'sudoku__greed-col');\n        row.appendChild(col);\n        for (let i = 0; i < this.greedList[y][x].length; i++) {\n          let item = this.createElement('div', 'sudoku__greed-item');\n          let value = this.greedList[y][x][i];\n          if (value !== 0) {\n            item.appendChild(document.createTextNode(value));\n            item.classList.add('sudoku__greed-item-no-empty');\n          } else {\n            item.classList.add('sudoku__greed-item-empty');\n          }\n          item.setAttribute('data-coords', y + this._split + x + this._split + i);\n          col.appendChild(item);\n        }\n      }\n      this.numberGreed.appendChild(row);\n    }\n  }\n  createElement(tag, className) {\n    let item = document.createElement(tag);\n    if (className) {\n      item.className = className;\n    }\n    return item;\n  }\n  appendChild(item, childs) {\n    childs.forEach(child => {\n      item.appendChild(child);\n    });\n  }\n  setFocus(target) {\n    target.classList.add('sudoku__greed-item-focus');\n  }\n  removeFocus() {\n    this.numberGreed.querySelectorAll('.sudoku__greed-item-focus').forEach(item => {\n      item.classList.remove('sudoku__greed-item-focus');\n    });\n  }\n  getFocusItem() {\n    return this.numberGreed.querySelector('.sudoku__greed-item-focus');\n  }\n  removeEmpty(item) {\n    item.classList.remove('sudoku__greed-item-empty');\n  }\n  setValueByCoords(y, x, i, value) {\n    value = value || '';\n    let item = this.numberGreed.querySelector('[data-coords=\"' + y + this.split + x + this.split + i + '\"]');\n    if (item) {\n      item.textContent = value;\n    }\n  }\n  getValueByCoords(y, x, i) {\n    let item = this.numberGreed.querySelector('[data-coords=\"' + y + this.split + x + this.split + i + '\"]');\n    return item.textContent;\n  }\n  clearValue(item) {\n    item.textContent = '';\n  }\n  setErrorByCoords(y, x, i) {\n    let item = this.numberGreed.querySelector('[data-coords=\"' + y + this.split + x + this.split + i + '\"]');\n    item.classList.add('sudoku__greed-item-error');\n  }\n  removeErrors() {\n    this.numberGreed.querySelectorAll('.sudoku__greed-item-error').forEach(item => {\n      item.classList.remove('sudoku__greed-item-error');\n    });\n  }\n  clear() {\n    while (this.app.firstChild) {\n      this.app.firstChild.remove();\n    }\n  }\n  setLevelToSelect(level) {\n    this.levelSelect.value = level;\n  }\n  get app() {\n    return this._app;\n  }\n  get numberPanel() {\n    return this._numberPanel;\n  }\n  get split() {\n    return this._split;\n  }\n}\n\n//# sourceURL=webpack://sudokugame/./sudoku/src/Viewer.js?");

/***/ }),

/***/ "./sudoku/src/sudoku-game.js":
/*!***********************************!*\
  !*** ./sudoku/src/sudoku-game.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Sudoku_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sudoku.js */ \"./sudoku/src/Sudoku.js\");\n\nwindow.Sudoku = _Sudoku_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n//# sourceURL=webpack://sudokugame/./sudoku/src/sudoku-game.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./sudoku/src/sudoku-game.js");
/******/ 	
/******/ })()
;