/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mfm_classes_Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mfm/classes/Tile */ "./src/mfm/classes/Tile.ts");
/* harmony import */ var _mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mfm/classes/ElementTypes */ "./src/mfm/classes/ElementTypes.ts");
/* harmony import */ var _mfm_utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mfm/utils/utils */ "./src/mfm/utils/utils.ts");
/* harmony import */ var _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mfm/classes/Atom */ "./src/mfm/classes/Atom.ts");




let g = new _mfm_classes_Tile__WEBPACK_IMPORTED_MODULE_0__["Tile"](48, 48);
var sketch = (p) => {
    let siteSize = 14;
    let gridOffset = 20;
    p.preload = () => { };
    p.setup = () => {
        p.createCanvas(700, 700);
    };
    //   p.windowResized = () => {
    //     p.resizeCanvas(p.windowWidth - 50, p.windowHeight - 50);
    //   };
    //Establish the elment colors here
    let colors = new Map();
    colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY, p.color(32, 32, 32, 127));
    colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].DREG, p.color(255, 32, 32));
    colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES, p.color(32, 255, 64));
    colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].WALL, p.color(32, 32, 255));
    colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON, p.color(32, 255, 255));
    colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].FORK_BOMB, p.color(170, 32, 32));
    colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].ANTI_FORK_BOMB, p.color(127, 127, 32));
    let drawGrid = (p, t) => {
        p.push();
        p.translate(gridOffset, gridOffset);
        t.sites.forEach((site) => {
            p.stroke(0, 0, 0, 0);
            p.fill(colors.get(site.atom.type));
            p.ellipse(site.tilePos.col * siteSize, site.tilePos.row * siteSize, siteSize, siteSize);
        });
        p.pop();
    };
    let run = () => {
        let speed = 1000;
        for (var i = 0; i < speed; i++) {
            let ew = _mfm_utils_utils__WEBPACK_IMPORTED_MODULE_2__["MFMUtils"].GenerateEventWindow(g, g.width, g.height);
            ew.origin.atom.exec(ew);
        }
    };
    let getSiteFromCanvasXY = (x, y) => {
        x = x - gridOffset + siteSize * 0.5;
        y = y - gridOffset + siteSize * 0.5;
        x = (x / siteSize) >> 0;
        y = (y / siteSize) >> 0;
        return g.getSiteByCoord({ row: y, col: x });
    };
    p.draw = () => {
        p.background(100);
        drawGrid(p, g);
        run();
    };
    let handleClick = () => {
        let site = getSiteFromCanvasXY(p.mouseX, p.mouseY);
        if (site) {
            if (p.keyIsPressed) {
                switch (p.keyCode) {
                    case 114: //r
                        site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES);
                        break;
                    case 119: //w
                        site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].WALL);
                        break;
                    case 113: //q
                        site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON);
                        break;
                    case 101: //e
                        site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY);
                        break;
                    case 98: //b
                        site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].FORK_BOMB);
                        break;
                    case 97: //a
                        site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].ANTI_FORK_BOMB);
                        break;
                }
            }
            else {
                site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].DREG);
            }
        }
    };
    p.mouseDragged = handleClick;
    p.mouseClicked = handleClick;
};
let sketchP = new p5(sketch);


/***/ }),

/***/ "./src/mfm/classes/Atom.ts":
/*!*********************************!*\
  !*** ./src/mfm/classes/Atom.ts ***!
  \*********************************/
/*! exports provided: Atom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Atom", function() { return Atom; });
/* harmony import */ var _ElementTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ElementTypes */ "./src/mfm/classes/ElementTypes.ts");

class Atom {
    constructor(_type = _ElementTypes__WEBPACK_IMPORTED_MODULE_0__["ElementTypes"].EMPTY, params) {
        this.type = _type;
        if (params) {
            this.elem = new this.type.class(...params);
        }
        else {
            this.elem = new this.type.class();
        }
    }
    exec(ew) {
        this.elem.exec(ew);
    }
}


/***/ }),

/***/ "./src/mfm/classes/Elem.ts":
/*!*********************************!*\
  !*** ./src/mfm/classes/Elem.ts ***!
  \*********************************/
/*! exports provided: Elem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Elem", function() { return Elem; });
class Elem {
    constructor(_name, _type, _moveability = 100, _destroyability = 100) {
        this.name = _name;
        this.type = _type;
        this.moveability = _moveability;
        this.destroyability = _destroyability;
    }
    exec(ew) { }
}


/***/ }),

/***/ "./src/mfm/classes/ElementTypes.ts":
/*!*****************************************!*\
  !*** ./src/mfm/classes/ElementTypes.ts ***!
  \*****************************************/
/*! exports provided: ElementTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementTypes", function() { return ElementTypes; });
/* harmony import */ var _elements_EmptyElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/EmptyElement */ "./src/mfm/classes/elements/EmptyElement.ts");
/* harmony import */ var _elements_DRegElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/DRegElement */ "./src/mfm/classes/elements/DRegElement.ts");
/* harmony import */ var _elements_ResElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements/ResElement */ "./src/mfm/classes/elements/ResElement.ts");
/* harmony import */ var _elements_WallElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements/WallElement */ "./src/mfm/classes/elements/WallElement.ts");
/* harmony import */ var _elements_MasonElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elements/MasonElement */ "./src/mfm/classes/elements/MasonElement.ts");
/* harmony import */ var _elements_ForkBombElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./elements/ForkBombElement */ "./src/mfm/classes/elements/ForkBombElement.ts");
/* harmony import */ var _elements_AntiForkBombElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./elements/AntiForkBombElement */ "./src/mfm/classes/elements/AntiForkBombElement.ts");







class ElementTypes {
    static registerType(name, type, c) {
        this.TYPES_ARRAY.push({ name, type, class: c });
    }
}
ElementTypes.EMPTY = { name: "EMPTY", type: "E", class: _elements_EmptyElement__WEBPACK_IMPORTED_MODULE_0__["EmptyElement"] };
ElementTypes.DREG = { name: "DREG", type: "D", class: _elements_DRegElement__WEBPACK_IMPORTED_MODULE_1__["DRegElement"] };
ElementTypes.RES = { name: "RES", type: "R", class: _elements_ResElement__WEBPACK_IMPORTED_MODULE_2__["ResElement"] };
ElementTypes.WALL = { name: "WALL", type: "W", class: _elements_WallElement__WEBPACK_IMPORTED_MODULE_3__["WallElement"] };
ElementTypes.MASON = { name: "MASON", type: "Ma", class: _elements_MasonElement__WEBPACK_IMPORTED_MODULE_4__["MasonElement"] };
ElementTypes.FORK_BOMB = { name: "FORK BOMB", type: "Fb", class: _elements_ForkBombElement__WEBPACK_IMPORTED_MODULE_5__["ForkBombElement"] };
ElementTypes.ANTI_FORK_BOMB = { name: "ANTI FORK BOMB", type: "Af", class: _elements_AntiForkBombElement__WEBPACK_IMPORTED_MODULE_6__["AntiForkBombElement"] };
ElementTypes.TYPES_ARRAY = [
    ElementTypes.EMPTY,
    ElementTypes.DREG,
    ElementTypes.RES,
    ElementTypes.WALL,
    ElementTypes.MASON,
    ElementTypes.FORK_BOMB,
    ElementTypes.ANTI_FORK_BOMB
];


/***/ }),

/***/ "./src/mfm/classes/Eventwindow.ts":
/*!****************************************!*\
  !*** ./src/mfm/classes/Eventwindow.ts ***!
  \****************************************/
/*! exports provided: EventWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventWindow", function() { return EventWindow; });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/mfm/utils/utils.ts");
/* harmony import */ var _ElementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ElementTypes */ "./src/mfm/classes/ElementTypes.ts");


