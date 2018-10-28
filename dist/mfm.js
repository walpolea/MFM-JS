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
    colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].SENTRY, p.color(127, 127, 255));
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
                    case 115: //s
                        site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].SENTRY);
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
/* harmony import */ var _elements_SentryElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./elements/SentryElement */ "./src/mfm/classes/elements/SentryElement.ts");








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
ElementTypes.SENTRY = { name: "SENTRY", type: "Se", class: _elements_SentryElement__WEBPACK_IMPORTED_MODULE_7__["SentryElement"] };
ElementTypes.TYPES_ARRAY = [
    ElementTypes.EMPTY,
    ElementTypes.DREG,
    ElementTypes.RES,
    ElementTypes.WALL,
    ElementTypes.MASON,
    ElementTypes.FORK_BOMB,
    ElementTypes.ANTI_FORK_BOMB,
    ElementTypes.SENTRY
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
    getAll(specificType = undefined) {
        let wa = Array.from(this.window.values());
        if (specificType) {
            wa = wa.filter(site => {
                if (site.atom.type === specificType) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        return wa;
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
        //randomly die if no fork bombs around
        if (!fb && Math.random() < 0.2) {
            ew.origin.killSelf();
            return;
        }
        //while there are forkbombs present, destroy them!
        while (fb) {
            ew.origin.mutateSite(fb, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY));
            fb = ew.getNearest(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].FORK_BOMB);
        }
        //RED ALERT! Make new anti fork bombs in all directions
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
                if (site && site.atom.type === _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY) {
                    ew.origin.mutateSite(site, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].ANTI_FORK_BOMB, [index]));
                }
            });
        }
        else {
            //this is a child, just continue that way
            [ew.getSiteByIndex(this.birthedIndex)].forEach(site => {
                if (site && site.atom.type === _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY) {
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
    constructor(_path = "EEEENNNNWWWWSSSS", _curIndex = 0) {
        super(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON.name, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON.type, 100, 100);
        this.path = [];
        this.curIndex = 0;
        _path = this.boxPath();
        this.path = _path.toUpperCase().split("");
        this.curIndex = _curIndex;
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
            ew.origin.moveAtom(moveSite, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON, [this.path, this.curIndex]));
        }
        this.curIndex++;
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

/***/ "./src/mfm/classes/elements/SentryElement.ts":
/*!***************************************************!*\
  !*** ./src/mfm/classes/elements/SentryElement.ts ***!
  \***************************************************/
/*! exports provided: SentryElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SentryElement", function() { return SentryElement; });
/* harmony import */ var _Elem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Elem */ "./src/mfm/classes/Elem.ts");
/* harmony import */ var _ElementTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ElementTypes */ "./src/mfm/classes/ElementTypes.ts");
/* harmony import */ var _Atom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Atom */ "./src/mfm/classes/Atom.ts");



