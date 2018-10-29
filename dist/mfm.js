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
/* harmony import */ var _mfm_classes_elements_MasonElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mfm/classes/elements/MasonElement */ "./src/mfm/classes/elements/MasonElement.ts");





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
                    case 122: //z
                        site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON, [_mfm_classes_elements_MasonElement__WEBPACK_IMPORTED_MODULE_4__["MasonElement"].boxPath(12)]);
                        break;
                    case 120: //x
                        site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON, [_mfm_classes_elements_MasonElement__WEBPACK_IMPORTED_MODULE_4__["MasonElement"].linePath(48, "E")]);
                        break;
                    case 99: //c
                        site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON, [_mfm_classes_elements_MasonElement__WEBPACK_IMPORTED_MODULE_4__["MasonElement"].linePath(48, "S")]);
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
        this.age = 0;
        this.name = _name;
        this.type = _type;
        this.moveability = _moveability;
        this.destroyability = _destroyability;
    }
    exec(ew) {
        this.age++;
    }
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
        this.pDIE = 1.33; //~75% chance to die
        this.pEXPLODE = 5; //20% chance to explode
        this.birthedIndex = _birthedIndex;
    }
    exec(ew) {
        let fb = ew.getNearest(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].FORK_BOMB);
        //randomly die if no fork bombs around
        if (!fb && Math.random() * this.pDIE < 1) {
            ew.origin.killSelf();
            return;
        }
        //while there are forkbombs present, destroy them!
        while (fb) {
            ew.origin.mutateSite(fb, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY));
            fb = ew.getNearest(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].FORK_BOMB);
        }
        //RED ALERT! Make new anti fork bombs in all EMPTY directions
        if (!this.birthedIndex) {
            //this is the first
            [...Array(40).keys()].forEach(index => {
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
                    if (Math.random() * this.pEXPLODE < 1) {
                        ew.origin.mutateSite(site, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].ANTI_FORK_BOMB)); //explode
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
    //it's important that the path loops on itself, even if it just means reversing back to the beginning
    constructor(_path = undefined, _curIndex = 0) {
        super(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON.name, _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON.type, 100, 100);
        this.path = [];
        this.curIndex = 0; //used to traverse index, but now this is sort of like the mason's ID in the path, it doesn't change for the individual, but is kept up (+1,-1) by neighbor masons
        if (!_path) {
            _path = MasonElement.boxPath();
        }
        this.setPath(_path);
        this.curIndex = _curIndex;
    }
    setPath(path) {
        this.path = path.split("");
    }
    exec(ew) {
        if (this.curIndex >= this.path.length) {
            this.curIndex = 0;
        }
        else if (this.curIndex < 0) {
            this.curIndex = this.path.length - 1;
        }
        let lastdir = this.curIndex === 0 ? this.path[this.path.length - 1] : this.path[this.curIndex - 1];
        let reverseDir = MasonElement.getOppositeDir(lastdir);
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
        const lastSite = blueprints[reverseDir].moveSite();
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
        //move to next site and leave another mason to help
        if (moveSite) {
            ew.origin.mutateSite(moveSite, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON, [MasonElement.pathToString(this.path), this.curIndex + 1]));
        }
        if (lastSite) {
            ew.origin.mutateSite(lastSite, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON, [MasonElement.pathToString(this.path), this.curIndex - 1]));
        }
        super.exec(ew);
    }
    //Static path helper methods
    //At some point I think this should be broken out into a utility class
    //More elements will probably benefit from having the concept of a defined path
    //make a random wall path
    static randomPath() {
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
    static linePath(length = 48, direction = "E") {
        let path = "";
        for (var i = 0; i < length; i++) {
            path = path.concat(direction);
        }
        path = path.concat(this.reversePath(path));
        return path;
    }
    //make a box path
    static boxPath(sideLength = 7) {
        let path = "";
        const choices = ["E", "N", "W", "S"];
        while (choices.length) {
            const dir = choices.shift();
            for (var j = 0; j < sideLength; j++) {
                path = path.concat(dir);
            }
        }
        //path = path.concat(this.reversePath(path));
        return path;
    }
    //convert a string[] to string (path serialization)
    static pathToString(path) {
        return path.reduce((acc, dir, index) => {
            return acc.concat(dir);
        }, "");
    }
    //take a path with N,S,E,W and reverse the directions
    static reversePath(path) {
        path = path
            .split("")
            .reverse()
            .reduce((acc, dir, index) => {
            return acc.concat(dir);
        }, "");
        path = path.replace(/N/g, "T");
        path = path.replace(/S/g, "N");
        path = path.replace(/T/g, "S");
        path = path.replace(/E/g, "T");
        path = path.replace(/W/g, "E");
        path = path.replace(/T/g, "W");
        return path;
    }
    //reverse a direction
    static getOppositeDir(dir) {
        let map = {
            N: "S",
            S: "N",
            E: "W",
            W: "E"
        };
        return map[dir];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9BdG9tLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtZW50VHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL0V2ZW50d2luZG93LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9TaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9UaWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9BbnRpRm9ya0JvbWJFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9EUmVnRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvRW1wdHlFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9Gb3JrQm9tYkVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL2VsZW1lbnRzL01hc29uRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvUmVzRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvU2VudHJ5RWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvV2FsbEVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS91dGlscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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RDtBQUNBO0FBQ0EsMkNBQTJDLDBEQUFZO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QywwQ0FBSSxDQUFDLDBEQUFZO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDBEQUFZO0FBQzlDLHdDQUF3QywwQ0FBSSxDQUFDLDBEQUFZO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCwwREFBWTtBQUNqRTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDM0NBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ2dCO0FBQ3hDLDBCQUEwQiwwQ0FBSTtBQUNyQztBQUNBLGNBQWMsMERBQVksWUFBWSwwREFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVEE7QUFBQTtBQUFBO0FBQXFEO0FBQzlDO0FBQ1A7QUFDQSxrQkFBa0IsTUFBTSxHQUFHLE1BQU07QUFDakM7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdFQUFXLFFBQVEsbUJBQW1CO0FBQ3pEO0FBQ0EiLCJmaWxlIjoibWZtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBUaWxlIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvVGlsZVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBNRk1VdGlscyB9IGZyb20gXCIuL21mbS91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuL21mbS9jbGFzc2VzL0F0b21cIjtcbmltcG9ydCB7IE1hc29uRWxlbWVudCB9IGZyb20gXCIuL21mbS9jbGFzc2VzL2VsZW1lbnRzL01hc29uRWxlbWVudFwiO1xubGV0IGcgPSBuZXcgVGlsZSg0OCwgNDgpO1xudmFyIHNrZXRjaCA9IChwKSA9PiB7XG4gICAgbGV0IHNpdGVTaXplID0gMTQ7XG4gICAgbGV0IGdyaWRPZmZzZXQgPSAyMDtcbiAgICBwLnByZWxvYWQgPSAoKSA9PiB7IH07XG4gICAgcC5zZXR1cCA9ICgpID0+IHtcbiAgICAgICAgcC5jcmVhdGVDYW52YXMoNzAwLCA3MDApO1xuICAgIH07XG4gICAgLy8gICBwLndpbmRvd1Jlc2l6ZWQgPSAoKSA9PiB7XG4gICAgLy8gICAgIHAucmVzaXplQ2FudmFzKHAud2luZG93V2lkdGggLSA1MCwgcC53aW5kb3dIZWlnaHQgLSA1MCk7XG4gICAgLy8gICB9O1xuICAgIC8vRXN0YWJsaXNoIHRoZSBlbG1lbnQgY29sb3JzIGhlcmVcbiAgICBsZXQgY29sb3JzID0gbmV3IE1hcCgpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkVNUFRZLCBwLmNvbG9yKDMyLCAzMiwgMzIsIDEyNykpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkRSRUcsIHAuY29sb3IoMjU1LCAzMiwgMzIpKTtcbiAgICBjb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5SRVMsIHAuY29sb3IoMzIsIDI1NSwgNjQpKTtcbiAgICBjb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5XQUxMLCBwLmNvbG9yKDMyLCAzMiwgMjU1KSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuTUFTT04sIHAuY29sb3IoMzIsIDI1NSwgMjU1KSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuRk9SS19CT01CLCBwLmNvbG9yKDE3MCwgMzIsIDMyKSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIsIHAuY29sb3IoMTI3LCAxMjcsIDMyKSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuU0VOVFJZLCBwLmNvbG9yKDEyNywgMTI3LCAyNTUpKTtcbiAgICBsZXQgZHJhd0dyaWQgPSAocCwgdCkgPT4ge1xuICAgICAgICBwLnB1c2goKTtcbiAgICAgICAgcC50cmFuc2xhdGUoZ3JpZE9mZnNldCwgZ3JpZE9mZnNldCk7XG4gICAgICAgIHQuc2l0ZXMuZm9yRWFjaCgoc2l0ZSkgPT4ge1xuICAgICAgICAgICAgcC5zdHJva2UoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICBwLmZpbGwoY29sb3JzLmdldChzaXRlLmF0b20udHlwZSkpO1xuICAgICAgICAgICAgcC5lbGxpcHNlKHNpdGUudGlsZVBvcy5jb2wgKiBzaXRlU2l6ZSwgc2l0ZS50aWxlUG9zLnJvdyAqIHNpdGVTaXplLCBzaXRlU2l6ZSwgc2l0ZVNpemUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcC5wb3AoKTtcbiAgICB9O1xuICAgIGxldCBydW4gPSAoKSA9PiB7XG4gICAgICAgIGxldCBzcGVlZCA9IDEwMDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BlZWQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IGV3ID0gTUZNVXRpbHMuR2VuZXJhdGVFdmVudFdpbmRvdyhnLCBnLndpZHRoLCBnLmhlaWdodCk7XG4gICAgICAgICAgICBldy5vcmlnaW4uYXRvbS5leGVjKGV3KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbGV0IGdldFNpdGVGcm9tQ2FudmFzWFkgPSAoeCwgeSkgPT4ge1xuICAgICAgICB4ID0geCAtIGdyaWRPZmZzZXQgKyBzaXRlU2l6ZSAqIDAuNTtcbiAgICAgICAgeSA9IHkgLSBncmlkT2Zmc2V0ICsgc2l0ZVNpemUgKiAwLjU7XG4gICAgICAgIHggPSAoeCAvIHNpdGVTaXplKSA+PiAwO1xuICAgICAgICB5ID0gKHkgLyBzaXRlU2l6ZSkgPj4gMDtcbiAgICAgICAgcmV0dXJuIGcuZ2V0U2l0ZUJ5Q29vcmQoeyByb3c6IHksIGNvbDogeCB9KTtcbiAgICB9O1xuICAgIHAuZHJhdyA9ICgpID0+IHtcbiAgICAgICAgcC5iYWNrZ3JvdW5kKDEwMCk7XG4gICAgICAgIGRyYXdHcmlkKHAsIGcpO1xuICAgICAgICBydW4oKTtcbiAgICB9O1xuICAgIGxldCBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICAgICAgbGV0IHNpdGUgPSBnZXRTaXRlRnJvbUNhbnZhc1hZKHAubW91c2VYLCBwLm1vdXNlWSk7XG4gICAgICAgIGlmIChzaXRlKSB7XG4gICAgICAgICAgICBpZiAocC5rZXlJc1ByZXNzZWQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHAua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExNDogLy9yXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuUkVTKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExOTogLy93XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuV0FMTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjI6IC8velxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLk1BU09OLCBbTWFzb25FbGVtZW50LmJveFBhdGgoMTIpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjA6IC8veFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLk1BU09OLCBbTWFzb25FbGVtZW50LmxpbmVQYXRoKDQ4LCBcIkVcIildKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk5OiAvL2NcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTiwgW01hc29uRWxlbWVudC5saW5lUGF0aCg0OCwgXCJTXCIpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDE6IC8vZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk4OiAvL2JcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTc6IC8vYVxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExNTogLy9zXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuU0VOVFJZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5EUkVHKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcC5tb3VzZURyYWdnZWQgPSBoYW5kbGVDbGljaztcbiAgICBwLm1vdXNlQ2xpY2tlZCA9IGhhbmRsZUNsaWNrO1xufTtcbmxldCBza2V0Y2hQID0gbmV3IHA1KHNrZXRjaCk7XG4iLCJpbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBBdG9tIHtcbiAgICBjb25zdHJ1Y3RvcihfdHlwZSA9IEVsZW1lbnRUeXBlcy5FTVBUWSwgcGFyYW1zKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IF90eXBlO1xuICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBuZXcgdGhpcy50eXBlLmNsYXNzKC4uLnBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBuZXcgdGhpcy50eXBlLmNsYXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICB0aGlzLmVsZW0uZXhlYyhldyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKF9uYW1lLCBfdHlwZSwgX21vdmVhYmlsaXR5ID0gMTAwLCBfZGVzdHJveWFiaWxpdHkgPSAxMDApIHtcbiAgICAgICAgdGhpcy5hZ2UgPSAwO1xuICAgICAgICB0aGlzLm5hbWUgPSBfbmFtZTtcbiAgICAgICAgdGhpcy50eXBlID0gX3R5cGU7XG4gICAgICAgIHRoaXMubW92ZWFiaWxpdHkgPSBfbW92ZWFiaWxpdHk7XG4gICAgICAgIHRoaXMuZGVzdHJveWFiaWxpdHkgPSBfZGVzdHJveWFiaWxpdHk7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgdGhpcy5hZ2UrKztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbXB0eUVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9FbXB0eUVsZW1lbnRcIjtcbmltcG9ydCB7IERSZWdFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvRFJlZ0VsZW1lbnRcIjtcbmltcG9ydCB7IFJlc0VsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9SZXNFbGVtZW50XCI7XG5pbXBvcnQgeyBXYWxsRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL1dhbGxFbGVtZW50XCI7XG5pbXBvcnQgeyBNYXNvbkVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9NYXNvbkVsZW1lbnRcIjtcbmltcG9ydCB7IEZvcmtCb21iRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL0ZvcmtCb21iRWxlbWVudFwiO1xuaW1wb3J0IHsgQW50aUZvcmtCb21iRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL0FudGlGb3JrQm9tYkVsZW1lbnRcIjtcbmltcG9ydCB7IFNlbnRyeUVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9TZW50cnlFbGVtZW50XCI7XG5leHBvcnQgY2xhc3MgRWxlbWVudFR5cGVzIHtcbiAgICBzdGF0aWMgcmVnaXN0ZXJUeXBlKG5hbWUsIHR5cGUsIGMpIHtcbiAgICAgICAgdGhpcy5UWVBFU19BUlJBWS5wdXNoKHsgbmFtZSwgdHlwZSwgY2xhc3M6IGMgfSk7XG4gICAgfVxufVxuRWxlbWVudFR5cGVzLkVNUFRZID0geyBuYW1lOiBcIkVNUFRZXCIsIHR5cGU6IFwiRVwiLCBjbGFzczogRW1wdHlFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuRFJFRyA9IHsgbmFtZTogXCJEUkVHXCIsIHR5cGU6IFwiRFwiLCBjbGFzczogRFJlZ0VsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5SRVMgPSB7IG5hbWU6IFwiUkVTXCIsIHR5cGU6IFwiUlwiLCBjbGFzczogUmVzRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLldBTEwgPSB7IG5hbWU6IFwiV0FMTFwiLCB0eXBlOiBcIldcIiwgY2xhc3M6IFdhbGxFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuTUFTT04gPSB7IG5hbWU6IFwiTUFTT05cIiwgdHlwZTogXCJNYVwiLCBjbGFzczogTWFzb25FbGVtZW50IH07XG5FbGVtZW50VHlwZXMuRk9SS19CT01CID0geyBuYW1lOiBcIkZPUksgQk9NQlwiLCB0eXBlOiBcIkZiXCIsIGNsYXNzOiBGb3JrQm9tYkVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQiA9IHsgbmFtZTogXCJBTlRJIEZPUksgQk9NQlwiLCB0eXBlOiBcIkFmXCIsIGNsYXNzOiBBbnRpRm9ya0JvbWJFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuU0VOVFJZID0geyBuYW1lOiBcIlNFTlRSWVwiLCB0eXBlOiBcIlNlXCIsIGNsYXNzOiBTZW50cnlFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuVFlQRVNfQVJSQVkgPSBbXG4gICAgRWxlbWVudFR5cGVzLkVNUFRZLFxuICAgIEVsZW1lbnRUeXBlcy5EUkVHLFxuICAgIEVsZW1lbnRUeXBlcy5SRVMsXG4gICAgRWxlbWVudFR5cGVzLldBTEwsXG4gICAgRWxlbWVudFR5cGVzLk1BU09OLFxuICAgIEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIsXG4gICAgRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLFxuICAgIEVsZW1lbnRUeXBlcy5TRU5UUllcbl07XG4iLCJpbXBvcnQgeyBNRk1VdGlscyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vRWxlbWVudFR5cGVzXCI7XG4vL0V2ZW50IHdpbmRvdyBhcyBkZXNjcmliYmVkIGhlcmU6IGh0dHA6Ly9yb2J1c3QuY3MudW5tLmVkdS9saWIvZXhlL2ZldGNoLnBocD93PTMwMCZ0b2s9NGM4ZjQ5Jm1lZGlhPWRldjpldmVudC13aW5kb3ctMTAucG5nXG4vL0NvbGxlY3Rpb24gb2Ygc2l0ZXMgd2hpY2ggY29udGFpbiBhdG9tcywgYnVpbHQgZnJvbSBhbiBvcmlnaW4gKGNlbnRlcikgc2l0ZVxuZXhwb3J0IGNsYXNzIEV2ZW50V2luZG93IHtcbiAgICBjb25zdHJ1Y3RvcihfdGlsZSwgX29yaWdpbikge1xuICAgICAgICB0aGlzLnRpbGUgPSBfdGlsZTtcbiAgICAgICAgdGhpcy5tYWtlV2luZG93KF90aWxlLCBfb3JpZ2luKTtcbiAgICB9XG4gICAgbWFrZVdpbmRvdyh0aWxlLCBvcmlnaW4pIHtcbiAgICAgICAgdGhpcy53aW5kb3cgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMub3JpZ2luID0gdGhpcy50aWxlLmdldFNpdGVCeUNvb3JkKG9yaWdpbik7XG4gICAgICAgIC8vaWYgdGhlIG9yaWdpbiBpcyBFTVBUWSBFbGVtZW50LCBsZXQncyBzYXZlIHNvbWUgY3ljbGVzIChnb29kLCBiYWQ/KVxuICAgICAgICBpZiAodGhpcy5vcmlnaW4uYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMud2luZG93LnNldCh0aGlzLm9yaWdpbi5pZCwgdGhpcy5vcmlnaW4pO1xuICAgICAgICBsZXQgd2luZG93QXJyYXkgPSBFdmVudFdpbmRvdy5XSU5ET1dfT1JERVJfT0ZGU0VUUy5tYXAoKG9mZnNldCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuT2Zmc2V0RnJvbU9yaWdpbihvcmlnaW4sIG9mZnNldC5yb3csIG9mZnNldC5jb2wpO1xuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93QXJyYXkuZm9yRWFjaCgodGlsZUNvb3JkKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2l0ZSA9IHRpbGUuZ2V0U2l0ZUJ5Q29vcmQodGlsZUNvb3JkKTtcbiAgICAgICAgICAgIGlmIChzaXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aW5kb3cuc2V0KHNpdGUuaWQsIHNpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgT2Zmc2V0RnJvbU9yaWdpbihvcmlnaW4sIHJvd09mZnNldCwgY29sT2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiB7IHJvdzogb3JpZ2luLnJvdyArIHJvd09mZnNldCwgY29sOiBvcmlnaW4uY29sICsgY29sT2Zmc2V0IH07XG4gICAgfVxuICAgIGdldEFsbChzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGV0IHdhID0gQXJyYXkuZnJvbSh0aGlzLndpbmRvdy52YWx1ZXMoKSk7XG4gICAgICAgIGlmIChzcGVjaWZpY1R5cGUpIHtcbiAgICAgICAgICAgIHdhID0gd2EuZmlsdGVyKHNpdGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzaXRlLmF0b20udHlwZSA9PT0gc3BlY2lmaWNUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3YTtcbiAgICB9XG4gICAgZ2V0U2l0ZUJ5SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgbGV0IHdhID0gQXJyYXkuZnJvbSh0aGlzLndpbmRvdy52YWx1ZXMoKSk7XG4gICAgICAgIGlmIChpbmRleCA+PSB3YS5sZW5ndGggfHwgaW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3YVtpbmRleF07XG4gICAgfVxuICAgIGdldFJhbmRvbShzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKEFycmF5LmZyb20odGhpcy53aW5kb3cudmFsdWVzKCkpLCB0cnVlLCBzcGVjaWZpY1R5cGUpO1xuICAgIH1cbiAgICAvL21vc3QgdXNlZnVsIHdoZW4gdXNpbmcgc3BlY2lmaWNUeXBlXG4gICAgLy90cmF2ZXJzZXMgdGhlIHdpbmRvdyB1bnRpbCBpdCBjb21lcyBhY3Jvc3Mgd2hhdCB5b3UncmUgbG9va2luZyBmb3JcbiAgICBnZXROZWFyZXN0KHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaXRlRnJvbUNhbmRpZGF0ZXMoQXJyYXkuZnJvbSh0aGlzLndpbmRvdy52YWx1ZXMoKSksIGZhbHNlLCBzcGVjaWZpY1R5cGUpO1xuICAgIH1cbiAgICBnZXRFYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfRUFTVCk7XG4gICAgfVxuICAgIGdldFdlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19XRVNUKTtcbiAgICB9XG4gICAgZ2V0Tm9ydGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19OT1JUSCk7XG4gICAgfVxuICAgIGdldFNvdXRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfU09VVEgpO1xuICAgIH1cbiAgICBnZXROb3J0aFdlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19OT1JUSFdFU1QpO1xuICAgIH1cbiAgICBnZXRTb3V0aFdlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19TT1VUSFdFU1QpO1xuICAgIH1cbiAgICBnZXROb3J0aEVhc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19OT1JUSEVBU1QpO1xuICAgIH1cbiAgICBnZXRTb3V0aEVhc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19TT1VUSEVBU1QpO1xuICAgIH1cbiAgICBnZXRBZGphY2VudDRXYXkocmFuZG9taXplID0gdHJ1ZSwgc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpdGVGcm9tQ2FuZGlkYXRlcyhbdGhpcy5nZXRXZXN0KCksIHRoaXMuZ2V0Tm9ydGgoKSwgdGhpcy5nZXRTb3V0aCgpLCB0aGlzLmdldEVhc3QoKV0sIHJhbmRvbWl6ZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgZ2V0QWRqYWNlbnQ4V2F5KHJhbmRvbWl6ZSA9IHRydWUsIHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaXRlRnJvbUNhbmRpZGF0ZXMoW1xuICAgICAgICAgICAgdGhpcy5nZXRXZXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldE5vcnRoKCksXG4gICAgICAgICAgICB0aGlzLmdldFNvdXRoKCksXG4gICAgICAgICAgICB0aGlzLmdldEVhc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm9ydGhXZXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldFNvdXRoV2VzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXROb3J0aEVhc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0U291dGhFYXN0KClcbiAgICAgICAgXSwgcmFuZG9taXplLCBzcGVjaWZpY1R5cGUpO1xuICAgIH1cbiAgICAvL0dpdmVuIGFuIGFycmF5IG9mIGNhbmRpZGF0ZSBzaXRlcyAoc3ltbWV0cmllcyBpbiB0aGUgZnV0dXJlIEkgaG9wZSksXG4gICAgLy9naXZlIG1lIGJhY2sgb25lLCByYW5kb20gYnkgZGVmYXVsdCwgbm90IGZpbHRlcmVkIGJ5IHR5cGUgYnkgZGVmYXVsdFxuICAgIGdldFNpdGVGcm9tQ2FuZGlkYXRlcyhjYW5kaWRhdGVTaXRlcywgcmFuZG9taXplID0gdHJ1ZSwgc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhbmRpZGF0ZVNpdGVzID0gY2FuZGlkYXRlU2l0ZXMuZmlsdGVyKHNpdGUgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaXRlKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmICghc3BlY2lmaWNUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzcGVjaWZpY1R5cGUgJiYgc2l0ZS5hdG9tLnR5cGUgPT09IHNwZWNpZmljVHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy9ubyBzaXRlcyEgeWlrZXMhIHBvc3NpYmxlIT8hIHByb2JhYmx5IG9ubHkgd2hlbiB1c2luZyBzcGVjaWZpY1R5cGUgYW5kIGxvb2tpbmcgZm9yIGEgcmFyZSBlbGVtZW50XG4gICAgICAgIGlmIChjYW5kaWRhdGVTaXRlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vcmV0dXJuIHJhbmRvbVxuICAgICAgICBpZiAocmFuZG9taXplKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FuZGlkYXRlU2l0ZXNbKE1hdGgucmFuZG9tKCkgKiBjYW5kaWRhdGVTaXRlcy5sZW5ndGgpID4+IDBdO1xuICAgICAgICB9XG4gICAgICAgIC8vcmV0dXJuIGZpcnN0IG1hdGNoaW5nXG4gICAgICAgIHJldHVybiBjYW5kaWRhdGVTaXRlc1swXTtcbiAgICB9XG4gICAgZ2V0RGlyZWN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICBsZXQgc2l0ZSA9IHRoaXMudGlsZS5zaXRlcy5nZXQoTUZNVXRpbHMuQ3RvSUQodGhpcy5PZmZzZXRGcm9tT3JpZ2luKHRoaXMub3JpZ2luLnRpbGVQb3MsIGRpcmVjdGlvbi5yb3csIGRpcmVjdGlvbi5jb2wpKSk7XG4gICAgICAgIGlmIChzaXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2l0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbkV2ZW50V2luZG93LldJTkRPV19PUkRFUl9PRkZTRVRTID0gW1xuICAgIHsgY29sOiAwLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogMSB9LFxuICAgIHsgY29sOiAxLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogMSB9LFxuICAgIHsgY29sOiAxLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAwIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMCwgcm93OiAyIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogMCB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAxIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IC0yIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDIgfSxcbiAgICB7IGNvbDogMSwgcm93OiAtMiB9LFxuICAgIHsgY29sOiAxLCByb3c6IDIgfSxcbiAgICB7IGNvbDogMiwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAyLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTMsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC0zIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogMyB9LFxuICAgIHsgY29sOiAzLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogLTIgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogMiB9LFxuICAgIHsgY29sOiAyLCByb3c6IC0yIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogMiB9LFxuICAgIHsgY29sOiAtMywgcm93OiAtMSB9LFxuICAgIHsgY29sOiAtMywgcm93OiAxIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IC0zIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDMgfSxcbiAgICB7IGNvbDogMSwgcm93OiAtMyB9LFxuICAgIHsgY29sOiAxLCByb3c6IDMgfSxcbiAgICB7IGNvbDogMywgcm93OiAtMSB9LFxuICAgIHsgY29sOiAzLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTQsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC00IH0sXG4gICAgeyBjb2w6IDAsIHJvdzogNCB9LFxuICAgIHsgY29sOiA0LCByb3c6IDAgfVxuXTtcbi8vYmVjYXVzZSwgbGF6eVxuRXZlbnRXaW5kb3cuRVdfV0VTVCA9IHsgY29sOiAtMSwgcm93OiAwIH07XG5FdmVudFdpbmRvdy5FV19FQVNUID0geyBjb2w6IDEsIHJvdzogMCB9O1xuRXZlbnRXaW5kb3cuRVdfTk9SVEggPSB7IGNvbDogMCwgcm93OiAtMSB9O1xuRXZlbnRXaW5kb3cuRVdfU09VVEggPSB7IGNvbDogMCwgcm93OiAxIH07XG5FdmVudFdpbmRvdy5FV19OT1JUSFdFU1QgPSB7IGNvbDogLTEsIHJvdzogLTEgfTtcbkV2ZW50V2luZG93LkVXX1NPVVRIV0VTVCA9IHsgY29sOiAtMSwgcm93OiAxIH07XG5FdmVudFdpbmRvdy5FV19OT1JUSEVBU1QgPSB7IGNvbDogMSwgcm93OiAtMSB9O1xuRXZlbnRXaW5kb3cuRVdfU09VVEhFQVNUID0geyBjb2w6IDEsIHJvdzogMSB9O1xuIiwiaW1wb3J0IHsgTUZNVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi9BdG9tXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBTaXRlIHtcbiAgICBjb25zdHJ1Y3RvcihfcG9zKSB7XG4gICAgICAgIHRoaXMudGlsZVBvcyA9IF9wb3M7XG4gICAgICAgIHRoaXMuaWQgPSBNRk1VdGlscy5DdG9JRCh0aGlzLnRpbGVQb3MpO1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgIH1cbiAgICAvL2lmIHRhcmdldFNpdGUgaXMga2lsbGFibGVcbiAgICAvL2tpbGwgaXRzIGF0b20gKHJlcGxhY2Ugd2l0aCBlbXB0eSlcbiAgICBraWxsQXRvbSh0YXJnZXRTaXRlKSB7XG4gICAgICAgIGxldCBraWxsID0gTWF0aC5yYW5kb20oKSAqIDEwMCA8IHRhcmdldFNpdGUuYXRvbS5lbGVtLmRlc3Ryb3lhYmlsaXR5O1xuICAgICAgICBpZiAoa2lsbCkge1xuICAgICAgICAgICAgdGFyZ2V0U2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBraWxsU2VsZihsZWF2aW5nQXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSkpIHtcbiAgICAgICAgdGhpcy5hdG9tID0gbGVhdmluZ0F0b207XG4gICAgfVxuICAgIC8vaWYgdGFyZ2V0IHNpdGUgaXMga2lsbGFibGVcbiAgICAvL21vdmUgdGhpcyBhdG9tIHRvIHRhcmdldFNpdGUsIGFuZCBsZWF2ZSBiZWhpbmQgbGVhdmluZ0F0b20sIHdoaWNoIGJ5IGRlZmF1bHQgaXMgZW1wdHlcbiAgICBtb3ZlQXRvbSh0YXJnZXRTaXRlLCBsZWF2aW5nQXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSkpIHtcbiAgICAgICAgaWYgKHRhcmdldFNpdGUgJiYgdGFyZ2V0U2l0ZS5jYW5EZXN0cm95KCkpIHtcbiAgICAgICAgICAgIFt0aGlzLmF0b20sIHRhcmdldFNpdGUuYXRvbV0gPSBbbGVhdmluZ0F0b20sIHRoaXMuYXRvbV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9pZiB0YXJnZXRTaXRlIGlzIG1vdmVhYmxlXG4gICAgLy9zd2FwIGF0b21zIHdpdGggdGhpcyBvbmVcbiAgICBzd2FwQXRvbXModGFyZ2V0U2l0ZSkge1xuICAgICAgICBpZiAodGFyZ2V0U2l0ZSAmJiB0YXJnZXRTaXRlLmNhbk1vdmUoKSkge1xuICAgICAgICAgICAgW3RoaXMuYXRvbSwgdGFyZ2V0U2l0ZS5hdG9tXSA9IFt0YXJnZXRTaXRlLmF0b20sIHRoaXMuYXRvbV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgbXV0YXRlU2l0ZSh0YXJnZXRTaXRlLCBuZXdBdG9tKSB7XG4gICAgICAgIGlmICh0YXJnZXRTaXRlICYmIHRhcmdldFNpdGUuY2FuRGVzdHJveSgpKSB7XG4gICAgICAgICAgICB0YXJnZXRTaXRlLmF0b20gPSBuZXdBdG9tO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhbkRlc3Ryb3koKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogMTAwIDwgdGhpcy5hdG9tLmVsZW0uZGVzdHJveWFiaWxpdHk7XG4gICAgfVxuICAgIGNhbk1vdmUoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogMTAwIDwgdGhpcy5hdG9tLmVsZW0ubW92ZWFiaWxpdHk7XG4gICAgfVxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5hdG9tID0gbmV3IEF0b20oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTaXRlIH0gZnJvbSBcIi4vU2l0ZVwiO1xuaW1wb3J0IHsgTUZNVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3Rvcihfd2lkdGggPSAxLCBfaGVpZ2h0ID0gMSkge1xuICAgICAgICB0aGlzLndpZHRoID0gX3dpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IF9oZWlnaHQ7XG4gICAgICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgfVxuICAgIGdldFNpdGVCeUNvb3JkKGMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l0ZXMuZ2V0KE1GTVV0aWxzLkN0b0lEKGMpKTtcbiAgICB9XG4gICAgZ2V0UmFuZG9tU2l0ZSgpIHtcbiAgICAgICAgbGV0IHJyID0gKE1hdGgucmFuZG9tKCkgKiB0aGlzLmhlaWdodCkgPj4gMDtcbiAgICAgICAgbGV0IHJjID0gKE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoKSA+PiAwO1xuICAgICAgICByZXR1cm4gdGhpcy5zaXRlcy5nZXQoYCR7cnJ9OiR7cmN9YCk7XG4gICAgfVxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5zaXRlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIC8vYWNyb3NzIGNvbHVtbnNcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIC8vZG93biByb3dzXG4gICAgICAgICAgICAgICAgdGhpcy5zaXRlcy5zZXQoYCR7an06JHtpfWAsIG5ldyBTaXRlKHsgcm93OiBqLCBjb2w6IGkgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBBbnRpRm9ya0JvbWJFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoX2JpcnRoZWRJbmRleCA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRU1QVFkubmFtZSwgRWxlbWVudFR5cGVzLkVNUFRZLnR5cGUpO1xuICAgICAgICB0aGlzLnBESUUgPSAxLjMzOyAvL343NSUgY2hhbmNlIHRvIGRpZVxuICAgICAgICB0aGlzLnBFWFBMT0RFID0gNTsgLy8yMCUgY2hhbmNlIHRvIGV4cGxvZGVcbiAgICAgICAgdGhpcy5iaXJ0aGVkSW5kZXggPSBfYmlydGhlZEluZGV4O1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIGxldCBmYiA9IGV3LmdldE5lYXJlc3QoRWxlbWVudFR5cGVzLkZPUktfQk9NQik7XG4gICAgICAgIC8vcmFuZG9tbHkgZGllIGlmIG5vIGZvcmsgYm9tYnMgYXJvdW5kXG4gICAgICAgIGlmICghZmIgJiYgTWF0aC5yYW5kb20oKSAqIHRoaXMucERJRSA8IDEpIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5raWxsU2VsZigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vd2hpbGUgdGhlcmUgYXJlIGZvcmtib21icyBwcmVzZW50LCBkZXN0cm95IHRoZW0hXG4gICAgICAgIHdoaWxlIChmYikge1xuICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoZmIsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSkpO1xuICAgICAgICAgICAgZmIgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpO1xuICAgICAgICB9XG4gICAgICAgIC8vUkVEIEFMRVJUISBNYWtlIG5ldyBhbnRpIGZvcmsgYm9tYnMgaW4gYWxsIEVNUFRZIGRpcmVjdGlvbnNcbiAgICAgICAgaWYgKCF0aGlzLmJpcnRoZWRJbmRleCkge1xuICAgICAgICAgICAgLy90aGlzIGlzIHRoZSBmaXJzdFxuICAgICAgICAgICAgWy4uLkFycmF5KDQwKS5rZXlzKCldLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzaXRlID0gZXcuZ2V0U2l0ZUJ5SW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgIGlmIChzaXRlICYmIHNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoc2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLCBbaW5kZXhdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL3RoaXMgaXMgYSBjaGlsZCwganVzdCBjb250aW51ZSB0aGF0IHdheVxuICAgICAgICAgICAgW2V3LmdldFNpdGVCeUluZGV4KHRoaXMuYmlydGhlZEluZGV4KV0uZm9yRWFjaChzaXRlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2l0ZSAmJiBzaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpICogdGhpcy5wRVhQTE9ERSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKHNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQikpOyAvL2V4cGxvZGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKHNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQiwgW3RoaXMuYmlydGhlZEluZGV4XSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZXcub3JpZ2luLmtpbGxTZWxmKCk7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgRFJlZ0VsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLkRSRUcubmFtZSwgRWxlbWVudFR5cGVzLkRSRUcudHlwZSk7XG4gICAgICAgIHRoaXMucERSRUdfQ1JFQVRFID0gMTAwMDtcbiAgICAgICAgdGhpcy5wUkVTX0NSRUFURSA9IDMwMDtcbiAgICAgICAgdGhpcy5wRFJFR19ERVNUUk9ZID0gMTA7XG4gICAgICAgIHRoaXMucEFOWV9ERVNUUk9ZID0gMTAwO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIC8vZ2V0IGEgcmFuZG9tIE5FU1cgc2l0ZVxuICAgICAgICBjb25zdCBhdmFpbGFibGVTaXRlID0gZXcuZ2V0QWRqYWNlbnQ0V2F5KCk7XG4gICAgICAgIC8vQ1JFQVRJT05cbiAgICAgICAgaWYgKGF2YWlsYWJsZVNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZURSZWcgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5wRFJFR19DUkVBVEUgPCAxO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRlUmVzID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucFJFU19DUkVBVEUgPCAxO1xuICAgICAgICAgICAgaWYgKGNyZWF0ZURSZWcpIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubW92ZUF0b20oYXZhaWxhYmxlU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkRSRUcpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRSRUcgQ1JFQVRFRFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNyZWF0ZVJlcykge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuUkVTKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSRVMgQ1JFQVRFRFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5zd2FwQXRvbXMoYXZhaWxhYmxlU2l0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXZhaWxhYmxlU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5EUkVHKSB7XG4gICAgICAgICAgICBjb25zdCBkZXN0cm95RFJlZyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBEUkVHX0RFU1RST1kgPCAxO1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3lEUmVnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEUkVHIERFU1RST1lFRFwiKTtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubW92ZUF0b20oYXZhaWxhYmxlU2l0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL2l0J3Mgc29tZXRoaW5nIGVsc2VcbiAgICAgICAgICAgIGNvbnN0IGRlc3Ryb3lBbnkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5wQU5ZX0RFU1RST1kgPCAxO1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3lBbnkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhdmFpbGFibGVTaXRlLmF0b20udHlwZS5uYW1lICsgXCIgREVTVFJPWUVEXCIpO1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBFbXB0eUVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLkVNUFRZLm5hbWUsIEVsZW1lbnRUeXBlcy5FTVBUWS50eXBlKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi4vQXRvbVwiO1xuZXhwb3J0IGNsYXNzIEZvcmtCb21iRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRU1QVFkubmFtZSwgRWxlbWVudFR5cGVzLkVNUFRZLnR5cGUpO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIGxldCBuZXh0VmljdGltID0gZXcuZ2V0QWRqYWNlbnQ4V2F5KCk7XG4gICAgICAgIGlmIChuZXh0VmljdGltKSB7XG4gICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShuZXh0VmljdGltLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuRk9SS19CT01CKSk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBNYXNvbkVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICAvL2l0J3MgaW1wb3J0YW50IHRoYXQgdGhlIHBhdGggbG9vcHMgb24gaXRzZWxmLCBldmVuIGlmIGl0IGp1c3QgbWVhbnMgcmV2ZXJzaW5nIGJhY2sgdG8gdGhlIGJlZ2lubmluZ1xuICAgIGNvbnN0cnVjdG9yKF9wYXRoID0gdW5kZWZpbmVkLCBfY3VySW5kZXggPSAwKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5NQVNPTi5uYW1lLCBFbGVtZW50VHlwZXMuTUFTT04udHlwZSwgMTAwLCAxMDApO1xuICAgICAgICB0aGlzLnBhdGggPSBbXTtcbiAgICAgICAgdGhpcy5jdXJJbmRleCA9IDA7IC8vdXNlZCB0byB0cmF2ZXJzZSBpbmRleCwgYnV0IG5vdyB0aGlzIGlzIHNvcnQgb2YgbGlrZSB0aGUgbWFzb24ncyBJRCBpbiB0aGUgcGF0aCwgaXQgZG9lc24ndCBjaGFuZ2UgZm9yIHRoZSBpbmRpdmlkdWFsLCBidXQgaXMga2VwdCB1cCAoKzEsLTEpIGJ5IG5laWdoYm9yIG1hc29uc1xuICAgICAgICBpZiAoIV9wYXRoKSB7XG4gICAgICAgICAgICBfcGF0aCA9IE1hc29uRWxlbWVudC5ib3hQYXRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQYXRoKF9wYXRoKTtcbiAgICAgICAgdGhpcy5jdXJJbmRleCA9IF9jdXJJbmRleDtcbiAgICB9XG4gICAgc2V0UGF0aChwYXRoKSB7XG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGguc3BsaXQoXCJcIik7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VySW5kZXggPj0gdGhpcy5wYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jdXJJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jdXJJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuY3VySW5kZXggPSB0aGlzLnBhdGgubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGFzdGRpciA9IHRoaXMuY3VySW5kZXggPT09IDAgPyB0aGlzLnBhdGhbdGhpcy5wYXRoLmxlbmd0aCAtIDFdIDogdGhpcy5wYXRoW3RoaXMuY3VySW5kZXggLSAxXTtcbiAgICAgICAgbGV0IHJldmVyc2VEaXIgPSBNYXNvbkVsZW1lbnQuZ2V0T3Bwb3NpdGVEaXIobGFzdGRpcik7XG4gICAgICAgIGxldCBkaXIgPSB0aGlzLnBhdGhbdGhpcy5jdXJJbmRleF07XG4gICAgICAgIGxldCBibHVlcHJpbnRzID0ge1xuICAgICAgICAgICAgRToge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0RWFzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRTb3V0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBOOiB7XG4gICAgICAgICAgICAgICAgbW92ZVNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbm5lckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFdlc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUzoge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0U291dGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0V2VzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFc6IHtcbiAgICAgICAgICAgICAgICBtb3ZlU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFdlc3QoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0Tm9ydGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlubmVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0U291dGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG1vdmVTaXRlID0gYmx1ZXByaW50c1tkaXJdLm1vdmVTaXRlKCk7XG4gICAgICAgIGNvbnN0IGxhc3RTaXRlID0gYmx1ZXByaW50c1tyZXZlcnNlRGlyXS5tb3ZlU2l0ZSgpO1xuICAgICAgICBjb25zdCBvdXRlckJ1aWxkU2l0ZSA9IGJsdWVwcmludHNbZGlyXS5vdXRlckJ1aWxkU2l0ZSgpO1xuICAgICAgICBjb25zdCBpbm5lckJ1aWxkU2l0ZSA9IGJsdWVwcmludHNbZGlyXS5pbm5lckJ1aWxkU2l0ZSgpO1xuICAgICAgICAvL2ZvciBjaGFuZ2luZyBkaXJlY3Rpb25zXG4gICAgICAgIGlmIChsYXN0ZGlyICE9PSBkaXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RPdXRlckJ1aWxkU2l0ZSA9IGJsdWVwcmludHNbbGFzdGRpcl0ub3V0ZXJCdWlsZFNpdGUoKTtcbiAgICAgICAgICAgIGlmIChsYXN0T3V0ZXJCdWlsZFNpdGUpIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShsYXN0T3V0ZXJCdWlsZFNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5XQUxMKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9idWlsZCB0aGUgb3V0ZXIgd2FsbFxuICAgICAgICBpZiAob3V0ZXJCdWlsZFNpdGUpIHtcbiAgICAgICAgICAgIGlmIChvdXRlckJ1aWxkU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5SRVMgfHwgb3V0ZXJCdWlsZFNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShvdXRlckJ1aWxkU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL2J1aWxkIHRoZSBpbm5lciB3YWxsXG4gICAgICAgIGlmIChpbm5lckJ1aWxkU2l0ZSkge1xuICAgICAgICAgICAgaWYgKGlubmVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLlJFUyB8fCBpbm5lckJ1aWxkU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKGlubmVyQnVpbGRTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuV0FMTCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vbW92ZSB0byBuZXh0IHNpdGUgYW5kIGxlYXZlIGFub3RoZXIgbWFzb24gdG8gaGVscFxuICAgICAgICBpZiAobW92ZVNpdGUpIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKG1vdmVTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuTUFTT04sIFtNYXNvbkVsZW1lbnQucGF0aFRvU3RyaW5nKHRoaXMucGF0aCksIHRoaXMuY3VySW5kZXggKyAxXSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0U2l0ZSkge1xuICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUobGFzdFNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTiwgW01hc29uRWxlbWVudC5wYXRoVG9TdHJpbmcodGhpcy5wYXRoKSwgdGhpcy5jdXJJbmRleCAtIDFdKSk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxuICAgIC8vU3RhdGljIHBhdGggaGVscGVyIG1ldGhvZHNcbiAgICAvL0F0IHNvbWUgcG9pbnQgSSB0aGluayB0aGlzIHNob3VsZCBiZSBicm9rZW4gb3V0IGludG8gYSB1dGlsaXR5IGNsYXNzXG4gICAgLy9Nb3JlIGVsZW1lbnRzIHdpbGwgcHJvYmFibHkgYmVuZWZpdCBmcm9tIGhhdmluZyB0aGUgY29uY2VwdCBvZiBhIGRlZmluZWQgcGF0aFxuICAgIC8vbWFrZSBhIHJhbmRvbSB3YWxsIHBhdGhcbiAgICBzdGF0aWMgcmFuZG9tUGF0aCgpIHtcbiAgICAgICAgbGV0IHBhdGggPSBcIlwiO1xuICAgICAgICBjb25zdCByID0gKE1hdGgucmFuZG9tKCkgKiA4ICsgNikgPj4gMDtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IFtcIkVcIiwgXCJOXCIsIFwiU1wiLCBcIldcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkID0gKE1hdGgucmFuZG9tKCkgKiBjaG9pY2VzLmxlbmd0aCkgPj4gMDtcbiAgICAgICAgICAgIGNvbnN0IGwgPSAoTWF0aC5yYW5kb20oKSAqIDMgKyAzKSA+PiAwO1xuICAgICAgICAgICAgY29uc3QgZGlyID0gY2hvaWNlc1tkXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguY29uY2F0KGRpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIHN0YXRpYyBsaW5lUGF0aChsZW5ndGggPSA0OCwgZGlyZWN0aW9uID0gXCJFXCIpIHtcbiAgICAgICAgbGV0IHBhdGggPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYXRoID0gcGF0aC5jb25jYXQoZGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBwYXRoID0gcGF0aC5jb25jYXQodGhpcy5yZXZlcnNlUGF0aChwYXRoKSk7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICAvL21ha2UgYSBib3ggcGF0aFxuICAgIHN0YXRpYyBib3hQYXRoKHNpZGVMZW5ndGggPSA3KSB7XG4gICAgICAgIGxldCBwYXRoID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IFtcIkVcIiwgXCJOXCIsIFwiV1wiLCBcIlNcIl07XG4gICAgICAgIHdoaWxlIChjaG9pY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgZGlyID0gY2hvaWNlcy5zaGlmdCgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaWRlTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5jb25jYXQoZGlyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL3BhdGggPSBwYXRoLmNvbmNhdCh0aGlzLnJldmVyc2VQYXRoKHBhdGgpKTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIC8vY29udmVydCBhIHN0cmluZ1tdIHRvIHN0cmluZyAocGF0aCBzZXJpYWxpemF0aW9uKVxuICAgIHN0YXRpYyBwYXRoVG9TdHJpbmcocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aC5yZWR1Y2UoKGFjYywgZGlyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQoZGlyKTtcbiAgICAgICAgfSwgXCJcIik7XG4gICAgfVxuICAgIC8vdGFrZSBhIHBhdGggd2l0aCBOLFMsRSxXIGFuZCByZXZlcnNlIHRoZSBkaXJlY3Rpb25zXG4gICAgc3RhdGljIHJldmVyc2VQYXRoKHBhdGgpIHtcbiAgICAgICAgcGF0aCA9IHBhdGhcbiAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBkaXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYWNjLmNvbmNhdChkaXIpO1xuICAgICAgICB9LCBcIlwiKTtcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvTi9nLCBcIlRcIik7XG4gICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1MvZywgXCJOXCIpO1xuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9UL2csIFwiU1wiKTtcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvRS9nLCBcIlRcIik7XG4gICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1cvZywgXCJFXCIpO1xuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9UL2csIFwiV1wiKTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIC8vcmV2ZXJzZSBhIGRpcmVjdGlvblxuICAgIHN0YXRpYyBnZXRPcHBvc2l0ZURpcihkaXIpIHtcbiAgICAgICAgbGV0IG1hcCA9IHtcbiAgICAgICAgICAgIE46IFwiU1wiLFxuICAgICAgICAgICAgUzogXCJOXCIsXG4gICAgICAgICAgICBFOiBcIldcIixcbiAgICAgICAgICAgIFc6IFwiRVwiXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBtYXBbZGlyXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBSZXNFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5SRVMubmFtZSwgRWxlbWVudFR5cGVzLlJFUy50eXBlKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBldy5vcmlnaW4uc3dhcEF0b21zKGV3LmdldEFkamFjZW50NFdheSh0cnVlLCBFbGVtZW50VHlwZXMuRU1QVFkpKTtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBTZW50cnlFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5TRU5UUlkubmFtZSwgRWxlbWVudFR5cGVzLlNFTlRSWS50eXBlKTtcbiAgICAgICAgdGhpcy5vbkhpZ2hBbGVydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBTRU5UUllfQ1JFQVRFID0gMjA7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgICAgIGxldCBmYiA9IGV3LmdldE5lYXJlc3QoRWxlbWVudFR5cGVzLkZPUktfQk9NQik7XG4gICAgICAgIC8vZm9yayBib21icyBhcmUgbmVhciEgSGlnaCBBbGVydCFcbiAgICAgICAgaWYgKGZiKSB7XG4gICAgICAgICAgICB0aGlzLm9uSGlnaEFsZXJ0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2UgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5TRU5UUlkpO1xuICAgICAgICAvL05lYXJieSBTbmV0cnkgaXMgb24gaGlnaCBhbGVydCEgV2Ugc2hvdWxkIGJlIHRvbyFcbiAgICAgICAgaWYgKHNlICYmIHNlLmF0b20uZWxlbS5vbkhpZ2hBbGVydCkge1xuICAgICAgICAgICAgdGhpcy5vbkhpZ2hBbGVydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRvdGFsTmVhcmJ5U2VudHJ5ID0gZXcuZ2V0QWxsKEVsZW1lbnRUeXBlcy5TRU5UUlkpLmxlbmd0aDtcbiAgICAgICAgLy9LaW5kYSBib3JpbmcgYW5kIGNyb3dkZWQgYXJvdW5kIGhlcmUsIHJlcXVlc3RpbmcgaG9ub3JhYmxlIGRpc2NoYXJnZSwgc2lyIVxuICAgICAgICBpZiAoIXRoaXMub25IaWdoQWxlcnQgJiYgdG90YWxOZWFyYnlTZW50cnkgPiAyKSB7XG4gICAgICAgICAgICBldy5vcmlnaW4ua2lsbFNlbGYobmV3IEF0b20oRWxlbWVudFR5cGVzLlJFUykpO1xuICAgICAgICB9XG4gICAgICAgIC8vUmVzIG5lYXJieT8gTWF5YmUgcmVjcnVpdCBzb21lb25lIGZvciB0aGUgY2F1c2VcbiAgICAgICAgdmFyIHJlcyA9IGV3LmdldEFkamFjZW50OFdheSh0cnVlLCBFbGVtZW50VHlwZXMuUkVTKTtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgLy9pZiBoaWdoIGFsZXJ0LCBkZWZpbml0ZWx5IHJlY3J1aXQsIG90aGVyd2lzZSwgbWF5YmVcbiAgICAgICAgICAgIGlmICh0aGlzLm9uSGlnaEFsZXJ0IHx8IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBTRU5UUllfQ1JFQVRFIDwgMSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKHJlcywgbmV3IEF0b20oRWxlbWVudFR5cGVzLlNFTlRSWSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vRmlyZSEhIVxuICAgICAgICBpZiAodGhpcy5vbkhpZ2hBbGVydCkge1xuICAgICAgICAgICAgdmFyIGUgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5FTVBUWSk7XG4gICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIpKTtcbiAgICAgICAgICAgIHRoaXMub25IaWdoQWxlcnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvL3BhdHJvbFxuICAgICAgICBldy5vcmlnaW4uc3dhcEF0b21zKGV3LmdldEFkamFjZW50NFdheSh0cnVlLCBFbGVtZW50VHlwZXMuRU1QVFkpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBXYWxsRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuV0FMTC5uYW1lLCBFbGVtZW50VHlwZXMuV0FMTC50eXBlLCAwLCAxMDApO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50V2luZG93IH0gZnJvbSBcIi4uL2NsYXNzZXMvRXZlbnR3aW5kb3dcIjtcbmV4cG9ydCBjbGFzcyBNRk1VdGlscyB7XG4gICAgc3RhdGljIEN0b0lEKGMpIHtcbiAgICAgICAgcmV0dXJuIGAke2Mucm93fToke2MuY29sfWA7XG4gICAgfVxuICAgIHN0YXRpYyBJRHRvQyhpZCkge1xuICAgICAgICBsZXQgcmNhID0gaWQuc3BsaXQoXCI6XCIpO1xuICAgICAgICByZXR1cm4geyByb3c6IHBhcnNlSW50KHJjYVswXSksIGNvbDogcGFyc2VJbnQocmNhWzFdKSB9O1xuICAgIH1cbiAgICBzdGF0aWMgR2VuZXJhdGVFdmVudFdpbmRvdyh0aWxlLCB3LCBoKSB7XG4gICAgICAgIGxldCByYyA9IChNYXRoLnJhbmRvbSgpICogdykgPj4gMDtcbiAgICAgICAgbGV0IHJyID0gKE1hdGgucmFuZG9tKCkgKiBoKSA+PiAwO1xuICAgICAgICByZXR1cm4gbmV3IEV2ZW50V2luZG93KHRpbGUsIHsgcm93OiByciwgY29sOiByYyB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9