//Event window as describbed here: http://robust.cs.unm.edu/lib/exe/fetch.php?w=300&tok=4c8f49&media=dev:event-window-10.png
//Collection of sites which contain atoms, built from an origin (center) site
class EventWindow {
    constructor(_tile, _origin) {
        this.tile = _tile;
        this.makeWindow(_tile, _origin);
    }
    makeWindow(tile, origin) {
        this.window = new Map();
        this.origin = this.tile.getSiteByCoord(origin);
        //if the origin is EMPTY Element, let's save some cycles (good, bad?)
        if (this.origin.atom.type === _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY)
            return;
        this.window.set(this.origin.id, this.origin);
        let windowArray = EventWindow.WINDOW_ORDER_OFFSETS.map((offset) => {
            return this.OffsetFromOrigin(origin, offset.row, offset.col);
        });
        windowArray.forEach((tileCoord) => {
            let site = tile.getSiteByCoord(tileCoord);
            if (site) {
                this.window.set(site.id, site);
            }
        });
    }
    OffsetFromOrigin(origin, rowOffset, colOffset) {
        return { row: origin.row + rowOffset, col: origin.col + colOffset };
    }
    getSiteByIndex(index) {
        let wa = Array.from(this.window.values());
        if (index >= wa.length || index < 0) {
            return undefined;
        }
        return wa[index];
    }
    getRandom(specificType = undefined) {
        return this.getSiteFromCandidates(Array.from(this.window.values()), true, specificType);
    }
    //most useful when using specificType
    //traverses the window until it comes across what you're looking for
    getNearest(specificType = undefined) {
        return this.getSiteFromCandidates(Array.from(this.window.values()), false, specificType);
    }
    getEast() {
        return this.getDirection(EventWindow.EW_EAST);
    }
    getWest() {
        return this.getDirection(EventWindow.EW_WEST);
    }
    getNorth() {
        return this.getDirection(EventWindow.EW_NORTH);
    }
    getSouth() {
        return this.getDirection(EventWindow.EW_SOUTH);
    }
    getNorthWest() {
        return this.getDirection(EventWindow.EW_NORTHWEST);
    }
    getSouthWest() {
        return this.getDirection(EventWindow.EW_SOUTHWEST);
    }
    getNorthEast() {
        return this.getDirection(EventWindow.EW_NORTHEAST);
    }
    getSouthEast() {
        return this.getDirection(EventWindow.EW_SOUTHEAST);
    }
    getAdjacent4Way(randomize = true, specificType = undefined) {
        return this.getSiteFromCandidates([this.getWest(), this.getNorth(), this.getSouth(), this.getEast()], randomize, specificType);
    }
    getAdjacent8Way(randomize = true, specificType = undefined) {
        return this.getSiteFromCandidates([
            this.getWest(),
            this.getNorth(),
            this.getSouth(),
            this.getEast(),
            this.getNorthWest(),
            this.getSouthWest(),
            this.getNorthEast(),
            this.getSouthEast()
        ], randomize, specificType);
    }
    //Given an array of candidate sites (symmetries in the future I hope),
    //give me back one, random by default, not filtered by type by default
    getSiteFromCandidates(candidateSites, randomize = true, specificType = undefined) {
        candidateSites = candidateSites.filter(site => {
            if (!site)
                return false;
            if (!specificType) {
                return site;
            }
            else if (specificType && site.atom.type === specificType) {
                return site;
            }
            return false;
        });
        //no sites! yikes! possible!?! probably only when using specificType and looking for a rare element
        if (candidateSites.length < 1) {
            return undefined;
        }
        //return random
        if (randomize) {
            return candidateSites[(Math.random() * candidateSites.length) >> 0];
        }
        //return first matching
        return candidateSites[0];
    }
    getDirection(direction) {
        let site = this.tile.sites.get(_utils_utils__WEBPACK_IMPORTED_MODULE_0__["MFMUtils"].CtoID(this.OffsetFromOrigin(this.origin.tilePos, direction.row, direction.col)));
        if (site) {
            return site;
        }
        return undefined;
    }
}
EventWindow.WINDOW_ORDER_OFFSETS = [
    { col: 0, row: 0 },
    { col: -1, row: 0 },
    { col: 0, row: -1 },
    { col: 0, row: 1 },
    { col: 1, row: 0 },
    { col: -1, row: -1 },
    { col: -1, row: 1 },
    { col: 1, row: -1 },
    { col: 1, row: 1 },
    { col: -2, row: 0 },
    { col: 0, row: -1 },
    { col: 0, row: 2 },
    { col: 2, row: 0 },
    { col: -2, row: -1 },
    { col: -2, row: 1 },
    { col: -1, row: -2 },
    { col: -1, row: 2 },
    { col: 1, row: -2 },
    { col: 1, row: 2 },
    { col: 2, row: -1 },
    { col: 2, row: 1 },
    { col: -3, row: 0 },
    { col: 0, row: -3 },
    { col: 0, row: 3 },
    { col: 3, row: 0 },
    { col: -2, row: -2 },
    { col: -2, row: 2 },
    { col: 2, row: -2 },
    { col: 2, row: 2 },
    { col: -3, row: -1 },
    { col: -3, row: 1 },
    { col: -1, row: -3 },
    { col: -1, row: 3 },
    { col: 1, row: -3 },
    { col: 1, row: 3 },
    { col: 3, row: -1 },
    { col: 3, row: 1 },
    { col: -4, row: 0 },
    { col: 0, row: -4 },
    { col: 0, row: 4 },
    { col: 4, row: 0 }
];
//because, lazy
EventWindow.EW_WEST = { col: -1, row: 0 };
EventWindow.EW_EAST = { col: 1, row: 0 };
EventWindow.EW_NORTH = { col: 0, row: -1 };
EventWindow.EW_SOUTH = { col: 0, row: 1 };
EventWindow.EW_NORTHWEST = { col: -1, row: -1 };
EventWindow.EW_SOUTHWEST = { col: -1, row: 1 };
EventWindow.EW_NORTHEAST = { col: 1, row: -1 };
EventWindow.EW_SOUTHEAST = { col: 1, row: 1 };


/***/ }),

/***/ "./src/mfm/classes/Site.ts":
/*!*********************************!*\
  !*** ./src/mfm/classes/Site.ts ***!
  \*********************************/
/*! exports provided: Site */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Site", function() { return Site; });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/mfm/utils/utils.ts");
/* harmony import */ var _Atom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Atom */ "./src/mfm/classes/Atom.ts");
/* harmony import */ var _ElementTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ElementTypes */ "./src/mfm/classes/ElementTypes.ts");



class Site {
    constructor(_pos) {
        this.tilePos = _pos;
        this.id = _utils_utils__WEBPACK_IMPORTED_MODULE_0__["MFMUtils"].CtoID(this.tilePos);
        this.create();
    }
    //if targetSite is killable
    //kill its atom (replace with empty)
    killAtom(targetSite) {
        let kill = Math.random() * 100 < targetSite.atom.elem.destroyability;
        if (kill) {
            targetSite.atom = new _Atom__WEBPACK_IMPORTED_MODULE_1__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_2__["ElementTypes"].EMPTY);
        }
    }
    killSelf(leavingAtom = new _Atom__WEBPACK_IMPORTED_MODULE_1__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_2__["ElementTypes"].EMPTY)) {
        this.atom = leavingAtom;
    }
    //if target site is killable
    //move this atom to targetSite, and leave behind leavingAtom, which by default is empty
    moveAtom(targetSite, leavingAtom = new _Atom__WEBPACK_IMPORTED_MODULE_1__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_2__["ElementTypes"].EMPTY)) {
        if (targetSite && targetSite.canDestroy()) {
            [this.atom, targetSite.atom] = [leavingAtom, this.atom];
        }
    }
    //if targetSite is moveable
    //swap atoms with this one
    swapAtoms(targetSite) {
        if (targetSite && targetSite.canMove()) {
            [this.atom, targetSite.atom] = [targetSite.atom, this.atom];
        }
    }
    mutateSite(targetSite, newAtom) {
        if (targetSite && targetSite.canDestroy()) {
            targetSite.atom = newAtom;
        }
    }
    canDestroy() {
        return Math.random() * 100 < this.atom.elem.destroyability;
    }
    canMove() {
        return Math.random() * 100 < this.atom.elem.moveability;
    }
    create() {
        this.atom = new _Atom__WEBPACK_IMPORTED_MODULE_1__["Atom"]();
    }
}


/***/ }),

/***/ "./src/mfm/classes/Tile.ts":
/*!*********************************!*\
  !*** ./src/mfm/classes/Tile.ts ***!
  \*********************************/
/*! exports provided: Tile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tile", function() { return Tile; });
/* harmony import */ var _Site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Site */ "./src/mfm/classes/Site.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ "./src/mfm/utils/utils.ts");


class Tile {
    constructor(_width = 1, _height = 1) {
        this.width = _width;
        this.height = _height;
        this.create();
    }
    getSiteByCoord(c) {
        return this.sites.get(_utils_utils__WEBPACK_IMPORTED_MODULE_1__["MFMUtils"].CtoID(c));
    }
    getRandomSite() {
        let rr = (Math.random() * this.height) >> 0;
        let rc = (Math.random() * this.width) >> 0;
        return this.sites.get(`${rr}:${rc}`);
    }
    create() {
        this.sites = new Map();
        for (let i = 0; i < this.width; i++) {
            //across columns
            for (let j = 0; j < this.height; j++) {
                //down rows
                this.sites.set(`${j}:${i}`, new _Site__WEBPACK_IMPORTED_MODULE_0__["Site"]({ row: j, col: i }));
            }
        }
    }
}