class SentryElement extends _Elem__WEBPACK_IMPORTED_MODULE_0__["Elem"] {
    constructor() {
        super(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].SENTRY.name, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].SENTRY.type);
        this.onHighAlert = false;
        this.pSENTRY_CREATE = 20;
    }
    exec(ew) {
        super.exec(ew);
        let fb = ew.getNearest(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].FORK_BOMB);
        //fork bombs are near! High Alert!
        if (fb) {
            this.onHighAlert = true;
        }
        let se = ew.getNearest(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].SENTRY);
        //Nearby Snetry is on high alert! We should be too!
        if (se && se.atom.elem.onHighAlert) {
            this.onHighAlert = true;
        }
        let totalNearbySentry = ew.getAll(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].SENTRY).length;
        //Kinda boring and crowded around here, requesting honorable discharge, sir!
        if (!this.onHighAlert && totalNearbySentry > 2) {
            ew.origin.killSelf(new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES));
        }
        //Res nearby? Maybe recruit someone for the cause
        var res = ew.getAdjacent8Way(true, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES);
        if (res) {
            //if high alert, definitely recruit, otherwise, maybe
            if (this.onHighAlert || Math.random() * this.pSENTRY_CREATE < 1) {
                ew.origin.mutateSite(res, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].SENTRY));
            }
        }
        //Fire!!!
        if (this.onHighAlert) {
            var e = ew.getNearest(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY);
            ew.origin.mutateSite(e, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].ANTI_FORK_BOMB));
            this.onHighAlert = false;
        }
        //patrol
        ew.origin.swapAtoms(ew.getAdjacent4Way(true, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9BdG9tLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtZW50VHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL0V2ZW50d2luZG93LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9TaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9UaWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9BbnRpRm9ya0JvbWJFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9EUmVnRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvRW1wdHlFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9Gb3JrQm9tYkVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL2VsZW1lbnRzL01hc29uRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvUmVzRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvU2VudHJ5RWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvV2FsbEVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS91dGlscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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TUFBTSxHQUFHLE1BQU07QUFDakM7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdFQUFXLFFBQVEsbUJBQW1CO0FBQ3pEO0FBQ0EiLCJmaWxlIjoibWZtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBUaWxlIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvVGlsZVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBNRk1VdGlscyB9IGZyb20gXCIuL21mbS91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuL21mbS9jbGFzc2VzL0F0b21cIjtcbmxldCBnID0gbmV3IFRpbGUoNDgsIDQ4KTtcbnZhciBza2V0Y2ggPSAocCkgPT4ge1xuICAgIGxldCBzaXRlU2l6ZSA9IDE0O1xuICAgIGxldCBncmlkT2Zmc2V0ID0gMjA7XG4gICAgcC5wcmVsb2FkID0gKCkgPT4geyB9O1xuICAgIHAuc2V0dXAgPSAoKSA9PiB7XG4gICAgICAgIHAuY3JlYXRlQ2FudmFzKDcwMCwgNzAwKTtcbiAgICB9O1xuICAgIC8vICAgcC53aW5kb3dSZXNpemVkID0gKCkgPT4ge1xuICAgIC8vICAgICBwLnJlc2l6ZUNhbnZhcyhwLndpbmRvd1dpZHRoIC0gNTAsIHAud2luZG93SGVpZ2h0IC0gNTApO1xuICAgIC8vICAgfTtcbiAgICAvL0VzdGFibGlzaCB0aGUgZWxtZW50IGNvbG9ycyBoZXJlXG4gICAgbGV0IGNvbG9ycyA9IG5ldyBNYXAoKTtcbiAgICBjb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5FTVBUWSwgcC5jb2xvcigzMiwgMzIsIDMyLCAxMjcpKTtcbiAgICBjb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5EUkVHLCBwLmNvbG9yKDI1NSwgMzIsIDMyKSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuUkVTLCBwLmNvbG9yKDMyLCAyNTUsIDY0KSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuV0FMTCwgcC5jb2xvcigzMiwgMzIsIDI1NSkpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLk1BU09OLCBwLmNvbG9yKDMyLCAyNTUsIDI1NSkpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkZPUktfQk9NQiwgcC5jb2xvcigxNzAsIDMyLCAzMikpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLCBwLmNvbG9yKDEyNywgMTI3LCAzMikpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLlNFTlRSWSwgcC5jb2xvcigxMjcsIDEyNywgMjU1KSk7XG4gICAgbGV0IGRyYXdHcmlkID0gKHAsIHQpID0+IHtcbiAgICAgICAgcC5wdXNoKCk7XG4gICAgICAgIHAudHJhbnNsYXRlKGdyaWRPZmZzZXQsIGdyaWRPZmZzZXQpO1xuICAgICAgICB0LnNpdGVzLmZvckVhY2goKHNpdGUpID0+IHtcbiAgICAgICAgICAgIHAuc3Ryb2tlKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgcC5maWxsKGNvbG9ycy5nZXQoc2l0ZS5hdG9tLnR5cGUpKTtcbiAgICAgICAgICAgIHAuZWxsaXBzZShzaXRlLnRpbGVQb3MuY29sICogc2l0ZVNpemUsIHNpdGUudGlsZVBvcy5yb3cgKiBzaXRlU2l6ZSwgc2l0ZVNpemUsIHNpdGVTaXplKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHAucG9wKCk7XG4gICAgfTtcbiAgICBsZXQgcnVuID0gKCkgPT4ge1xuICAgICAgICBsZXQgc3BlZWQgPSAxMDAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwZWVkOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBldyA9IE1GTVV0aWxzLkdlbmVyYXRlRXZlbnRXaW5kb3coZywgZy53aWR0aCwgZy5oZWlnaHQpO1xuICAgICAgICAgICAgZXcub3JpZ2luLmF0b20uZXhlYyhldyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCBnZXRTaXRlRnJvbUNhbnZhc1hZID0gKHgsIHkpID0+IHtcbiAgICAgICAgeCA9IHggLSBncmlkT2Zmc2V0ICsgc2l0ZVNpemUgKiAwLjU7XG4gICAgICAgIHkgPSB5IC0gZ3JpZE9mZnNldCArIHNpdGVTaXplICogMC41O1xuICAgICAgICB4ID0gKHggLyBzaXRlU2l6ZSkgPj4gMDtcbiAgICAgICAgeSA9ICh5IC8gc2l0ZVNpemUpID4+IDA7XG4gICAgICAgIHJldHVybiBnLmdldFNpdGVCeUNvb3JkKHsgcm93OiB5LCBjb2w6IHggfSk7XG4gICAgfTtcbiAgICBwLmRyYXcgPSAoKSA9PiB7XG4gICAgICAgIHAuYmFja2dyb3VuZCgxMDApO1xuICAgICAgICBkcmF3R3JpZChwLCBnKTtcbiAgICAgICAgcnVuKCk7XG4gICAgfTtcbiAgICBsZXQgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzaXRlID0gZ2V0U2l0ZUZyb21DYW52YXNYWShwLm1vdXNlWCwgcC5tb3VzZVkpO1xuICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgaWYgKHAua2V5SXNQcmVzc2VkKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChwLmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTQ6IC8vclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLlJFUyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTk6IC8vd1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTEzOiAvL3FcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDE6IC8vZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk4OiAvL2JcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTc6IC8vYVxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExNTogLy9zXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuU0VOVFJZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5EUkVHKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcC5tb3VzZURyYWdnZWQgPSBoYW5kbGVDbGljaztcbiAgICBwLm1vdXNlQ2xpY2tlZCA9IGhhbmRsZUNsaWNrO1xufTtcbmxldCBza2V0Y2hQID0gbmV3IHA1KHNrZXRjaCk7XG4iLCJpbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBBdG9tIHtcbiAgICBjb25zdHJ1Y3RvcihfdHlwZSA9IEVsZW1lbnRUeXBlcy5FTVBUWSwgcGFyYW1zKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IF90eXBlO1xuICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBuZXcgdGhpcy50eXBlLmNsYXNzKC4uLnBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBuZXcgdGhpcy50eXBlLmNsYXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICB0aGlzLmVsZW0uZXhlYyhldyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKF9uYW1lLCBfdHlwZSwgX21vdmVhYmlsaXR5ID0gMTAwLCBfZGVzdHJveWFiaWxpdHkgPSAxMDApIHtcbiAgICAgICAgdGhpcy5uYW1lID0gX25hbWU7XG4gICAgICAgIHRoaXMudHlwZSA9IF90eXBlO1xuICAgICAgICB0aGlzLm1vdmVhYmlsaXR5ID0gX21vdmVhYmlsaXR5O1xuICAgICAgICB0aGlzLmRlc3Ryb3lhYmlsaXR5ID0gX2Rlc3Ryb3lhYmlsaXR5O1xuICAgIH1cbiAgICBleGVjKGV3KSB7IH1cbn1cbiIsImltcG9ydCB7IEVtcHR5RWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL0VtcHR5RWxlbWVudFwiO1xuaW1wb3J0IHsgRFJlZ0VsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9EUmVnRWxlbWVudFwiO1xuaW1wb3J0IHsgUmVzRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL1Jlc0VsZW1lbnRcIjtcbmltcG9ydCB7IFdhbGxFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvV2FsbEVsZW1lbnRcIjtcbmltcG9ydCB7IE1hc29uRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL01hc29uRWxlbWVudFwiO1xuaW1wb3J0IHsgRm9ya0JvbWJFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvRm9ya0JvbWJFbGVtZW50XCI7XG5pbXBvcnQgeyBBbnRpRm9ya0JvbWJFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvQW50aUZvcmtCb21iRWxlbWVudFwiO1xuaW1wb3J0IHsgU2VudHJ5RWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL1NlbnRyeUVsZW1lbnRcIjtcbmV4cG9ydCBjbGFzcyBFbGVtZW50VHlwZXMge1xuICAgIHN0YXRpYyByZWdpc3RlclR5cGUobmFtZSwgdHlwZSwgYykge1xuICAgICAgICB0aGlzLlRZUEVTX0FSUkFZLnB1c2goeyBuYW1lLCB0eXBlLCBjbGFzczogYyB9KTtcbiAgICB9XG59XG5FbGVtZW50VHlwZXMuRU1QVFkgPSB7IG5hbWU6IFwiRU1QVFlcIiwgdHlwZTogXCJFXCIsIGNsYXNzOiBFbXB0eUVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5EUkVHID0geyBuYW1lOiBcIkRSRUdcIiwgdHlwZTogXCJEXCIsIGNsYXNzOiBEUmVnRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLlJFUyA9IHsgbmFtZTogXCJSRVNcIiwgdHlwZTogXCJSXCIsIGNsYXNzOiBSZXNFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuV0FMTCA9IHsgbmFtZTogXCJXQUxMXCIsIHR5cGU6IFwiV1wiLCBjbGFzczogV2FsbEVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5NQVNPTiA9IHsgbmFtZTogXCJNQVNPTlwiLCB0eXBlOiBcIk1hXCIsIGNsYXNzOiBNYXNvbkVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5GT1JLX0JPTUIgPSB7IG5hbWU6IFwiRk9SSyBCT01CXCIsIHR5cGU6IFwiRmJcIiwgY2xhc3M6IEZvcmtCb21iRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CID0geyBuYW1lOiBcIkFOVEkgRk9SSyBCT01CXCIsIHR5cGU6IFwiQWZcIiwgY2xhc3M6IEFudGlGb3JrQm9tYkVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5TRU5UUlkgPSB7IG5hbWU6IFwiU0VOVFJZXCIsIHR5cGU6IFwiU2VcIiwgY2xhc3M6IFNlbnRyeUVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5UWVBFU19BUlJBWSA9IFtcbiAgICBFbGVtZW50VHlwZXMuRU1QVFksXG4gICAgRWxlbWVudFR5cGVzLkRSRUcsXG4gICAgRWxlbWVudFR5cGVzLlJFUyxcbiAgICBFbGVtZW50VHlwZXMuV0FMTCxcbiAgICBFbGVtZW50VHlwZXMuTUFTT04sXG4gICAgRWxlbWVudFR5cGVzLkZPUktfQk9NQixcbiAgICBFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIsXG4gICAgRWxlbWVudFR5cGVzLlNFTlRSWVxuXTtcbiIsImltcG9ydCB7IE1GTVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9FbGVtZW50VHlwZXNcIjtcbi8vRXZlbnQgd2luZG93IGFzIGRlc2NyaWJiZWQgaGVyZTogaHR0cDovL3JvYnVzdC5jcy51bm0uZWR1L2xpYi9leGUvZmV0Y2gucGhwP3c9MzAwJnRvaz00YzhmNDkmbWVkaWE9ZGV2OmV2ZW50LXdpbmRvdy0xMC5wbmdcbi8vQ29sbGVjdGlvbiBvZiBzaXRlcyB3aGljaCBjb250YWluIGF0b21zLCBidWlsdCBmcm9tIGFuIG9yaWdpbiAoY2VudGVyKSBzaXRlXG5leHBvcnQgY2xhc3MgRXZlbnRXaW5kb3cge1xuICAgIGNvbnN0cnVjdG9yKF90aWxlLCBfb3JpZ2luKSB7XG4gICAgICAgIHRoaXMudGlsZSA9IF90aWxlO1xuICAgICAgICB0aGlzLm1ha2VXaW5kb3coX3RpbGUsIF9vcmlnaW4pO1xuICAgIH1cbiAgICBtYWtlV2luZG93KHRpbGUsIG9yaWdpbikge1xuICAgICAgICB0aGlzLndpbmRvdyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSB0aGlzLnRpbGUuZ2V0U2l0ZUJ5Q29vcmQob3JpZ2luKTtcbiAgICAgICAgLy9pZiB0aGUgb3JpZ2luIGlzIEVNUFRZIEVsZW1lbnQsIGxldCdzIHNhdmUgc29tZSBjeWNsZXMgKGdvb2QsIGJhZD8pXG4gICAgICAgIGlmICh0aGlzLm9yaWdpbi5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy53aW5kb3cuc2V0KHRoaXMub3JpZ2luLmlkLCB0aGlzLm9yaWdpbik7XG4gICAgICAgIGxldCB3aW5kb3dBcnJheSA9IEV2ZW50V2luZG93LldJTkRPV19PUkRFUl9PRkZTRVRTLm1hcCgob2Zmc2V0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5PZmZzZXRGcm9tT3JpZ2luKG9yaWdpbiwgb2Zmc2V0LnJvdywgb2Zmc2V0LmNvbCk7XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3dBcnJheS5mb3JFYWNoKCh0aWxlQ29vcmQpID0+IHtcbiAgICAgICAgICAgIGxldCBzaXRlID0gdGlsZS5nZXRTaXRlQnlDb29yZCh0aWxlQ29vcmQpO1xuICAgICAgICAgICAgaWYgKHNpdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndpbmRvdy5zZXQoc2l0ZS5pZCwgc2l0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPZmZzZXRGcm9tT3JpZ2luKG9yaWdpbiwgcm93T2Zmc2V0LCBjb2xPZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIHsgcm93OiBvcmlnaW4ucm93ICsgcm93T2Zmc2V0LCBjb2w6IG9yaWdpbi5jb2wgKyBjb2xPZmZzZXQgfTtcbiAgICB9XG4gICAgZ2V0QWxsKHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBsZXQgd2EgPSBBcnJheS5mcm9tKHRoaXMud2luZG93LnZhbHVlcygpKTtcbiAgICAgICAgaWYgKHNwZWNpZmljVHlwZSkge1xuICAgICAgICAgICAgd2EgPSB3YS5maWx0ZXIoc2l0ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNpdGUuYXRvbS50eXBlID09PSBzcGVjaWZpY1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdhO1xuICAgIH1cbiAgICBnZXRTaXRlQnlJbmRleChpbmRleCkge1xuICAgICAgICBsZXQgd2EgPSBBcnJheS5mcm9tKHRoaXMud2luZG93LnZhbHVlcygpKTtcbiAgICAgICAgaWYgKGluZGV4ID49IHdhLmxlbmd0aCB8fCBpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdhW2luZGV4XTtcbiAgICB9XG4gICAgZ2V0UmFuZG9tKHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaXRlRnJvbUNhbmRpZGF0ZXMoQXJyYXkuZnJvbSh0aGlzLndpbmRvdy52YWx1ZXMoKSksIHRydWUsIHNwZWNpZmljVHlwZSk7XG4gICAgfVxuICAgIC8vbW9zdCB1c2VmdWwgd2hlbiB1c2luZyBzcGVjaWZpY1R5cGVcbiAgICAvL3RyYXZlcnNlcyB0aGUgd2luZG93IHVudGlsIGl0IGNvbWVzIGFjcm9zcyB3aGF0IHlvdSdyZSBsb29raW5nIGZvclxuICAgIGdldE5lYXJlc3Qoc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpdGVGcm9tQ2FuZGlkYXRlcyhBcnJheS5mcm9tKHRoaXMud2luZG93LnZhbHVlcygpKSwgZmFsc2UsIHNwZWNpZmljVHlwZSk7XG4gICAgfVxuICAgIGdldEVhc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19FQVNUKTtcbiAgICB9XG4gICAgZ2V0V2VzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX1dFU1QpO1xuICAgIH1cbiAgICBnZXROb3J0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX05PUlRIKTtcbiAgICB9XG4gICAgZ2V0U291dGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19TT1VUSCk7XG4gICAgfVxuICAgIGdldE5vcnRoV2VzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX05PUlRIV0VTVCk7XG4gICAgfVxuICAgIGdldFNvdXRoV2VzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX1NPVVRIV0VTVCk7XG4gICAgfVxuICAgIGdldE5vcnRoRWFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX05PUlRIRUFTVCk7XG4gICAgfVxuICAgIGdldFNvdXRoRWFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX1NPVVRIRUFTVCk7XG4gICAgfVxuICAgIGdldEFkamFjZW50NFdheShyYW5kb21pemUgPSB0cnVlLCBzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKFt0aGlzLmdldFdlc3QoKSwgdGhpcy5nZXROb3J0aCgpLCB0aGlzLmdldFNvdXRoKCksIHRoaXMuZ2V0RWFzdCgpXSwgcmFuZG9taXplLCBzcGVjaWZpY1R5cGUpO1xuICAgIH1cbiAgICBnZXRBZGphY2VudDhXYXkocmFuZG9taXplID0gdHJ1ZSwgc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpdGVGcm9tQ2FuZGlkYXRlcyhbXG4gICAgICAgICAgICB0aGlzLmdldFdlc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm9ydGgoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0U291dGgoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0RWFzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXROb3J0aFdlc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0U291dGhXZXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldE5vcnRoRWFzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRTb3V0aEVhc3QoKVxuICAgICAgICBdLCByYW5kb21pemUsIHNwZWNpZmljVHlwZSk7XG4gICAgfVxuICAgIC8vR2l2ZW4gYW4gYXJyYXkgb2YgY2FuZGlkYXRlIHNpdGVzIChzeW1tZXRyaWVzIGluIHRoZSBmdXR1cmUgSSBob3BlKSxcbiAgICAvL2dpdmUgbWUgYmFjayBvbmUsIHJhbmRvbSBieSBkZWZhdWx0LCBub3QgZmlsdGVyZWQgYnkgdHlwZSBieSBkZWZhdWx0XG4gICAgZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKGNhbmRpZGF0ZVNpdGVzLCByYW5kb21pemUgPSB0cnVlLCBzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2FuZGlkYXRlU2l0ZXMgPSBjYW5kaWRhdGVTaXRlcy5maWx0ZXIoc2l0ZSA9PiB7XG4gICAgICAgICAgICBpZiAoIXNpdGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFzcGVjaWZpY1R5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNwZWNpZmljVHlwZSAmJiBzaXRlLmF0b20udHlwZSA9PT0gc3BlY2lmaWNUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICAvL25vIHNpdGVzISB5aWtlcyEgcG9zc2libGUhPyEgcHJvYmFibHkgb25seSB3aGVuIHVzaW5nIHNwZWNpZmljVHlwZSBhbmQgbG9va2luZyBmb3IgYSByYXJlIGVsZW1lbnRcbiAgICAgICAgaWYgKGNhbmRpZGF0ZVNpdGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy9yZXR1cm4gcmFuZG9tXG4gICAgICAgIGlmIChyYW5kb21pemUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYW5kaWRhdGVTaXRlc1soTWF0aC5yYW5kb20oKSAqIGNhbmRpZGF0ZVNpdGVzLmxlbmd0aCkgPj4gMF07XG4gICAgICAgIH1cbiAgICAgICAgLy9yZXR1cm4gZmlyc3QgbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZVNpdGVzWzBdO1xuICAgIH1cbiAgICBnZXREaXJlY3Rpb24oZGlyZWN0aW9uKSB7XG4gICAgICAgIGxldCBzaXRlID0gdGhpcy50aWxlLnNpdGVzLmdldChNRk1VdGlscy5DdG9JRCh0aGlzLk9mZnNldEZyb21PcmlnaW4odGhpcy5vcmlnaW4udGlsZVBvcywgZGlyZWN0aW9uLnJvdywgZGlyZWN0aW9uLmNvbCkpKTtcbiAgICAgICAgaWYgKHNpdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzaXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuRXZlbnRXaW5kb3cuV0lORE9XX09SREVSX09GRlNFVFMgPSBbXG4gICAgeyBjb2w6IDAsIHJvdzogMCB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAwIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMCwgcm93OiAxIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogMCB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAxIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMSwgcm93OiAxIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IDAgfSxcbiAgICB7IGNvbDogMCwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAwLCByb3c6IDIgfSxcbiAgICB7IGNvbDogMiwgcm93OiAwIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogLTIgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogMiB9LFxuICAgIHsgY29sOiAxLCByb3c6IC0yIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogMiB9LFxuICAgIHsgY29sOiAyLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtMywgcm93OiAwIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogLTMgfSxcbiAgICB7IGNvbDogMCwgcm93OiAzIH0sXG4gICAgeyBjb2w6IDMsIHJvdzogMCB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAtMiB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAyIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogLTIgfSxcbiAgICB7IGNvbDogMiwgcm93OiAyIH0sXG4gICAgeyBjb2w6IC0zLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IC0zLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogLTMgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogMyB9LFxuICAgIHsgY29sOiAxLCByb3c6IC0zIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogMyB9LFxuICAgIHsgY29sOiAzLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDMsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtNCwgcm93OiAwIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogLTQgfSxcbiAgICB7IGNvbDogMCwgcm93OiA0IH0sXG4gICAgeyBjb2w6IDQsIHJvdzogMCB9XG5dO1xuLy9iZWNhdXNlLCBsYXp5XG5FdmVudFdpbmRvdy5FV19XRVNUID0geyBjb2w6IC0xLCByb3c6IDAgfTtcbkV2ZW50V2luZG93LkVXX0VBU1QgPSB7IGNvbDogMSwgcm93OiAwIH07XG5FdmVudFdpbmRvdy5FV19OT1JUSCA9IHsgY29sOiAwLCByb3c6IC0xIH07XG5FdmVudFdpbmRvdy5FV19TT1VUSCA9IHsgY29sOiAwLCByb3c6IDEgfTtcbkV2ZW50V2luZG93LkVXX05PUlRIV0VTVCA9IHsgY29sOiAtMSwgcm93OiAtMSB9O1xuRXZlbnRXaW5kb3cuRVdfU09VVEhXRVNUID0geyBjb2w6IC0xLCByb3c6IDEgfTtcbkV2ZW50V2luZG93LkVXX05PUlRIRUFTVCA9IHsgY29sOiAxLCByb3c6IC0xIH07XG5FdmVudFdpbmRvdy5FV19TT1VUSEVBU1QgPSB7IGNvbDogMSwgcm93OiAxIH07XG4iLCJpbXBvcnQgeyBNRk1VdGlscyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuL0F0b21cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuL0VsZW1lbnRUeXBlc1wiO1xuZXhwb3J0IGNsYXNzIFNpdGUge1xuICAgIGNvbnN0cnVjdG9yKF9wb3MpIHtcbiAgICAgICAgdGhpcy50aWxlUG9zID0gX3BvcztcbiAgICAgICAgdGhpcy5pZCA9IE1GTVV0aWxzLkN0b0lEKHRoaXMudGlsZVBvcyk7XG4gICAgICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgfVxuICAgIC8vaWYgdGFyZ2V0U2l0ZSBpcyBraWxsYWJsZVxuICAgIC8va2lsbCBpdHMgYXRvbSAocmVwbGFjZSB3aXRoIGVtcHR5KVxuICAgIGtpbGxBdG9tKHRhcmdldFNpdGUpIHtcbiAgICAgICAgbGV0IGtpbGwgPSBNYXRoLnJhbmRvbSgpICogMTAwIDwgdGFyZ2V0U2l0ZS5hdG9tLmVsZW0uZGVzdHJveWFiaWxpdHk7XG4gICAgICAgIGlmIChraWxsKSB7XG4gICAgICAgICAgICB0YXJnZXRTaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGtpbGxTZWxmKGxlYXZpbmdBdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKSkge1xuICAgICAgICB0aGlzLmF0b20gPSBsZWF2aW5nQXRvbTtcbiAgICB9XG4gICAgLy9pZiB0YXJnZXQgc2l0ZSBpcyBraWxsYWJsZVxuICAgIC8vbW92ZSB0aGlzIGF0b20gdG8gdGFyZ2V0U2l0ZSwgYW5kIGxlYXZlIGJlaGluZCBsZWF2aW5nQXRvbSwgd2hpY2ggYnkgZGVmYXVsdCBpcyBlbXB0eVxuICAgIG1vdmVBdG9tKHRhcmdldFNpdGUsIGxlYXZpbmdBdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKSkge1xuICAgICAgICBpZiAodGFyZ2V0U2l0ZSAmJiB0YXJnZXRTaXRlLmNhbkRlc3Ryb3koKSkge1xuICAgICAgICAgICAgW3RoaXMuYXRvbSwgdGFyZ2V0U2l0ZS5hdG9tXSA9IFtsZWF2aW5nQXRvbSwgdGhpcy5hdG9tXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2lmIHRhcmdldFNpdGUgaXMgbW92ZWFibGVcbiAgICAvL3N3YXAgYXRvbXMgd2l0aCB0aGlzIG9uZVxuICAgIHN3YXBBdG9tcyh0YXJnZXRTaXRlKSB7XG4gICAgICAgIGlmICh0YXJnZXRTaXRlICYmIHRhcmdldFNpdGUuY2FuTW92ZSgpKSB7XG4gICAgICAgICAgICBbdGhpcy5hdG9tLCB0YXJnZXRTaXRlLmF0b21dID0gW3RhcmdldFNpdGUuYXRvbSwgdGhpcy5hdG9tXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtdXRhdGVTaXRlKHRhcmdldFNpdGUsIG5ld0F0b20pIHtcbiAgICAgICAgaWYgKHRhcmdldFNpdGUgJiYgdGFyZ2V0U2l0ZS5jYW5EZXN0cm95KCkpIHtcbiAgICAgICAgICAgIHRhcmdldFNpdGUuYXRvbSA9IG5ld0F0b207XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FuRGVzdHJveSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAxMDAgPCB0aGlzLmF0b20uZWxlbS5kZXN0cm95YWJpbGl0eTtcbiAgICB9XG4gICAgY2FuTW92ZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAxMDAgPCB0aGlzLmF0b20uZWxlbS5tb3ZlYWJpbGl0eTtcbiAgICB9XG4gICAgY3JlYXRlKCkge1xuICAgICAgICB0aGlzLmF0b20gPSBuZXcgQXRvbSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFNpdGUgfSBmcm9tIFwiLi9TaXRlXCI7XG5pbXBvcnQgeyBNRk1VdGlscyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuZXhwb3J0IGNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKF93aWR0aCA9IDEsIF9oZWlnaHQgPSAxKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSBfd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gX2hlaWdodDtcbiAgICAgICAgdGhpcy5jcmVhdGUoKTtcbiAgICB9XG4gICAgZ2V0U2l0ZUJ5Q29vcmQoYykge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXRlcy5nZXQoTUZNVXRpbHMuQ3RvSUQoYykpO1xuICAgIH1cbiAgICBnZXRSYW5kb21TaXRlKCkge1xuICAgICAgICBsZXQgcnIgPSAoTWF0aC5yYW5kb20oKSAqIHRoaXMuaGVpZ2h0KSA+PiAwO1xuICAgICAgICBsZXQgcmMgPSAoTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGgpID4+IDA7XG4gICAgICAgIHJldHVybiB0aGlzLnNpdGVzLmdldChgJHtycn06JHtyY31gKTtcbiAgICB9XG4gICAgY3JlYXRlKCkge1xuICAgICAgICB0aGlzLnNpdGVzID0gbmV3IE1hcCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2lkdGg7IGkrKykge1xuICAgICAgICAgICAgLy9hY3Jvc3MgY29sdW1uc1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmhlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgLy9kb3duIHJvd3NcbiAgICAgICAgICAgICAgICB0aGlzLnNpdGVzLnNldChgJHtqfToke2l9YCwgbmV3IFNpdGUoeyByb3c6IGosIGNvbDogaSB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi4vQXRvbVwiO1xuZXhwb3J0IGNsYXNzIEFudGlGb3JrQm9tYkVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcihfYmlydGhlZEluZGV4ID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5FTVBUWS5uYW1lLCBFbGVtZW50VHlwZXMuRU1QVFkudHlwZSk7XG4gICAgICAgIHRoaXMuYmlydGhlZEluZGV4ID0gX2JpcnRoZWRJbmRleDtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBsZXQgZmIgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpO1xuICAgICAgICAvL3JhbmRvbWx5IGRpZSBpZiBubyBmb3JrIGJvbWJzIGFyb3VuZFxuICAgICAgICBpZiAoIWZiICYmIE1hdGgucmFuZG9tKCkgPCAwLjIpIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5raWxsU2VsZigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vd2hpbGUgdGhlcmUgYXJlIGZvcmtib21icyBwcmVzZW50LCBkZXN0cm95IHRoZW0hXG4gICAgICAgIHdoaWxlIChmYikge1xuICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoZmIsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSkpO1xuICAgICAgICAgICAgZmIgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpO1xuICAgICAgICB9XG4gICAgICAgIC8vUkVEIEFMRVJUISBNYWtlIG5ldyBhbnRpIGZvcmsgYm9tYnMgaW4gYWxsIGRpcmVjdGlvbnNcbiAgICAgICAgaWYgKCF0aGlzLmJpcnRoZWRJbmRleCkge1xuICAgICAgICAgICAgLy90aGlzIGlzIHRoZSBmaXJzdFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIDEzLFxuICAgICAgICAgICAgICAgIDE0LFxuICAgICAgICAgICAgICAgIDE1LFxuICAgICAgICAgICAgICAgIDE2LFxuICAgICAgICAgICAgICAgIDE3LFxuICAgICAgICAgICAgICAgIDE4LFxuICAgICAgICAgICAgICAgIDE5LFxuICAgICAgICAgICAgICAgIDIwLFxuICAgICAgICAgICAgICAgIDIxLFxuICAgICAgICAgICAgICAgIDIyLFxuICAgICAgICAgICAgICAgIDIzLFxuICAgICAgICAgICAgICAgIDI0LFxuICAgICAgICAgICAgICAgIDI1LFxuICAgICAgICAgICAgICAgIDI2LFxuICAgICAgICAgICAgICAgIDI3LFxuICAgICAgICAgICAgICAgIDI4LFxuICAgICAgICAgICAgICAgIDI5LFxuICAgICAgICAgICAgICAgIDMwLFxuICAgICAgICAgICAgICAgIDMxLFxuICAgICAgICAgICAgICAgIDMyLFxuICAgICAgICAgICAgICAgIDMzLFxuICAgICAgICAgICAgICAgIDM0LFxuICAgICAgICAgICAgICAgIDM1LFxuICAgICAgICAgICAgICAgIDM2LFxuICAgICAgICAgICAgICAgIDM3LFxuICAgICAgICAgICAgICAgIDM4LFxuICAgICAgICAgICAgICAgIDM5LFxuICAgICAgICAgICAgICAgIDQwXG4gICAgICAgICAgICBdLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzaXRlID0gZXcuZ2V0U2l0ZUJ5SW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgIGlmIChzaXRlICYmIHNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoc2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLCBbaW5kZXhdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL3RoaXMgaXMgYSBjaGlsZCwganVzdCBjb250aW51ZSB0aGF0IHdheVxuICAgICAgICAgICAgW2V3LmdldFNpdGVCeUluZGV4KHRoaXMuYmlydGhlZEluZGV4KV0uZm9yRWFjaChzaXRlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2l0ZSAmJiBzaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4wMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoc2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShzaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIsIFt0aGlzLmJpcnRoZWRJbmRleF0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGV3Lm9yaWdpbi5raWxsU2VsZigpO1xuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi4vQXRvbVwiO1xuZXhwb3J0IGNsYXNzIERSZWdFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5EUkVHLm5hbWUsIEVsZW1lbnRUeXBlcy5EUkVHLnR5cGUpO1xuICAgICAgICB0aGlzLnBEUkVHX0NSRUFURSA9IDEwMDA7XG4gICAgICAgIHRoaXMucFJFU19DUkVBVEUgPSAzMDA7XG4gICAgICAgIHRoaXMucERSRUdfREVTVFJPWSA9IDEwO1xuICAgICAgICB0aGlzLnBBTllfREVTVFJPWSA9IDEwMDtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICAvL2dldCBhIHJhbmRvbSBORVNXIHNpdGVcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlU2l0ZSA9IGV3LmdldEFkamFjZW50NFdheSgpO1xuICAgICAgICAvL0NSRUFUSU9OXG4gICAgICAgIGlmIChhdmFpbGFibGVTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKSB7XG4gICAgICAgICAgICBjb25zdCBjcmVhdGVEUmVnID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucERSRUdfQ1JFQVRFIDwgMTtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVJlcyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBSRVNfQ1JFQVRFIDwgMTtcbiAgICAgICAgICAgIGlmIChjcmVhdGVEUmVnKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5EUkVHKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEUkVHIENSRUFURURcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjcmVhdGVSZXMpIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubW92ZUF0b20oYXZhaWxhYmxlU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLlJFUykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTIENSRUFURURcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4uc3dhcEF0b21zKGF2YWlsYWJsZVNpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF2YWlsYWJsZVNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRFJFRykge1xuICAgICAgICAgICAgY29uc3QgZGVzdHJveURSZWcgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5wRFJFR19ERVNUUk9ZIDwgMTtcbiAgICAgICAgICAgIGlmIChkZXN0cm95RFJlZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRFJFRyBERVNUUk9ZRURcIik7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy9pdCdzIHNvbWV0aGluZyBlbHNlXG4gICAgICAgICAgICBjb25zdCBkZXN0cm95QW55ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucEFOWV9ERVNUUk9ZIDwgMTtcbiAgICAgICAgICAgIGlmIChkZXN0cm95QW55KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXZhaWxhYmxlU2l0ZS5hdG9tLnR5cGUubmFtZSArIFwiIERFU1RST1lFRFwiKTtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubW92ZUF0b20oYXZhaWxhYmxlU2l0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgRW1wdHlFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5FTVBUWS5uYW1lLCBFbGVtZW50VHlwZXMuRU1QVFkudHlwZSk7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBGb3JrQm9tYkVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLkVNUFRZLm5hbWUsIEVsZW1lbnRUeXBlcy5FTVBUWS50eXBlKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBsZXQgbmV4dFZpY3RpbSA9IGV3LmdldEFkamFjZW50OFdheSgpO1xuICAgICAgICBpZiAobmV4dFZpY3RpbSkge1xuICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUobmV4dFZpY3RpbSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkZPUktfQk9NQikpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgTWFzb25FbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoX3BhdGggPSBcIkVFRUVOTk5OV1dXV1NTU1NcIiwgX2N1ckluZGV4ID0gMCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuTUFTT04ubmFtZSwgRWxlbWVudFR5cGVzLk1BU09OLnR5cGUsIDEwMCwgMTAwKTtcbiAgICAgICAgdGhpcy5wYXRoID0gW107XG4gICAgICAgIHRoaXMuY3VySW5kZXggPSAwO1xuICAgICAgICBfcGF0aCA9IHRoaXMuYm94UGF0aCgpO1xuICAgICAgICB0aGlzLnBhdGggPSBfcGF0aC50b1VwcGVyQ2FzZSgpLnNwbGl0KFwiXCIpO1xuICAgICAgICB0aGlzLmN1ckluZGV4ID0gX2N1ckluZGV4O1xuICAgIH1cbiAgICAvL21ha2UgYSByYW5kb20gd2FsbCBwYXRoXG4gICAgcmFuZG9tUGF0aCgpIHtcbiAgICAgICAgbGV0IHBhdGggPSBcIlwiO1xuICAgICAgICBjb25zdCByID0gKE1hdGgucmFuZG9tKCkgKiA4ICsgNikgPj4gMDtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IFtcIkVcIiwgXCJOXCIsIFwiU1wiLCBcIldcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkID0gKE1hdGgucmFuZG9tKCkgKiBjaG9pY2VzLmxlbmd0aCkgPj4gMDtcbiAgICAgICAgICAgIGNvbnN0IGwgPSAoTWF0aC5yYW5kb20oKSAqIDMgKyAzKSA+PiAwO1xuICAgICAgICAgICAgY29uc3QgZGlyID0gY2hvaWNlc1tkXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguY29uY2F0KGRpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIC8vbWFrZSBhIGJveCBwYXRoXG4gICAgYm94UGF0aChzaWRlTGVuZ3RoID0gNykge1xuICAgICAgICBsZXQgcGF0aCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGNob2ljZXMgPSBbXCJFXCIsIFwiTlwiLCBcIldcIiwgXCJTXCJdO1xuICAgICAgICB3aGlsZSAoY2hvaWNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IGNob2ljZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2lkZUxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguY29uY2F0KGRpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VySW5kZXggPj0gdGhpcy5wYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jdXJJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhc3RkaXIgPSB0aGlzLmN1ckluZGV4ID09PSAwID8gdGhpcy5wYXRoW3RoaXMucGF0aC5sZW5ndGggLSAxXSA6IHRoaXMucGF0aFt0aGlzLmN1ckluZGV4IC0gMV07XG4gICAgICAgIGxldCBkaXIgPSB0aGlzLnBhdGhbdGhpcy5jdXJJbmRleF07XG4gICAgICAgIGxldCBibHVlcHJpbnRzID0ge1xuICAgICAgICAgICAgRToge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0RWFzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRTb3V0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBOOiB7XG4gICAgICAgICAgICAgICAgbW92ZVNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbm5lckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFdlc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUzoge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0U291dGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0V2VzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFc6IHtcbiAgICAgICAgICAgICAgICBtb3ZlU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFdlc3QoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0Tm9ydGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlubmVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0U291dGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG1vdmVTaXRlID0gYmx1ZXByaW50c1tkaXJdLm1vdmVTaXRlKCk7XG4gICAgICAgIGNvbnN0IG91dGVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tkaXJdLm91dGVyQnVpbGRTaXRlKCk7XG4gICAgICAgIGNvbnN0IGlubmVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tkaXJdLmlubmVyQnVpbGRTaXRlKCk7XG4gICAgICAgIC8vZm9yIGNoYW5naW5nIGRpcmVjdGlvbnNcbiAgICAgICAgaWYgKGxhc3RkaXIgIT09IGRpcikge1xuICAgICAgICAgICAgY29uc3QgbGFzdE91dGVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tsYXN0ZGlyXS5vdXRlckJ1aWxkU2l0ZSgpO1xuICAgICAgICAgICAgaWYgKGxhc3RPdXRlckJ1aWxkU2l0ZSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKGxhc3RPdXRlckJ1aWxkU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL2J1aWxkIHRoZSBvdXRlciB3YWxsXG4gICAgICAgIGlmIChvdXRlckJ1aWxkU2l0ZSkge1xuICAgICAgICAgICAgaWYgKG91dGVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLlJFUyB8fCBvdXRlckJ1aWxkU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKG91dGVyQnVpbGRTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuV0FMTCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vYnVpbGQgdGhlIGlubmVyIHdhbGxcbiAgICAgICAgaWYgKGlubmVyQnVpbGRTaXRlKSB7XG4gICAgICAgICAgICBpZiAoaW5uZXJCdWlsZFNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuUkVTIHx8IGlubmVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoaW5uZXJCdWlsZFNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5XQUxMKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9tb3ZlIHRvIG5leHQgc2l0ZVxuICAgICAgICBpZiAobW92ZVNpdGUpIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShtb3ZlU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLk1BU09OLCBbdGhpcy5wYXRoLCB0aGlzLmN1ckluZGV4XSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VySW5kZXgrKztcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgUmVzRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuUkVTLm5hbWUsIEVsZW1lbnRUeXBlcy5SRVMudHlwZSk7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgZXcub3JpZ2luLnN3YXBBdG9tcyhldy5nZXRBZGphY2VudDRXYXkodHJ1ZSwgRWxlbWVudFR5cGVzLkVNUFRZKSk7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgU2VudHJ5RWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuU0VOVFJZLm5hbWUsIEVsZW1lbnRUeXBlcy5TRU5UUlkudHlwZSk7XG4gICAgICAgIHRoaXMub25IaWdoQWxlcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wU0VOVFJZX0NSRUFURSA9IDIwO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgICAgICBsZXQgZmIgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpO1xuICAgICAgICAvL2ZvcmsgYm9tYnMgYXJlIG5lYXIhIEhpZ2ggQWxlcnQhXG4gICAgICAgIGlmIChmYikge1xuICAgICAgICAgICAgdGhpcy5vbkhpZ2hBbGVydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlID0gZXcuZ2V0TmVhcmVzdChFbGVtZW50VHlwZXMuU0VOVFJZKTtcbiAgICAgICAgLy9OZWFyYnkgU25ldHJ5IGlzIG9uIGhpZ2ggYWxlcnQhIFdlIHNob3VsZCBiZSB0b28hXG4gICAgICAgIGlmIChzZSAmJiBzZS5hdG9tLmVsZW0ub25IaWdoQWxlcnQpIHtcbiAgICAgICAgICAgIHRoaXMub25IaWdoQWxlcnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0b3RhbE5lYXJieVNlbnRyeSA9IGV3LmdldEFsbChFbGVtZW50VHlwZXMuU0VOVFJZKS5sZW5ndGg7XG4gICAgICAgIC8vS2luZGEgYm9yaW5nIGFuZCBjcm93ZGVkIGFyb3VuZCBoZXJlLCByZXF1ZXN0aW5nIGhvbm9yYWJsZSBkaXNjaGFyZ2UsIHNpciFcbiAgICAgICAgaWYgKCF0aGlzLm9uSGlnaEFsZXJ0ICYmIHRvdGFsTmVhcmJ5U2VudHJ5ID4gMikge1xuICAgICAgICAgICAgZXcub3JpZ2luLmtpbGxTZWxmKG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5SRVMpKTtcbiAgICAgICAgfVxuICAgICAgICAvL1JlcyBuZWFyYnk/IE1heWJlIHJlY3J1aXQgc29tZW9uZSBmb3IgdGhlIGNhdXNlXG4gICAgICAgIHZhciByZXMgPSBldy5nZXRBZGphY2VudDhXYXkodHJ1ZSwgRWxlbWVudFR5cGVzLlJFUyk7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgIC8vaWYgaGlnaCBhbGVydCwgZGVmaW5pdGVseSByZWNydWl0LCBvdGhlcndpc2UsIG1heWJlXG4gICAgICAgICAgICBpZiAodGhpcy5vbkhpZ2hBbGVydCB8fCBNYXRoLnJhbmRvbSgpICogdGhpcy5wU0VOVFJZX0NSRUFURSA8IDEpIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShyZXMsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5TRU5UUlkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL0ZpcmUhISFcbiAgICAgICAgaWYgKHRoaXMub25IaWdoQWxlcnQpIHtcbiAgICAgICAgICAgIHZhciBlID0gZXcuZ2V0TmVhcmVzdChFbGVtZW50VHlwZXMuRU1QVFkpO1xuICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CKSk7XG4gICAgICAgICAgICB0aGlzLm9uSGlnaEFsZXJ0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy9wYXRyb2xcbiAgICAgICAgZXcub3JpZ2luLnN3YXBBdG9tcyhldy5nZXRBZGphY2VudDRXYXkodHJ1ZSwgRWxlbWVudFR5cGVzLkVNUFRZKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgV2FsbEVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLldBTEwubmFtZSwgRWxlbWVudFR5cGVzLldBTEwudHlwZSwgMCwgMTAwKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFdmVudFdpbmRvdyB9IGZyb20gXCIuLi9jbGFzc2VzL0V2ZW50d2luZG93XCI7XG5leHBvcnQgY2xhc3MgTUZNVXRpbHMge1xuICAgIHN0YXRpYyBDdG9JRChjKSB7XG4gICAgICAgIHJldHVybiBgJHtjLnJvd306JHtjLmNvbH1gO1xuICAgIH1cbiAgICBzdGF0aWMgSUR0b0MoaWQpIHtcbiAgICAgICAgbGV0IHJjYSA9IGlkLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgcmV0dXJuIHsgcm93OiBwYXJzZUludChyY2FbMF0pLCBjb2w6IHBhcnNlSW50KHJjYVsxXSkgfTtcbiAgICB9XG4gICAgc3RhdGljIEdlbmVyYXRlRXZlbnRXaW5kb3codGlsZSwgdywgaCkge1xuICAgICAgICBsZXQgcmMgPSAoTWF0aC5yYW5kb20oKSAqIHcpID4+IDA7XG4gICAgICAgIGxldCByciA9IChNYXRoLnJhbmRvbSgpICogaCkgPj4gMDtcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudFdpbmRvdyh0aWxlLCB7IHJvdzogcnIsIGNvbDogcmMgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==