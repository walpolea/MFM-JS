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
        if (!fb && Math.random() < 0.2) {
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
            [
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
                31,
                32,
                33,
                34,
                35,
                36,
                37,
                38,
                39,
                40
            ].forEach(index => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9BdG9tLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtZW50VHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL0V2ZW50d2luZG93LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9TaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9UaWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9BbnRpRm9ya0JvbWJFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9EUmVnRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvRW1wdHlFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9Gb3JrQm9tYkVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL2VsZW1lbnRzL01hc29uRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvUmVzRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvV2FsbEVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS91dGlscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FB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Ozs7Ozs7OztBQ1ZBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ2dCO0FBQ3hDLDBCQUEwQiwwQ0FBSTtBQUNyQztBQUNBLGNBQWMsMERBQVksWUFBWSwwREFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVEE7QUFBQTtBQUFBO0FBQXFEO0FBQzlDO0FBQ1A7QUFDQSxrQkFBa0IsTUFBTSxHQUFHLE1BQU07QUFDakM7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdFQUFXLFFBQVEsbUJBQW1CO0FBQ3pEO0FBQ0EiLCJmaWxlIjoibWZtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBUaWxlIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvVGlsZVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBNRk1VdGlscyB9IGZyb20gXCIuL21mbS91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuL21mbS9jbGFzc2VzL0F0b21cIjtcbmxldCBnID0gbmV3IFRpbGUoNDgsIDQ4KTtcbnZhciBza2V0Y2ggPSAocCkgPT4ge1xuICAgIGxldCBzaXRlU2l6ZSA9IDE0O1xuICAgIGxldCBncmlkT2Zmc2V0ID0gMjA7XG4gICAgcC5wcmVsb2FkID0gKCkgPT4geyB9O1xuICAgIHAuc2V0dXAgPSAoKSA9PiB7XG4gICAgICAgIHAuY3JlYXRlQ2FudmFzKDcwMCwgNzAwKTtcbiAgICB9O1xuICAgIC8vICAgcC53aW5kb3dSZXNpemVkID0gKCkgPT4ge1xuICAgIC8vICAgICBwLnJlc2l6ZUNhbnZhcyhwLndpbmRvd1dpZHRoIC0gNTAsIHAud2luZG93SGVpZ2h0IC0gNTApO1xuICAgIC8vICAgfTtcbiAgICAvL0VzdGFibGlzaCB0aGUgZWxtZW50IGNvbG9ycyBoZXJlXG4gICAgbGV0IGNvbG9ycyA9IG5ldyBNYXAoKTtcbiAgICBjb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5FTVBUWSwgcC5jb2xvcigzMiwgMzIsIDMyLCAxMjcpKTtcbiAgICBjb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5EUkVHLCBwLmNvbG9yKDI1NSwgMzIsIDMyKSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuUkVTLCBwLmNvbG9yKDMyLCAyNTUsIDY0KSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuV0FMTCwgcC5jb2xvcigzMiwgMzIsIDI1NSkpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLk1BU09OLCBwLmNvbG9yKDMyLCAyNTUsIDI1NSkpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkZPUktfQk9NQiwgcC5jb2xvcigxNzAsIDMyLCAzMikpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLCBwLmNvbG9yKDEyNywgMTI3LCAzMikpO1xuICAgIGxldCBkcmF3R3JpZCA9IChwLCB0KSA9PiB7XG4gICAgICAgIHAucHVzaCgpO1xuICAgICAgICBwLnRyYW5zbGF0ZShncmlkT2Zmc2V0LCBncmlkT2Zmc2V0KTtcbiAgICAgICAgdC5zaXRlcy5mb3JFYWNoKChzaXRlKSA9PiB7XG4gICAgICAgICAgICBwLnN0cm9rZSgwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIHAuZmlsbChjb2xvcnMuZ2V0KHNpdGUuYXRvbS50eXBlKSk7XG4gICAgICAgICAgICBwLmVsbGlwc2Uoc2l0ZS50aWxlUG9zLmNvbCAqIHNpdGVTaXplLCBzaXRlLnRpbGVQb3Mucm93ICogc2l0ZVNpemUsIHNpdGVTaXplLCBzaXRlU2l6ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwLnBvcCgpO1xuICAgIH07XG4gICAgbGV0IHJ1biA9ICgpID0+IHtcbiAgICAgICAgbGV0IHNwZWVkID0gMTAwMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGVlZDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZXcgPSBNRk1VdGlscy5HZW5lcmF0ZUV2ZW50V2luZG93KGcsIGcud2lkdGgsIGcuaGVpZ2h0KTtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5hdG9tLmV4ZWMoZXcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsZXQgZ2V0U2l0ZUZyb21DYW52YXNYWSA9ICh4LCB5KSA9PiB7XG4gICAgICAgIHggPSB4IC0gZ3JpZE9mZnNldCArIHNpdGVTaXplICogMC41O1xuICAgICAgICB5ID0geSAtIGdyaWRPZmZzZXQgKyBzaXRlU2l6ZSAqIDAuNTtcbiAgICAgICAgeCA9ICh4IC8gc2l0ZVNpemUpID4+IDA7XG4gICAgICAgIHkgPSAoeSAvIHNpdGVTaXplKSA+PiAwO1xuICAgICAgICByZXR1cm4gZy5nZXRTaXRlQnlDb29yZCh7IHJvdzogeSwgY29sOiB4IH0pO1xuICAgIH07XG4gICAgcC5kcmF3ID0gKCkgPT4ge1xuICAgICAgICBwLmJhY2tncm91bmQoMTAwKTtcbiAgICAgICAgZHJhd0dyaWQocCwgZyk7XG4gICAgICAgIHJ1bigpO1xuICAgIH07XG4gICAgbGV0IGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICBsZXQgc2l0ZSA9IGdldFNpdGVGcm9tQ2FudmFzWFkocC5tb3VzZVgsIHAubW91c2VZKTtcbiAgICAgICAgaWYgKHNpdGUpIHtcbiAgICAgICAgICAgIGlmIChwLmtleUlzUHJlc3NlZCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE0OiAvL3JcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5SRVMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE5OiAvL3dcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5XQUxMKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExMzogLy9xXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuTUFTT04pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTAxOiAvL2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5ODogLy9iXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRk9SS19CT01CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk3OiAvL2FcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRFJFRyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHAubW91c2VEcmFnZ2VkID0gaGFuZGxlQ2xpY2s7XG4gICAgcC5tb3VzZUNsaWNrZWQgPSBoYW5kbGVDbGljaztcbn07XG5sZXQgc2tldGNoUCA9IG5ldyBwNShza2V0Y2gpO1xuIiwiaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgQXRvbSB7XG4gICAgY29uc3RydWN0b3IoX3R5cGUgPSBFbGVtZW50VHlwZXMuRU1QVFksIHBhcmFtcykge1xuICAgICAgICB0aGlzLnR5cGUgPSBfdHlwZTtcbiAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5lbGVtID0gbmV3IHRoaXMudHlwZS5jbGFzcyguLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtID0gbmV3IHRoaXMudHlwZS5jbGFzcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgdGhpcy5lbGVtLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcihfbmFtZSwgX3R5cGUsIF9tb3ZlYWJpbGl0eSA9IDEwMCwgX2Rlc3Ryb3lhYmlsaXR5ID0gMTAwKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IF9uYW1lO1xuICAgICAgICB0aGlzLnR5cGUgPSBfdHlwZTtcbiAgICAgICAgdGhpcy5tb3ZlYWJpbGl0eSA9IF9tb3ZlYWJpbGl0eTtcbiAgICAgICAgdGhpcy5kZXN0cm95YWJpbGl0eSA9IF9kZXN0cm95YWJpbGl0eTtcbiAgICB9XG4gICAgZXhlYyhldykgeyB9XG59XG4iLCJpbXBvcnQgeyBFbXB0eUVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9FbXB0eUVsZW1lbnRcIjtcbmltcG9ydCB7IERSZWdFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvRFJlZ0VsZW1lbnRcIjtcbmltcG9ydCB7IFJlc0VsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9SZXNFbGVtZW50XCI7XG5pbXBvcnQgeyBXYWxsRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL1dhbGxFbGVtZW50XCI7XG5pbXBvcnQgeyBNYXNvbkVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9NYXNvbkVsZW1lbnRcIjtcbmltcG9ydCB7IEZvcmtCb21iRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL0ZvcmtCb21iRWxlbWVudFwiO1xuaW1wb3J0IHsgQW50aUZvcmtCb21iRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL0FudGlGb3JrQm9tYkVsZW1lbnRcIjtcbmV4cG9ydCBjbGFzcyBFbGVtZW50VHlwZXMge1xuICAgIHN0YXRpYyByZWdpc3RlclR5cGUobmFtZSwgdHlwZSwgYykge1xuICAgICAgICB0aGlzLlRZUEVTX0FSUkFZLnB1c2goeyBuYW1lLCB0eXBlLCBjbGFzczogYyB9KTtcbiAgICB9XG59XG5FbGVtZW50VHlwZXMuRU1QVFkgPSB7IG5hbWU6IFwiRU1QVFlcIiwgdHlwZTogXCJFXCIsIGNsYXNzOiBFbXB0eUVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5EUkVHID0geyBuYW1lOiBcIkRSRUdcIiwgdHlwZTogXCJEXCIsIGNsYXNzOiBEUmVnRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLlJFUyA9IHsgbmFtZTogXCJSRVNcIiwgdHlwZTogXCJSXCIsIGNsYXNzOiBSZXNFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuV0FMTCA9IHsgbmFtZTogXCJXQUxMXCIsIHR5cGU6IFwiV1wiLCBjbGFzczogV2FsbEVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5NQVNPTiA9IHsgbmFtZTogXCJNQVNPTlwiLCB0eXBlOiBcIk1hXCIsIGNsYXNzOiBNYXNvbkVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5GT1JLX0JPTUIgPSB7IG5hbWU6IFwiRk9SSyBCT01CXCIsIHR5cGU6IFwiRmJcIiwgY2xhc3M6IEZvcmtCb21iRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CID0geyBuYW1lOiBcIkFOVEkgRk9SSyBCT01CXCIsIHR5cGU6IFwiQWZcIiwgY2xhc3M6IEFudGlGb3JrQm9tYkVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5UWVBFU19BUlJBWSA9IFtcbiAgICBFbGVtZW50VHlwZXMuRU1QVFksXG4gICAgRWxlbWVudFR5cGVzLkRSRUcsXG4gICAgRWxlbWVudFR5cGVzLlJFUyxcbiAgICBFbGVtZW50VHlwZXMuV0FMTCxcbiAgICBFbGVtZW50VHlwZXMuTUFTT04sXG4gICAgRWxlbWVudFR5cGVzLkZPUktfQk9NQixcbiAgICBFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUJcbl07XG4iLCJpbXBvcnQgeyBNRk1VdGlscyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vRWxlbWVudFR5cGVzXCI7XG4vL0V2ZW50IHdpbmRvdyBhcyBkZXNjcmliYmVkIGhlcmU6IGh0dHA6Ly9yb2J1c3QuY3MudW5tLmVkdS9saWIvZXhlL2ZldGNoLnBocD93PTMwMCZ0b2s9NGM4ZjQ5Jm1lZGlhPWRldjpldmVudC13aW5kb3ctMTAucG5nXG4vL0NvbGxlY3Rpb24gb2Ygc2l0ZXMgd2hpY2ggY29udGFpbiBhdG9tcywgYnVpbHQgZnJvbSBhbiBvcmlnaW4gKGNlbnRlcikgc2l0ZVxuZXhwb3J0IGNsYXNzIEV2ZW50V2luZG93IHtcbiAgICBjb25zdHJ1Y3RvcihfdGlsZSwgX29yaWdpbikge1xuICAgICAgICB0aGlzLnRpbGUgPSBfdGlsZTtcbiAgICAgICAgdGhpcy5tYWtlV2luZG93KF90aWxlLCBfb3JpZ2luKTtcbiAgICB9XG4gICAgbWFrZVdpbmRvdyh0aWxlLCBvcmlnaW4pIHtcbiAgICAgICAgdGhpcy53aW5kb3cgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMub3JpZ2luID0gdGhpcy50aWxlLmdldFNpdGVCeUNvb3JkKG9yaWdpbik7XG4gICAgICAgIC8vaWYgdGhlIG9yaWdpbiBpcyBFTVBUWSBFbGVtZW50LCBsZXQncyBzYXZlIHNvbWUgY3ljbGVzIChnb29kLCBiYWQ/KVxuICAgICAgICBpZiAodGhpcy5vcmlnaW4uYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMud2luZG93LnNldCh0aGlzLm9yaWdpbi5pZCwgdGhpcy5vcmlnaW4pO1xuICAgICAgICBsZXQgd2luZG93QXJyYXkgPSBFdmVudFdpbmRvdy5XSU5ET1dfT1JERVJfT0ZGU0VUUy5tYXAoKG9mZnNldCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuT2Zmc2V0RnJvbU9yaWdpbihvcmlnaW4sIG9mZnNldC5yb3csIG9mZnNldC5jb2wpO1xuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93QXJyYXkuZm9yRWFjaCgodGlsZUNvb3JkKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2l0ZSA9IHRpbGUuZ2V0U2l0ZUJ5Q29vcmQodGlsZUNvb3JkKTtcbiAgICAgICAgICAgIGlmIChzaXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aW5kb3cuc2V0KHNpdGUuaWQsIHNpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgT2Zmc2V0RnJvbU9yaWdpbihvcmlnaW4sIHJvd09mZnNldCwgY29sT2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiB7IHJvdzogb3JpZ2luLnJvdyArIHJvd09mZnNldCwgY29sOiBvcmlnaW4uY29sICsgY29sT2Zmc2V0IH07XG4gICAgfVxuICAgIGdldFNpdGVCeUluZGV4KGluZGV4KSB7XG4gICAgICAgIGxldCB3YSA9IEFycmF5LmZyb20odGhpcy53aW5kb3cudmFsdWVzKCkpO1xuICAgICAgICBpZiAoaW5kZXggPj0gd2EubGVuZ3RoIHx8IGluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2FbaW5kZXhdO1xuICAgIH1cbiAgICBnZXRSYW5kb20oc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpdGVGcm9tQ2FuZGlkYXRlcyhBcnJheS5mcm9tKHRoaXMud2luZG93LnZhbHVlcygpKSwgdHJ1ZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgLy9tb3N0IHVzZWZ1bCB3aGVuIHVzaW5nIHNwZWNpZmljVHlwZVxuICAgIC8vdHJhdmVyc2VzIHRoZSB3aW5kb3cgdW50aWwgaXQgY29tZXMgYWNyb3NzIHdoYXQgeW91J3JlIGxvb2tpbmcgZm9yXG4gICAgZ2V0TmVhcmVzdChzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKEFycmF5LmZyb20odGhpcy53aW5kb3cudmFsdWVzKCkpLCBmYWxzZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgZ2V0RWFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX0VBU1QpO1xuICAgIH1cbiAgICBnZXRXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfV0VTVCk7XG4gICAgfVxuICAgIGdldE5vcnRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEgpO1xuICAgIH1cbiAgICBnZXRTb3V0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX1NPVVRIKTtcbiAgICB9XG4gICAgZ2V0Tm9ydGhXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEhXRVNUKTtcbiAgICB9XG4gICAgZ2V0U291dGhXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfU09VVEhXRVNUKTtcbiAgICB9XG4gICAgZ2V0Tm9ydGhFYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEhFQVNUKTtcbiAgICB9XG4gICAgZ2V0U291dGhFYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfU09VVEhFQVNUKTtcbiAgICB9XG4gICAgZ2V0QWRqYWNlbnQ0V2F5KHJhbmRvbWl6ZSA9IHRydWUsIHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaXRlRnJvbUNhbmRpZGF0ZXMoW3RoaXMuZ2V0V2VzdCgpLCB0aGlzLmdldE5vcnRoKCksIHRoaXMuZ2V0U291dGgoKSwgdGhpcy5nZXRFYXN0KCldLCByYW5kb21pemUsIHNwZWNpZmljVHlwZSk7XG4gICAgfVxuICAgIGdldEFkamFjZW50OFdheShyYW5kb21pemUgPSB0cnVlLCBzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKFtcbiAgICAgICAgICAgIHRoaXMuZ2V0V2VzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXROb3J0aCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRTb3V0aCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRFYXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldE5vcnRoV2VzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRTb3V0aFdlc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm9ydGhFYXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldFNvdXRoRWFzdCgpXG4gICAgICAgIF0sIHJhbmRvbWl6ZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgLy9HaXZlbiBhbiBhcnJheSBvZiBjYW5kaWRhdGUgc2l0ZXMgKHN5bW1ldHJpZXMgaW4gdGhlIGZ1dHVyZSBJIGhvcGUpLFxuICAgIC8vZ2l2ZSBtZSBiYWNrIG9uZSwgcmFuZG9tIGJ5IGRlZmF1bHQsIG5vdCBmaWx0ZXJlZCBieSB0eXBlIGJ5IGRlZmF1bHRcbiAgICBnZXRTaXRlRnJvbUNhbmRpZGF0ZXMoY2FuZGlkYXRlU2l0ZXMsIHJhbmRvbWl6ZSA9IHRydWUsIHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBjYW5kaWRhdGVTaXRlcyA9IGNhbmRpZGF0ZVNpdGVzLmZpbHRlcihzaXRlID0+IHtcbiAgICAgICAgICAgIGlmICghc2l0ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIXNwZWNpZmljVHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3BlY2lmaWNUeXBlICYmIHNpdGUuYXRvbS50eXBlID09PSBzcGVjaWZpY1R5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vbm8gc2l0ZXMhIHlpa2VzISBwb3NzaWJsZSE/ISBwcm9iYWJseSBvbmx5IHdoZW4gdXNpbmcgc3BlY2lmaWNUeXBlIGFuZCBsb29raW5nIGZvciBhIHJhcmUgZWxlbWVudFxuICAgICAgICBpZiAoY2FuZGlkYXRlU2l0ZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvL3JldHVybiByYW5kb21cbiAgICAgICAgaWYgKHJhbmRvbWl6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZVNpdGVzWyhNYXRoLnJhbmRvbSgpICogY2FuZGlkYXRlU2l0ZXMubGVuZ3RoKSA+PiAwXTtcbiAgICAgICAgfVxuICAgICAgICAvL3JldHVybiBmaXJzdCBtYXRjaGluZ1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlU2l0ZXNbMF07XG4gICAgfVxuICAgIGdldERpcmVjdGlvbihkaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IHNpdGUgPSB0aGlzLnRpbGUuc2l0ZXMuZ2V0KE1GTVV0aWxzLkN0b0lEKHRoaXMuT2Zmc2V0RnJvbU9yaWdpbih0aGlzLm9yaWdpbi50aWxlUG9zLCBkaXJlY3Rpb24ucm93LCBkaXJlY3Rpb24uY29sKSkpO1xuICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNpdGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5FdmVudFdpbmRvdy5XSU5ET1dfT1JERVJfT0ZGU0VUUyA9IFtcbiAgICB7IGNvbDogMCwgcm93OiAwIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDAgfSxcbiAgICB7IGNvbDogMCwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAwLCByb3c6IDEgfSxcbiAgICB7IGNvbDogMSwgcm93OiAwIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDEgfSxcbiAgICB7IGNvbDogMSwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAxLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogMiB9LFxuICAgIHsgY29sOiAyLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAtMiB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAyIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogLTIgfSxcbiAgICB7IGNvbDogMSwgcm93OiAyIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMiwgcm93OiAxIH0sXG4gICAgeyBjb2w6IC0zLCByb3c6IDAgfSxcbiAgICB7IGNvbDogMCwgcm93OiAtMyB9LFxuICAgIHsgY29sOiAwLCByb3c6IDMgfSxcbiAgICB7IGNvbDogMywgcm93OiAwIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IC0yIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IDIgfSxcbiAgICB7IGNvbDogMiwgcm93OiAtMiB9LFxuICAgIHsgY29sOiAyLCByb3c6IDIgfSxcbiAgICB7IGNvbDogLTMsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogLTMsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAtMyB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAzIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogLTMgfSxcbiAgICB7IGNvbDogMSwgcm93OiAzIH0sXG4gICAgeyBjb2w6IDMsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMywgcm93OiAxIH0sXG4gICAgeyBjb2w6IC00LCByb3c6IDAgfSxcbiAgICB7IGNvbDogMCwgcm93OiAtNCB9LFxuICAgIHsgY29sOiAwLCByb3c6IDQgfSxcbiAgICB7IGNvbDogNCwgcm93OiAwIH1cbl07XG4vL2JlY2F1c2UsIGxhenlcbkV2ZW50V2luZG93LkVXX1dFU1QgPSB7IGNvbDogLTEsIHJvdzogMCB9O1xuRXZlbnRXaW5kb3cuRVdfRUFTVCA9IHsgY29sOiAxLCByb3c6IDAgfTtcbkV2ZW50V2luZG93LkVXX05PUlRIID0geyBjb2w6IDAsIHJvdzogLTEgfTtcbkV2ZW50V2luZG93LkVXX1NPVVRIID0geyBjb2w6IDAsIHJvdzogMSB9O1xuRXZlbnRXaW5kb3cuRVdfTk9SVEhXRVNUID0geyBjb2w6IC0xLCByb3c6IC0xIH07XG5FdmVudFdpbmRvdy5FV19TT1VUSFdFU1QgPSB7IGNvbDogLTEsIHJvdzogMSB9O1xuRXZlbnRXaW5kb3cuRVdfTk9SVEhFQVNUID0geyBjb2w6IDEsIHJvdzogLTEgfTtcbkV2ZW50V2luZG93LkVXX1NPVVRIRUFTVCA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiIsImltcG9ydCB7IE1GTVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4vQXRvbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgU2l0ZSB7XG4gICAgY29uc3RydWN0b3IoX3Bvcykge1xuICAgICAgICB0aGlzLnRpbGVQb3MgPSBfcG9zO1xuICAgICAgICB0aGlzLmlkID0gTUZNVXRpbHMuQ3RvSUQodGhpcy50aWxlUG9zKTtcbiAgICAgICAgdGhpcy5jcmVhdGUoKTtcbiAgICB9XG4gICAgLy9pZiB0YXJnZXRTaXRlIGlzIGtpbGxhYmxlXG4gICAgLy9raWxsIGl0cyBhdG9tIChyZXBsYWNlIHdpdGggZW1wdHkpXG4gICAga2lsbEF0b20odGFyZ2V0U2l0ZSkge1xuICAgICAgICBsZXQga2lsbCA9IE1hdGgucmFuZG9tKCkgKiAxMDAgPCB0YXJnZXRTaXRlLmF0b20uZWxlbS5kZXN0cm95YWJpbGl0eTtcbiAgICAgICAgaWYgKGtpbGwpIHtcbiAgICAgICAgICAgIHRhcmdldFNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAga2lsbFNlbGYobGVhdmluZ0F0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpKSB7XG4gICAgICAgIHRoaXMuYXRvbSA9IGxlYXZpbmdBdG9tO1xuICAgIH1cbiAgICAvL2lmIHRhcmdldCBzaXRlIGlzIGtpbGxhYmxlXG4gICAgLy9tb3ZlIHRoaXMgYXRvbSB0byB0YXJnZXRTaXRlLCBhbmQgbGVhdmUgYmVoaW5kIGxlYXZpbmdBdG9tLCB3aGljaCBieSBkZWZhdWx0IGlzIGVtcHR5XG4gICAgbW92ZUF0b20odGFyZ2V0U2l0ZSwgbGVhdmluZ0F0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpKSB7XG4gICAgICAgIGlmICh0YXJnZXRTaXRlICYmIHRhcmdldFNpdGUuY2FuRGVzdHJveSgpKSB7XG4gICAgICAgICAgICBbdGhpcy5hdG9tLCB0YXJnZXRTaXRlLmF0b21dID0gW2xlYXZpbmdBdG9tLCB0aGlzLmF0b21dO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vaWYgdGFyZ2V0U2l0ZSBpcyBtb3ZlYWJsZVxuICAgIC8vc3dhcCBhdG9tcyB3aXRoIHRoaXMgb25lXG4gICAgc3dhcEF0b21zKHRhcmdldFNpdGUpIHtcbiAgICAgICAgaWYgKHRhcmdldFNpdGUgJiYgdGFyZ2V0U2l0ZS5jYW5Nb3ZlKCkpIHtcbiAgICAgICAgICAgIFt0aGlzLmF0b20sIHRhcmdldFNpdGUuYXRvbV0gPSBbdGFyZ2V0U2l0ZS5hdG9tLCB0aGlzLmF0b21dO1xuICAgICAgICB9XG4gICAgfVxuICAgIG11dGF0ZVNpdGUodGFyZ2V0U2l0ZSwgbmV3QXRvbSkge1xuICAgICAgICBpZiAodGFyZ2V0U2l0ZSAmJiB0YXJnZXRTaXRlLmNhbkRlc3Ryb3koKSkge1xuICAgICAgICAgICAgdGFyZ2V0U2l0ZS5hdG9tID0gbmV3QXRvbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYW5EZXN0cm95KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDEwMCA8IHRoaXMuYXRvbS5lbGVtLmRlc3Ryb3lhYmlsaXR5O1xuICAgIH1cbiAgICBjYW5Nb3ZlKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDEwMCA8IHRoaXMuYXRvbS5lbGVtLm1vdmVhYmlsaXR5O1xuICAgIH1cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuYXRvbSA9IG5ldyBBdG9tKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU2l0ZSB9IGZyb20gXCIuL1NpdGVcIjtcbmltcG9ydCB7IE1GTVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5leHBvcnQgY2xhc3MgVGlsZSB7XG4gICAgY29uc3RydWN0b3IoX3dpZHRoID0gMSwgX2hlaWdodCA9IDEpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IF93aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBfaGVpZ2h0O1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgIH1cbiAgICBnZXRTaXRlQnlDb29yZChjKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNpdGVzLmdldChNRk1VdGlscy5DdG9JRChjKSk7XG4gICAgfVxuICAgIGdldFJhbmRvbVNpdGUoKSB7XG4gICAgICAgIGxldCByciA9IChNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQpID4+IDA7XG4gICAgICAgIGxldCByYyA9IChNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCkgPj4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l0ZXMuZ2V0KGAke3JyfToke3JjfWApO1xuICAgIH1cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuc2l0ZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAvL2Fjcm9zcyBjb2x1bW5zXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuaGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAvL2Rvd24gcm93c1xuICAgICAgICAgICAgICAgIHRoaXMuc2l0ZXMuc2V0KGAke2p9OiR7aX1gLCBuZXcgU2l0ZSh7IHJvdzogaiwgY29sOiBpIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgQW50aUZvcmtCb21iRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKF9iaXJ0aGVkSW5kZXggPSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLkVNUFRZLm5hbWUsIEVsZW1lbnRUeXBlcy5FTVBUWS50eXBlKTtcbiAgICAgICAgdGhpcy5iaXJ0aGVkSW5kZXggPSBfYmlydGhlZEluZGV4O1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIGxldCBmYiA9IGV3LmdldE5lYXJlc3QoRWxlbWVudFR5cGVzLkZPUktfQk9NQik7XG4gICAgICAgIGlmICghZmIgJiYgTWF0aC5yYW5kb20oKSA8IDAuMikge1xuICAgICAgICAgICAgZXcub3JpZ2luLmtpbGxTZWxmKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy93aGlsZSB0aGVyZSBhcmUgZm9ya2JvbWJzIHByZXNlbnQsIGRlc3Ryb3kgdGhlbVxuICAgICAgICB3aGlsZSAoZmIpIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKGZiLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpKTtcbiAgICAgICAgICAgIGZiID0gZXcuZ2V0TmVhcmVzdChFbGVtZW50VHlwZXMuRk9SS19CT01CKTtcbiAgICAgICAgfVxuICAgICAgICAvL21ha2UgbmV3IGFudGkgZm9yayBib21ic1xuICAgICAgICBpZiAoIXRoaXMuYmlydGhlZEluZGV4KSB7XG4gICAgICAgICAgICAvL3RoaXMgaXMgdGhlIGZpcnN0XG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgMTMsXG4gICAgICAgICAgICAgICAgMTQsXG4gICAgICAgICAgICAgICAgMTUsXG4gICAgICAgICAgICAgICAgMTYsXG4gICAgICAgICAgICAgICAgMTcsXG4gICAgICAgICAgICAgICAgMTgsXG4gICAgICAgICAgICAgICAgMTksXG4gICAgICAgICAgICAgICAgMjAsXG4gICAgICAgICAgICAgICAgMjEsXG4gICAgICAgICAgICAgICAgMjIsXG4gICAgICAgICAgICAgICAgMjMsXG4gICAgICAgICAgICAgICAgMjQsXG4gICAgICAgICAgICAgICAgMjUsXG4gICAgICAgICAgICAgICAgMjYsXG4gICAgICAgICAgICAgICAgMjcsXG4gICAgICAgICAgICAgICAgMjgsXG4gICAgICAgICAgICAgICAgMjksXG4gICAgICAgICAgICAgICAgMzAsXG4gICAgICAgICAgICAgICAgMzEsXG4gICAgICAgICAgICAgICAgMzIsXG4gICAgICAgICAgICAgICAgMzMsXG4gICAgICAgICAgICAgICAgMzQsXG4gICAgICAgICAgICAgICAgMzUsXG4gICAgICAgICAgICAgICAgMzYsXG4gICAgICAgICAgICAgICAgMzcsXG4gICAgICAgICAgICAgICAgMzgsXG4gICAgICAgICAgICAgICAgMzksXG4gICAgICAgICAgICAgICAgNDBcbiAgICAgICAgICAgIF0uZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNpdGUgPSBldy5nZXRTaXRlQnlJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKHNpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoc2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLCBbaW5kZXhdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL3RoaXMgaXMgYSBjaGlsZCwganVzdCBjb250aW51ZSB0aGF0IHdheVxuICAgICAgICAgICAgW2V3LmdldFNpdGVCeUluZGV4KHRoaXMuYmlydGhlZEluZGV4KV0uZm9yRWFjaChzaXRlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKHNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoc2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLCBbdGhpcy5iaXJ0aGVkSW5kZXhdKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBldy5vcmlnaW4ua2lsbFNlbGYoKTtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBEUmVnRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRFJFRy5uYW1lLCBFbGVtZW50VHlwZXMuRFJFRy50eXBlKTtcbiAgICAgICAgdGhpcy5wRFJFR19DUkVBVEUgPSAxMDAwO1xuICAgICAgICB0aGlzLnBSRVNfQ1JFQVRFID0gMzAwO1xuICAgICAgICB0aGlzLnBEUkVHX0RFU1RST1kgPSAxMDtcbiAgICAgICAgdGhpcy5wQU5ZX0RFU1RST1kgPSAxMDA7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgLy9nZXQgYSByYW5kb20gTkVTVyBzaXRlXG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZVNpdGUgPSBldy5nZXRBZGphY2VudDRXYXkoKTtcbiAgICAgICAgLy9DUkVBVElPTlxuICAgICAgICBpZiAoYXZhaWxhYmxlU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgY29uc3QgY3JlYXRlRFJlZyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBEUkVHX0NSRUFURSA8IDE7XG4gICAgICAgICAgICBjb25zdCBjcmVhdGVSZXMgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5wUkVTX0NSRUFURSA8IDE7XG4gICAgICAgICAgICBpZiAoY3JlYXRlRFJlZykge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuRFJFRykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRFJFRyBDUkVBVEVEXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3JlYXRlUmVzKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5SRVMpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFUyBDUkVBVEVEXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLnN3YXBBdG9tcyhhdmFpbGFibGVTaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdmFpbGFibGVTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkRSRUcpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc3Ryb3lEUmVnID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucERSRUdfREVTVFJPWSA8IDE7XG4gICAgICAgICAgICBpZiAoZGVzdHJveURSZWcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRSRUcgREVTVFJPWUVEXCIpO1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vaXQncyBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgICAgY29uc3QgZGVzdHJveUFueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBBTllfREVTVFJPWSA8IDE7XG4gICAgICAgICAgICBpZiAoZGVzdHJveUFueSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF2YWlsYWJsZVNpdGUuYXRvbS50eXBlLm5hbWUgKyBcIiBERVNUUk9ZRURcIik7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuZXhwb3J0IGNsYXNzIEVtcHR5RWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRU1QVFkubmFtZSwgRWxlbWVudFR5cGVzLkVNUFRZLnR5cGUpO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgRm9ya0JvbWJFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5FTVBUWS5uYW1lLCBFbGVtZW50VHlwZXMuRU1QVFkudHlwZSk7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgbGV0IG5leHRWaWN0aW0gPSBldy5nZXRBZGphY2VudDhXYXkoKTtcbiAgICAgICAgaWYgKG5leHRWaWN0aW0pIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKG5leHRWaWN0aW0sIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi4vQXRvbVwiO1xuZXhwb3J0IGNsYXNzIE1hc29uRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKF9wYXRoID0gXCJFRUVFTk5OTldXV1dTU1NTXCIpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLk1BU09OLm5hbWUsIEVsZW1lbnRUeXBlcy5NQVNPTi50eXBlLCAxMDAsIDEwMCk7XG4gICAgICAgIHRoaXMucGF0aCA9IFtdO1xuICAgICAgICB0aGlzLmN1ckluZGV4ID0gMDtcbiAgICAgICAgX3BhdGggPSB0aGlzLmJveFBhdGgoKTtcbiAgICAgICAgdGhpcy5wYXRoID0gX3BhdGgudG9VcHBlckNhc2UoKS5zcGxpdChcIlwiKTtcbiAgICB9XG4gICAgLy9tYWtlIGEgcmFuZG9tIHdhbGwgcGF0aFxuICAgIHJhbmRvbVBhdGgoKSB7XG4gICAgICAgIGxldCBwYXRoID0gXCJcIjtcbiAgICAgICAgY29uc3QgciA9IChNYXRoLnJhbmRvbSgpICogOCArIDYpID4+IDA7XG4gICAgICAgIGNvbnN0IGNob2ljZXMgPSBbXCJFXCIsIFwiTlwiLCBcIlNcIiwgXCJXXCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZCA9IChNYXRoLnJhbmRvbSgpICogY2hvaWNlcy5sZW5ndGgpID4+IDA7XG4gICAgICAgICAgICBjb25zdCBsID0gKE1hdGgucmFuZG9tKCkgKiAzICsgMykgPj4gMDtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IGNob2ljZXNbZF07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGw7IGorKykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLmNvbmNhdChkaXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICAvL21ha2UgYSBib3ggcGF0aFxuICAgIGJveFBhdGgoc2lkZUxlbmd0aCA9IDcpIHtcbiAgICAgICAgbGV0IHBhdGggPSBcIlwiO1xuICAgICAgICBjb25zdCBjaG9pY2VzID0gW1wiRVwiLCBcIk5cIiwgXCJXXCIsIFwiU1wiXTtcbiAgICAgICAgd2hpbGUgKGNob2ljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBkaXIgPSBjaG9pY2VzLnNoaWZ0KCk7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpZGVMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLmNvbmNhdChkaXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIGlmICh0aGlzLmN1ckluZGV4ID49IHRoaXMucGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VySW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0ZGlyID0gdGhpcy5jdXJJbmRleCA9PT0gMCA/IHRoaXMucGF0aFt0aGlzLnBhdGgubGVuZ3RoIC0gMV0gOiB0aGlzLnBhdGhbdGhpcy5jdXJJbmRleCAtIDFdO1xuICAgICAgICBsZXQgZGlyID0gdGhpcy5wYXRoW3RoaXMuY3VySW5kZXhdO1xuICAgICAgICB0aGlzLmN1ckluZGV4Kys7XG4gICAgICAgIGxldCBibHVlcHJpbnRzID0ge1xuICAgICAgICAgICAgRToge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0RWFzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRTb3V0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBOOiB7XG4gICAgICAgICAgICAgICAgbW92ZVNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbm5lckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFdlc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUzoge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0U291dGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0V2VzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFc6IHtcbiAgICAgICAgICAgICAgICBtb3ZlU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFdlc3QoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0Tm9ydGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlubmVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0U291dGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG1vdmVTaXRlID0gYmx1ZXByaW50c1tkaXJdLm1vdmVTaXRlKCk7XG4gICAgICAgIGNvbnN0IG91dGVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tkaXJdLm91dGVyQnVpbGRTaXRlKCk7XG4gICAgICAgIGNvbnN0IGlubmVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tkaXJdLmlubmVyQnVpbGRTaXRlKCk7XG4gICAgICAgIC8vZm9yIGNoYW5naW5nIGRpcmVjdGlvbnNcbiAgICAgICAgaWYgKGxhc3RkaXIgIT09IGRpcikge1xuICAgICAgICAgICAgY29uc3QgbGFzdE91dGVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tsYXN0ZGlyXS5vdXRlckJ1aWxkU2l0ZSgpO1xuICAgICAgICAgICAgaWYgKGxhc3RPdXRlckJ1aWxkU2l0ZSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKGxhc3RPdXRlckJ1aWxkU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL2J1aWxkIHRoZSBvdXRlciB3YWxsXG4gICAgICAgIGlmIChvdXRlckJ1aWxkU2l0ZSkge1xuICAgICAgICAgICAgaWYgKG91dGVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLlJFUyB8fCBvdXRlckJ1aWxkU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKG91dGVyQnVpbGRTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuV0FMTCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vYnVpbGQgdGhlIGlubmVyIHdhbGxcbiAgICAgICAgaWYgKGlubmVyQnVpbGRTaXRlKSB7XG4gICAgICAgICAgICBpZiAoaW5uZXJCdWlsZFNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuUkVTIHx8IGlubmVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoaW5uZXJCdWlsZFNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5XQUxMKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9tb3ZlIHRvIG5leHQgc2l0ZVxuICAgICAgICBpZiAobW92ZVNpdGUpIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShtb3ZlU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBSZXNFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5SRVMubmFtZSwgRWxlbWVudFR5cGVzLlJFUy50eXBlKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBldy5vcmlnaW4uc3dhcEF0b21zKGV3LmdldEFkamFjZW50NFdheSh0cnVlLCBFbGVtZW50VHlwZXMuRU1QVFkpKTtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgV2FsbEVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLldBTEwubmFtZSwgRWxlbWVudFR5cGVzLldBTEwudHlwZSwgMCwgMTAwKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFdmVudFdpbmRvdyB9IGZyb20gXCIuLi9jbGFzc2VzL0V2ZW50d2luZG93XCI7XG5leHBvcnQgY2xhc3MgTUZNVXRpbHMge1xuICAgIHN0YXRpYyBDdG9JRChjKSB7XG4gICAgICAgIHJldHVybiBgJHtjLnJvd306JHtjLmNvbH1gO1xuICAgIH1cbiAgICBzdGF0aWMgSUR0b0MoaWQpIHtcbiAgICAgICAgbGV0IHJjYSA9IGlkLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgcmV0dXJuIHsgcm93OiBwYXJzZUludChyY2FbMF0pLCBjb2w6IHBhcnNlSW50KHJjYVsxXSkgfTtcbiAgICB9XG4gICAgc3RhdGljIEdlbmVyYXRlRXZlbnRXaW5kb3codGlsZSwgdywgaCkge1xuICAgICAgICBsZXQgcmMgPSAoTWF0aC5yYW5kb20oKSAqIHcpID4+IDA7XG4gICAgICAgIGxldCByciA9IChNYXRoLnJhbmRvbSgpICogaCkgPj4gMDtcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudFdpbmRvdyh0aWxlLCB7IHJvdzogcnIsIGNvbDogcmMgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==