/***/ }),

/***/ "./src/mfm/classes/elements/AntiForkBombElement.ts":
/*!*********************************************************!*\
  !*** ./src/mfm/classes/elements/AntiForkBombElement.ts ***!
  \*********************************************************/
/*! exports provided: AntiForkBombElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AntiForkBombElement", function() { return AntiForkBombElement; });
/* harmony import */ var _Elem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Elem */ "./src/mfm/classes/Elem.ts");
/* harmony import */ var _ElementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ElementTypes */ "./src/mfm/classes/ElementTypes.ts");
/* harmony import */ var _Atom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Atom */ "./src/mfm/classes/Atom.ts");



class AntiForkBombElement extends _Elem__WEBPACK_IMPORTED_MODULE_0__["Elem"] {
    constructor(_birthedIndex = undefined) {
        super(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY.name, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY.type);
        this.birthedIndex = _birthedIndex;
    }
    exec(ew) {
        let fb = ew.getNearest(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].FORK_BOMB);
        if (!fb && Math.random() < 0.1) {
            ew.origin.killSelf();
            return;
        }
        //while there are forkbombs present, destroy them
        while (fb) {
            ew.origin.mutateSite(fb, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY));
            fb = ew.getNearest(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].FORK_BOMB);
        }
        //make new anti fork bombs
        if (!this.birthedIndex) {
            //this is the first
            [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40].forEach(index => {
                let site = ew.getSiteByIndex(index);
                if (site) {
                    ew.origin.mutateSite(site, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].ANTI_FORK_BOMB, [index]));
                }
            });
        }
        else {
            //this is a child, just continue that way
            [ew.getSiteByIndex(this.birthedIndex)].forEach(site => {
                if (site) {
                    if (Math.random() < 0.02) {
                        ew.origin.mutateSite(site, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].ANTI_FORK_BOMB));
                    }
                    else {
                        ew.origin.mutateSite(site, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].ANTI_FORK_BOMB, [this.birthedIndex]));
                    }
                }
            });
        }
        ew.origin.killSelf();
        super.exec(ew);
    }
}


/***/ }),

/***/ "./src/mfm/classes/elements/DRegElement.ts":
/*!*************************************************!*\
  !*** ./src/mfm/classes/elements/DRegElement.ts ***!
  \*************************************************/
/*! exports provided: DRegElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRegElement", function() { return DRegElement; });
/* harmony import */ var _Elem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Elem */ "./src/mfm/classes/Elem.ts");
/* harmony import */ var _ElementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ElementTypes */ "./src/mfm/classes/ElementTypes.ts");
/* harmony import */ var _Atom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Atom */ "./src/mfm/classes/Atom.ts");



class DRegElement extends _Elem__WEBPACK_IMPORTED_MODULE_0__["Elem"] {
    constructor() {
        super(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].DREG.name, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].DREG.type);
        this.pDREG_CREATE = 1000;
        this.pRES_CREATE = 300;
        this.pDREG_DESTROY = 10;
        this.pANY_DESTROY = 100;
    }
    exec(ew) {
        //get a random NESW site
        const availableSite = ew.getAdjacent4Way();
        //CREATION
        if (availableSite.atom.type === _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY) {
            const createDReg = Math.random() * this.pDREG_CREATE < 1;
            const createRes = Math.random() * this.pRES_CREATE < 1;
            if (createDReg) {
                ew.origin.moveAtom(availableSite, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].DREG));
                console.log("DREG CREATED");
            }
            else if (createRes) {
                ew.origin.moveAtom(availableSite, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES));
                console.log("RES CREATED");
            }
            else {
                ew.origin.swapAtoms(availableSite);
            }
        }
        else if (availableSite.atom.type === _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].DREG) {
            const destroyDReg = Math.random() * this.pDREG_DESTROY < 1;
            if (destroyDReg) {
                console.log("DREG DESTROYED");
                ew.origin.moveAtom(availableSite);
            }
        }
        else {
            //it's something else
            const destroyAny = Math.random() * this.pANY_DESTROY < 1;
            if (destroyAny) {
                console.log(availableSite.atom.type.name + " DESTROYED");
                ew.origin.moveAtom(availableSite);
            }
        }
        super.exec(ew);
    }
}


/***/ }),

/***/ "./src/mfm/classes/elements/EmptyElement.ts":
/*!**************************************************!*\
  !*** ./src/mfm/classes/elements/EmptyElement.ts ***!
  \**************************************************/
/*! exports provided: EmptyElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptyElement", function() { return EmptyElement; });
/* harmony import */ var _Elem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Elem */ "./src/mfm/classes/Elem.ts");
/* harmony import */ var _ElementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ElementTypes */ "./src/mfm/classes/ElementTypes.ts");


class EmptyElement extends _Elem__WEBPACK_IMPORTED_MODULE_0__["Elem"] {
    constructor() {
        super(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY.name, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY.type);
    }
    exec(ew) {
        super.exec(ew);
    }
}


/***/ }),

/***/ "./src/mfm/classes/elements/ForkBombElement.ts":
/*!*****************************************************!*\
  !*** ./src/mfm/classes/elements/ForkBombElement.ts ***!
  \*****************************************************/
/*! exports provided: ForkBombElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForkBombElement", function() { return ForkBombElement; });
/* harmony import */ var _Elem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Elem */ "./src/mfm/classes/Elem.ts");
/* harmony import */ var _ElementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ElementTypes */ "./src/mfm/classes/ElementTypes.ts");
/* harmony import */ var _Atom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Atom */ "./src/mfm/classes/Atom.ts");



class ForkBombElement extends _Elem__WEBPACK_IMPORTED_MODULE_0__["Elem"] {
    constructor() {
        super(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY.name, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY.type);
    }
    exec(ew) {
        let nextVictim = ew.getAdjacent8Way();
        if (nextVictim) {
            ew.origin.mutateSite(nextVictim, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].FORK_BOMB));
        }
        super.exec(ew);
    }
}


/***/ }),

/***/ "./src/mfm/classes/elements/MasonElement.ts":
/*!**************************************************!*\
  !*** ./src/mfm/classes/elements/MasonElement.ts ***!
  \**************************************************/
/*! exports provided: MasonElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MasonElement", function() { return MasonElement; });
/* harmony import */ var _Elem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Elem */ "./src/mfm/classes/Elem.ts");
/* harmony import */ var _ElementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ElementTypes */ "./src/mfm/classes/ElementTypes.ts");
/* harmony import */ var _Atom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Atom */ "./src/mfm/classes/Atom.ts");



class MasonElement extends _Elem__WEBPACK_IMPORTED_MODULE_0__["Elem"] {
    constructor(_path = "EEEENNNNWWWWSSSS") {
        super(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON.name, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON.type, 100, 100);
        this.path = [];
        this.curIndex = 0;
        _path = this.boxPath();
        this.path = _path.toUpperCase().split("");
    }
    //make a random wall path
    randomPath() {
        let path = "";
        const r = (Math.random() * 8 + 6) >> 0;
        const choices = ["E", "N", "S", "W"];
        for (var i = 0; i < r; i++) {
            const d = (Math.random() * choices.length) >> 0;
            const l = (Math.random() * 3 + 3) >> 0;
            const dir = choices[d];
            for (var j = 0; j < l; j++) {
                path = path.concat(dir);
            }
        }
        return path;
    }
    //make a box path
    boxPath(sideLength = 7) {
        let path = "";
        const choices = ["E", "N", "W", "S"];
        while (choices.length) {
            const dir = choices.shift();
            for (var j = 0; j < sideLength; j++) {
                path = path.concat(dir);
            }
        }
        return path;
    }
    exec(ew) {
        if (this.curIndex >= this.path.length) {
            this.curIndex = 0;
        }
        let lastdir = this.curIndex === 0 ? this.path[this.path.length - 1] : this.path[this.curIndex - 1];
        let dir = this.path[this.curIndex];
        this.curIndex++;
        let blueprints = {
            E: {
                moveSite() {
                    return ew.getEast();
                },
                outerBuildSite() {
                    return ew.getSouth();
                },
                innerBuildSite() {
                    return ew.getNorth();
                }
            },
            N: {
                moveSite() {
                    return ew.getNorth();
                },
                outerBuildSite() {
                    return ew.getEast();
                },
                innerBuildSite() {
                    return ew.getWest();
                }
            },
            S: {
                moveSite() {
                    return ew.getSouth();
                },
                outerBuildSite() {
                    return ew.getWest();
                },
                innerBuildSite() {
                    return ew.getEast();
                }
            },
            W: {
                moveSite() {
                    return ew.getWest();
                },
                outerBuildSite() {
                    return ew.getNorth();
                },
                innerBuildSite() {
                    return ew.getSouth();
                }
            }
        };
        const moveSite = blueprints[dir].moveSite();
        const outerBuildSite = blueprints[dir].outerBuildSite();
        const innerBuildSite = blueprints[dir].innerBuildSite();
        //for changing directions
        if (lastdir !== dir) {
            const lastOuterBuildSite = blueprints[lastdir].outerBuildSite();
            if (lastOuterBuildSite) {
                ew.origin.mutateSite(lastOuterBuildSite, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].WALL));
            }
        }
        //build the outer wall
        if (outerBuildSite) {
            if (outerBuildSite.atom.type === _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES || outerBuildSite.atom.type === _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY) {
                ew.origin.mutateSite(outerBuildSite, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].WALL));
            }
        }
        //build the inner wall
        if (innerBuildSite) {
            if (innerBuildSite.atom.type === _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES || innerBuildSite.atom.type === _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY) {
                ew.origin.mutateSite(innerBuildSite, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].WALL));
            }
        }
        //move to next site
        if (moveSite) {
            ew.origin.moveAtom(moveSite, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].WALL));
        }
        super.exec(ew);
    }
}


