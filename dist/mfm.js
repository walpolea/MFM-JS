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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9BdG9tLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtZW50VHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL0V2ZW50d2luZG93LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9TaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9UaWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9BbnRpRm9ya0JvbWJFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9EUmVnRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvRW1wdHlFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9Gb3JrQm9tYkVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL2VsZW1lbnRzL01hc29uRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvUmVzRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvU2VudHJ5RWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvV2FsbEVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS91dGlscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwQztBQUNnQjtBQUNiO0FBQ0g7QUFDeUI7QUFDbkUsWUFBWSxzREFBSTtBQUNoQjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0VBQVk7QUFDM0IsZUFBZSxzRUFBWTtBQUMzQixlQUFlLHNFQUFZO0FBQzNCLGVBQWUsc0VBQVk7QUFDM0IsZUFBZSxzRUFBWTtBQUMzQixlQUFlLHNFQUFZO0FBQzNCLGVBQWUsc0VBQVk7QUFDM0IsZUFBZSxzRUFBWTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixXQUFXO0FBQ2xDLHFCQUFxQix5REFBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGlCQUFpQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msc0RBQUksQ0FBQyxzRUFBWTtBQUN6RDtBQUNBO0FBQ0Esd0NBQXdDLHNEQUFJLENBQUMsc0VBQVk7QUFDekQ7QUFDQTtBQUNBLHdDQUF3QyxzREFBSSxDQUFDLHNFQUFZLFNBQVMsK0VBQVk7QUFDOUU7QUFDQTtBQUNBLHdDQUF3QyxzREFBSSxDQUFDLHNFQUFZLFNBQVMsK0VBQVk7QUFDOUU7QUFDQTtBQUNBLHdDQUF3QyxzREFBSSxDQUFDLHNFQUFZLFNBQVMsK0VBQVk7QUFDOUU7QUFDQTtBQUNBLHdDQUF3QyxzREFBSSxDQUFDLHNFQUFZO0FBQ3pEO0FBQ0E7QUFDQSx3Q0FBd0Msc0RBQUksQ0FBQyxzRUFBWTtBQUN6RDtBQUNBO0FBQ0Esd0NBQXdDLHNEQUFJLENBQUMsc0VBQVk7QUFDekQ7QUFDQTtBQUNBLHdDQUF3QyxzREFBSSxDQUFDLHNFQUFZO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHNEQUFJLENBQUMsc0VBQVk7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqR0E7QUFBQTtBQUFBO0FBQThDO0FBQ3ZDO0FBQ1Asd0JBQXdCLDBEQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1RDtBQUNGO0FBQ0Y7QUFDRTtBQUNFO0FBQ007QUFDUTtBQUNaO0FBQ2xEO0FBQ1A7QUFDQSwrQkFBK0IsdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQSxzQkFBc0Isa0NBQWtDLG1FQUFZO0FBQ3BFLHFCQUFxQixpQ0FBaUMsaUVBQVc7QUFDakUsb0JBQW9CLGdDQUFnQywrREFBVTtBQUM5RCxxQkFBcUIsaUNBQWlDLGlFQUFXO0FBQ2pFLHNCQUFzQixtQ0FBbUMsbUVBQVk7QUFDckUsMEJBQTBCLHVDQUF1Qyx5RUFBZTtBQUNoRiwrQkFBK0IsNENBQTRDLGlGQUFtQjtBQUM5Rix1QkFBdUIsb0NBQW9DLHFFQUFhO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQUE7QUFBQTtBQUFBO0FBQTBDO0FBQ0k7QUFDOUM7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywwREFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMscURBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLGlCQUFpQjtBQUN0QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLG1CQUFtQjtBQUN4QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLG1CQUFtQjtBQUN4QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLG1CQUFtQjtBQUN4QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLG1CQUFtQjtBQUN4QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLG1CQUFtQjtBQUN4QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLG1CQUFtQjtBQUN4QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGtCQUFrQjtBQUN2QixLQUFLLGlCQUFpQjtBQUN0QixLQUFLO0FBQ0w7QUFDQTtBQUNBLHVCQUF1QjtBQUN2Qix1QkFBdUI7QUFDdkIsd0JBQXdCO0FBQ3hCLHdCQUF3QjtBQUN4Qiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1Qiw0QkFBNEI7Ozs7Ozs7Ozs7Ozs7QUNyTDVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEM7QUFDWjtBQUNnQjtBQUN2QztBQUNQO0FBQ0E7QUFDQSxrQkFBa0IscURBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsMENBQUksQ0FBQywwREFBWTtBQUNuRDtBQUNBO0FBQ0EsK0JBQStCLDBDQUFJLENBQUMsMERBQVk7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsMENBQUksQ0FBQywwREFBWTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBDQUFJO0FBQzVCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoREE7QUFBQTtBQUFBO0FBQUE7QUFBOEI7QUFDWTtBQUNuQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixxREFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxHQUFHLEdBQUcsR0FBRztBQUMxQztBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0JBQWdCO0FBQ3ZDO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBLGtDQUFrQyxFQUFFLEdBQUcsRUFBRSxPQUFPLDBDQUFJLEVBQUUsaUJBQWlCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDZ0I7QUFDaEI7QUFDeEIsa0NBQWtDLDBDQUFJO0FBQzdDO0FBQ0EsY0FBYywwREFBWSxhQUFhLDBEQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwwREFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QywwQ0FBSSxDQUFDLDBEQUFZO0FBQzFELCtCQUErQiwwREFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDBEQUFZO0FBQzNELG1EQUFtRCwwQ0FBSSxDQUFDLDBEQUFZO0FBQ3BFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDBEQUFZO0FBQzNEO0FBQ0EsdURBQXVELDBDQUFJLENBQUMsMERBQVk7QUFDeEU7QUFDQTtBQUNBLHVEQUF1RCwwQ0FBSSxDQUFDLDBEQUFZO0FBQ3hFO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ2dCO0FBQ2hCO0FBQ3hCLDBCQUEwQiwwQ0FBSTtBQUNyQztBQUNBLGNBQWMsMERBQVksWUFBWSwwREFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMERBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELDBDQUFJLENBQUMsMERBQVk7QUFDdkU7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELDBDQUFJLENBQUMsMERBQVk7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLDBEQUFZO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvQ0E7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDZ0I7QUFDeEMsMkJBQTJCLDBDQUFJO0FBQ3RDO0FBQ0EsY0FBYywwREFBWSxhQUFhLDBEQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ2dCO0FBQ2hCO0FBQ3hCLDhCQUE4QiwwQ0FBSTtBQUN6QztBQUNBLGNBQWMsMERBQVksYUFBYSwwREFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCwwQ0FBSSxDQUFDLDBEQUFZO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDZEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNnQjtBQUNoQjtBQUN4QiwyQkFBMkIsMENBQUk7QUFDdEM7QUFDQTtBQUNBLGNBQWMsMERBQVksYUFBYSwwREFBWTtBQUNuRDtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsMENBQUksQ0FBQywwREFBWTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywwREFBWSxxQ0FBcUMsMERBQVk7QUFDMUcseURBQXlELDBDQUFJLENBQUMsMERBQVk7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsMERBQVkscUNBQXFDLDBEQUFZO0FBQzFHLHlEQUF5RCwwQ0FBSSxDQUFDLDBEQUFZO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDBDQUFJLENBQUMsMERBQVk7QUFDaEU7QUFDQTtBQUNBLCtDQUErQywwQ0FBSSxDQUFDLDBEQUFZO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqTEE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDZ0I7QUFDeEMseUJBQXlCLDBDQUFJO0FBQ3BDO0FBQ0EsY0FBYywwREFBWSxXQUFXLDBEQUFZO0FBQ2pEO0FBQ0E7QUFDQSxxREFBcUQsMERBQVk7QUFDakU7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNnQjtBQUNoQjtBQUN4Qiw0QkFBNEIsMENBQUk7QUFDdkM7QUFDQSxjQUFjLDBEQUFZLGNBQWMsMERBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwwREFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwwREFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywwREFBWTtBQUN0RDtBQUNBO0FBQ0EsbUNBQW1DLDBDQUFJLENBQUMsMERBQVk7QUFDcEQ7QUFDQTtBQUNBLDJDQUEyQywwREFBWTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsMENBQUksQ0FBQywwREFBWTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQywwREFBWTtBQUM5Qyx3Q0FBd0MsMENBQUksQ0FBQywwREFBWTtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsMERBQVk7QUFDakU7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNDQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNnQjtBQUN4QywwQkFBMEIsMENBQUk7QUFDckM7QUFDQSxjQUFjLDBEQUFZLFlBQVksMERBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1RBO0FBQUE7QUFBQTtBQUFxRDtBQUM5QztBQUNQO0FBQ0Esa0JBQWtCLE1BQU0sR0FBRyxNQUFNO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnRUFBVyxRQUFRLG1CQUFtQjtBQUN6RDtBQUNBIiwiZmlsZSI6Im1mbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgVGlsZSB9IGZyb20gXCIuL21mbS9jbGFzc2VzL1RpbGVcIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuL21mbS9jbGFzc2VzL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgTUZNVXRpbHMgfSBmcm9tIFwiLi9tZm0vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi9tZm0vY2xhc3Nlcy9BdG9tXCI7XG5pbXBvcnQgeyBNYXNvbkVsZW1lbnQgfSBmcm9tIFwiLi9tZm0vY2xhc3Nlcy9lbGVtZW50cy9NYXNvbkVsZW1lbnRcIjtcbmxldCBnID0gbmV3IFRpbGUoNDgsIDQ4KTtcbnZhciBza2V0Y2ggPSAocCkgPT4ge1xuICAgIGxldCBzaXRlU2l6ZSA9IDE0O1xuICAgIGxldCBncmlkT2Zmc2V0ID0gMjA7XG4gICAgcC5wcmVsb2FkID0gKCkgPT4geyB9O1xuICAgIHAuc2V0dXAgPSAoKSA9PiB7XG4gICAgICAgIHAuY3JlYXRlQ2FudmFzKDcwMCwgNzAwKTtcbiAgICB9O1xuICAgIC8vICAgcC53aW5kb3dSZXNpemVkID0gKCkgPT4ge1xuICAgIC8vICAgICBwLnJlc2l6ZUNhbnZhcyhwLndpbmRvd1dpZHRoIC0gNTAsIHAud2luZG93SGVpZ2h0IC0gNTApO1xuICAgIC8vICAgfTtcbiAgICAvL0VzdGFibGlzaCB0aGUgZWxtZW50IGNvbG9ycyBoZXJlXG4gICAgbGV0IGNvbG9ycyA9IG5ldyBNYXAoKTtcbiAgICBjb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5FTVBUWSwgcC5jb2xvcigzMiwgMzIsIDMyLCAxMjcpKTtcbiAgICBjb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5EUkVHLCBwLmNvbG9yKDI1NSwgMzIsIDMyKSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuUkVTLCBwLmNvbG9yKDMyLCAyNTUsIDY0KSk7XG4gICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuV0FMTCwgcC5jb2xvcigzMiwgMzIsIDI1NSkpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLk1BU09OLCBwLmNvbG9yKDMyLCAyNTUsIDI1NSkpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkZPUktfQk9NQiwgcC5jb2xvcigxNzAsIDMyLCAzMikpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLCBwLmNvbG9yKDEyNywgMTI3LCAzMikpO1xuICAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLlNFTlRSWSwgcC5jb2xvcigxMjcsIDEyNywgMjU1KSk7XG4gICAgbGV0IGRyYXdHcmlkID0gKHAsIHQpID0+IHtcbiAgICAgICAgcC5wdXNoKCk7XG4gICAgICAgIHAudHJhbnNsYXRlKGdyaWRPZmZzZXQsIGdyaWRPZmZzZXQpO1xuICAgICAgICB0LnNpdGVzLmZvckVhY2goKHNpdGUpID0+IHtcbiAgICAgICAgICAgIHAuc3Ryb2tlKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgcC5maWxsKGNvbG9ycy5nZXQoc2l0ZS5hdG9tLnR5cGUpKTtcbiAgICAgICAgICAgIHAuZWxsaXBzZShzaXRlLnRpbGVQb3MuY29sICogc2l0ZVNpemUsIHNpdGUudGlsZVBvcy5yb3cgKiBzaXRlU2l6ZSwgc2l0ZVNpemUsIHNpdGVTaXplKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHAucG9wKCk7XG4gICAgfTtcbiAgICBsZXQgcnVuID0gKCkgPT4ge1xuICAgICAgICBsZXQgc3BlZWQgPSAxMDAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwZWVkOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBldyA9IE1GTVV0aWxzLkdlbmVyYXRlRXZlbnRXaW5kb3coZywgZy53aWR0aCwgZy5oZWlnaHQpO1xuICAgICAgICAgICAgZXcub3JpZ2luLmF0b20uZXhlYyhldyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCBnZXRTaXRlRnJvbUNhbnZhc1hZID0gKHgsIHkpID0+IHtcbiAgICAgICAgeCA9IHggLSBncmlkT2Zmc2V0ICsgc2l0ZVNpemUgKiAwLjU7XG4gICAgICAgIHkgPSB5IC0gZ3JpZE9mZnNldCArIHNpdGVTaXplICogMC41O1xuICAgICAgICB4ID0gKHggLyBzaXRlU2l6ZSkgPj4gMDtcbiAgICAgICAgeSA9ICh5IC8gc2l0ZVNpemUpID4+IDA7XG4gICAgICAgIHJldHVybiBnLmdldFNpdGVCeUNvb3JkKHsgcm93OiB5LCBjb2w6IHggfSk7XG4gICAgfTtcbiAgICBwLmRyYXcgPSAoKSA9PiB7XG4gICAgICAgIHAuYmFja2dyb3VuZCgxMDApO1xuICAgICAgICBkcmF3R3JpZChwLCBnKTtcbiAgICAgICAgcnVuKCk7XG4gICAgfTtcbiAgICBsZXQgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzaXRlID0gZ2V0U2l0ZUZyb21DYW52YXNYWShwLm1vdXNlWCwgcC5tb3VzZVkpO1xuICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgaWYgKHAua2V5SXNQcmVzc2VkKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChwLmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTQ6IC8vclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLlJFUyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTk6IC8vd1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTIyOiAvL3pcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTiwgW01hc29uRWxlbWVudC5ib3hQYXRoKDEyKV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTIwOiAvL3hcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTiwgW01hc29uRWxlbWVudC5saW5lUGF0aCg0OCwgXCJFXCIpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OTogLy9jXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuTUFTT04sIFtNYXNvbkVsZW1lbnQubGluZVBhdGgoNDgsIFwiU1wiKV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTAxOiAvL2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5ODogLy9iXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRk9SS19CT01CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk3OiAvL2FcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTU6IC8vc1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLlNFTlRSWSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRFJFRyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHAubW91c2VEcmFnZ2VkID0gaGFuZGxlQ2xpY2s7XG4gICAgcC5tb3VzZUNsaWNrZWQgPSBoYW5kbGVDbGljaztcbn07XG5sZXQgc2tldGNoUCA9IG5ldyBwNShza2V0Y2gpO1xuIiwiaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgQXRvbSB7XG4gICAgY29uc3RydWN0b3IoX3R5cGUgPSBFbGVtZW50VHlwZXMuRU1QVFksIHBhcmFtcykge1xuICAgICAgICB0aGlzLnR5cGUgPSBfdHlwZTtcbiAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5lbGVtID0gbmV3IHRoaXMudHlwZS5jbGFzcyguLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtID0gbmV3IHRoaXMudHlwZS5jbGFzcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgdGhpcy5lbGVtLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcihfbmFtZSwgX3R5cGUsIF9tb3ZlYWJpbGl0eSA9IDEwMCwgX2Rlc3Ryb3lhYmlsaXR5ID0gMTAwKSB7XG4gICAgICAgIHRoaXMuYWdlID0gMDtcbiAgICAgICAgdGhpcy5uYW1lID0gX25hbWU7XG4gICAgICAgIHRoaXMudHlwZSA9IF90eXBlO1xuICAgICAgICB0aGlzLm1vdmVhYmlsaXR5ID0gX21vdmVhYmlsaXR5O1xuICAgICAgICB0aGlzLmRlc3Ryb3lhYmlsaXR5ID0gX2Rlc3Ryb3lhYmlsaXR5O1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHRoaXMuYWdlKys7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRW1wdHlFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvRW1wdHlFbGVtZW50XCI7XG5pbXBvcnQgeyBEUmVnRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL0RSZWdFbGVtZW50XCI7XG5pbXBvcnQgeyBSZXNFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvUmVzRWxlbWVudFwiO1xuaW1wb3J0IHsgV2FsbEVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9XYWxsRWxlbWVudFwiO1xuaW1wb3J0IHsgTWFzb25FbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvTWFzb25FbGVtZW50XCI7XG5pbXBvcnQgeyBGb3JrQm9tYkVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9Gb3JrQm9tYkVsZW1lbnRcIjtcbmltcG9ydCB7IEFudGlGb3JrQm9tYkVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9BbnRpRm9ya0JvbWJFbGVtZW50XCI7XG5pbXBvcnQgeyBTZW50cnlFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvU2VudHJ5RWxlbWVudFwiO1xuZXhwb3J0IGNsYXNzIEVsZW1lbnRUeXBlcyB7XG4gICAgc3RhdGljIHJlZ2lzdGVyVHlwZShuYW1lLCB0eXBlLCBjKSB7XG4gICAgICAgIHRoaXMuVFlQRVNfQVJSQVkucHVzaCh7IG5hbWUsIHR5cGUsIGNsYXNzOiBjIH0pO1xuICAgIH1cbn1cbkVsZW1lbnRUeXBlcy5FTVBUWSA9IHsgbmFtZTogXCJFTVBUWVwiLCB0eXBlOiBcIkVcIiwgY2xhc3M6IEVtcHR5RWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLkRSRUcgPSB7IG5hbWU6IFwiRFJFR1wiLCB0eXBlOiBcIkRcIiwgY2xhc3M6IERSZWdFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuUkVTID0geyBuYW1lOiBcIlJFU1wiLCB0eXBlOiBcIlJcIiwgY2xhc3M6IFJlc0VsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5XQUxMID0geyBuYW1lOiBcIldBTExcIiwgdHlwZTogXCJXXCIsIGNsYXNzOiBXYWxsRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLk1BU09OID0geyBuYW1lOiBcIk1BU09OXCIsIHR5cGU6IFwiTWFcIiwgY2xhc3M6IE1hc29uRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLkZPUktfQk9NQiA9IHsgbmFtZTogXCJGT1JLIEJPTUJcIiwgdHlwZTogXCJGYlwiLCBjbGFzczogRm9ya0JvbWJFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIgPSB7IG5hbWU6IFwiQU5USSBGT1JLIEJPTUJcIiwgdHlwZTogXCJBZlwiLCBjbGFzczogQW50aUZvcmtCb21iRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLlNFTlRSWSA9IHsgbmFtZTogXCJTRU5UUllcIiwgdHlwZTogXCJTZVwiLCBjbGFzczogU2VudHJ5RWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLlRZUEVTX0FSUkFZID0gW1xuICAgIEVsZW1lbnRUeXBlcy5FTVBUWSxcbiAgICBFbGVtZW50VHlwZXMuRFJFRyxcbiAgICBFbGVtZW50VHlwZXMuUkVTLFxuICAgIEVsZW1lbnRUeXBlcy5XQUxMLFxuICAgIEVsZW1lbnRUeXBlcy5NQVNPTixcbiAgICBFbGVtZW50VHlwZXMuRk9SS19CT01CLFxuICAgIEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQixcbiAgICBFbGVtZW50VHlwZXMuU0VOVFJZXG5dO1xuIiwiaW1wb3J0IHsgTUZNVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuL0VsZW1lbnRUeXBlc1wiO1xuLy9FdmVudCB3aW5kb3cgYXMgZGVzY3JpYmJlZCBoZXJlOiBodHRwOi8vcm9idXN0LmNzLnVubS5lZHUvbGliL2V4ZS9mZXRjaC5waHA/dz0zMDAmdG9rPTRjOGY0OSZtZWRpYT1kZXY6ZXZlbnQtd2luZG93LTEwLnBuZ1xuLy9Db2xsZWN0aW9uIG9mIHNpdGVzIHdoaWNoIGNvbnRhaW4gYXRvbXMsIGJ1aWx0IGZyb20gYW4gb3JpZ2luIChjZW50ZXIpIHNpdGVcbmV4cG9ydCBjbGFzcyBFdmVudFdpbmRvdyB7XG4gICAgY29uc3RydWN0b3IoX3RpbGUsIF9vcmlnaW4pIHtcbiAgICAgICAgdGhpcy50aWxlID0gX3RpbGU7XG4gICAgICAgIHRoaXMubWFrZVdpbmRvdyhfdGlsZSwgX29yaWdpbik7XG4gICAgfVxuICAgIG1ha2VXaW5kb3codGlsZSwgb3JpZ2luKSB7XG4gICAgICAgIHRoaXMud2luZG93ID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMudGlsZS5nZXRTaXRlQnlDb29yZChvcmlnaW4pO1xuICAgICAgICAvL2lmIHRoZSBvcmlnaW4gaXMgRU1QVFkgRWxlbWVudCwgbGV0J3Mgc2F2ZSBzb21lIGN5Y2xlcyAoZ29vZCwgYmFkPylcbiAgICAgICAgaWYgKHRoaXMub3JpZ2luLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLndpbmRvdy5zZXQodGhpcy5vcmlnaW4uaWQsIHRoaXMub3JpZ2luKTtcbiAgICAgICAgbGV0IHdpbmRvd0FycmF5ID0gRXZlbnRXaW5kb3cuV0lORE9XX09SREVSX09GRlNFVFMubWFwKChvZmZzZXQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk9mZnNldEZyb21PcmlnaW4ob3JpZ2luLCBvZmZzZXQucm93LCBvZmZzZXQuY29sKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvd0FycmF5LmZvckVhY2goKHRpbGVDb29yZCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNpdGUgPSB0aWxlLmdldFNpdGVCeUNvb3JkKHRpbGVDb29yZCk7XG4gICAgICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMud2luZG93LnNldChzaXRlLmlkLCBzaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9mZnNldEZyb21PcmlnaW4ob3JpZ2luLCByb3dPZmZzZXQsIGNvbE9mZnNldCkge1xuICAgICAgICByZXR1cm4geyByb3c6IG9yaWdpbi5yb3cgKyByb3dPZmZzZXQsIGNvbDogb3JpZ2luLmNvbCArIGNvbE9mZnNldCB9O1xuICAgIH1cbiAgICBnZXRBbGwoc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxldCB3YSA9IEFycmF5LmZyb20odGhpcy53aW5kb3cudmFsdWVzKCkpO1xuICAgICAgICBpZiAoc3BlY2lmaWNUeXBlKSB7XG4gICAgICAgICAgICB3YSA9IHdhLmZpbHRlcihzaXRlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2l0ZS5hdG9tLnR5cGUgPT09IHNwZWNpZmljVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2E7XG4gICAgfVxuICAgIGdldFNpdGVCeUluZGV4KGluZGV4KSB7XG4gICAgICAgIGxldCB3YSA9IEFycmF5LmZyb20odGhpcy53aW5kb3cudmFsdWVzKCkpO1xuICAgICAgICBpZiAoaW5kZXggPj0gd2EubGVuZ3RoIHx8IGluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2FbaW5kZXhdO1xuICAgIH1cbiAgICBnZXRSYW5kb20oc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpdGVGcm9tQ2FuZGlkYXRlcyhBcnJheS5mcm9tKHRoaXMud2luZG93LnZhbHVlcygpKSwgdHJ1ZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgLy9tb3N0IHVzZWZ1bCB3aGVuIHVzaW5nIHNwZWNpZmljVHlwZVxuICAgIC8vdHJhdmVyc2VzIHRoZSB3aW5kb3cgdW50aWwgaXQgY29tZXMgYWNyb3NzIHdoYXQgeW91J3JlIGxvb2tpbmcgZm9yXG4gICAgZ2V0TmVhcmVzdChzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKEFycmF5LmZyb20odGhpcy53aW5kb3cudmFsdWVzKCkpLCBmYWxzZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgZ2V0RWFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX0VBU1QpO1xuICAgIH1cbiAgICBnZXRXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfV0VTVCk7XG4gICAgfVxuICAgIGdldE5vcnRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEgpO1xuICAgIH1cbiAgICBnZXRTb3V0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX1NPVVRIKTtcbiAgICB9XG4gICAgZ2V0Tm9ydGhXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEhXRVNUKTtcbiAgICB9XG4gICAgZ2V0U291dGhXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfU09VVEhXRVNUKTtcbiAgICB9XG4gICAgZ2V0Tm9ydGhFYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEhFQVNUKTtcbiAgICB9XG4gICAgZ2V0U291dGhFYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfU09VVEhFQVNUKTtcbiAgICB9XG4gICAgZ2V0QWRqYWNlbnQ0V2F5KHJhbmRvbWl6ZSA9IHRydWUsIHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaXRlRnJvbUNhbmRpZGF0ZXMoW3RoaXMuZ2V0V2VzdCgpLCB0aGlzLmdldE5vcnRoKCksIHRoaXMuZ2V0U291dGgoKSwgdGhpcy5nZXRFYXN0KCldLCByYW5kb21pemUsIHNwZWNpZmljVHlwZSk7XG4gICAgfVxuICAgIGdldEFkamFjZW50OFdheShyYW5kb21pemUgPSB0cnVlLCBzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKFtcbiAgICAgICAgICAgIHRoaXMuZ2V0V2VzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXROb3J0aCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRTb3V0aCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRFYXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldE5vcnRoV2VzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRTb3V0aFdlc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm9ydGhFYXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldFNvdXRoRWFzdCgpXG4gICAgICAgIF0sIHJhbmRvbWl6ZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgLy9HaXZlbiBhbiBhcnJheSBvZiBjYW5kaWRhdGUgc2l0ZXMgKHN5bW1ldHJpZXMgaW4gdGhlIGZ1dHVyZSBJIGhvcGUpLFxuICAgIC8vZ2l2ZSBtZSBiYWNrIG9uZSwgcmFuZG9tIGJ5IGRlZmF1bHQsIG5vdCBmaWx0ZXJlZCBieSB0eXBlIGJ5IGRlZmF1bHRcbiAgICBnZXRTaXRlRnJvbUNhbmRpZGF0ZXMoY2FuZGlkYXRlU2l0ZXMsIHJhbmRvbWl6ZSA9IHRydWUsIHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBjYW5kaWRhdGVTaXRlcyA9IGNhbmRpZGF0ZVNpdGVzLmZpbHRlcihzaXRlID0+IHtcbiAgICAgICAgICAgIGlmICghc2l0ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIXNwZWNpZmljVHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3BlY2lmaWNUeXBlICYmIHNpdGUuYXRvbS50eXBlID09PSBzcGVjaWZpY1R5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vbm8gc2l0ZXMhIHlpa2VzISBwb3NzaWJsZSE/ISBwcm9iYWJseSBvbmx5IHdoZW4gdXNpbmcgc3BlY2lmaWNUeXBlIGFuZCBsb29raW5nIGZvciBhIHJhcmUgZWxlbWVudFxuICAgICAgICBpZiAoY2FuZGlkYXRlU2l0ZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvL3JldHVybiByYW5kb21cbiAgICAgICAgaWYgKHJhbmRvbWl6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZVNpdGVzWyhNYXRoLnJhbmRvbSgpICogY2FuZGlkYXRlU2l0ZXMubGVuZ3RoKSA+PiAwXTtcbiAgICAgICAgfVxuICAgICAgICAvL3JldHVybiBmaXJzdCBtYXRjaGluZ1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlU2l0ZXNbMF07XG4gICAgfVxuICAgIGdldERpcmVjdGlvbihkaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IHNpdGUgPSB0aGlzLnRpbGUuc2l0ZXMuZ2V0KE1GTVV0aWxzLkN0b0lEKHRoaXMuT2Zmc2V0RnJvbU9yaWdpbih0aGlzLm9yaWdpbi50aWxlUG9zLCBkaXJlY3Rpb24ucm93LCBkaXJlY3Rpb24uY29sKSkpO1xuICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNpdGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5FdmVudFdpbmRvdy5XSU5ET1dfT1JERVJfT0ZGU0VUUyA9IFtcbiAgICB7IGNvbDogMCwgcm93OiAwIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDAgfSxcbiAgICB7IGNvbDogMCwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAwLCByb3c6IDEgfSxcbiAgICB7IGNvbDogMSwgcm93OiAwIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDEgfSxcbiAgICB7IGNvbDogMSwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAxLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogMiB9LFxuICAgIHsgY29sOiAyLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAtMiB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAyIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogLTIgfSxcbiAgICB7IGNvbDogMSwgcm93OiAyIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMiwgcm93OiAxIH0sXG4gICAgeyBjb2w6IC0zLCByb3c6IDAgfSxcbiAgICB7IGNvbDogMCwgcm93OiAtMyB9LFxuICAgIHsgY29sOiAwLCByb3c6IDMgfSxcbiAgICB7IGNvbDogMywgcm93OiAwIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IC0yIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IDIgfSxcbiAgICB7IGNvbDogMiwgcm93OiAtMiB9LFxuICAgIHsgY29sOiAyLCByb3c6IDIgfSxcbiAgICB7IGNvbDogLTMsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogLTMsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAtMyB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAzIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogLTMgfSxcbiAgICB7IGNvbDogMSwgcm93OiAzIH0sXG4gICAgeyBjb2w6IDMsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMywgcm93OiAxIH0sXG4gICAgeyBjb2w6IC00LCByb3c6IDAgfSxcbiAgICB7IGNvbDogMCwgcm93OiAtNCB9LFxuICAgIHsgY29sOiAwLCByb3c6IDQgfSxcbiAgICB7IGNvbDogNCwgcm93OiAwIH1cbl07XG4vL2JlY2F1c2UsIGxhenlcbkV2ZW50V2luZG93LkVXX1dFU1QgPSB7IGNvbDogLTEsIHJvdzogMCB9O1xuRXZlbnRXaW5kb3cuRVdfRUFTVCA9IHsgY29sOiAxLCByb3c6IDAgfTtcbkV2ZW50V2luZG93LkVXX05PUlRIID0geyBjb2w6IDAsIHJvdzogLTEgfTtcbkV2ZW50V2luZG93LkVXX1NPVVRIID0geyBjb2w6IDAsIHJvdzogMSB9O1xuRXZlbnRXaW5kb3cuRVdfTk9SVEhXRVNUID0geyBjb2w6IC0xLCByb3c6IC0xIH07XG5FdmVudFdpbmRvdy5FV19TT1VUSFdFU1QgPSB7IGNvbDogLTEsIHJvdzogMSB9O1xuRXZlbnRXaW5kb3cuRVdfTk9SVEhFQVNUID0geyBjb2w6IDEsIHJvdzogLTEgfTtcbkV2ZW50V2luZG93LkVXX1NPVVRIRUFTVCA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiIsImltcG9ydCB7IE1GTVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4vQXRvbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgU2l0ZSB7XG4gICAgY29uc3RydWN0b3IoX3Bvcykge1xuICAgICAgICB0aGlzLnRpbGVQb3MgPSBfcG9zO1xuICAgICAgICB0aGlzLmlkID0gTUZNVXRpbHMuQ3RvSUQodGhpcy50aWxlUG9zKTtcbiAgICAgICAgdGhpcy5jcmVhdGUoKTtcbiAgICB9XG4gICAgLy9pZiB0YXJnZXRTaXRlIGlzIGtpbGxhYmxlXG4gICAgLy9raWxsIGl0cyBhdG9tIChyZXBsYWNlIHdpdGggZW1wdHkpXG4gICAga2lsbEF0b20odGFyZ2V0U2l0ZSkge1xuICAgICAgICBsZXQga2lsbCA9IE1hdGgucmFuZG9tKCkgKiAxMDAgPCB0YXJnZXRTaXRlLmF0b20uZWxlbS5kZXN0cm95YWJpbGl0eTtcbiAgICAgICAgaWYgKGtpbGwpIHtcbiAgICAgICAgICAgIHRhcmdldFNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAga2lsbFNlbGYobGVhdmluZ0F0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpKSB7XG4gICAgICAgIHRoaXMuYXRvbSA9IGxlYXZpbmdBdG9tO1xuICAgIH1cbiAgICAvL2lmIHRhcmdldCBzaXRlIGlzIGtpbGxhYmxlXG4gICAgLy9tb3ZlIHRoaXMgYXRvbSB0byB0YXJnZXRTaXRlLCBhbmQgbGVhdmUgYmVoaW5kIGxlYXZpbmdBdG9tLCB3aGljaCBieSBkZWZhdWx0IGlzIGVtcHR5XG4gICAgbW92ZUF0b20odGFyZ2V0U2l0ZSwgbGVhdmluZ0F0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpKSB7XG4gICAgICAgIGlmICh0YXJnZXRTaXRlICYmIHRhcmdldFNpdGUuY2FuRGVzdHJveSgpKSB7XG4gICAgICAgICAgICBbdGhpcy5hdG9tLCB0YXJnZXRTaXRlLmF0b21dID0gW2xlYXZpbmdBdG9tLCB0aGlzLmF0b21dO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vaWYgdGFyZ2V0U2l0ZSBpcyBtb3ZlYWJsZVxuICAgIC8vc3dhcCBhdG9tcyB3aXRoIHRoaXMgb25lXG4gICAgc3dhcEF0b21zKHRhcmdldFNpdGUpIHtcbiAgICAgICAgaWYgKHRhcmdldFNpdGUgJiYgdGFyZ2V0U2l0ZS5jYW5Nb3ZlKCkpIHtcbiAgICAgICAgICAgIFt0aGlzLmF0b20sIHRhcmdldFNpdGUuYXRvbV0gPSBbdGFyZ2V0U2l0ZS5hdG9tLCB0aGlzLmF0b21dO1xuICAgICAgICB9XG4gICAgfVxuICAgIG11dGF0ZVNpdGUodGFyZ2V0U2l0ZSwgbmV3QXRvbSkge1xuICAgICAgICBpZiAodGFyZ2V0U2l0ZSAmJiB0YXJnZXRTaXRlLmNhbkRlc3Ryb3koKSkge1xuICAgICAgICAgICAgdGFyZ2V0U2l0ZS5hdG9tID0gbmV3QXRvbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYW5EZXN0cm95KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDEwMCA8IHRoaXMuYXRvbS5lbGVtLmRlc3Ryb3lhYmlsaXR5O1xuICAgIH1cbiAgICBjYW5Nb3ZlKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDEwMCA8IHRoaXMuYXRvbS5lbGVtLm1vdmVhYmlsaXR5O1xuICAgIH1cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuYXRvbSA9IG5ldyBBdG9tKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU2l0ZSB9IGZyb20gXCIuL1NpdGVcIjtcbmltcG9ydCB7IE1GTVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5leHBvcnQgY2xhc3MgVGlsZSB7XG4gICAgY29uc3RydWN0b3IoX3dpZHRoID0gMSwgX2hlaWdodCA9IDEpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IF93aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBfaGVpZ2h0O1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgIH1cbiAgICBnZXRTaXRlQnlDb29yZChjKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNpdGVzLmdldChNRk1VdGlscy5DdG9JRChjKSk7XG4gICAgfVxuICAgIGdldFJhbmRvbVNpdGUoKSB7XG4gICAgICAgIGxldCByciA9IChNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQpID4+IDA7XG4gICAgICAgIGxldCByYyA9IChNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCkgPj4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l0ZXMuZ2V0KGAke3JyfToke3JjfWApO1xuICAgIH1cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuc2l0ZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAvL2Fjcm9zcyBjb2x1bW5zXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuaGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAvL2Rvd24gcm93c1xuICAgICAgICAgICAgICAgIHRoaXMuc2l0ZXMuc2V0KGAke2p9OiR7aX1gLCBuZXcgU2l0ZSh7IHJvdzogaiwgY29sOiBpIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgQW50aUZvcmtCb21iRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKF9iaXJ0aGVkSW5kZXggPSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLkVNUFRZLm5hbWUsIEVsZW1lbnRUeXBlcy5FTVBUWS50eXBlKTtcbiAgICAgICAgdGhpcy5iaXJ0aGVkSW5kZXggPSBfYmlydGhlZEluZGV4O1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIGxldCBmYiA9IGV3LmdldE5lYXJlc3QoRWxlbWVudFR5cGVzLkZPUktfQk9NQik7XG4gICAgICAgIC8vcmFuZG9tbHkgZGllIGlmIG5vIGZvcmsgYm9tYnMgYXJvdW5kXG4gICAgICAgIGlmICghZmIgJiYgTWF0aC5yYW5kb20oKSA8IDAuMikge1xuICAgICAgICAgICAgZXcub3JpZ2luLmtpbGxTZWxmKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy93aGlsZSB0aGVyZSBhcmUgZm9ya2JvbWJzIHByZXNlbnQsIGRlc3Ryb3kgdGhlbSFcbiAgICAgICAgd2hpbGUgKGZiKSB7XG4gICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShmYiwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKSk7XG4gICAgICAgICAgICBmYiA9IGV3LmdldE5lYXJlc3QoRWxlbWVudFR5cGVzLkZPUktfQk9NQik7XG4gICAgICAgIH1cbiAgICAgICAgLy9SRUQgQUxFUlQhIE1ha2UgbmV3IGFudGkgZm9yayBib21icyBpbiBhbGwgZGlyZWN0aW9uc1xuICAgICAgICBpZiAoIXRoaXMuYmlydGhlZEluZGV4KSB7XG4gICAgICAgICAgICAvL3RoaXMgaXMgdGhlIGZpcnN0XG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgMTMsXG4gICAgICAgICAgICAgICAgMTQsXG4gICAgICAgICAgICAgICAgMTUsXG4gICAgICAgICAgICAgICAgMTYsXG4gICAgICAgICAgICAgICAgMTcsXG4gICAgICAgICAgICAgICAgMTgsXG4gICAgICAgICAgICAgICAgMTksXG4gICAgICAgICAgICAgICAgMjAsXG4gICAgICAgICAgICAgICAgMjEsXG4gICAgICAgICAgICAgICAgMjIsXG4gICAgICAgICAgICAgICAgMjMsXG4gICAgICAgICAgICAgICAgMjQsXG4gICAgICAgICAgICAgICAgMjUsXG4gICAgICAgICAgICAgICAgMjYsXG4gICAgICAgICAgICAgICAgMjcsXG4gICAgICAgICAgICAgICAgMjgsXG4gICAgICAgICAgICAgICAgMjksXG4gICAgICAgICAgICAgICAgMzAsXG4gICAgICAgICAgICAgICAgMzEsXG4gICAgICAgICAgICAgICAgMzIsXG4gICAgICAgICAgICAgICAgMzMsXG4gICAgICAgICAgICAgICAgMzQsXG4gICAgICAgICAgICAgICAgMzUsXG4gICAgICAgICAgICAgICAgMzYsXG4gICAgICAgICAgICAgICAgMzcsXG4gICAgICAgICAgICAgICAgMzgsXG4gICAgICAgICAgICAgICAgMzksXG4gICAgICAgICAgICAgICAgNDBcbiAgICAgICAgICAgIF0uZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNpdGUgPSBldy5nZXRTaXRlQnlJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKHNpdGUgJiYgc2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShzaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIsIFtpbmRleF0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vdGhpcyBpcyBhIGNoaWxkLCBqdXN0IGNvbnRpbnVlIHRoYXQgd2F5XG4gICAgICAgICAgICBbZXcuZ2V0U2l0ZUJ5SW5kZXgodGhpcy5iaXJ0aGVkSW5kZXgpXS5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzaXRlICYmIHNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShzaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKHNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQiwgW3RoaXMuYmlydGhlZEluZGV4XSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZXcub3JpZ2luLmtpbGxTZWxmKCk7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgRFJlZ0VsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLkRSRUcubmFtZSwgRWxlbWVudFR5cGVzLkRSRUcudHlwZSk7XG4gICAgICAgIHRoaXMucERSRUdfQ1JFQVRFID0gMTAwMDtcbiAgICAgICAgdGhpcy5wUkVTX0NSRUFURSA9IDMwMDtcbiAgICAgICAgdGhpcy5wRFJFR19ERVNUUk9ZID0gMTA7XG4gICAgICAgIHRoaXMucEFOWV9ERVNUUk9ZID0gMTAwO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIC8vZ2V0IGEgcmFuZG9tIE5FU1cgc2l0ZVxuICAgICAgICBjb25zdCBhdmFpbGFibGVTaXRlID0gZXcuZ2V0QWRqYWNlbnQ0V2F5KCk7XG4gICAgICAgIC8vQ1JFQVRJT05cbiAgICAgICAgaWYgKGF2YWlsYWJsZVNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZURSZWcgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5wRFJFR19DUkVBVEUgPCAxO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRlUmVzID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucFJFU19DUkVBVEUgPCAxO1xuICAgICAgICAgICAgaWYgKGNyZWF0ZURSZWcpIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubW92ZUF0b20oYXZhaWxhYmxlU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkRSRUcpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRSRUcgQ1JFQVRFRFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNyZWF0ZVJlcykge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuUkVTKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSRVMgQ1JFQVRFRFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5zd2FwQXRvbXMoYXZhaWxhYmxlU2l0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXZhaWxhYmxlU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5EUkVHKSB7XG4gICAgICAgICAgICBjb25zdCBkZXN0cm95RFJlZyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBEUkVHX0RFU1RST1kgPCAxO1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3lEUmVnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEUkVHIERFU1RST1lFRFwiKTtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubW92ZUF0b20oYXZhaWxhYmxlU2l0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL2l0J3Mgc29tZXRoaW5nIGVsc2VcbiAgICAgICAgICAgIGNvbnN0IGRlc3Ryb3lBbnkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5wQU5ZX0RFU1RST1kgPCAxO1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3lBbnkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhdmFpbGFibGVTaXRlLmF0b20udHlwZS5uYW1lICsgXCIgREVTVFJPWUVEXCIpO1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBFbXB0eUVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLkVNUFRZLm5hbWUsIEVsZW1lbnRUeXBlcy5FTVBUWS50eXBlKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi4vQXRvbVwiO1xuZXhwb3J0IGNsYXNzIEZvcmtCb21iRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRU1QVFkubmFtZSwgRWxlbWVudFR5cGVzLkVNUFRZLnR5cGUpO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIGxldCBuZXh0VmljdGltID0gZXcuZ2V0QWRqYWNlbnQ4V2F5KCk7XG4gICAgICAgIGlmIChuZXh0VmljdGltKSB7XG4gICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShuZXh0VmljdGltLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuRk9SS19CT01CKSk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBNYXNvbkVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICAvL2l0J3MgaW1wb3J0YW50IHRoYXQgdGhlIHBhdGggbG9vcHMgb24gaXRzZWxmLCBldmVuIGlmIGl0IGp1c3QgbWVhbnMgcmV2ZXJzaW5nIGJhY2sgdG8gdGhlIGJlZ2lubmluZ1xuICAgIGNvbnN0cnVjdG9yKF9wYXRoID0gdW5kZWZpbmVkLCBfY3VySW5kZXggPSAwKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5NQVNPTi5uYW1lLCBFbGVtZW50VHlwZXMuTUFTT04udHlwZSwgMTAwLCAxMDApO1xuICAgICAgICB0aGlzLnBhdGggPSBbXTtcbiAgICAgICAgdGhpcy5jdXJJbmRleCA9IDA7IC8vdXNlZCB0byB0cmF2ZXJzZSBpbmRleCwgYnV0IG5vdyB0aGlzIGlzIHNvcnQgb2YgbGlrZSB0aGUgbWFzb24ncyBJRCBpbiB0aGUgcGF0aCwgaXQgZG9lc24ndCBjaGFuZ2UgZm9yIHRoZSBpbmRpdmlkdWFsLCBidXQgaXMga2VwdCB1cCAoKzEsLTEpIGJ5IG5laWdoYm9yIG1hc29uc1xuICAgICAgICBpZiAoIV9wYXRoKSB7XG4gICAgICAgICAgICBfcGF0aCA9IE1hc29uRWxlbWVudC5ib3hQYXRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQYXRoKF9wYXRoKTtcbiAgICAgICAgdGhpcy5jdXJJbmRleCA9IF9jdXJJbmRleDtcbiAgICB9XG4gICAgc2V0UGF0aChwYXRoKSB7XG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGguc3BsaXQoXCJcIik7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VySW5kZXggPj0gdGhpcy5wYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jdXJJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jdXJJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuY3VySW5kZXggPSB0aGlzLnBhdGgubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGFzdGRpciA9IHRoaXMuY3VySW5kZXggPT09IDAgPyB0aGlzLnBhdGhbdGhpcy5wYXRoLmxlbmd0aCAtIDFdIDogdGhpcy5wYXRoW3RoaXMuY3VySW5kZXggLSAxXTtcbiAgICAgICAgbGV0IHJldmVyc2VEaXIgPSBNYXNvbkVsZW1lbnQuZ2V0T3Bwb3NpdGVEaXIobGFzdGRpcik7XG4gICAgICAgIGxldCBkaXIgPSB0aGlzLnBhdGhbdGhpcy5jdXJJbmRleF07XG4gICAgICAgIGxldCBibHVlcHJpbnRzID0ge1xuICAgICAgICAgICAgRToge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0RWFzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRTb3V0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBOOiB7XG4gICAgICAgICAgICAgICAgbW92ZVNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbm5lckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFdlc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUzoge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0U291dGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0V2VzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFc6IHtcbiAgICAgICAgICAgICAgICBtb3ZlU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFdlc3QoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0Tm9ydGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlubmVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0U291dGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG1vdmVTaXRlID0gYmx1ZXByaW50c1tkaXJdLm1vdmVTaXRlKCk7XG4gICAgICAgIGNvbnN0IGxhc3RTaXRlID0gYmx1ZXByaW50c1tyZXZlcnNlRGlyXS5tb3ZlU2l0ZSgpO1xuICAgICAgICBjb25zdCBvdXRlckJ1aWxkU2l0ZSA9IGJsdWVwcmludHNbZGlyXS5vdXRlckJ1aWxkU2l0ZSgpO1xuICAgICAgICBjb25zdCBpbm5lckJ1aWxkU2l0ZSA9IGJsdWVwcmludHNbZGlyXS5pbm5lckJ1aWxkU2l0ZSgpO1xuICAgICAgICAvL2ZvciBjaGFuZ2luZyBkaXJlY3Rpb25zXG4gICAgICAgIGlmIChsYXN0ZGlyICE9PSBkaXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RPdXRlckJ1aWxkU2l0ZSA9IGJsdWVwcmludHNbbGFzdGRpcl0ub3V0ZXJCdWlsZFNpdGUoKTtcbiAgICAgICAgICAgIGlmIChsYXN0T3V0ZXJCdWlsZFNpdGUpIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShsYXN0T3V0ZXJCdWlsZFNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5XQUxMKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9idWlsZCB0aGUgb3V0ZXIgd2FsbFxuICAgICAgICBpZiAob3V0ZXJCdWlsZFNpdGUpIHtcbiAgICAgICAgICAgIGlmIChvdXRlckJ1aWxkU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5SRVMgfHwgb3V0ZXJCdWlsZFNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShvdXRlckJ1aWxkU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL2J1aWxkIHRoZSBpbm5lciB3YWxsXG4gICAgICAgIGlmIChpbm5lckJ1aWxkU2l0ZSkge1xuICAgICAgICAgICAgaWYgKGlubmVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLlJFUyB8fCBpbm5lckJ1aWxkU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKGlubmVyQnVpbGRTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuV0FMTCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vbW92ZSB0byBuZXh0IHNpdGUgYW5kIGxlYXZlIGFub3RoZXIgbWFzb24gdG8gaGVscFxuICAgICAgICBpZiAobW92ZVNpdGUpIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKG1vdmVTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuTUFTT04sIFtNYXNvbkVsZW1lbnQucGF0aFRvU3RyaW5nKHRoaXMucGF0aCksIHRoaXMuY3VySW5kZXggKyAxXSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0U2l0ZSkge1xuICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUobGFzdFNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTiwgW01hc29uRWxlbWVudC5wYXRoVG9TdHJpbmcodGhpcy5wYXRoKSwgdGhpcy5jdXJJbmRleCAtIDFdKSk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxuICAgIC8vU3RhdGljIHBhdGggaGVscGVyIG1ldGhvZHNcbiAgICAvL0F0IHNvbWUgcG9pbnQgSSB0aGluayB0aGlzIHNob3VsZCBiZSBicm9rZW4gb3V0IGludG8gYSB1dGlsaXR5IGNsYXNzXG4gICAgLy9Nb3JlIGVsZW1lbnRzIHdpbGwgcHJvYmFibHkgYmVuZWZpdCBmcm9tIGhhdmluZyB0aGUgY29uY2VwdCBvZiBhIGRlZmluZWQgcGF0aFxuICAgIC8vbWFrZSBhIHJhbmRvbSB3YWxsIHBhdGhcbiAgICBzdGF0aWMgcmFuZG9tUGF0aCgpIHtcbiAgICAgICAgbGV0IHBhdGggPSBcIlwiO1xuICAgICAgICBjb25zdCByID0gKE1hdGgucmFuZG9tKCkgKiA4ICsgNikgPj4gMDtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IFtcIkVcIiwgXCJOXCIsIFwiU1wiLCBcIldcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkID0gKE1hdGgucmFuZG9tKCkgKiBjaG9pY2VzLmxlbmd0aCkgPj4gMDtcbiAgICAgICAgICAgIGNvbnN0IGwgPSAoTWF0aC5yYW5kb20oKSAqIDMgKyAzKSA+PiAwO1xuICAgICAgICAgICAgY29uc3QgZGlyID0gY2hvaWNlc1tkXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguY29uY2F0KGRpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIHN0YXRpYyBsaW5lUGF0aChsZW5ndGggPSA0OCwgZGlyZWN0aW9uID0gXCJFXCIpIHtcbiAgICAgICAgbGV0IHBhdGggPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYXRoID0gcGF0aC5jb25jYXQoZGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBwYXRoID0gcGF0aC5jb25jYXQodGhpcy5yZXZlcnNlUGF0aChwYXRoKSk7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICAvL21ha2UgYSBib3ggcGF0aFxuICAgIHN0YXRpYyBib3hQYXRoKHNpZGVMZW5ndGggPSA3KSB7XG4gICAgICAgIGxldCBwYXRoID0gXCJcIjtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IFtcIkVcIiwgXCJOXCIsIFwiV1wiLCBcIlNcIl07XG4gICAgICAgIHdoaWxlIChjaG9pY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgZGlyID0gY2hvaWNlcy5zaGlmdCgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaWRlTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5jb25jYXQoZGlyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL3BhdGggPSBwYXRoLmNvbmNhdCh0aGlzLnJldmVyc2VQYXRoKHBhdGgpKTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIC8vY29udmVydCBhIHN0cmluZ1tdIHRvIHN0cmluZyAocGF0aCBzZXJpYWxpemF0aW9uKVxuICAgIHN0YXRpYyBwYXRoVG9TdHJpbmcocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aC5yZWR1Y2UoKGFjYywgZGlyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQoZGlyKTtcbiAgICAgICAgfSwgXCJcIik7XG4gICAgfVxuICAgIC8vdGFrZSBhIHBhdGggd2l0aCBOLFMsRSxXIGFuZCByZXZlcnNlIHRoZSBkaXJlY3Rpb25zXG4gICAgc3RhdGljIHJldmVyc2VQYXRoKHBhdGgpIHtcbiAgICAgICAgcGF0aCA9IHBhdGhcbiAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBkaXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYWNjLmNvbmNhdChkaXIpO1xuICAgICAgICB9LCBcIlwiKTtcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvTi9nLCBcIlRcIik7XG4gICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1MvZywgXCJOXCIpO1xuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9UL2csIFwiU1wiKTtcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvRS9nLCBcIlRcIik7XG4gICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1cvZywgXCJFXCIpO1xuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9UL2csIFwiV1wiKTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIC8vcmV2ZXJzZSBhIGRpcmVjdGlvblxuICAgIHN0YXRpYyBnZXRPcHBvc2l0ZURpcihkaXIpIHtcbiAgICAgICAgbGV0IG1hcCA9IHtcbiAgICAgICAgICAgIE46IFwiU1wiLFxuICAgICAgICAgICAgUzogXCJOXCIsXG4gICAgICAgICAgICBFOiBcIldcIixcbiAgICAgICAgICAgIFc6IFwiRVwiXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBtYXBbZGlyXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBSZXNFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5SRVMubmFtZSwgRWxlbWVudFR5cGVzLlJFUy50eXBlKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBldy5vcmlnaW4uc3dhcEF0b21zKGV3LmdldEFkamFjZW50NFdheSh0cnVlLCBFbGVtZW50VHlwZXMuRU1QVFkpKTtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBTZW50cnlFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5TRU5UUlkubmFtZSwgRWxlbWVudFR5cGVzLlNFTlRSWS50eXBlKTtcbiAgICAgICAgdGhpcy5vbkhpZ2hBbGVydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBTRU5UUllfQ1JFQVRFID0gMjA7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgICAgIGxldCBmYiA9IGV3LmdldE5lYXJlc3QoRWxlbWVudFR5cGVzLkZPUktfQk9NQik7XG4gICAgICAgIC8vZm9yayBib21icyBhcmUgbmVhciEgSGlnaCBBbGVydCFcbiAgICAgICAgaWYgKGZiKSB7XG4gICAgICAgICAgICB0aGlzLm9uSGlnaEFsZXJ0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2UgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5TRU5UUlkpO1xuICAgICAgICAvL05lYXJieSBTbmV0cnkgaXMgb24gaGlnaCBhbGVydCEgV2Ugc2hvdWxkIGJlIHRvbyFcbiAgICAgICAgaWYgKHNlICYmIHNlLmF0b20uZWxlbS5vbkhpZ2hBbGVydCkge1xuICAgICAgICAgICAgdGhpcy5vbkhpZ2hBbGVydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRvdGFsTmVhcmJ5U2VudHJ5ID0gZXcuZ2V0QWxsKEVsZW1lbnRUeXBlcy5TRU5UUlkpLmxlbmd0aDtcbiAgICAgICAgLy9LaW5kYSBib3JpbmcgYW5kIGNyb3dkZWQgYXJvdW5kIGhlcmUsIHJlcXVlc3RpbmcgaG9ub3JhYmxlIGRpc2NoYXJnZSwgc2lyIVxuICAgICAgICBpZiAoIXRoaXMub25IaWdoQWxlcnQgJiYgdG90YWxOZWFyYnlTZW50cnkgPiAyKSB7XG4gICAgICAgICAgICBldy5vcmlnaW4ua2lsbFNlbGYobmV3IEF0b20oRWxlbWVudFR5cGVzLlJFUykpO1xuICAgICAgICB9XG4gICAgICAgIC8vUmVzIG5lYXJieT8gTWF5YmUgcmVjcnVpdCBzb21lb25lIGZvciB0aGUgY2F1c2VcbiAgICAgICAgdmFyIHJlcyA9IGV3LmdldEFkamFjZW50OFdheSh0cnVlLCBFbGVtZW50VHlwZXMuUkVTKTtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgLy9pZiBoaWdoIGFsZXJ0LCBkZWZpbml0ZWx5IHJlY3J1aXQsIG90aGVyd2lzZSwgbWF5YmVcbiAgICAgICAgICAgIGlmICh0aGlzLm9uSGlnaEFsZXJ0IHx8IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBTRU5UUllfQ1JFQVRFIDwgMSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKHJlcywgbmV3IEF0b20oRWxlbWVudFR5cGVzLlNFTlRSWSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vRmlyZSEhIVxuICAgICAgICBpZiAodGhpcy5vbkhpZ2hBbGVydCkge1xuICAgICAgICAgICAgdmFyIGUgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5FTVBUWSk7XG4gICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIpKTtcbiAgICAgICAgICAgIHRoaXMub25IaWdoQWxlcnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvL3BhdHJvbFxuICAgICAgICBldy5vcmlnaW4uc3dhcEF0b21zKGV3LmdldEFkamFjZW50NFdheSh0cnVlLCBFbGVtZW50VHlwZXMuRU1QVFkpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBXYWxsRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuV0FMTC5uYW1lLCBFbGVtZW50VHlwZXMuV0FMTC50eXBlLCAwLCAxMDApO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50V2luZG93IH0gZnJvbSBcIi4uL2NsYXNzZXMvRXZlbnR3aW5kb3dcIjtcbmV4cG9ydCBjbGFzcyBNRk1VdGlscyB7XG4gICAgc3RhdGljIEN0b0lEKGMpIHtcbiAgICAgICAgcmV0dXJuIGAke2Mucm93fToke2MuY29sfWA7XG4gICAgfVxuICAgIHN0YXRpYyBJRHRvQyhpZCkge1xuICAgICAgICBsZXQgcmNhID0gaWQuc3BsaXQoXCI6XCIpO1xuICAgICAgICByZXR1cm4geyByb3c6IHBhcnNlSW50KHJjYVswXSksIGNvbDogcGFyc2VJbnQocmNhWzFdKSB9O1xuICAgIH1cbiAgICBzdGF0aWMgR2VuZXJhdGVFdmVudFdpbmRvdyh0aWxlLCB3LCBoKSB7XG4gICAgICAgIGxldCByYyA9IChNYXRoLnJhbmRvbSgpICogdykgPj4gMDtcbiAgICAgICAgbGV0IHJyID0gKE1hdGgucmFuZG9tKCkgKiBoKSA+PiAwO1xuICAgICAgICByZXR1cm4gbmV3IEV2ZW50V2luZG93KHRpbGUsIHsgcm93OiByciwgY29sOiByYyB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9