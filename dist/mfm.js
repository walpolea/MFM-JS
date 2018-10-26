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
    let drawGrid = (p, t) => {
        p.push();
        p.translate(gridOffset, gridOffset);
        t.sites.forEach((site) => {
            switch (site.atom.elem.type) {
                case _mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY.type:
                    p.stroke(0, 0, 0, 0);
                    p.fill(32, 32, 32, 127);
                    break;
                case _mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].DREG.type:
                    p.stroke(0, 0, 0, 127);
                    p.fill(255, 32, 32);
                    break;
                case _mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES.type:
                    p.stroke(0, 0, 0, 127);
                    p.fill(32, 255, 64);
                    break;
                case _mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].WALL.type:
                    p.stroke(0, 0, 0, 127);
                    p.fill(32, 32, 255);
                    break;
                case _mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON.type:
                    p.stroke(0, 0, 0, 127);
                    p.fill(32, 255, 255);
                    break;
            }
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
    constructor(_type = _ElementTypes__WEBPACK_IMPORTED_MODULE_0__["ElementTypes"].EMPTY) {
        this.type = _type;
        this.elem = new this.type.class();
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
ElementTypes.TYPES_ARRAY = [
    ElementTypes.EMPTY,
    ElementTypes.DREG,
    ElementTypes.RES,
    ElementTypes.WALL,
    ElementTypes.MASON
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
    getRandom(specificType = undefined) {
        return this.getSiteFromCandidates(Array.from(this.window.values()), true, specificType);
    }
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
    //Given an array of candidate sites (symmetries in the future I hope), give me back one, random by default, not filtered by type by default
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9BdG9tLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtZW50VHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL0V2ZW50d2luZG93LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9TaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9UaWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9EUmVnRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvRW1wdHlFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9NYXNvbkVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL2VsZW1lbnRzL1Jlc0VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL2VsZW1lbnRzL1dhbGxFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHFEQUFRO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxp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QUFDakM7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdFQUFXLFFBQVEsbUJBQW1CO0FBQ3pEO0FBQ0EiLCJmaWxlIjoibWZtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBUaWxlIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvVGlsZVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBNRk1VdGlscyB9IGZyb20gXCIuL21mbS91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuL21mbS9jbGFzc2VzL0F0b21cIjtcbmxldCBnID0gbmV3IFRpbGUoNDgsIDQ4KTtcbnZhciBza2V0Y2ggPSAocCkgPT4ge1xuICAgIGxldCBzaXRlU2l6ZSA9IDE0O1xuICAgIGxldCBncmlkT2Zmc2V0ID0gMjA7XG4gICAgcC5wcmVsb2FkID0gKCkgPT4geyB9O1xuICAgIHAuc2V0dXAgPSAoKSA9PiB7XG4gICAgICAgIHAuY3JlYXRlQ2FudmFzKDcwMCwgNzAwKTtcbiAgICB9O1xuICAgIC8vICAgcC53aW5kb3dSZXNpemVkID0gKCkgPT4ge1xuICAgIC8vICAgICBwLnJlc2l6ZUNhbnZhcyhwLndpbmRvd1dpZHRoIC0gNTAsIHAud2luZG93SGVpZ2h0IC0gNTApO1xuICAgIC8vICAgfTtcbiAgICBsZXQgZHJhd0dyaWQgPSAocCwgdCkgPT4ge1xuICAgICAgICBwLnB1c2goKTtcbiAgICAgICAgcC50cmFuc2xhdGUoZ3JpZE9mZnNldCwgZ3JpZE9mZnNldCk7XG4gICAgICAgIHQuc2l0ZXMuZm9yRWFjaCgoc2l0ZSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChzaXRlLmF0b20uZWxlbS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBFbGVtZW50VHlwZXMuRU1QVFkudHlwZTpcbiAgICAgICAgICAgICAgICAgICAgcC5zdHJva2UoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHAuZmlsbCgzMiwgMzIsIDMyLCAxMjcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEVsZW1lbnRUeXBlcy5EUkVHLnR5cGU6XG4gICAgICAgICAgICAgICAgICAgIHAuc3Ryb2tlKDAsIDAsIDAsIDEyNyk7XG4gICAgICAgICAgICAgICAgICAgIHAuZmlsbCgyNTUsIDMyLCAzMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRWxlbWVudFR5cGVzLlJFUy50eXBlOlxuICAgICAgICAgICAgICAgICAgICBwLnN0cm9rZSgwLCAwLCAwLCAxMjcpO1xuICAgICAgICAgICAgICAgICAgICBwLmZpbGwoMzIsIDI1NSwgNjQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEVsZW1lbnRUeXBlcy5XQUxMLnR5cGU6XG4gICAgICAgICAgICAgICAgICAgIHAuc3Ryb2tlKDAsIDAsIDAsIDEyNyk7XG4gICAgICAgICAgICAgICAgICAgIHAuZmlsbCgzMiwgMzIsIDI1NSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRWxlbWVudFR5cGVzLk1BU09OLnR5cGU6XG4gICAgICAgICAgICAgICAgICAgIHAuc3Ryb2tlKDAsIDAsIDAsIDEyNyk7XG4gICAgICAgICAgICAgICAgICAgIHAuZmlsbCgzMiwgMjU1LCAyNTUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAuZWxsaXBzZShzaXRlLnRpbGVQb3MuY29sICogc2l0ZVNpemUsIHNpdGUudGlsZVBvcy5yb3cgKiBzaXRlU2l6ZSwgc2l0ZVNpemUsIHNpdGVTaXplKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHAucG9wKCk7XG4gICAgfTtcbiAgICBsZXQgcnVuID0gKCkgPT4ge1xuICAgICAgICBsZXQgc3BlZWQgPSAxMDAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwZWVkOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBldyA9IE1GTVV0aWxzLkdlbmVyYXRlRXZlbnRXaW5kb3coZywgZy53aWR0aCwgZy5oZWlnaHQpO1xuICAgICAgICAgICAgZXcub3JpZ2luLmF0b20uZXhlYyhldyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCBnZXRTaXRlRnJvbUNhbnZhc1hZID0gKHgsIHkpID0+IHtcbiAgICAgICAgeCA9IHggLSBncmlkT2Zmc2V0ICsgc2l0ZVNpemUgKiAwLjU7XG4gICAgICAgIHkgPSB5IC0gZ3JpZE9mZnNldCArIHNpdGVTaXplICogMC41O1xuICAgICAgICB4ID0gKHggLyBzaXRlU2l6ZSkgPj4gMDtcbiAgICAgICAgeSA9ICh5IC8gc2l0ZVNpemUpID4+IDA7XG4gICAgICAgIHJldHVybiBnLmdldFNpdGVCeUNvb3JkKHsgcm93OiB5LCBjb2w6IHggfSk7XG4gICAgfTtcbiAgICBwLmRyYXcgPSAoKSA9PiB7XG4gICAgICAgIHAuYmFja2dyb3VuZCgxMDApO1xuICAgICAgICBkcmF3R3JpZChwLCBnKTtcbiAgICAgICAgcnVuKCk7XG4gICAgfTtcbiAgICBsZXQgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzaXRlID0gZ2V0U2l0ZUZyb21DYW52YXNYWShwLm1vdXNlWCwgcC5tb3VzZVkpO1xuICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgaWYgKHAua2V5SXNQcmVzc2VkKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChwLmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTQ6IC8vclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLlJFUyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTk6IC8vd1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTEzOiAvL3FcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDE6IC8vZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5EUkVHKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcC5tb3VzZURyYWdnZWQgPSBoYW5kbGVDbGljaztcbiAgICBwLm1vdXNlQ2xpY2tlZCA9IGhhbmRsZUNsaWNrO1xufTtcbmxldCBza2V0Y2hQID0gbmV3IHA1KHNrZXRjaCk7XG4iLCJpbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBBdG9tIHtcbiAgICBjb25zdHJ1Y3RvcihfdHlwZSA9IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICB0aGlzLnR5cGUgPSBfdHlwZTtcbiAgICAgICAgdGhpcy5lbGVtID0gbmV3IHRoaXMudHlwZS5jbGFzcygpO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHRoaXMuZWxlbS5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoX25hbWUsIF90eXBlLCBfbW92ZWFiaWxpdHkgPSAxMDAsIF9kZXN0cm95YWJpbGl0eSA9IDEwMCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBfbmFtZTtcbiAgICAgICAgdGhpcy50eXBlID0gX3R5cGU7XG4gICAgICAgIHRoaXMubW92ZWFiaWxpdHkgPSBfbW92ZWFiaWxpdHk7XG4gICAgICAgIHRoaXMuZGVzdHJveWFiaWxpdHkgPSBfZGVzdHJveWFiaWxpdHk7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHsgfVxufVxuIiwiaW1wb3J0IHsgRW1wdHlFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvRW1wdHlFbGVtZW50XCI7XG5pbXBvcnQgeyBEUmVnRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL0RSZWdFbGVtZW50XCI7XG5pbXBvcnQgeyBSZXNFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvUmVzRWxlbWVudFwiO1xuaW1wb3J0IHsgV2FsbEVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9XYWxsRWxlbWVudFwiO1xuaW1wb3J0IHsgTWFzb25FbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvTWFzb25FbGVtZW50XCI7XG5leHBvcnQgY2xhc3MgRWxlbWVudFR5cGVzIHtcbiAgICBzdGF0aWMgcmVnaXN0ZXJUeXBlKG5hbWUsIHR5cGUsIGMpIHtcbiAgICAgICAgdGhpcy5UWVBFU19BUlJBWS5wdXNoKHsgbmFtZSwgdHlwZSwgY2xhc3M6IGMgfSk7XG4gICAgfVxufVxuRWxlbWVudFR5cGVzLkVNUFRZID0geyBuYW1lOiBcIkVNUFRZXCIsIHR5cGU6IFwiRVwiLCBjbGFzczogRW1wdHlFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuRFJFRyA9IHsgbmFtZTogXCJEUkVHXCIsIHR5cGU6IFwiRFwiLCBjbGFzczogRFJlZ0VsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5SRVMgPSB7IG5hbWU6IFwiUkVTXCIsIHR5cGU6IFwiUlwiLCBjbGFzczogUmVzRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLldBTEwgPSB7IG5hbWU6IFwiV0FMTFwiLCB0eXBlOiBcIldcIiwgY2xhc3M6IFdhbGxFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuTUFTT04gPSB7IG5hbWU6IFwiTUFTT05cIiwgdHlwZTogXCJNYVwiLCBjbGFzczogTWFzb25FbGVtZW50IH07XG5FbGVtZW50VHlwZXMuVFlQRVNfQVJSQVkgPSBbXG4gICAgRWxlbWVudFR5cGVzLkVNUFRZLFxuICAgIEVsZW1lbnRUeXBlcy5EUkVHLFxuICAgIEVsZW1lbnRUeXBlcy5SRVMsXG4gICAgRWxlbWVudFR5cGVzLldBTEwsXG4gICAgRWxlbWVudFR5cGVzLk1BU09OXG5dO1xuIiwiaW1wb3J0IHsgTUZNVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuL0VsZW1lbnRUeXBlc1wiO1xuLy9FdmVudCB3aW5kb3cgYXMgZGVzY3JpYmJlZCBoZXJlOiBodHRwOi8vcm9idXN0LmNzLnVubS5lZHUvbGliL2V4ZS9mZXRjaC5waHA/dz0zMDAmdG9rPTRjOGY0OSZtZWRpYT1kZXY6ZXZlbnQtd2luZG93LTEwLnBuZ1xuLy9Db2xsZWN0aW9uIG9mIHNpdGVzIHdoaWNoIGNvbnRhaW4gYXRvbXMsIGJ1aWx0IGZyb20gYW4gb3JpZ2luIChjZW50ZXIpIHNpdGVcbmV4cG9ydCBjbGFzcyBFdmVudFdpbmRvdyB7XG4gICAgY29uc3RydWN0b3IoX3RpbGUsIF9vcmlnaW4pIHtcbiAgICAgICAgdGhpcy50aWxlID0gX3RpbGU7XG4gICAgICAgIHRoaXMubWFrZVdpbmRvdyhfdGlsZSwgX29yaWdpbik7XG4gICAgfVxuICAgIG1ha2VXaW5kb3codGlsZSwgb3JpZ2luKSB7XG4gICAgICAgIHRoaXMud2luZG93ID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMudGlsZS5nZXRTaXRlQnlDb29yZChvcmlnaW4pO1xuICAgICAgICAvL2lmIHRoZSBvcmlnaW4gaXMgRU1QVFkgRWxlbWVudCwgbGV0J3Mgc2F2ZSBzb21lIGN5Y2xlcyAoZ29vZCwgYmFkPylcbiAgICAgICAgaWYgKHRoaXMub3JpZ2luLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLndpbmRvdy5zZXQodGhpcy5vcmlnaW4uaWQsIHRoaXMub3JpZ2luKTtcbiAgICAgICAgbGV0IHdpbmRvd0FycmF5ID0gRXZlbnRXaW5kb3cuV0lORE9XX09SREVSX09GRlNFVFMubWFwKChvZmZzZXQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk9mZnNldEZyb21PcmlnaW4ob3JpZ2luLCBvZmZzZXQucm93LCBvZmZzZXQuY29sKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvd0FycmF5LmZvckVhY2goKHRpbGVDb29yZCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNpdGUgPSB0aWxlLmdldFNpdGVCeUNvb3JkKHRpbGVDb29yZCk7XG4gICAgICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMud2luZG93LnNldChzaXRlLmlkLCBzaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9mZnNldEZyb21PcmlnaW4ob3JpZ2luLCByb3dPZmZzZXQsIGNvbE9mZnNldCkge1xuICAgICAgICByZXR1cm4geyByb3c6IG9yaWdpbi5yb3cgKyByb3dPZmZzZXQsIGNvbDogb3JpZ2luLmNvbCArIGNvbE9mZnNldCB9O1xuICAgIH1cbiAgICBnZXRSYW5kb20oc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpdGVGcm9tQ2FuZGlkYXRlcyhBcnJheS5mcm9tKHRoaXMud2luZG93LnZhbHVlcygpKSwgdHJ1ZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgZ2V0TmVhcmVzdChzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKEFycmF5LmZyb20odGhpcy53aW5kb3cudmFsdWVzKCkpLCBmYWxzZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgZ2V0RWFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX0VBU1QpO1xuICAgIH1cbiAgICBnZXRXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfV0VTVCk7XG4gICAgfVxuICAgIGdldE5vcnRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEgpO1xuICAgIH1cbiAgICBnZXRTb3V0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX1NPVVRIKTtcbiAgICB9XG4gICAgZ2V0Tm9ydGhXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEhXRVNUKTtcbiAgICB9XG4gICAgZ2V0U291dGhXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfU09VVEhXRVNUKTtcbiAgICB9XG4gICAgZ2V0Tm9ydGhFYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEhFQVNUKTtcbiAgICB9XG4gICAgZ2V0U291dGhFYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfU09VVEhFQVNUKTtcbiAgICB9XG4gICAgZ2V0QWRqYWNlbnQ0V2F5KHJhbmRvbWl6ZSA9IHRydWUsIHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaXRlRnJvbUNhbmRpZGF0ZXMoW3RoaXMuZ2V0V2VzdCgpLCB0aGlzLmdldE5vcnRoKCksIHRoaXMuZ2V0U291dGgoKSwgdGhpcy5nZXRFYXN0KCldLCByYW5kb21pemUsIHNwZWNpZmljVHlwZSk7XG4gICAgfVxuICAgIGdldEFkamFjZW50OFdheShyYW5kb21pemUgPSB0cnVlLCBzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKFtcbiAgICAgICAgICAgIHRoaXMuZ2V0V2VzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXROb3J0aCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRTb3V0aCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRFYXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldE5vcnRoV2VzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRTb3V0aFdlc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm9ydGhFYXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldFNvdXRoRWFzdCgpXG4gICAgICAgIF0sIHJhbmRvbWl6ZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgLy9HaXZlbiBhbiBhcnJheSBvZiBjYW5kaWRhdGUgc2l0ZXMgKHN5bW1ldHJpZXMgaW4gdGhlIGZ1dHVyZSBJIGhvcGUpLCBnaXZlIG1lIGJhY2sgb25lLCByYW5kb20gYnkgZGVmYXVsdCwgbm90IGZpbHRlcmVkIGJ5IHR5cGUgYnkgZGVmYXVsdFxuICAgIGdldFNpdGVGcm9tQ2FuZGlkYXRlcyhjYW5kaWRhdGVTaXRlcywgcmFuZG9taXplID0gdHJ1ZSwgc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhbmRpZGF0ZVNpdGVzID0gY2FuZGlkYXRlU2l0ZXMuZmlsdGVyKHNpdGUgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaXRlKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmICghc3BlY2lmaWNUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzcGVjaWZpY1R5cGUgJiYgc2l0ZS5hdG9tLnR5cGUgPT09IHNwZWNpZmljVHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy9ubyBzaXRlcyEgeWlrZXMhIHBvc3NpYmxlIT8hIHByb2JhYmx5IG9ubHkgd2hlbiB1c2luZyBzcGVjaWZpY1R5cGUgYW5kIGxvb2tpbmcgZm9yIGEgcmFyZSBlbGVtZW50XG4gICAgICAgIGlmIChjYW5kaWRhdGVTaXRlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vcmV0dXJuIHJhbmRvbVxuICAgICAgICBpZiAocmFuZG9taXplKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FuZGlkYXRlU2l0ZXNbKE1hdGgucmFuZG9tKCkgKiBjYW5kaWRhdGVTaXRlcy5sZW5ndGgpID4+IDBdO1xuICAgICAgICB9XG4gICAgICAgIC8vcmV0dXJuIGZpcnN0IG1hdGNoaW5nXG4gICAgICAgIHJldHVybiBjYW5kaWRhdGVTaXRlc1swXTtcbiAgICB9XG4gICAgZ2V0RGlyZWN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICBsZXQgc2l0ZSA9IHRoaXMudGlsZS5zaXRlcy5nZXQoTUZNVXRpbHMuQ3RvSUQodGhpcy5PZmZzZXRGcm9tT3JpZ2luKHRoaXMub3JpZ2luLnRpbGVQb3MsIGRpcmVjdGlvbi5yb3csIGRpcmVjdGlvbi5jb2wpKSk7XG4gICAgICAgIGlmIChzaXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2l0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbkV2ZW50V2luZG93LldJTkRPV19PUkRFUl9PRkZTRVRTID0gW1xuICAgIHsgY29sOiAwLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogMSB9LFxuICAgIHsgY29sOiAxLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogMSB9LFxuICAgIHsgY29sOiAxLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAwIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMCwgcm93OiAyIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogMCB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAxIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IC0yIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDIgfSxcbiAgICB7IGNvbDogMSwgcm93OiAtMiB9LFxuICAgIHsgY29sOiAxLCByb3c6IDIgfSxcbiAgICB7IGNvbDogMiwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAyLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTMsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC0zIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogMyB9LFxuICAgIHsgY29sOiAzLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogLTIgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogMiB9LFxuICAgIHsgY29sOiAyLCByb3c6IC0yIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogMiB9LFxuICAgIHsgY29sOiAtMywgcm93OiAtMSB9LFxuICAgIHsgY29sOiAtMywgcm93OiAxIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IC0zIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDMgfSxcbiAgICB7IGNvbDogMSwgcm93OiAtMyB9LFxuICAgIHsgY29sOiAxLCByb3c6IDMgfSxcbiAgICB7IGNvbDogMywgcm93OiAtMSB9LFxuICAgIHsgY29sOiAzLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTQsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC00IH0sXG4gICAgeyBjb2w6IDAsIHJvdzogNCB9LFxuICAgIHsgY29sOiA0LCByb3c6IDAgfVxuXTtcbi8vYmVjYXVzZSwgbGF6eVxuRXZlbnRXaW5kb3cuRVdfV0VTVCA9IHsgY29sOiAtMSwgcm93OiAwIH07XG5FdmVudFdpbmRvdy5FV19FQVNUID0geyBjb2w6IDEsIHJvdzogMCB9O1xuRXZlbnRXaW5kb3cuRVdfTk9SVEggPSB7IGNvbDogMCwgcm93OiAtMSB9O1xuRXZlbnRXaW5kb3cuRVdfU09VVEggPSB7IGNvbDogMCwgcm93OiAxIH07XG5FdmVudFdpbmRvdy5FV19OT1JUSFdFU1QgPSB7IGNvbDogLTEsIHJvdzogLTEgfTtcbkV2ZW50V2luZG93LkVXX1NPVVRIV0VTVCA9IHsgY29sOiAtMSwgcm93OiAxIH07XG5FdmVudFdpbmRvdy5FV19OT1JUSEVBU1QgPSB7IGNvbDogMSwgcm93OiAtMSB9O1xuRXZlbnRXaW5kb3cuRVdfU09VVEhFQVNUID0geyBjb2w6IDEsIHJvdzogMSB9O1xuIiwiaW1wb3J0IHsgTUZNVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi9BdG9tXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBTaXRlIHtcbiAgICBjb25zdHJ1Y3RvcihfcG9zKSB7XG4gICAgICAgIHRoaXMudGlsZVBvcyA9IF9wb3M7XG4gICAgICAgIHRoaXMuaWQgPSBNRk1VdGlscy5DdG9JRCh0aGlzLnRpbGVQb3MpO1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgIH1cbiAgICAvL2lmIHRhcmdldFNpdGUgaXMga2lsbGFibGVcbiAgICAvL2tpbGwgaXRzIGF0b20gKHJlcGxhY2Ugd2l0aCBlbXB0eSlcbiAgICBraWxsQXRvbSh0YXJnZXRTaXRlKSB7XG4gICAgICAgIGxldCBraWxsID0gTWF0aC5yYW5kb20oKSAqIDEwMCA8IHRhcmdldFNpdGUuYXRvbS5lbGVtLmRlc3Ryb3lhYmlsaXR5O1xuICAgICAgICBpZiAoa2lsbCkge1xuICAgICAgICAgICAgdGFyZ2V0U2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBraWxsU2VsZihsZWF2aW5nQXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSkpIHtcbiAgICAgICAgdGhpcy5hdG9tID0gbGVhdmluZ0F0b207XG4gICAgfVxuICAgIC8vaWYgdGFyZ2V0IHNpdGUgaXMga2lsbGFibGVcbiAgICAvL21vdmUgdGhpcyBhdG9tIHRvIHRhcmdldFNpdGUsIGFuZCBsZWF2ZSBiZWhpbmQgbGVhdmluZ0F0b20sIHdoaWNoIGJ5IGRlZmF1bHQgaXMgZW1wdHlcbiAgICBtb3ZlQXRvbSh0YXJnZXRTaXRlLCBsZWF2aW5nQXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSkpIHtcbiAgICAgICAgaWYgKHRhcmdldFNpdGUgJiYgdGFyZ2V0U2l0ZS5jYW5EZXN0cm95KCkpIHtcbiAgICAgICAgICAgIFt0aGlzLmF0b20sIHRhcmdldFNpdGUuYXRvbV0gPSBbbGVhdmluZ0F0b20sIHRoaXMuYXRvbV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9pZiB0YXJnZXRTaXRlIGlzIG1vdmVhYmxlXG4gICAgLy9zd2FwIGF0b21zIHdpdGggdGhpcyBvbmVcbiAgICBzd2FwQXRvbXModGFyZ2V0U2l0ZSkge1xuICAgICAgICBpZiAodGFyZ2V0U2l0ZSAmJiB0YXJnZXRTaXRlLmNhbk1vdmUoKSkge1xuICAgICAgICAgICAgW3RoaXMuYXRvbSwgdGFyZ2V0U2l0ZS5hdG9tXSA9IFt0YXJnZXRTaXRlLmF0b20sIHRoaXMuYXRvbV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgbXV0YXRlU2l0ZSh0YXJnZXRTaXRlLCBuZXdBdG9tKSB7XG4gICAgICAgIGlmICh0YXJnZXRTaXRlICYmIHRhcmdldFNpdGUuY2FuRGVzdHJveSgpKSB7XG4gICAgICAgICAgICB0YXJnZXRTaXRlLmF0b20gPSBuZXdBdG9tO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhbkRlc3Ryb3koKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogMTAwIDwgdGhpcy5hdG9tLmVsZW0uZGVzdHJveWFiaWxpdHk7XG4gICAgfVxuICAgIGNhbk1vdmUoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogMTAwIDwgdGhpcy5hdG9tLmVsZW0ubW92ZWFiaWxpdHk7XG4gICAgfVxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5hdG9tID0gbmV3IEF0b20oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTaXRlIH0gZnJvbSBcIi4vU2l0ZVwiO1xuaW1wb3J0IHsgTUZNVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3Rvcihfd2lkdGggPSAxLCBfaGVpZ2h0ID0gMSkge1xuICAgICAgICB0aGlzLndpZHRoID0gX3dpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IF9oZWlnaHQ7XG4gICAgICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgfVxuICAgIGdldFNpdGVCeUNvb3JkKGMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l0ZXMuZ2V0KE1GTVV0aWxzLkN0b0lEKGMpKTtcbiAgICB9XG4gICAgZ2V0UmFuZG9tU2l0ZSgpIHtcbiAgICAgICAgbGV0IHJyID0gKE1hdGgucmFuZG9tKCkgKiB0aGlzLmhlaWdodCkgPj4gMDtcbiAgICAgICAgbGV0IHJjID0gKE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoKSA+PiAwO1xuICAgICAgICByZXR1cm4gdGhpcy5zaXRlcy5nZXQoYCR7cnJ9OiR7cmN9YCk7XG4gICAgfVxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5zaXRlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIC8vYWNyb3NzIGNvbHVtbnNcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIC8vZG93biByb3dzXG4gICAgICAgICAgICAgICAgdGhpcy5zaXRlcy5zZXQoYCR7an06JHtpfWAsIG5ldyBTaXRlKHsgcm93OiBqLCBjb2w6IGkgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBEUmVnRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRFJFRy5uYW1lLCBFbGVtZW50VHlwZXMuRFJFRy50eXBlKTtcbiAgICAgICAgdGhpcy5wRFJFR19DUkVBVEUgPSAxMDAwO1xuICAgICAgICB0aGlzLnBSRVNfQ1JFQVRFID0gMzAwO1xuICAgICAgICB0aGlzLnBEUkVHX0RFU1RST1kgPSAxMDtcbiAgICAgICAgdGhpcy5wQU5ZX0RFU1RST1kgPSAxMDA7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgLy9nZXQgYSByYW5kb20gTkVTVyBzaXRlXG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZVNpdGUgPSBldy5nZXRBZGphY2VudDRXYXkoKTtcbiAgICAgICAgLy9DUkVBVElPTlxuICAgICAgICBpZiAoYXZhaWxhYmxlU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgY29uc3QgY3JlYXRlRFJlZyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBEUkVHX0NSRUFURSA8IDE7XG4gICAgICAgICAgICBjb25zdCBjcmVhdGVSZXMgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5wUkVTX0NSRUFURSA8IDE7XG4gICAgICAgICAgICBpZiAoY3JlYXRlRFJlZykge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuRFJFRykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRFJFRyBDUkVBVEVEXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3JlYXRlUmVzKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5SRVMpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFUyBDUkVBVEVEXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLnN3YXBBdG9tcyhhdmFpbGFibGVTaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdmFpbGFibGVTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkRSRUcpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc3Ryb3lEUmVnID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucERSRUdfREVTVFJPWSA8IDE7XG4gICAgICAgICAgICBpZiAoZGVzdHJveURSZWcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRSRUcgREVTVFJPWUVEXCIpO1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vaXQncyBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgICAgY29uc3QgZGVzdHJveUFueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBBTllfREVTVFJPWSA8IDE7XG4gICAgICAgICAgICBpZiAoZGVzdHJveUFueSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF2YWlsYWJsZVNpdGUuYXRvbS50eXBlLm5hbWUgKyBcIiBERVNUUk9ZRURcIik7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuZXhwb3J0IGNsYXNzIEVtcHR5RWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRU1QVFkubmFtZSwgRWxlbWVudFR5cGVzLkVNUFRZLnR5cGUpO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgTWFzb25FbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoX3BhdGggPSBcIkVFRUVOTk5OV1dXV1NTU1NcIikge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuTUFTT04ubmFtZSwgRWxlbWVudFR5cGVzLk1BU09OLnR5cGUsIDEwMCwgMTAwKTtcbiAgICAgICAgdGhpcy5wYXRoID0gW107XG4gICAgICAgIHRoaXMuY3VySW5kZXggPSAwO1xuICAgICAgICBfcGF0aCA9IHRoaXMuYm94UGF0aCgpO1xuICAgICAgICB0aGlzLnBhdGggPSBfcGF0aC50b1VwcGVyQ2FzZSgpLnNwbGl0KFwiXCIpO1xuICAgIH1cbiAgICAvL21ha2UgYSByYW5kb20gd2FsbCBwYXRoXG4gICAgcmFuZG9tUGF0aCgpIHtcbiAgICAgICAgbGV0IHBhdGggPSBcIlwiO1xuICAgICAgICBjb25zdCByID0gKE1hdGgucmFuZG9tKCkgKiA4ICsgNikgPj4gMDtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IFtcIkVcIiwgXCJOXCIsIFwiU1wiLCBcIldcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkID0gKE1hdGgucmFuZG9tKCkgKiBjaG9pY2VzLmxlbmd0aCkgPj4gMDtcbiAgICAgICAgICAgIGNvbnN0IGwgPSAoTWF0aC5yYW5kb20oKSAqIDMgKyAzKSA+PiAwO1xuICAgICAgICAgICAgY29uc3QgZGlyID0gY2hvaWNlc1tkXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguY29uY2F0KGRpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIC8vbWFrZSBhIGJveCBwYXRoXG4gICAgYm94UGF0aChzaWRlTGVuZ3RoID0gNykge1xuICAgICAgICBsZXQgcGF0aCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGNob2ljZXMgPSBbXCJFXCIsIFwiTlwiLCBcIldcIiwgXCJTXCJdO1xuICAgICAgICB3aGlsZSAoY2hvaWNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IGNob2ljZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2lkZUxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguY29uY2F0KGRpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VySW5kZXggPj0gdGhpcy5wYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jdXJJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhc3RkaXIgPSB0aGlzLmN1ckluZGV4ID09PSAwID8gdGhpcy5wYXRoW3RoaXMucGF0aC5sZW5ndGggLSAxXSA6IHRoaXMucGF0aFt0aGlzLmN1ckluZGV4IC0gMV07XG4gICAgICAgIGxldCBkaXIgPSB0aGlzLnBhdGhbdGhpcy5jdXJJbmRleF07XG4gICAgICAgIHRoaXMuY3VySW5kZXgrKztcbiAgICAgICAgbGV0IGJsdWVwcmludHMgPSB7XG4gICAgICAgICAgICBFOiB7XG4gICAgICAgICAgICAgICAgbW92ZVNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvdXRlckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFNvdXRoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbm5lckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldE5vcnRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIE46IHtcbiAgICAgICAgICAgICAgICBtb3ZlU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldE5vcnRoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvdXRlckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldEVhc3QoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlubmVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0V2VzdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBTOiB7XG4gICAgICAgICAgICAgICAgbW92ZVNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRTb3V0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRXZXN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbm5lckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldEVhc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgVzoge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0V2VzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRTb3V0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgbW92ZVNpdGUgPSBibHVlcHJpbnRzW2Rpcl0ubW92ZVNpdGUoKTtcbiAgICAgICAgY29uc3Qgb3V0ZXJCdWlsZFNpdGUgPSBibHVlcHJpbnRzW2Rpcl0ub3V0ZXJCdWlsZFNpdGUoKTtcbiAgICAgICAgY29uc3QgaW5uZXJCdWlsZFNpdGUgPSBibHVlcHJpbnRzW2Rpcl0uaW5uZXJCdWlsZFNpdGUoKTtcbiAgICAgICAgLy9mb3IgY2hhbmdpbmcgZGlyZWN0aW9uc1xuICAgICAgICBpZiAobGFzdGRpciAhPT0gZGlyKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0T3V0ZXJCdWlsZFNpdGUgPSBibHVlcHJpbnRzW2xhc3RkaXJdLm91dGVyQnVpbGRTaXRlKCk7XG4gICAgICAgICAgICBpZiAobGFzdE91dGVyQnVpbGRTaXRlKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUobGFzdE91dGVyQnVpbGRTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuV0FMTCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vYnVpbGQgdGhlIG91dGVyIHdhbGxcbiAgICAgICAgaWYgKG91dGVyQnVpbGRTaXRlKSB7XG4gICAgICAgICAgICBpZiAob3V0ZXJCdWlsZFNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuUkVTIHx8IG91dGVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUob3V0ZXJCdWlsZFNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5XQUxMKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9idWlsZCB0aGUgaW5uZXIgd2FsbFxuICAgICAgICBpZiAoaW5uZXJCdWlsZFNpdGUpIHtcbiAgICAgICAgICAgIGlmIChpbm5lckJ1aWxkU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5SRVMgfHwgaW5uZXJCdWlsZFNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShpbm5lckJ1aWxkU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL21vdmUgdG8gbmV4dCBzaXRlXG4gICAgICAgIGlmIChtb3ZlU2l0ZSkge1xuICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKG1vdmVTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuV0FMTCkpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuZXhwb3J0IGNsYXNzIFJlc0VsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLlJFUy5uYW1lLCBFbGVtZW50VHlwZXMuUkVTLnR5cGUpO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIGV3Lm9yaWdpbi5zd2FwQXRvbXMoZXcuZ2V0QWRqYWNlbnQ0V2F5KHRydWUsIEVsZW1lbnRUeXBlcy5FTVBUWSkpO1xuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBXYWxsRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuV0FMTC5uYW1lLCBFbGVtZW50VHlwZXMuV0FMTC50eXBlLCAwLCAxMDApO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50V2luZG93IH0gZnJvbSBcIi4uL2NsYXNzZXMvRXZlbnR3aW5kb3dcIjtcbmV4cG9ydCBjbGFzcyBNRk1VdGlscyB7XG4gICAgc3RhdGljIEN0b0lEKGMpIHtcbiAgICAgICAgcmV0dXJuIGAke2Mucm93fToke2MuY29sfWA7XG4gICAgfVxuICAgIHN0YXRpYyBJRHRvQyhpZCkge1xuICAgICAgICBsZXQgcmNhID0gaWQuc3BsaXQoXCI6XCIpO1xuICAgICAgICByZXR1cm4geyByb3c6IHBhcnNlSW50KHJjYVswXSksIGNvbDogcGFyc2VJbnQocmNhWzFdKSB9O1xuICAgIH1cbiAgICBzdGF0aWMgR2VuZXJhdGVFdmVudFdpbmRvdyh0aWxlLCB3LCBoKSB7XG4gICAgICAgIGxldCByYyA9IChNYXRoLnJhbmRvbSgpICogdykgPj4gMDtcbiAgICAgICAgbGV0IHJyID0gKE1hdGgucmFuZG9tKCkgKiBoKSA+PiAwO1xuICAgICAgICByZXR1cm4gbmV3IEV2ZW50V2luZG93KHRpbGUsIHsgcm93OiByciwgY29sOiByYyB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9