/***/ }),

/***/ "./src/mfm/classes/elements/ResElement.ts":
/*!************************************************!*\
  !*** ./src/mfm/classes/elements/ResElement.ts ***!
  \************************************************/
/*! exports provided: ResElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResElement", function() { return ResElement; });
/* harmony import */ var _Elem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Elem */ "./src/mfm/classes/Elem.ts");
/* harmony import */ var _ElementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ElementTypes */ "./src/mfm/classes/ElementTypes.ts");


class ResElement extends _Elem__WEBPACK_IMPORTED_MODULE_0__["Elem"] {
    constructor() {
        super(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES.name, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES.type);
    }
    exec(ew) {
        ew.origin.swapAtoms(ew.getAdjacent4Way(true, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY));
        super.exec(ew);
    }
}


/***/ }),

/***/ "./src/mfm/classes/elements/WallElement.ts":
/*!*************************************************!*\
  !*** ./src/mfm/classes/elements/WallElement.ts ***!
  \*************************************************/
/*! exports provided: WallElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WallElement", function() { return WallElement; });
/* harmony import */ var _Elem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Elem */ "./src/mfm/classes/Elem.ts");
/* harmony import */ var _ElementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ElementTypes */ "./src/mfm/classes/ElementTypes.ts");


class WallElement extends _Elem__WEBPACK_IMPORTED_MODULE_0__["Elem"] {
    constructor() {
        super(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].WALL.name, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].WALL.type, 0, 100);
    }
    exec(ew) {
        super.exec(ew);
    }
}


/***/ }),

/***/ "./src/mfm/utils/utils.ts":
/*!********************************!*\
  !*** ./src/mfm/utils/utils.ts ***!
  \********************************/
/*! exports provided: MFMUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MFMUtils", function() { return MFMUtils; });
/* harmony import */ var _classes_Eventwindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/Eventwindow */ "./src/mfm/classes/Eventwindow.ts");

class MFMUtils {
    static CtoID(c) {
        return `${c.row}:${c.col}`;
    }
    static IDtoC(id) {
        let rca = id.split(":");
        return { row: parseInt(rca[0]), col: parseInt(rca[1]) };
    }
    static GenerateEventWindow(tile, w, h) {
        let rc = (Math.random() * w) >> 0;
        let rr = (Math.random() * h) >> 0;
        return new _classes_Eventwindow__WEBPACK_IMPORTED_MODULE_0__["EventWindow"](tile, { row: rr, col: rc });
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9BdG9tLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtZW50VHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL0V2ZW50d2luZG93LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9TaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9UaWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9BbnRpRm9ya0JvbWJFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9EUmVnRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvRW1wdHlFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9Gb3JrQm9tYkVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL2VsZW1lbnRzL01hc29uRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvUmVzRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvV2FsbEVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS91dGlscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FB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QUFBcUQ7QUFDOUM7QUFDUDtBQUNBLGtCQUFrQixNQUFNLEdBQUcsTUFBTTtBQUNqQztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0VBQVcsUUFBUSxtQkFBbUI7QUFDekQ7QUFDQSIsImZpbGUiOiJtZm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IFRpbGUgfSBmcm9tIFwiLi9tZm0vY2xhc3Nlcy9UaWxlXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9tZm0vY2xhc3Nlcy9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IE1GTVV0aWxzIH0gZnJvbSBcIi4vbWZtL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvQXRvbVwiO1xubGV0IGcgPSBuZXcgVGlsZSg0OCwgNDgpO1xudmFyIHNrZXRjaCA9IChwKSA9PiB7XG4gICAgbGV0IHNpdGVTaXplID0gMTQ7XG4gICAgbGV0IGdyaWRPZmZzZXQgPSAyMDtcbiAgICBwLnByZWxvYWQgPSAoKSA9PiB7IH07XG4gICAgcC5zZXR1cCA9ICgpID0+IHtcbiAgICAgICAgcC5jcmVhdGVDYW52YXMoNzAwLCA3MDApO1xuICAgIH07XG4gICAgLy8gICBwLndpbmRvd1Jlc2l6ZWQgPSAoKSA9PiB7XG4gICAgLy8gICAgIHAucmVzaXplQ2FudmFzKHAud2luZG93V2lkdGggLSA1MCwgcC53aW5kb3dIZWlnaHQgLSA1MCk7XG4gICAgLy8gICB9O1xuICAgIC8vRXN0YWJsaXNoIHRoZSBlbG1lbnQgY29sb3JzIGhlcmVcbiAgICBsZXQgY29sb3JzID0gbmV3IE1hcCgpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkVNUFRZLCBwLmNvbG9yKDMyLCAzMiwgMzIsIDEyNykpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkRSRUcsIHAuY29sb3IoMjU1LCAzMiwgMzIpKTtcbiAgICBjb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5SRVMsIHAuY29sb3IoMzIsIDI1NSwgNjQpKTtcbiAgICBjb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5XQUxMLCBwLmNvbG9yKDMyLCAzMiwgMjU1KSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuTUFTT04sIHAuY29sb3IoMzIsIDI1NSwgMjU1KSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuRk9SS19CT01CLCBwLmNvbG9yKDE3MCwgMzIsIDMyKSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIsIHAuY29sb3IoMTI3LCAxMjcsIDMyKSk7XG4gICAgbGV0IGRyYXdHcmlkID0gKHAsIHQpID0+IHtcbiAgICAgICAgcC5wdXNoKCk7XG4gICAgICAgIHAudHJhbnNsYXRlKGdyaWRPZmZzZXQsIGdyaWRPZmZzZXQpO1xuICAgICAgICB0LnNpdGVzLmZvckVhY2goKHNpdGUpID0+IHtcbiAgICAgICAgICAgIHAuc3Ryb2tlKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgcC5maWxsKGNvbG9ycy5nZXQoc2l0ZS5hdG9tLnR5cGUpKTtcbiAgICAgICAgICAgIHAuZWxsaXBzZShzaXRlLnRpbGVQb3MuY29sICogc2l0ZVNpemUsIHNpdGUudGlsZVBvcy5yb3cgKiBzaXRlU2l6ZSwgc2l0ZVNpemUsIHNpdGVTaXplKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHAucG9wKCk7XG4gICAgfTtcbiAgICBsZXQgcnVuID0gKCkgPT4ge1xuICAgICAgICBsZXQgc3BlZWQgPSAxMDAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwZWVkOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBldyA9IE1GTVV0aWxzLkdlbmVyYXRlRXZlbnRXaW5kb3coZywgZy53aWR0aCwgZy5oZWlnaHQpO1xuICAgICAgICAgICAgZXcub3JpZ2luLmF0b20uZXhlYyhldyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCBnZXRTaXRlRnJvbUNhbnZhc1hZID0gKHgsIHkpID0+IHtcbiAgICAgICAgeCA9IHggLSBncmlkT2Zmc2V0ICsgc2l0ZVNpemUgKiAwLjU7XG4gICAgICAgIHkgPSB5IC0gZ3JpZE9mZnNldCArIHNpdGVTaXplICogMC41O1xuICAgICAgICB4ID0gKHggLyBzaXRlU2l6ZSkgPj4gMDtcbiAgICAgICAgeSA9ICh5IC8gc2l0ZVNpemUpID4+IDA7XG4gICAgICAgIHJldHVybiBnLmdldFNpdGVCeUNvb3JkKHsgcm93OiB5LCBjb2w6IHggfSk7XG4gICAgfTtcbiAgICBwLmRyYXcgPSAoKSA9PiB7XG4gICAgICAgIHAuYmFja2dyb3VuZCgxMDApO1xuICAgICAgICBkcmF3R3JpZChwLCBnKTtcbiAgICAgICAgcnVuKCk7XG4gICAgfTtcbiAgICBsZXQgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzaXRlID0gZ2V0U2l0ZUZyb21DYW52YXNYWShwLm1vdXNlWCwgcC5tb3VzZVkpO1xuICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgaWYgKHAua2V5SXNQcmVzc2VkKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChwLmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTQ6IC8vclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLlJFUyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTk6IC8vd1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTEzOiAvL3FcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDE6IC8vZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk4OiAvL2JcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTc6IC8vYVxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5EUkVHKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcC5tb3VzZURyYWdnZWQgPSBoYW5kbGVDbGljaztcbiAgICBwLm1vdXNlQ2xpY2tlZCA9IGhhbmRsZUNsaWNrO1xufTtcbmxldCBza2V0Y2hQID0gbmV3IHA1KHNrZXRjaCk7XG4iLCJpbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBBdG9tIHtcbiAgICBjb25zdHJ1Y3RvcihfdHlwZSA9IEVsZW1lbnRUeXBlcy5FTVBUWSwgcGFyYW1zKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IF90eXBlO1xuICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBuZXcgdGhpcy50eXBlLmNsYXNzKC4uLnBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBuZXcgdGhpcy50eXBlLmNsYXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICB0aGlzLmVsZW0uZXhlYyhldyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKF9uYW1lLCBfdHlwZSwgX21vdmVhYmlsaXR5ID0gMTAwLCBfZGVzdHJveWFiaWxpdHkgPSAxMDApIHtcbiAgICAgICAgdGhpcy5uYW1lID0gX25hbWU7XG4gICAgICAgIHRoaXMudHlwZSA9IF90eXBlO1xuICAgICAgICB0aGlzLm1vdmVhYmlsaXR5ID0gX21vdmVhYmlsaXR5O1xuICAgICAgICB0aGlzLmRlc3Ryb3lhYmlsaXR5ID0gX2Rlc3Ryb3lhYmlsaXR5O1xuICAgIH1cbiAgICBleGVjKGV3KSB7IH1cbn1cbiIsImltcG9ydCB7IEVtcHR5RWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL0VtcHR5RWxlbWVudFwiO1xuaW1wb3J0IHsgRFJlZ0VsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9EUmVnRWxlbWVudFwiO1xuaW1wb3J0IHsgUmVzRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL1Jlc0VsZW1lbnRcIjtcbmltcG9ydCB7IFdhbGxFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvV2FsbEVsZW1lbnRcIjtcbmltcG9ydCB7IE1hc29uRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL01hc29uRWxlbWVudFwiO1xuaW1wb3J0IHsgRm9ya0JvbWJFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvRm9ya0JvbWJFbGVtZW50XCI7XG5pbXBvcnQgeyBBbnRpRm9ya0JvbWJFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvQW50aUZvcmtCb21iRWxlbWVudFwiO1xuZXhwb3J0IGNsYXNzIEVsZW1lbnRUeXBlcyB7XG4gICAgc3RhdGljIHJlZ2lzdGVyVHlwZShuYW1lLCB0eXBlLCBjKSB7XG4gICAgICAgIHRoaXMuVFlQRVNfQVJSQVkucHVzaCh7IG5hbWUsIHR5cGUsIGNsYXNzOiBjIH0pO1xuICAgIH1cbn1cbkVsZW1lbnRUeXBlcy5FTVBUWSA9IHsgbmFtZTogXCJFTVBUWVwiLCB0eXBlOiBcIkVcIiwgY2xhc3M6IEVtcHR5RWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLkRSRUcgPSB7IG5hbWU6IFwiRFJFR1wiLCB0eXBlOiBcIkRcIiwgY2xhc3M6IERSZWdFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuUkVTID0geyBuYW1lOiBcIlJFU1wiLCB0eXBlOiBcIlJcIiwgY2xhc3M6IFJlc0VsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5XQUxMID0geyBuYW1lOiBcIldBTExcIiwgdHlwZTogXCJXXCIsIGNsYXNzOiBXYWxsRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLk1BU09OID0geyBuYW1lOiBcIk1BU09OXCIsIHR5cGU6IFwiTWFcIiwgY2xhc3M6IE1hc29uRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLkZPUktfQk9NQiA9IHsgbmFtZTogXCJGT1JLIEJPTUJcIiwgdHlwZTogXCJGYlwiLCBjbGFzczogRm9ya0JvbWJFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIgPSB7IG5hbWU6IFwiQU5USSBGT1JLIEJPTUJcIiwgdHlwZTogXCJBZlwiLCBjbGFzczogQW50aUZvcmtCb21iRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLlRZUEVTX0FSUkFZID0gW1xuICAgIEVsZW1lbnRUeXBlcy5FTVBUWSxcbiAgICBFbGVtZW50VHlwZXMuRFJFRyxcbiAgICBFbGVtZW50VHlwZXMuUkVTLFxuICAgIEVsZW1lbnRUeXBlcy5XQUxMLFxuICAgIEVsZW1lbnRUeXBlcy5NQVNPTixcbiAgICBFbGVtZW50VHlwZXMuRk9SS19CT01CLFxuICAgIEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQlxuXTtcbiIsImltcG9ydCB7IE1GTVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9FbGVtZW50VHlwZXNcIjtcbi8vRXZlbnQgd2luZG93IGFzIGRlc2NyaWJiZWQgaGVyZTogaHR0cDovL3JvYnVzdC5jcy51bm0uZWR1L2xpYi9leGUvZmV0Y2gucGhwP3c9MzAwJnRvaz00YzhmNDkmbWVkaWE9ZGV2OmV2ZW50LXdpbmRvdy0xMC5wbmdcbi8vQ29sbGVjdGlvbiBvZiBzaXRlcyB3aGljaCBjb250YWluIGF0b21zLCBidWlsdCBmcm9tIGFuIG9yaWdpbiAoY2VudGVyKSBzaXRlXG5leHBvcnQgY2xhc3MgRXZlbnRXaW5kb3cge1xuICAgIGNvbnN0cnVjdG9yKF90aWxlLCBfb3JpZ2luKSB7XG4gICAgICAgIHRoaXMudGlsZSA9IF90aWxlO1xuICAgICAgICB0aGlzLm1ha2VXaW5kb3coX3RpbGUsIF9vcmlnaW4pO1xuICAgIH1cbiAgICBtYWtlV2luZG93KHRpbGUsIG9yaWdpbikge1xuICAgICAgICB0aGlzLndpbmRvdyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSB0aGlzLnRpbGUuZ2V0U2l0ZUJ5Q29vcmQob3JpZ2luKTtcbiAgICAgICAgLy9pZiB0aGUgb3JpZ2luIGlzIEVNUFRZIEVsZW1lbnQsIGxldCdzIHNhdmUgc29tZSBjeWNsZXMgKGdvb2QsIGJhZD8pXG4gICAgICAgIGlmICh0aGlzLm9yaWdpbi5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy53aW5kb3cuc2V0KHRoaXMub3JpZ2luLmlkLCB0aGlzLm9yaWdpbik7XG4gICAgICAgIGxldCB3aW5kb3dBcnJheSA9IEV2ZW50V2luZG93LldJTkRPV19PUkRFUl9PRkZTRVRTLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5PZmZzZXRGcm9tT3JpZ2luKG9yaWdpbiwgb2Zmc2V0LnJvdywgb2Zmc2V0LmNvbCk7XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3dBcnJheS5mb3JFYWNoKCh0aWxlQ29vcmQpID0+IHtcbiAgICAgICAgICAgIGxldCBzaXRlID0gdGlsZS5nZXRTaXRlQnlDb29yZCh0aWxlQ29vcmQpO1xuICAgICAgICAgICAgaWYgKHNpdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndpbmRvdy5zZXQoc2l0ZS5pZCwgc2l0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPZmZzZXRGcm9tT3JpZ2luKG9yaWdpbiwgcm93T2Zmc2V0LCBjb2xPZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIHsgcm93OiBvcmlnaW4ucm93ICsgcm93T2Zmc2V0LCBjb2w6IG9yaWdpbi5jb2wgKyBjb2xPZmZzZXQgfTtcbiAgICB9XG4gICAgZ2V0U2l0ZUJ5SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgbGV0IHdhID0gQXJyYXkuZnJvbSh0aGlzLndpbmRvdy52YWx1ZXMoKSk7XG4gICAgICAgIGlmIChpbmRleCA+PSB3YS5sZW5ndGggfHwgaW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3YVtpbmRleF07XG4gICAgfVxuICAgIGdldFJhbmRvbShzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKEFycmF5LmZyb20odGhpcy53aW5kb3cudmFsdWVzKCkpLCB0cnVlLCBzcGVjaWZpY1R5cGUpO1xuICAgIH1cbiAgICAvL21vc3QgdXNlZnVsIHdoZW4gdXNpbmcgc3BlY2lmaWNUeXBlXG4gICAgLy90cmF2ZXJzZXMgdGhlIHdpbmRvdyB1bnRpbCBpdCBjb21lcyBhY3Jvc3Mgd2hhdCB5b3UncmUgbG9va2luZyBmb3JcbiAgICBnZXROZWFyZXN0KHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaXRlRnJvbUNhbmRpZGF0ZXMoQXJyYXkuZnJvbSh0aGlzLndpbmRvdy52YWx1ZXMoKSksIGZhbHNlLCBzcGVjaWZpY1R5cGUpO1xuICAgIH1cbiAgICBnZXRFYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfRUFTVCk7XG4gICAgfVxuICAgIGdldFdlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19XRVNUKTtcbiAgICB9XG4gICAgZ2V0Tm9ydGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19OT1JUSCk7XG4gICAgfVxuICAgIGdldFNvdXRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfU09VVEgpO1xuICAgIH1cbiAgICBnZXROb3J0aFdlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19OT1JUSFdFU1QpO1xuICAgIH1cbiAgICBnZXRTb3V0aFdlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19TT1VUSFdFU1QpO1xuICAgIH1cbiAgICBnZXROb3J0aEVhc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19OT1JUSEVBU1QpO1xuICAgIH1cbiAgICBnZXRTb3V0aEVhc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19TT1VUSEVBU1QpO1xuICAgIH1cbiAgICBnZXRBZGphY2VudDRXYXkocmFuZG9taXplID0gdHJ1ZSwgc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpdGVGcm9tQ2FuZGlkYXRlcyhbdGhpcy5nZXRXZXN0KCksIHRoaXMuZ2V0Tm9ydGgoKSwgdGhpcy5nZXRTb3V0aCgpLCB0aGlzLmdldEVhc3QoKV0sIHJhbmRvbWl6ZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgZ2V0QWRqYWNlbnQ4V2F5KHJhbmRvbWl6ZSA9IHRydWUsIHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaXRlRnJvbUNhbmRpZGF0ZXMoW1xuICAgICAgICAgICAgdGhpcy5nZXRXZXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldE5vcnRoKCksXG4gICAgICAgICAgICB0aGlzLmdldFNvdXRoKCksXG4gICAgICAgICAgICB0aGlzLmdldEVhc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm9ydGhXZXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldFNvdXRoV2VzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXROb3J0aEVhc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0U291dGhFYXN0KClcbiAgICAgICAgXSwgcmFuZG9taXplLCBzcGVjaWZpY1R5cGUpO1xuICAgIH1cbiAgICAvL0dpdmVuIGFuIGFycmF5IG9mIGNhbmRpZGF0ZSBzaXRlcyAoc3ltbWV0cmllcyBpbiB0aGUgZnV0dXJlIEkgaG9wZSksXG4gICAgLy9naXZlIG1lIGJhY2sgb25lLCByYW5kb20gYnkgZGVmYXVsdCwgbm90IGZpbHRlcmVkIGJ5IHR5cGUgYnkgZGVmYXVsdFxuICAgIGdldFNpdGVGcm9tQ2FuZGlkYXRlcyhjYW5kaWRhdGVTaXRlcywgcmFuZG9taXplID0gdHJ1ZSwgc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhbmRpZGF0ZVNpdGVzID0gY2FuZGlkYXRlU2l0ZXMuZmlsdGVyKHNpdGUgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaXRlKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmICghc3BlY2lmaWNUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzcGVjaWZpY1R5cGUgJiYgc2l0ZS5hdG9tLnR5cGUgPT09IHNwZWNpZmljVHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy9ubyBzaXRlcyEgeWlrZXMhIHBvc3NpYmxlIT8hIHByb2JhYmx5IG9ubHkgd2hlbiB1c2luZyBzcGVjaWZpY1R5cGUgYW5kIGxvb2tpbmcgZm9yIGEgcmFyZSBlbGVtZW50XG4gICAgICAgIGlmIChjYW5kaWRhdGVTaXRlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vcmV0dXJuIHJhbmRvbVxuICAgICAgICBpZiAocmFuZG9taXplKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FuZGlkYXRlU2l0ZXNbKE1hdGgucmFuZG9tKCkgKiBjYW5kaWRhdGVTaXRlcy5sZW5ndGgpID4+IDBdO1xuICAgICAgICB9XG4gICAgICAgIC8vcmV0dXJuIGZpcnN0IG1hdGNoaW5nXG4gICAgICAgIHJldHVybiBjYW5kaWRhdGVTaXRlc1swXTtcbiAgICB9XG4gICAgZ2V0RGlyZWN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICBsZXQgc2l0ZSA9IHRoaXMudGlsZS5zaXRlcy5nZXQoTUZNVXRpbHMuQ3RvSUQodGhpcy5PZmZzZXRGcm9tT3JpZ2luKHRoaXMub3JpZ2luLnRpbGVQb3MsIGRpcmVjdGlvbi5yb3csIGRpcmVjdGlvbi5jb2wpKSk7XG4gICAgICAgIGlmIChzaXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2l0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbkV2ZW50V2luZG93LldJTkRPV19PUkRFUl9PRkZTRVRTID0gW1xuICAgIHsgY29sOiAwLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogMSB9LFxuICAgIHsgY29sOiAxLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogMSB9LFxuICAgIHsgY29sOiAxLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAwIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMCwgcm93OiAyIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogMCB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAxIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IC0yIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDIgfSxcbiAgICB7IGNvbDogMSwgcm93OiAtMiB9LFxuICAgIHsgY29sOiAxLCByb3c6IDIgfSxcbiAgICB7IGNvbDogMiwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAyLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTMsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC0zIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogMyB9LFxuICAgIHsgY29sOiAzLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogLTIgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogMiB9LFxuICAgIHsgY29sOiAyLCByb3c6IC0yIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogMiB9LFxuICAgIHsgY29sOiAtMywgcm93OiAtMSB9LFxuICAgIHsgY29sOiAtMywgcm93OiAxIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IC0zIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDMgfSxcbiAgICB7IGNvbDogMSwgcm93OiAtMyB9LFxuICAgIHsgY29sOiAxLCByb3c6IDMgfSxcbiAgICB7IGNvbDogMywgcm93OiAtMSB9LFxuICAgIHsgY29sOiAzLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTQsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC00IH0sXG4gICAgeyBjb2w6IDAsIHJvdzogNCB9LFxuICAgIHsgY29sOiA0LCByb3c6IDAgfVxuXTtcbi8vYmVjYXVzZSwgbGF6eVxuRXZlbnRXaW5kb3cuRVdfV0VTVCA9IHsgY29sOiAtMSwgcm93OiAwIH07XG5FdmVudFdpbmRvdy5FV19FQVNUID0geyBjb2w6IDEsIHJvdzogMCB9O1xuRXZlbnRXaW5kb3cuRVdfTk9SVEggPSB7IGNvbDogMCwgcm93OiAtMSB9O1xuRXZlbnRXaW5kb3cuRVdfU09VVEggPSB7IGNvbDogMCwgcm93OiAxIH07XG5FdmVudFdpbmRvdy5FV19OT1JUSFdFU1QgPSB7IGNvbDogLTEsIHJvdzogLTEgfTtcbkV2ZW50V2luZG93LkVXX1NPVVRIV0VTVCA9IHsgY29sOiAtMSwgcm93OiAxIH07XG5FdmVudFdpbmRvdy5FV19OT1JUSEVBU1QgPSB7IGNvbDogMSwgcm93OiAtMSB9O1xuRXZlbnRXaW5kb3cuRVdfU09VVEhFQVNUID0geyBjb2w6IDEsIHJvdzogMSB9O1xuIiwiaW1wb3J0IHsgTUZNVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi9BdG9tXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBTaXRlIHtcbiAgICBjb25zdHJ1Y3RvcihfcG9zKSB7XG4gICAgICAgIHRoaXMudGlsZVBvcyA9IF9wb3M7XG4gICAgICAgIHRoaXMuaWQgPSBNRk1VdGlscy5DdG9JRCh0aGlzLnRpbGVQb3MpO1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgIH1cbiAgICAvL2lmIHRhcmdldFNpdGUgaXMga2lsbGFibGVcbiAgICAvL2tpbGwgaXRzIGF0b20gKHJlcGxhY2Ugd2l0aCBlbXB0eSlcbiAgICBraWxsQXRvbSh0YXJnZXRTaXRlKSB7XG4gICAgICAgIGxldCBraWxsID0gTWF0aC5yYW5kb20oKSAqIDEwMCA8IHRhcmdldFNpdGUuYXRvbS5lbGVtLmRlc3Ryb3lhYmlsaXR5O1xuICAgICAgICBpZiAoa2lsbCkge1xuICAgICAgICAgICAgdGFyZ2V0U2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBraWxsU2VsZihsZWF2aW5nQXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSkpIHtcbiAgICAgICAgdGhpcy5hdG9tID0gbGVhdmluZ0F0b207XG4gICAgfVxuICAgIC8vaWYgdGFyZ2V0IHNpdGUgaXMga2lsbGFibGVcbiAgICAvL21vdmUgdGhpcyBhdG9tIHRvIHRhcmdldFNpdGUsIGFuZCBsZWF2ZSBiZWhpbmQgbGVhdmluZ0F0b20sIHdoaWNoIGJ5IGRlZmF1bHQgaXMgZW1wdHlcbiAgICBtb3ZlQXRvbSh0YXJnZXRTaXRlLCBsZWF2aW5nQXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSkpIHtcbiAgICAgICAgaWYgKHRhcmdldFNpdGUgJiYgdGFyZ2V0U2l0ZS5jYW5EZXN0cm95KCkpIHtcbiAgICAgICAgICAgIFt0aGlzLmF0b20sIHRhcmdldFNpdGUuYXRvbV0gPSBbbGVhdmluZ0F0b20sIHRoaXMuYXRvbV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9pZiB0YXJnZXRTaXRlIGlzIG1vdmVhYmxlXG4gICAgLy9zd2FwIGF0b21zIHdpdGggdGhpcyBvbmVcbiAgICBzd2FwQXRvbXModGFyZ2V0U2l0ZSkge1xuICAgICAgICBpZiAodGFyZ2V0U2l0ZSAmJiB0YXJnZXRTaXRlLmNhbk1vdmUoKSkge1xuICAgICAgICAgICAgW3RoaXMuYXRvbSwgdGFyZ2V0U2l0ZS5hdG9tXSA9IFt0YXJnZXRTaXRlLmF0b20sIHRoaXMuYXRvbV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgbXV0YXRlU2l0ZSh0YXJnZXRTaXRlLCBuZXdBdG9tKSB7XG4gICAgICAgIGlmICh0YXJnZXRTaXRlICYmIHRhcmdldFNpdGUuY2FuRGVzdHJveSgpKSB7XG4gICAgICAgICAgICB0YXJnZXRTaXRlLmF0b20gPSBuZXdBdG9tO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhbkRlc3Ryb3koKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogMTAwIDwgdGhpcy5hdG9tLmVsZW0uZGVzdHJveWFiaWxpdHk7XG4gICAgfVxuICAgIGNhbk1vdmUoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogMTAwIDwgdGhpcy5hdG9tLmVsZW0ubW92ZWFiaWxpdHk7XG4gICAgfVxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5hdG9tID0gbmV3IEF0b20oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTaXRlIH0gZnJvbSBcIi4vU2l0ZVwiO1xuaW1wb3J0IHsgTUZNVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3Rvcihfd2lkdGggPSAxLCBfaGVpZ2h0ID0gMSkge1xuICAgICAgICB0aGlzLndpZHRoID0gX3dpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IF9oZWlnaHQ7XG4gICAgICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgfVxuICAgIGdldFNpdGVCeUNvb3JkKGMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l0ZXMuZ2V0KE1GTVV0aWxzLkN0b0lEKGMpKTtcbiAgICB9XG4gICAgZ2V0UmFuZG9tU2l0ZSgpIHtcbiAgICAgICAgbGV0IHJyID0gKE1hdGgucmFuZG9tKCkgKiB0aGlzLmhlaWdodCkgPj4gMDtcbiAgICAgICAgbGV0IHJjID0gKE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoKSA+PiAwO1xuICAgICAgICByZXR1cm4gdGhpcy5zaXRlcy5nZXQoYCR7cnJ9OiR7cmN9YCk7XG4gICAgfVxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5zaXRlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIC8vYWNyb3NzIGNvbHVtbnNcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIC8vZG93biByb3dzXG4gICAgICAgICAgICAgICAgdGhpcy5zaXRlcy5zZXQoYCR7an06JHtpfWAsIG5ldyBTaXRlKHsgcm93OiBqLCBjb2w6IGkgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBBbnRpRm9ya0JvbWJFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoX2JpcnRoZWRJbmRleCA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRU1QVFkubmFtZSwgRWxlbWVudFR5cGVzLkVNUFRZLnR5cGUpO1xuICAgICAgICB0aGlzLmJpcnRoZWRJbmRleCA9IF9iaXJ0aGVkSW5kZXg7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgbGV0IGZiID0gZXcuZ2V0TmVhcmVzdChFbGVtZW50VHlwZXMuRk9SS19CT01CKTtcbiAgICAgICAgaWYgKCFmYiAmJiBNYXRoLnJhbmRvbSgpIDwgMC4xKSB7XG4gICAgICAgICAgICBldy5vcmlnaW4ua2lsbFNlbGYoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvL3doaWxlIHRoZXJlIGFyZSBmb3JrYm9tYnMgcHJlc2VudCwgZGVzdHJveSB0aGVtXG4gICAgICAgIHdoaWxlIChmYikge1xuICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoZmIsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSkpO1xuICAgICAgICAgICAgZmIgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpO1xuICAgICAgICB9XG4gICAgICAgIC8vbWFrZSBuZXcgYW50aSBmb3JrIGJvbWJzXG4gICAgICAgIGlmICghdGhpcy5iaXJ0aGVkSW5kZXgpIHtcbiAgICAgICAgICAgIC8vdGhpcyBpcyB0aGUgZmlyc3RcbiAgICAgICAgICAgIFsyNSwgMjYsIDI3LCAyOCwgMjksIDMwLCAzMSwgMzIsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MF0uZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNpdGUgPSBldy5nZXRTaXRlQnlJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKHNpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoc2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLCBbaW5kZXhdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL3RoaXMgaXMgYSBjaGlsZCwganVzdCBjb250aW51ZSB0aGF0IHdheVxuICAgICAgICAgICAgW2V3LmdldFNpdGVCeUluZGV4KHRoaXMuYmlydGhlZEluZGV4KV0uZm9yRWFjaChzaXRlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKHNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoc2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLCBbdGhpcy5iaXJ0aGVkSW5kZXhdKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBldy5vcmlnaW4ua2lsbFNlbGYoKTtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBEUmVnRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRFJFRy5uYW1lLCBFbGVtZW50VHlwZXMuRFJFRy50eXBlKTtcbiAgICAgICAgdGhpcy5wRFJFR19DUkVBVEUgPSAxMDAwO1xuICAgICAgICB0aGlzLnBSRVNfQ1JFQVRFID0gMzAwO1xuICAgICAgICB0aGlzLnBEUkVHX0RFU1RST1kgPSAxMDtcbiAgICAgICAgdGhpcy5wQU5ZX0RFU1RST1kgPSAxMDA7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgLy9nZXQgYSByYW5kb20gTkVTVyBzaXRlXG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZVNpdGUgPSBldy5nZXRBZGphY2VudDRXYXkoKTtcbiAgICAgICAgLy9DUkVBVElPTlxuICAgICAgICBpZiAoYXZhaWxhYmxlU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgY29uc3QgY3JlYXRlRFJlZyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBEUkVHX0NSRUFURSA8IDE7XG4gICAgICAgICAgICBjb25zdCBjcmVhdGVSZXMgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5wUkVTX0NSRUFURSA8IDE7XG4gICAgICAgICAgICBpZiAoY3JlYXRlRFJlZykge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuRFJFRykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRFJFRyBDUkVBVEVEXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3JlYXRlUmVzKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5SRVMpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFUyBDUkVBVEVEXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLnN3YXBBdG9tcyhhdmFpbGFibGVTaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdmFpbGFibGVTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkRSRUcpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc3Ryb3lEUmVnID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucERSRUdfREVTVFJPWSA8IDE7XG4gICAgICAgICAgICBpZiAoZGVzdHJveURSZWcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRSRUcgREVTVFJPWUVEXCIpO1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vaXQncyBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgICAgY29uc3QgZGVzdHJveUFueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBBTllfREVTVFJPWSA8IDE7XG4gICAgICAgICAgICBpZiAoZGVzdHJveUFueSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF2YWlsYWJsZVNpdGUuYXRvbS50eXBlLm5hbWUgKyBcIiBERVNUUk9ZRURcIik7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuZXhwb3J0IGNsYXNzIEVtcHR5RWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRU1QVFkubmFtZSwgRWxlbWVudFR5cGVzLkVNUFRZLnR5cGUpO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgRm9ya0JvbWJFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5FTVBUWS5uYW1lLCBFbGVtZW50VHlwZXMuRU1QVFkudHlwZSk7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgbGV0IG5leHRWaWN0aW0gPSBldy5nZXRBZGphY2VudDhXYXkoKTtcbiAgICAgICAgaWYgKG5leHRWaWN0aW0pIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKG5leHRWaWN0aW0sIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi4vQXRvbVwiO1xuZXhwb3J0IGNsYXNzIE1hc29uRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKF9wYXRoID0gXCJFRUVFTk5OTldXV1dTU1NTXCIpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLk1BU09OLm5hbWUsIEVsZW1lbnRUeXBlcy5NQVNPTi50eXBlLCAxMDAsIDEwMCk7XG4gICAgICAgIHRoaXMucGF0aCA9IFtdO1xuICAgICAgICB0aGlzLmN1ckluZGV4ID0gMDtcbiAgICAgICAgX3BhdGggPSB0aGlzLmJveFBhdGgoKTtcbiAgICAgICAgdGhpcy5wYXRoID0gX3BhdGgudG9VcHBlckNhc2UoKS5zcGxpdChcIlwiKTtcbiAgICB9XG4gICAgLy9tYWtlIGEgcmFuZG9tIHdhbGwgcGF0aFxuICAgIHJhbmRvbVBhdGgoKSB7XG4gICAgICAgIGxldCBwYXRoID0gXCJcIjtcbiAgICAgICAgY29uc3QgciA9IChNYXRoLnJhbmRvbSgpICogOCArIDYpID4+IDA7XG4gICAgICAgIGNvbnN0IGNob2ljZXMgPSBbXCJFXCIsIFwiTlwiLCBcIlNcIiwgXCJXXCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZCA9IChNYXRoLnJhbmRvbSgpICogY2hvaWNlcy5sZW5ndGgpID4+IDA7XG4gICAgICAgICAgICBjb25zdCBsID0gKE1hdGgucmFuZG9tKCkgKiAzICsgMykgPj4gMDtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IGNob2ljZXNbZF07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGw7IGorKykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLmNvbmNhdChkaXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICAvL21ha2UgYSBib3ggcGF0aFxuICAgIGJveFBhdGgoc2lkZUxlbmd0aCA9IDcpIHtcbiAgICAgICAgbGV0IHBhdGggPSBcIlwiO1xuICAgICAgICBjb25zdCBjaG9pY2VzID0gW1wiRVwiLCBcIk5cIiwgXCJXXCIsIFwiU1wiXTtcbiAgICAgICAgd2hpbGUgKGNob2ljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBkaXIgPSBjaG9pY2VzLnNoaWZ0KCk7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpZGVMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLmNvbmNhdChkaXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIGlmICh0aGlzLmN1ckluZGV4ID49IHRoaXMucGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VySW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0ZGlyID0gdGhpcy5jdXJJbmRleCA9PT0gMCA/IHRoaXMucGF0aFt0aGlzLnBhdGgubGVuZ3RoIC0gMV0gOiB0aGlzLnBhdGhbdGhpcy5jdXJJbmRleCAtIDFdO1xuICAgICAgICBsZXQgZGlyID0gdGhpcy5wYXRoW3RoaXMuY3VySW5kZXhdO1xuICAgICAgICB0aGlzLmN1ckluZGV4Kys7XG4gICAgICAgIGxldCBibHVlcHJpbnRzID0ge1xuICAgICAgICAgICAgRToge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0RWFzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRTb3V0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBOOiB7XG4gICAgICAgICAgICAgICAgbW92ZVNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbm5lckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFdlc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUzoge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0U291dGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0V2VzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFc6IHtcbiAgICAgICAgICAgICAgICBtb3ZlU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFdlc3QoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0Tm9ydGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlubmVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0U291dGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG1vdmVTaXRlID0gYmx1ZXByaW50c1tkaXJdLm1vdmVTaXRlKCk7XG4gICAgICAgIGNvbnN0IG91dGVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tkaXJdLm91dGVyQnVpbGRTaXRlKCk7XG4gICAgICAgIGNvbnN0IGlubmVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tkaXJdLmlubmVyQnVpbGRTaXRlKCk7XG4gICAgICAgIC8vZm9yIGNoYW5naW5nIGRpcmVjdGlvbnNcbiAgICAgICAgaWYgKGxhc3RkaXIgIT09IGRpcikge1xuICAgICAgICAgICAgY29uc3QgbGFzdE91dGVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tsYXN0ZGlyXS5vdXRlckJ1aWxkU2l0ZSgpO1xuICAgICAgICAgICAgaWYgKGxhc3RPdXRlckJ1aWxkU2l0ZSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKGxhc3RPdXRlckJ1aWxkU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL2J1aWxkIHRoZSBvdXRlciB3YWxsXG4gICAgICAgIGlmIChvdXRlckJ1aWxkU2l0ZSkge1xuICAgICAgICAgICAgaWYgKG91dGVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLlJFUyB8fCBvdXRlckJ1aWxkU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKG91dGVyQnVpbGRTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuV0FMTCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vYnVpbGQgdGhlIGlubmVyIHdhbGxcbiAgICAgICAgaWYgKGlubmVyQnVpbGRTaXRlKSB7XG4gICAgICAgICAgICBpZiAoaW5uZXJCdWlsZFNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuUkVTIHx8IGlubmVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoaW5uZXJCdWlsZFNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5XQUxMKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9tb3ZlIHRvIG5leHQgc2l0ZVxuICAgICAgICBpZiAobW92ZVNpdGUpIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShtb3ZlU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBSZXNFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5SRVMubmFtZSwgRWxlbWVudFR5cGVzLlJFUy50eXBlKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBldy5vcmlnaW4uc3dhcEF0b21zKGV3LmdldEFkamFjZW50NFdheSh0cnVlLCBFbGVtZW50VHlwZXMuRU1QVFkpKTtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgV2FsbEVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLldBTEwubmFtZSwgRWxlbWVudFR5cGVzLldBTEwudHlwZSwgMCwgMTAwKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFdmVudFdpbmRvdyB9IGZyb20gXCIuLi9jbGFzc2VzL0V2ZW50d2luZG93XCI7XG5leHBvcnQgY2xhc3MgTUZNVXRpbHMge1xuICAgIHN0YXRpYyBDdG9JRChjKSB7XG4gICAgICAgIHJldHVybiBgJHtjLnJvd306JHtjLmNvbH1gO1xuICAgIH1cbiAgICBzdGF0aWMgSUR0b0MoaWQpIHtcbiAgICAgICAgbGV0IHJjYSA9IGlkLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgcmV0dXJuIHsgcm93OiBwYXJzZUludChyY2FbMF0pLCBjb2w6IHBhcnNlSW50KHJjYVsxXSkgfTtcbiAgICB9XG4gICAgc3RhdGljIEdlbmVyYXRlRXZlbnRXaW5kb3codGlsZSwgdywgaCkge1xuICAgICAgICBsZXQgcmMgPSAoTWF0aC5yYW5kb20oKSAqIHcpID4+IDA7XG4gICAgICAgIGxldCByciA9IChNYXRoLnJhbmRvbSgpICogaCkgPj4gMDtcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudFdpbmRvdyh0aWxlLCB7IHJvdzogcnIsIGNvbDogcmMgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==