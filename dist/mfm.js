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





let app = new Vue({
    el: "#app",
    data: function () {
        return {
            timeSpeed: 2304,
            gridOffset: 20,
            siteSize: 14,
            colors: undefined,
            sketch: undefined,
            p: undefined,
            g: undefined
        };
    },
    mounted() {
        this.g = new _mfm_classes_Tile__WEBPACK_IMPORTED_MODULE_0__["Tile"](48, 48);
        this.sketch = this.initMFM;
    },
    methods: {
        initMFM(p) {
            this.p = p;
            this.colors = new Map();
            this.colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY, p.color(64, 64, 64));
            this.colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].DREG, p.color(255, 32, 32));
            this.colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES, p.color(32, 255, 64));
            this.colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].WALL, p.color(32, 32, 255));
            this.colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON, p.color(32, 255, 255));
            this.colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].FORK_BOMB, p.color(170, 32, 32));
            this.colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].ANTI_FORK_BOMB, p.color(127, 127, 32));
            this.colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].SENTRY, p.color(127, 127, 255));
            this.p.preload = () => { };
            this.p.setup = () => {
                this.p.createCanvas(700, 700);
            };
            this.p.draw = () => {
                this.p.background(50);
                this.drawGrid(this.g);
                this.run();
            };
            this.p.mouseDragged = this.handleClick;
            this.p.mouseClicked = this.handleClick;
        },
        run() {
            let ew;
            for (var i = 0; i < this.timeSpeed; i++) {
                ew = _mfm_utils_utils__WEBPACK_IMPORTED_MODULE_2__["MFMUtils"].GenerateEventWindow(this.g, this.g.width, this.g.height);
                ew.origin.atom.exec(ew);
            }
        },
        drawGrid(t) {
            //this.p.push();
            //this.p.translate(this.gridOffset, this.gridOffset);
            let sitesArray = Array.from(t.sites.values());
            let siteLen = sitesArray.length;
            let site;
            for (let i = 0; i < siteLen; i++) {
                site = sitesArray[i];
                this.p.noStroke();
                this.p.fill(this.colors.get(site.atom.type));
                this.p.ellipse(site.tilePos.col * this.siteSize + this.gridOffset, site.tilePos.row * this.siteSize + this.gridOffset, this.siteSize, this.siteSize);
            }
        },
        getSiteFromCanvasXY(x, y) {
            x = x - this.gridOffset + this.siteSize * 0.5;
            y = y - this.gridOffset + this.siteSize * 0.5;
            x = (x / this.siteSize) >> 0;
            y = (y / this.siteSize) >> 0;
            return this.g.getSiteByCoord({ row: y, col: x });
        },
        handleClick() {
            let site = this.getSiteFromCanvasXY(this.p.mouseX, this.p.mouseY);
            if (site) {
                if (this.p.keyIsPressed) {
                    switch (this.p.keyCode) {
                        case 114: //r
                            site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES);
                            break;
                        case 119: //w
                            site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].WALL);
                            break;
                        case 90: //Z
                            site.atom = new _mfm_classes_Atom__WEBPACK_IMPORTED_MODULE_3__["Atom"](_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].MASON, [_mfm_classes_elements_MasonElement__WEBPACK_IMPORTED_MODULE_4__["MasonElement"].boxPath(24)]);
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
        }
    }
});
let sketchP = new p5(app.sketch, document.querySelector("#mfm"));


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
        //if the origin is EMPTY Element, let's save some cycles (good, bad?) - bad if you want empty's age.
        if (this.origin.atom.type === _ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY)
            return;
        this.window.set(this.origin.id, this.origin);
        //use event window template offsets to build the rest of the event window
        EventWindow.WINDOW_ORDER_OFFSETS.forEach((offset) => {
            let tileCoord = this.OffsetFromOrigin(origin, offset.row, offset.col);
            let site = tile.getSiteByCoord(tileCoord);
            if (!site) {
                return false;
            }
            this.window.set(site.id, site);
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
        this.pRES_CREATE = 1000;
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
            //no res nearby, maybe we should make one.
        }
        else if (Math.random() * this.pRES_CREATE < 1) {
            let nearEmpty = ew.getNearest(_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY);
            if (nearEmpty) {
                ew.origin.mutateSite(nearEmpty, new _Atom__WEBPACK_IMPORTED_MODULE_2__["Atom"](_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].RES));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9BdG9tLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtZW50VHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL0V2ZW50d2luZG93LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9TaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9UaWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9BbnRpRm9ya0JvbWJFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9EUmVnRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvRW1wdHlFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9Gb3JrQm9tYkVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL2VsZW1lbnRzL01hc29uRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvUmVzRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvU2VudHJ5RWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvV2FsbEVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS91dGlscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxxREFBUTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssbUJBQW1CO0FBQ3hCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssa0JBQWtCO0FBQ3ZCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLHVCQUF1QjtBQUN2Qix3QkFBd0I7QUFDeEIsd0JBQXdCO0FBQ3hCLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLDRCQUE0Qjs7Ozs7Ozs7Ozs7OztBQ3JMNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwQztBQUNaO0FBQ2dCO0FBQ3ZDO0FBQ1A7QUFDQTtBQUNBLGtCQUFrQixxREFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQywwQ0FBSSxDQUFDLDBEQUFZO0FBQ25EO0FBQ0E7QUFDQSwrQkFBK0IsMENBQUksQ0FBQywwREFBWTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQywwQ0FBSSxDQUFDLDBEQUFZO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMENBQUk7QUFDNUI7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hEQTtBQUFBO0FBQUE7QUFBQTtBQUE4QjtBQUNZO0FBQ25DO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHFEQUFRO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEdBQUcsR0FBRyxHQUFHO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0I7QUFDdkM7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0Esa0NBQWtDLEVBQUUsR0FBRyxFQUFFLE9BQU8sMENBQUksRUFBRSxpQkFBaUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNnQjtBQUNoQjtBQUN4QixrQ0FBa0MsMENBQUk7QUFDN0M7QUFDQSxjQUFjLDBEQUFZLGFBQWEsMERBQVk7QUFDbkQseUJBQXlCO0FBQ3pCLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsMERBQVk7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsMENBQUksQ0FBQywwREFBWTtBQUMxRCwrQkFBK0IsMERBQVk7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDBEQUFZO0FBQzNELG1EQUFtRCwwQ0FBSSxDQUFDLDBEQUFZO0FBQ3BFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDBEQUFZO0FBQzNEO0FBQ0EsdURBQXVELDBDQUFJLENBQUMsMERBQVksa0JBQWtCO0FBQzFGO0FBQ0E7QUFDQSx1REFBdUQsMENBQUksQ0FBQywwREFBWTtBQUN4RTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNnQjtBQUNoQjtBQUN4QiwwQkFBMEIsMENBQUk7QUFDckM7QUFDQSxjQUFjLDBEQUFZLFlBQVksMERBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLDBEQUFZO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCwwQ0FBSSxDQUFDLDBEQUFZO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCwwQ0FBSSxDQUFDLDBEQUFZO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywwREFBWTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL0NBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ2dCO0FBQ3hDLDJCQUEyQiwwQ0FBSTtBQUN0QztBQUNBLGNBQWMsMERBQVksYUFBYSwwREFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNnQjtBQUNoQjtBQUN4Qiw4QkFBOEIsMENBQUk7QUFDekM7QUFDQSxjQUFjLDBEQUFZLGFBQWEsMERBQVk7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsMENBQUksQ0FBQywwREFBWTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDZ0I7QUFDaEI7QUFDeEIsMkJBQTJCLDBDQUFJO0FBQ3RDO0FBQ0E7QUFDQSxjQUFjLDBEQUFZLGFBQWEsMERBQVk7QUFDbkQ7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELDBDQUFJLENBQUMsMERBQVk7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsMERBQVkscUNBQXFDLDBEQUFZO0FBQzFHLHlEQUF5RCwwQ0FBSSxDQUFDLDBEQUFZO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLDBEQUFZLHFDQUFxQywwREFBWTtBQUMxRyx5REFBeUQsMENBQUksQ0FBQywwREFBWTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQywwQ0FBSSxDQUFDLDBEQUFZO0FBQ2hFO0FBQ0E7QUFDQSwrQ0FBK0MsMENBQUksQ0FBQywwREFBWTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLE9BQU87QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsWUFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdCQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakxBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ2dCO0FBQ3hDLHlCQUF5QiwwQ0FBSTtBQUNwQztBQUNBLGNBQWMsMERBQVksV0FBVywwREFBWTtBQUNqRDtBQUNBO0FBQ0EscURBQXFELDBEQUFZO0FBQ2pFO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDZ0I7QUFDaEI7QUFDeEIsNEJBQTRCLDBDQUFJO0FBQ3ZDO0FBQ0EsY0FBYywwREFBWSxjQUFjLDBEQUFZO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwwREFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwwREFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywwREFBWTtBQUN0RDtBQUNBO0FBQ0EsbUNBQW1DLDBDQUFJLENBQUMsMERBQVk7QUFDcEQ7QUFDQTtBQUNBLDJDQUEyQywwREFBWTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsMENBQUksQ0FBQywwREFBWTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywwREFBWTtBQUN0RDtBQUNBLG9EQUFvRCwwQ0FBSSxDQUFDLDBEQUFZO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDBEQUFZO0FBQzlDLHdDQUF3QywwQ0FBSSxDQUFDLDBEQUFZO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCwwREFBWTtBQUNqRTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkRBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ2dCO0FBQ3hDLDBCQUEwQiwwQ0FBSTtBQUNyQztBQUNBLGNBQWMsMERBQVksWUFBWSwwREFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVEE7QUFBQTtBQUFBO0FBQXFEO0FBQzlDO0FBQ1A7QUFDQSxrQkFBa0IsTUFBTSxHQUFHLE1BQU07QUFDakM7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdFQUFXLFFBQVEsbUJBQW1CO0FBQ3pEO0FBQ0EiLCJmaWxlIjoibWZtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBUaWxlIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvVGlsZVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBNRk1VdGlscyB9IGZyb20gXCIuL21mbS91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuL21mbS9jbGFzc2VzL0F0b21cIjtcbmltcG9ydCB7IE1hc29uRWxlbWVudCB9IGZyb20gXCIuL21mbS9jbGFzc2VzL2VsZW1lbnRzL01hc29uRWxlbWVudFwiO1xubGV0IGFwcCA9IG5ldyBWdWUoe1xuICAgIGVsOiBcIiNhcHBcIixcbiAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aW1lU3BlZWQ6IDIzMDQsXG4gICAgICAgICAgICBncmlkT2Zmc2V0OiAyMCxcbiAgICAgICAgICAgIHNpdGVTaXplOiAxNCxcbiAgICAgICAgICAgIGNvbG9yczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc2tldGNoOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBnOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuZyA9IG5ldyBUaWxlKDQ4LCA0OCk7XG4gICAgICAgIHRoaXMuc2tldGNoID0gdGhpcy5pbml0TUZNO1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBpbml0TUZNKHApIHtcbiAgICAgICAgICAgIHRoaXMucCA9IHA7XG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuY29sb3JzLnNldChFbGVtZW50VHlwZXMuRU1QVFksIHAuY29sb3IoNjQsIDY0LCA2NCkpO1xuICAgICAgICAgICAgdGhpcy5jb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5EUkVHLCBwLmNvbG9yKDI1NSwgMzIsIDMyKSk7XG4gICAgICAgICAgICB0aGlzLmNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLlJFUywgcC5jb2xvcigzMiwgMjU1LCA2NCkpO1xuICAgICAgICAgICAgdGhpcy5jb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5XQUxMLCBwLmNvbG9yKDMyLCAzMiwgMjU1KSk7XG4gICAgICAgICAgICB0aGlzLmNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLk1BU09OLCBwLmNvbG9yKDMyLCAyNTUsIDI1NSkpO1xuICAgICAgICAgICAgdGhpcy5jb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIsIHAuY29sb3IoMTcwLCAzMiwgMzIpKTtcbiAgICAgICAgICAgIHRoaXMuY29sb3JzLnNldChFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIsIHAuY29sb3IoMTI3LCAxMjcsIDMyKSk7XG4gICAgICAgICAgICB0aGlzLmNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLlNFTlRSWSwgcC5jb2xvcigxMjcsIDEyNywgMjU1KSk7XG4gICAgICAgICAgICB0aGlzLnAucHJlbG9hZCA9ICgpID0+IHsgfTtcbiAgICAgICAgICAgIHRoaXMucC5zZXR1cCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnAuY3JlYXRlQ2FudmFzKDcwMCwgNzAwKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnAuZHJhdyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnAuYmFja2dyb3VuZCg1MCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3R3JpZCh0aGlzLmcpO1xuICAgICAgICAgICAgICAgIHRoaXMucnVuKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5wLm1vdXNlRHJhZ2dlZCA9IHRoaXMuaGFuZGxlQ2xpY2s7XG4gICAgICAgICAgICB0aGlzLnAubW91c2VDbGlja2VkID0gdGhpcy5oYW5kbGVDbGljaztcbiAgICAgICAgfSxcbiAgICAgICAgcnVuKCkge1xuICAgICAgICAgICAgbGV0IGV3O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRpbWVTcGVlZDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXcgPSBNRk1VdGlscy5HZW5lcmF0ZUV2ZW50V2luZG93KHRoaXMuZywgdGhpcy5nLndpZHRoLCB0aGlzLmcuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4uYXRvbS5leGVjKGV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZHJhd0dyaWQodCkge1xuICAgICAgICAgICAgLy90aGlzLnAucHVzaCgpO1xuICAgICAgICAgICAgLy90aGlzLnAudHJhbnNsYXRlKHRoaXMuZ3JpZE9mZnNldCwgdGhpcy5ncmlkT2Zmc2V0KTtcbiAgICAgICAgICAgIGxldCBzaXRlc0FycmF5ID0gQXJyYXkuZnJvbSh0LnNpdGVzLnZhbHVlcygpKTtcbiAgICAgICAgICAgIGxldCBzaXRlTGVuID0gc2l0ZXNBcnJheS5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgc2l0ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l0ZUxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2l0ZSA9IHNpdGVzQXJyYXlbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5wLm5vU3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wLmZpbGwodGhpcy5jb2xvcnMuZ2V0KHNpdGUuYXRvbS50eXBlKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wLmVsbGlwc2Uoc2l0ZS50aWxlUG9zLmNvbCAqIHRoaXMuc2l0ZVNpemUgKyB0aGlzLmdyaWRPZmZzZXQsIHNpdGUudGlsZVBvcy5yb3cgKiB0aGlzLnNpdGVTaXplICsgdGhpcy5ncmlkT2Zmc2V0LCB0aGlzLnNpdGVTaXplLCB0aGlzLnNpdGVTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2l0ZUZyb21DYW52YXNYWSh4LCB5KSB7XG4gICAgICAgICAgICB4ID0geCAtIHRoaXMuZ3JpZE9mZnNldCArIHRoaXMuc2l0ZVNpemUgKiAwLjU7XG4gICAgICAgICAgICB5ID0geSAtIHRoaXMuZ3JpZE9mZnNldCArIHRoaXMuc2l0ZVNpemUgKiAwLjU7XG4gICAgICAgICAgICB4ID0gKHggLyB0aGlzLnNpdGVTaXplKSA+PiAwO1xuICAgICAgICAgICAgeSA9ICh5IC8gdGhpcy5zaXRlU2l6ZSkgPj4gMDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmcuZ2V0U2l0ZUJ5Q29vcmQoeyByb3c6IHksIGNvbDogeCB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICAgICAgICBsZXQgc2l0ZSA9IHRoaXMuZ2V0U2l0ZUZyb21DYW52YXNYWSh0aGlzLnAubW91c2VYLCB0aGlzLnAubW91c2VZKTtcbiAgICAgICAgICAgIGlmIChzaXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucC5rZXlJc1ByZXNzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnAua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTQ6IC8vclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5SRVMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTk6IC8vd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5XQUxMKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTA6IC8vWlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTiwgW01hc29uRWxlbWVudC5ib3hQYXRoKDI0KV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjI6IC8velxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTiwgW01hc29uRWxlbWVudC5ib3hQYXRoKDEyKV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjA6IC8veFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTiwgW01hc29uRWxlbWVudC5saW5lUGF0aCg0OCwgXCJFXCIpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk5OiAvL2NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuTUFTT04sIFtNYXNvbkVsZW1lbnQubGluZVBhdGgoNDgsIFwiU1wiKV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDE6IC8vZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk4OiAvL2JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRk9SS19CT01CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTc6IC8vYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExNTogLy9zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLlNFTlRSWSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5EUkVHKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmxldCBza2V0Y2hQID0gbmV3IHA1KGFwcC5za2V0Y2gsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWZtXCIpKTtcbiIsImltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuL0VsZW1lbnRUeXBlc1wiO1xuZXhwb3J0IGNsYXNzIEF0b20ge1xuICAgIGNvbnN0cnVjdG9yKF90eXBlID0gRWxlbWVudFR5cGVzLkVNUFRZLCBwYXJhbXMpIHtcbiAgICAgICAgdGhpcy50eXBlID0gX3R5cGU7XG4gICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IG5ldyB0aGlzLnR5cGUuY2xhc3MoLi4ucGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IG5ldyB0aGlzLnR5cGUuY2xhc3MoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHRoaXMuZWxlbS5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoX25hbWUsIF90eXBlLCBfbW92ZWFiaWxpdHkgPSAxMDAsIF9kZXN0cm95YWJpbGl0eSA9IDEwMCkge1xuICAgICAgICB0aGlzLmFnZSA9IDA7XG4gICAgICAgIHRoaXMubmFtZSA9IF9uYW1lO1xuICAgICAgICB0aGlzLnR5cGUgPSBfdHlwZTtcbiAgICAgICAgdGhpcy5tb3ZlYWJpbGl0eSA9IF9tb3ZlYWJpbGl0eTtcbiAgICAgICAgdGhpcy5kZXN0cm95YWJpbGl0eSA9IF9kZXN0cm95YWJpbGl0eTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICB0aGlzLmFnZSsrO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVtcHR5RWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL0VtcHR5RWxlbWVudFwiO1xuaW1wb3J0IHsgRFJlZ0VsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9EUmVnRWxlbWVudFwiO1xuaW1wb3J0IHsgUmVzRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL1Jlc0VsZW1lbnRcIjtcbmltcG9ydCB7IFdhbGxFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvV2FsbEVsZW1lbnRcIjtcbmltcG9ydCB7IE1hc29uRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL01hc29uRWxlbWVudFwiO1xuaW1wb3J0IHsgRm9ya0JvbWJFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvRm9ya0JvbWJFbGVtZW50XCI7XG5pbXBvcnQgeyBBbnRpRm9ya0JvbWJFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvQW50aUZvcmtCb21iRWxlbWVudFwiO1xuaW1wb3J0IHsgU2VudHJ5RWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL1NlbnRyeUVsZW1lbnRcIjtcbmV4cG9ydCBjbGFzcyBFbGVtZW50VHlwZXMge1xuICAgIHN0YXRpYyByZWdpc3RlclR5cGUobmFtZSwgdHlwZSwgYykge1xuICAgICAgICB0aGlzLlRZUEVTX0FSUkFZLnB1c2goeyBuYW1lLCB0eXBlLCBjbGFzczogYyB9KTtcbiAgICB9XG59XG5FbGVtZW50VHlwZXMuRU1QVFkgPSB7IG5hbWU6IFwiRU1QVFlcIiwgdHlwZTogXCJFXCIsIGNsYXNzOiBFbXB0eUVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5EUkVHID0geyBuYW1lOiBcIkRSRUdcIiwgdHlwZTogXCJEXCIsIGNsYXNzOiBEUmVnRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLlJFUyA9IHsgbmFtZTogXCJSRVNcIiwgdHlwZTogXCJSXCIsIGNsYXNzOiBSZXNFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuV0FMTCA9IHsgbmFtZTogXCJXQUxMXCIsIHR5cGU6IFwiV1wiLCBjbGFzczogV2FsbEVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5NQVNPTiA9IHsgbmFtZTogXCJNQVNPTlwiLCB0eXBlOiBcIk1hXCIsIGNsYXNzOiBNYXNvbkVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5GT1JLX0JPTUIgPSB7IG5hbWU6IFwiRk9SSyBCT01CXCIsIHR5cGU6IFwiRmJcIiwgY2xhc3M6IEZvcmtCb21iRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CID0geyBuYW1lOiBcIkFOVEkgRk9SSyBCT01CXCIsIHR5cGU6IFwiQWZcIiwgY2xhc3M6IEFudGlGb3JrQm9tYkVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5TRU5UUlkgPSB7IG5hbWU6IFwiU0VOVFJZXCIsIHR5cGU6IFwiU2VcIiwgY2xhc3M6IFNlbnRyeUVsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5UWVBFU19BUlJBWSA9IFtcbiAgICBFbGVtZW50VHlwZXMuRU1QVFksXG4gICAgRWxlbWVudFR5cGVzLkRSRUcsXG4gICAgRWxlbWVudFR5cGVzLlJFUyxcbiAgICBFbGVtZW50VHlwZXMuV0FMTCxcbiAgICBFbGVtZW50VHlwZXMuTUFTT04sXG4gICAgRWxlbWVudFR5cGVzLkZPUktfQk9NQixcbiAgICBFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIsXG4gICAgRWxlbWVudFR5cGVzLlNFTlRSWVxuXTtcbiIsImltcG9ydCB7IE1GTVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9FbGVtZW50VHlwZXNcIjtcbi8vRXZlbnQgd2luZG93IGFzIGRlc2NyaWJiZWQgaGVyZTogaHR0cDovL3JvYnVzdC5jcy51bm0uZWR1L2xpYi9leGUvZmV0Y2gucGhwP3c9MzAwJnRvaz00YzhmNDkmbWVkaWE9ZGV2OmV2ZW50LXdpbmRvdy0xMC5wbmdcbi8vQ29sbGVjdGlvbiBvZiBzaXRlcyB3aGljaCBjb250YWluIGF0b21zLCBidWlsdCBmcm9tIGFuIG9yaWdpbiAoY2VudGVyKSBzaXRlXG5leHBvcnQgY2xhc3MgRXZlbnRXaW5kb3cge1xuICAgIGNvbnN0cnVjdG9yKF90aWxlLCBfb3JpZ2luKSB7XG4gICAgICAgIHRoaXMudGlsZSA9IF90aWxlO1xuICAgICAgICB0aGlzLm1ha2VXaW5kb3coX3RpbGUsIF9vcmlnaW4pO1xuICAgIH1cbiAgICBtYWtlV2luZG93KHRpbGUsIG9yaWdpbikge1xuICAgICAgICB0aGlzLndpbmRvdyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSB0aGlzLnRpbGUuZ2V0U2l0ZUJ5Q29vcmQob3JpZ2luKTtcbiAgICAgICAgLy9pZiB0aGUgb3JpZ2luIGlzIEVNUFRZIEVsZW1lbnQsIGxldCdzIHNhdmUgc29tZSBjeWNsZXMgKGdvb2QsIGJhZD8pIC0gYmFkIGlmIHlvdSB3YW50IGVtcHR5J3MgYWdlLlxuICAgICAgICBpZiAodGhpcy5vcmlnaW4uYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMud2luZG93LnNldCh0aGlzLm9yaWdpbi5pZCwgdGhpcy5vcmlnaW4pO1xuICAgICAgICAvL3VzZSBldmVudCB3aW5kb3cgdGVtcGxhdGUgb2Zmc2V0cyB0byBidWlsZCB0aGUgcmVzdCBvZiB0aGUgZXZlbnQgd2luZG93XG4gICAgICAgIEV2ZW50V2luZG93LldJTkRPV19PUkRFUl9PRkZTRVRTLmZvckVhY2goKG9mZnNldCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRpbGVDb29yZCA9IHRoaXMuT2Zmc2V0RnJvbU9yaWdpbihvcmlnaW4sIG9mZnNldC5yb3csIG9mZnNldC5jb2wpO1xuICAgICAgICAgICAgbGV0IHNpdGUgPSB0aWxlLmdldFNpdGVCeUNvb3JkKHRpbGVDb29yZCk7XG4gICAgICAgICAgICBpZiAoIXNpdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLndpbmRvdy5zZXQoc2l0ZS5pZCwgc2l0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPZmZzZXRGcm9tT3JpZ2luKG9yaWdpbiwgcm93T2Zmc2V0LCBjb2xPZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIHsgcm93OiBvcmlnaW4ucm93ICsgcm93T2Zmc2V0LCBjb2w6IG9yaWdpbi5jb2wgKyBjb2xPZmZzZXQgfTtcbiAgICB9XG4gICAgZ2V0QWxsKHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBsZXQgd2EgPSBBcnJheS5mcm9tKHRoaXMud2luZG93LnZhbHVlcygpKTtcbiAgICAgICAgaWYgKHNwZWNpZmljVHlwZSkge1xuICAgICAgICAgICAgd2EgPSB3YS5maWx0ZXIoc2l0ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNpdGUuYXRvbS50eXBlID09PSBzcGVjaWZpY1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdhO1xuICAgIH1cbiAgICBnZXRTaXRlQnlJbmRleChpbmRleCkge1xuICAgICAgICBsZXQgd2EgPSBBcnJheS5mcm9tKHRoaXMud2luZG93LnZhbHVlcygpKTtcbiAgICAgICAgaWYgKGluZGV4ID49IHdhLmxlbmd0aCB8fCBpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdhW2luZGV4XTtcbiAgICB9XG4gICAgZ2V0UmFuZG9tKHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaXRlRnJvbUNhbmRpZGF0ZXMoQXJyYXkuZnJvbSh0aGlzLndpbmRvdy52YWx1ZXMoKSksIHRydWUsIHNwZWNpZmljVHlwZSk7XG4gICAgfVxuICAgIC8vbW9zdCB1c2VmdWwgd2hlbiB1c2luZyBzcGVjaWZpY1R5cGVcbiAgICAvL3RyYXZlcnNlcyB0aGUgd2luZG93IHVudGlsIGl0IGNvbWVzIGFjcm9zcyB3aGF0IHlvdSdyZSBsb29raW5nIGZvclxuICAgIGdldE5lYXJlc3Qoc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpdGVGcm9tQ2FuZGlkYXRlcyhBcnJheS5mcm9tKHRoaXMud2luZG93LnZhbHVlcygpKSwgZmFsc2UsIHNwZWNpZmljVHlwZSk7XG4gICAgfVxuICAgIGdldEVhc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19FQVNUKTtcbiAgICB9XG4gICAgZ2V0V2VzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX1dFU1QpO1xuICAgIH1cbiAgICBnZXROb3J0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX05PUlRIKTtcbiAgICB9XG4gICAgZ2V0U291dGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdGlvbihFdmVudFdpbmRvdy5FV19TT1VUSCk7XG4gICAgfVxuICAgIGdldE5vcnRoV2VzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX05PUlRIV0VTVCk7XG4gICAgfVxuICAgIGdldFNvdXRoV2VzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX1NPVVRIV0VTVCk7XG4gICAgfVxuICAgIGdldE5vcnRoRWFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX05PUlRIRUFTVCk7XG4gICAgfVxuICAgIGdldFNvdXRoRWFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX1NPVVRIRUFTVCk7XG4gICAgfVxuICAgIGdldEFkamFjZW50NFdheShyYW5kb21pemUgPSB0cnVlLCBzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKFt0aGlzLmdldFdlc3QoKSwgdGhpcy5nZXROb3J0aCgpLCB0aGlzLmdldFNvdXRoKCksIHRoaXMuZ2V0RWFzdCgpXSwgcmFuZG9taXplLCBzcGVjaWZpY1R5cGUpO1xuICAgIH1cbiAgICBnZXRBZGphY2VudDhXYXkocmFuZG9taXplID0gdHJ1ZSwgc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpdGVGcm9tQ2FuZGlkYXRlcyhbXG4gICAgICAgICAgICB0aGlzLmdldFdlc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm9ydGgoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0U291dGgoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0RWFzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXROb3J0aFdlc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0U291dGhXZXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldE5vcnRoRWFzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRTb3V0aEVhc3QoKVxuICAgICAgICBdLCByYW5kb21pemUsIHNwZWNpZmljVHlwZSk7XG4gICAgfVxuICAgIC8vR2l2ZW4gYW4gYXJyYXkgb2YgY2FuZGlkYXRlIHNpdGVzIChzeW1tZXRyaWVzIGluIHRoZSBmdXR1cmUgSSBob3BlKSxcbiAgICAvL2dpdmUgbWUgYmFjayBvbmUsIHJhbmRvbSBieSBkZWZhdWx0LCBub3QgZmlsdGVyZWQgYnkgdHlwZSBieSBkZWZhdWx0XG4gICAgZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKGNhbmRpZGF0ZVNpdGVzLCByYW5kb21pemUgPSB0cnVlLCBzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2FuZGlkYXRlU2l0ZXMgPSBjYW5kaWRhdGVTaXRlcy5maWx0ZXIoc2l0ZSA9PiB7XG4gICAgICAgICAgICBpZiAoIXNpdGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFzcGVjaWZpY1R5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNwZWNpZmljVHlwZSAmJiBzaXRlLmF0b20udHlwZSA9PT0gc3BlY2lmaWNUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICAvL25vIHNpdGVzISB5aWtlcyEgcG9zc2libGUhPyEgcHJvYmFibHkgb25seSB3aGVuIHVzaW5nIHNwZWNpZmljVHlwZSBhbmQgbG9va2luZyBmb3IgYSByYXJlIGVsZW1lbnRcbiAgICAgICAgaWYgKGNhbmRpZGF0ZVNpdGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy9yZXR1cm4gcmFuZG9tXG4gICAgICAgIGlmIChyYW5kb21pemUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYW5kaWRhdGVTaXRlc1soTWF0aC5yYW5kb20oKSAqIGNhbmRpZGF0ZVNpdGVzLmxlbmd0aCkgPj4gMF07XG4gICAgICAgIH1cbiAgICAgICAgLy9yZXR1cm4gZmlyc3QgbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZVNpdGVzWzBdO1xuICAgIH1cbiAgICBnZXREaXJlY3Rpb24oZGlyZWN0aW9uKSB7XG4gICAgICAgIGxldCBzaXRlID0gdGhpcy50aWxlLnNpdGVzLmdldChNRk1VdGlscy5DdG9JRCh0aGlzLk9mZnNldEZyb21PcmlnaW4odGhpcy5vcmlnaW4udGlsZVBvcywgZGlyZWN0aW9uLnJvdywgZGlyZWN0aW9uLmNvbCkpKTtcbiAgICAgICAgaWYgKHNpdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzaXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuRXZlbnRXaW5kb3cuV0lORE9XX09SREVSX09GRlNFVFMgPSBbXG4gICAgeyBjb2w6IDAsIHJvdzogMCB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAwIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMCwgcm93OiAxIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogMCB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAxIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMSwgcm93OiAxIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IDAgfSxcbiAgICB7IGNvbDogMCwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAwLCByb3c6IDIgfSxcbiAgICB7IGNvbDogMiwgcm93OiAwIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogLTIgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogMiB9LFxuICAgIHsgY29sOiAxLCByb3c6IC0yIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogMiB9LFxuICAgIHsgY29sOiAyLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtMywgcm93OiAwIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogLTMgfSxcbiAgICB7IGNvbDogMCwgcm93OiAzIH0sXG4gICAgeyBjb2w6IDMsIHJvdzogMCB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAtMiB9LFxuICAgIHsgY29sOiAtMiwgcm93OiAyIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogLTIgfSxcbiAgICB7IGNvbDogMiwgcm93OiAyIH0sXG4gICAgeyBjb2w6IC0zLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IC0zLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogLTMgfSxcbiAgICB7IGNvbDogLTEsIHJvdzogMyB9LFxuICAgIHsgY29sOiAxLCByb3c6IC0zIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogMyB9LFxuICAgIHsgY29sOiAzLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDMsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtNCwgcm93OiAwIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogLTQgfSxcbiAgICB7IGNvbDogMCwgcm93OiA0IH0sXG4gICAgeyBjb2w6IDQsIHJvdzogMCB9XG5dO1xuLy9iZWNhdXNlLCBsYXp5XG5FdmVudFdpbmRvdy5FV19XRVNUID0geyBjb2w6IC0xLCByb3c6IDAgfTtcbkV2ZW50V2luZG93LkVXX0VBU1QgPSB7IGNvbDogMSwgcm93OiAwIH07XG5FdmVudFdpbmRvdy5FV19OT1JUSCA9IHsgY29sOiAwLCByb3c6IC0xIH07XG5FdmVudFdpbmRvdy5FV19TT1VUSCA9IHsgY29sOiAwLCByb3c6IDEgfTtcbkV2ZW50V2luZG93LkVXX05PUlRIV0VTVCA9IHsgY29sOiAtMSwgcm93OiAtMSB9O1xuRXZlbnRXaW5kb3cuRVdfU09VVEhXRVNUID0geyBjb2w6IC0xLCByb3c6IDEgfTtcbkV2ZW50V2luZG93LkVXX05PUlRIRUFTVCA9IHsgY29sOiAxLCByb3c6IC0xIH07XG5FdmVudFdpbmRvdy5FV19TT1VUSEVBU1QgPSB7IGNvbDogMSwgcm93OiAxIH07XG4iLCJpbXBvcnQgeyBNRk1VdGlscyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuL0F0b21cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuL0VsZW1lbnRUeXBlc1wiO1xuZXhwb3J0IGNsYXNzIFNpdGUge1xuICAgIGNvbnN0cnVjdG9yKF9wb3MpIHtcbiAgICAgICAgdGhpcy50aWxlUG9zID0gX3BvcztcbiAgICAgICAgdGhpcy5pZCA9IE1GTVV0aWxzLkN0b0lEKHRoaXMudGlsZVBvcyk7XG4gICAgICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgfVxuICAgIC8vaWYgdGFyZ2V0U2l0ZSBpcyBraWxsYWJsZVxuICAgIC8va2lsbCBpdHMgYXRvbSAocmVwbGFjZSB3aXRoIGVtcHR5KVxuICAgIGtpbGxBdG9tKHRhcmdldFNpdGUpIHtcbiAgICAgICAgbGV0IGtpbGwgPSBNYXRoLnJhbmRvbSgpICogMTAwIDwgdGFyZ2V0U2l0ZS5hdG9tLmVsZW0uZGVzdHJveWFiaWxpdHk7XG4gICAgICAgIGlmIChraWxsKSB7XG4gICAgICAgICAgICB0YXJnZXRTaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGtpbGxTZWxmKGxlYXZpbmdBdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKSkge1xuICAgICAgICB0aGlzLmF0b20gPSBsZWF2aW5nQXRvbTtcbiAgICB9XG4gICAgLy9pZiB0YXJnZXQgc2l0ZSBpcyBraWxsYWJsZVxuICAgIC8vbW92ZSB0aGlzIGF0b20gdG8gdGFyZ2V0U2l0ZSwgYW5kIGxlYXZlIGJlaGluZCBsZWF2aW5nQXRvbSwgd2hpY2ggYnkgZGVmYXVsdCBpcyBlbXB0eVxuICAgIG1vdmVBdG9tKHRhcmdldFNpdGUsIGxlYXZpbmdBdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKSkge1xuICAgICAgICBpZiAodGFyZ2V0U2l0ZSAmJiB0YXJnZXRTaXRlLmNhbkRlc3Ryb3koKSkge1xuICAgICAgICAgICAgW3RoaXMuYXRvbSwgdGFyZ2V0U2l0ZS5hdG9tXSA9IFtsZWF2aW5nQXRvbSwgdGhpcy5hdG9tXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2lmIHRhcmdldFNpdGUgaXMgbW92ZWFibGVcbiAgICAvL3N3YXAgYXRvbXMgd2l0aCB0aGlzIG9uZVxuICAgIHN3YXBBdG9tcyh0YXJnZXRTaXRlKSB7XG4gICAgICAgIGlmICh0YXJnZXRTaXRlICYmIHRhcmdldFNpdGUuY2FuTW92ZSgpKSB7XG4gICAgICAgICAgICBbdGhpcy5hdG9tLCB0YXJnZXRTaXRlLmF0b21dID0gW3RhcmdldFNpdGUuYXRvbSwgdGhpcy5hdG9tXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtdXRhdGVTaXRlKHRhcmdldFNpdGUsIG5ld0F0b20pIHtcbiAgICAgICAgaWYgKHRhcmdldFNpdGUgJiYgdGFyZ2V0U2l0ZS5jYW5EZXN0cm95KCkpIHtcbiAgICAgICAgICAgIHRhcmdldFNpdGUuYXRvbSA9IG5ld0F0b207XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FuRGVzdHJveSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAxMDAgPCB0aGlzLmF0b20uZWxlbS5kZXN0cm95YWJpbGl0eTtcbiAgICB9XG4gICAgY2FuTW92ZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAxMDAgPCB0aGlzLmF0b20uZWxlbS5tb3ZlYWJpbGl0eTtcbiAgICB9XG4gICAgY3JlYXRlKCkge1xuICAgICAgICB0aGlzLmF0b20gPSBuZXcgQXRvbSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFNpdGUgfSBmcm9tIFwiLi9TaXRlXCI7XG5pbXBvcnQgeyBNRk1VdGlscyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuZXhwb3J0IGNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKF93aWR0aCA9IDEsIF9oZWlnaHQgPSAxKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSBfd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gX2hlaWdodDtcbiAgICAgICAgdGhpcy5jcmVhdGUoKTtcbiAgICB9XG4gICAgZ2V0U2l0ZUJ5Q29vcmQoYykge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXRlcy5nZXQoTUZNVXRpbHMuQ3RvSUQoYykpO1xuICAgIH1cbiAgICBnZXRSYW5kb21TaXRlKCkge1xuICAgICAgICBsZXQgcnIgPSAoTWF0aC5yYW5kb20oKSAqIHRoaXMuaGVpZ2h0KSA+PiAwO1xuICAgICAgICBsZXQgcmMgPSAoTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGgpID4+IDA7XG4gICAgICAgIHJldHVybiB0aGlzLnNpdGVzLmdldChgJHtycn06JHtyY31gKTtcbiAgICB9XG4gICAgY3JlYXRlKCkge1xuICAgICAgICB0aGlzLnNpdGVzID0gbmV3IE1hcCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2lkdGg7IGkrKykge1xuICAgICAgICAgICAgLy9hY3Jvc3MgY29sdW1uc1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmhlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgLy9kb3duIHJvd3NcbiAgICAgICAgICAgICAgICB0aGlzLnNpdGVzLnNldChgJHtqfToke2l9YCwgbmV3IFNpdGUoeyByb3c6IGosIGNvbDogaSB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi4vQXRvbVwiO1xuZXhwb3J0IGNsYXNzIEFudGlGb3JrQm9tYkVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcihfYmlydGhlZEluZGV4ID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5FTVBUWS5uYW1lLCBFbGVtZW50VHlwZXMuRU1QVFkudHlwZSk7XG4gICAgICAgIHRoaXMucERJRSA9IDEuMzM7IC8vfjc1JSBjaGFuY2UgdG8gZGllXG4gICAgICAgIHRoaXMucEVYUExPREUgPSA1OyAvLzIwJSBjaGFuY2UgdG8gZXhwbG9kZVxuICAgICAgICB0aGlzLmJpcnRoZWRJbmRleCA9IF9iaXJ0aGVkSW5kZXg7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgbGV0IGZiID0gZXcuZ2V0TmVhcmVzdChFbGVtZW50VHlwZXMuRk9SS19CT01CKTtcbiAgICAgICAgLy9yYW5kb21seSBkaWUgaWYgbm8gZm9yayBib21icyBhcm91bmRcbiAgICAgICAgaWYgKCFmYiAmJiBNYXRoLnJhbmRvbSgpICogdGhpcy5wRElFIDwgMSkge1xuICAgICAgICAgICAgZXcub3JpZ2luLmtpbGxTZWxmKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy93aGlsZSB0aGVyZSBhcmUgZm9ya2JvbWJzIHByZXNlbnQsIGRlc3Ryb3kgdGhlbSFcbiAgICAgICAgd2hpbGUgKGZiKSB7XG4gICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShmYiwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkVNUFRZKSk7XG4gICAgICAgICAgICBmYiA9IGV3LmdldE5lYXJlc3QoRWxlbWVudFR5cGVzLkZPUktfQk9NQik7XG4gICAgICAgIH1cbiAgICAgICAgLy9SRUQgQUxFUlQhIE1ha2UgbmV3IGFudGkgZm9yayBib21icyBpbiBhbGwgRU1QVFkgZGlyZWN0aW9uc1xuICAgICAgICBpZiAoIXRoaXMuYmlydGhlZEluZGV4KSB7XG4gICAgICAgICAgICAvL3RoaXMgaXMgdGhlIGZpcnN0XG4gICAgICAgICAgICBbLi4uQXJyYXkoNDApLmtleXMoKV0uZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNpdGUgPSBldy5nZXRTaXRlQnlJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKHNpdGUgJiYgc2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShzaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIsIFtpbmRleF0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vdGhpcyBpcyBhIGNoaWxkLCBqdXN0IGNvbnRpbnVlIHRoYXQgd2F5XG4gICAgICAgICAgICBbZXcuZ2V0U2l0ZUJ5SW5kZXgodGhpcy5iaXJ0aGVkSW5kZXgpXS5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzaXRlICYmIHNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgKiB0aGlzLnBFWFBMT0RFIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoc2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CKSk7IC8vZXhwbG9kZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoc2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLCBbdGhpcy5iaXJ0aGVkSW5kZXhdKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBldy5vcmlnaW4ua2lsbFNlbGYoKTtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBEUmVnRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRFJFRy5uYW1lLCBFbGVtZW50VHlwZXMuRFJFRy50eXBlKTtcbiAgICAgICAgdGhpcy5wRFJFR19DUkVBVEUgPSAxMDAwO1xuICAgICAgICB0aGlzLnBSRVNfQ1JFQVRFID0gMzAwO1xuICAgICAgICB0aGlzLnBEUkVHX0RFU1RST1kgPSAxMDtcbiAgICAgICAgdGhpcy5wQU5ZX0RFU1RST1kgPSAxMDA7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgLy9nZXQgYSByYW5kb20gTkVTVyBzaXRlXG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZVNpdGUgPSBldy5nZXRBZGphY2VudDRXYXkoKTtcbiAgICAgICAgLy9DUkVBVElPTlxuICAgICAgICBpZiAoYXZhaWxhYmxlU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgY29uc3QgY3JlYXRlRFJlZyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBEUkVHX0NSRUFURSA8IDE7XG4gICAgICAgICAgICBjb25zdCBjcmVhdGVSZXMgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5wUkVTX0NSRUFURSA8IDE7XG4gICAgICAgICAgICBpZiAoY3JlYXRlRFJlZykge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuRFJFRykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRFJFRyBDUkVBVEVEXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3JlYXRlUmVzKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5SRVMpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFUyBDUkVBVEVEXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLnN3YXBBdG9tcyhhdmFpbGFibGVTaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdmFpbGFibGVTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkRSRUcpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc3Ryb3lEUmVnID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucERSRUdfREVTVFJPWSA8IDE7XG4gICAgICAgICAgICBpZiAoZGVzdHJveURSZWcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRSRUcgREVTVFJPWUVEXCIpO1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tb3ZlQXRvbShhdmFpbGFibGVTaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vaXQncyBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgICAgY29uc3QgZGVzdHJveUFueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBBTllfREVTVFJPWSA8IDE7XG4gICAgICAgICAgICBpZiAoZGVzdHJveUFueSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGF2YWlsYWJsZVNpdGUuYXRvbS50eXBlLm5hbWUgKyBcIiBERVNUUk9ZRURcIik7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuZXhwb3J0IGNsYXNzIEVtcHR5RWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuRU1QVFkubmFtZSwgRWxlbWVudFR5cGVzLkVNUFRZLnR5cGUpO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgRm9ya0JvbWJFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5FTVBUWS5uYW1lLCBFbGVtZW50VHlwZXMuRU1QVFkudHlwZSk7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgbGV0IG5leHRWaWN0aW0gPSBldy5nZXRBZGphY2VudDhXYXkoKTtcbiAgICAgICAgaWYgKG5leHRWaWN0aW0pIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKG5leHRWaWN0aW0sIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi4vQXRvbVwiO1xuZXhwb3J0IGNsYXNzIE1hc29uRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIC8vaXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgcGF0aCBsb29wcyBvbiBpdHNlbGYsIGV2ZW4gaWYgaXQganVzdCBtZWFucyByZXZlcnNpbmcgYmFjayB0byB0aGUgYmVnaW5uaW5nXG4gICAgY29uc3RydWN0b3IoX3BhdGggPSB1bmRlZmluZWQsIF9jdXJJbmRleCA9IDApIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLk1BU09OLm5hbWUsIEVsZW1lbnRUeXBlcy5NQVNPTi50eXBlLCAxMDAsIDEwMCk7XG4gICAgICAgIHRoaXMucGF0aCA9IFtdO1xuICAgICAgICB0aGlzLmN1ckluZGV4ID0gMDsgLy91c2VkIHRvIHRyYXZlcnNlIGluZGV4LCBidXQgbm93IHRoaXMgaXMgc29ydCBvZiBsaWtlIHRoZSBtYXNvbidzIElEIGluIHRoZSBwYXRoLCBpdCBkb2Vzbid0IGNoYW5nZSBmb3IgdGhlIGluZGl2aWR1YWwsIGJ1dCBpcyBrZXB0IHVwICgrMSwtMSkgYnkgbmVpZ2hib3IgbWFzb25zXG4gICAgICAgIGlmICghX3BhdGgpIHtcbiAgICAgICAgICAgIF9wYXRoID0gTWFzb25FbGVtZW50LmJveFBhdGgoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBhdGgoX3BhdGgpO1xuICAgICAgICB0aGlzLmN1ckluZGV4ID0gX2N1ckluZGV4O1xuICAgIH1cbiAgICBzZXRQYXRoKHBhdGgpIHtcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aC5zcGxpdChcIlwiKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBpZiAodGhpcy5jdXJJbmRleCA+PSB0aGlzLnBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmN1ckluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmN1ckluZGV4IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5jdXJJbmRleCA9IHRoaXMucGF0aC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0ZGlyID0gdGhpcy5jdXJJbmRleCA9PT0gMCA/IHRoaXMucGF0aFt0aGlzLnBhdGgubGVuZ3RoIC0gMV0gOiB0aGlzLnBhdGhbdGhpcy5jdXJJbmRleCAtIDFdO1xuICAgICAgICBsZXQgcmV2ZXJzZURpciA9IE1hc29uRWxlbWVudC5nZXRPcHBvc2l0ZURpcihsYXN0ZGlyKTtcbiAgICAgICAgbGV0IGRpciA9IHRoaXMucGF0aFt0aGlzLmN1ckluZGV4XTtcbiAgICAgICAgbGV0IGJsdWVwcmludHMgPSB7XG4gICAgICAgICAgICBFOiB7XG4gICAgICAgICAgICAgICAgbW92ZVNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRFYXN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvdXRlckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFNvdXRoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbm5lckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldE5vcnRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIE46IHtcbiAgICAgICAgICAgICAgICBtb3ZlU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldE5vcnRoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvdXRlckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldEVhc3QoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlubmVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0V2VzdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBTOiB7XG4gICAgICAgICAgICAgICAgbW92ZVNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRTb3V0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRXZXN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbm5lckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldEVhc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgVzoge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0V2VzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0ZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXROb3J0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRTb3V0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgbW92ZVNpdGUgPSBibHVlcHJpbnRzW2Rpcl0ubW92ZVNpdGUoKTtcbiAgICAgICAgY29uc3QgbGFzdFNpdGUgPSBibHVlcHJpbnRzW3JldmVyc2VEaXJdLm1vdmVTaXRlKCk7XG4gICAgICAgIGNvbnN0IG91dGVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tkaXJdLm91dGVyQnVpbGRTaXRlKCk7XG4gICAgICAgIGNvbnN0IGlubmVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tkaXJdLmlubmVyQnVpbGRTaXRlKCk7XG4gICAgICAgIC8vZm9yIGNoYW5naW5nIGRpcmVjdGlvbnNcbiAgICAgICAgaWYgKGxhc3RkaXIgIT09IGRpcikge1xuICAgICAgICAgICAgY29uc3QgbGFzdE91dGVyQnVpbGRTaXRlID0gYmx1ZXByaW50c1tsYXN0ZGlyXS5vdXRlckJ1aWxkU2l0ZSgpO1xuICAgICAgICAgICAgaWYgKGxhc3RPdXRlckJ1aWxkU2l0ZSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKGxhc3RPdXRlckJ1aWxkU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL2J1aWxkIHRoZSBvdXRlciB3YWxsXG4gICAgICAgIGlmIChvdXRlckJ1aWxkU2l0ZSkge1xuICAgICAgICAgICAgaWYgKG91dGVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLlJFUyB8fCBvdXRlckJ1aWxkU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKG91dGVyQnVpbGRTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuV0FMTCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vYnVpbGQgdGhlIGlubmVyIHdhbGxcbiAgICAgICAgaWYgKGlubmVyQnVpbGRTaXRlKSB7XG4gICAgICAgICAgICBpZiAoaW5uZXJCdWlsZFNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuUkVTIHx8IGlubmVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUoaW5uZXJCdWlsZFNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5XQUxMKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9tb3ZlIHRvIG5leHQgc2l0ZSBhbmQgbGVhdmUgYW5vdGhlciBtYXNvbiB0byBoZWxwXG4gICAgICAgIGlmIChtb3ZlU2l0ZSkge1xuICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUobW92ZVNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTiwgW01hc29uRWxlbWVudC5wYXRoVG9TdHJpbmcodGhpcy5wYXRoKSwgdGhpcy5jdXJJbmRleCArIDFdKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTaXRlKSB7XG4gICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShsYXN0U2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLk1BU09OLCBbTWFzb25FbGVtZW50LnBhdGhUb1N0cmluZyh0aGlzLnBhdGgpLCB0aGlzLmN1ckluZGV4IC0gMV0pKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG4gICAgLy9TdGF0aWMgcGF0aCBoZWxwZXIgbWV0aG9kc1xuICAgIC8vQXQgc29tZSBwb2ludCBJIHRoaW5rIHRoaXMgc2hvdWxkIGJlIGJyb2tlbiBvdXQgaW50byBhIHV0aWxpdHkgY2xhc3NcbiAgICAvL01vcmUgZWxlbWVudHMgd2lsbCBwcm9iYWJseSBiZW5lZml0IGZyb20gaGF2aW5nIHRoZSBjb25jZXB0IG9mIGEgZGVmaW5lZCBwYXRoXG4gICAgLy9tYWtlIGEgcmFuZG9tIHdhbGwgcGF0aFxuICAgIHN0YXRpYyByYW5kb21QYXRoKCkge1xuICAgICAgICBsZXQgcGF0aCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IHIgPSAoTWF0aC5yYW5kb20oKSAqIDggKyA2KSA+PiAwO1xuICAgICAgICBjb25zdCBjaG9pY2VzID0gW1wiRVwiLCBcIk5cIiwgXCJTXCIsIFwiV1wiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGQgPSAoTWF0aC5yYW5kb20oKSAqIGNob2ljZXMubGVuZ3RoKSA+PiAwO1xuICAgICAgICAgICAgY29uc3QgbCA9IChNYXRoLnJhbmRvbSgpICogMyArIDMpID4+IDA7XG4gICAgICAgICAgICBjb25zdCBkaXIgPSBjaG9pY2VzW2RdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsOyBqKyspIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5jb25jYXQoZGlyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG4gICAgc3RhdGljIGxpbmVQYXRoKGxlbmd0aCA9IDQ4LCBkaXJlY3Rpb24gPSBcIkVcIikge1xuICAgICAgICBsZXQgcGF0aCA9IFwiXCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhdGggPSBwYXRoLmNvbmNhdChkaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIHBhdGggPSBwYXRoLmNvbmNhdCh0aGlzLnJldmVyc2VQYXRoKHBhdGgpKTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIC8vbWFrZSBhIGJveCBwYXRoXG4gICAgc3RhdGljIGJveFBhdGgoc2lkZUxlbmd0aCA9IDcpIHtcbiAgICAgICAgbGV0IHBhdGggPSBcIlwiO1xuICAgICAgICBjb25zdCBjaG9pY2VzID0gW1wiRVwiLCBcIk5cIiwgXCJXXCIsIFwiU1wiXTtcbiAgICAgICAgd2hpbGUgKGNob2ljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBkaXIgPSBjaG9pY2VzLnNoaWZ0KCk7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpZGVMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLmNvbmNhdChkaXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vcGF0aCA9IHBhdGguY29uY2F0KHRoaXMucmV2ZXJzZVBhdGgocGF0aCkpO1xuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG4gICAgLy9jb252ZXJ0IGEgc3RyaW5nW10gdG8gc3RyaW5nIChwYXRoIHNlcmlhbGl6YXRpb24pXG4gICAgc3RhdGljIHBhdGhUb1N0cmluZyhwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnJlZHVjZSgoYWNjLCBkaXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYWNjLmNvbmNhdChkaXIpO1xuICAgICAgICB9LCBcIlwiKTtcbiAgICB9XG4gICAgLy90YWtlIGEgcGF0aCB3aXRoIE4sUyxFLFcgYW5kIHJldmVyc2UgdGhlIGRpcmVjdGlvbnNcbiAgICBzdGF0aWMgcmV2ZXJzZVBhdGgocGF0aCkge1xuICAgICAgICBwYXRoID0gcGF0aFxuICAgICAgICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIGRpciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhY2MuY29uY2F0KGRpcik7XG4gICAgICAgIH0sIFwiXCIpO1xuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9OL2csIFwiVFwiKTtcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvUy9nLCBcIk5cIik7XG4gICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1QvZywgXCJTXCIpO1xuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9FL2csIFwiVFwiKTtcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvVy9nLCBcIkVcIik7XG4gICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL1QvZywgXCJXXCIpO1xuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG4gICAgLy9yZXZlcnNlIGEgZGlyZWN0aW9uXG4gICAgc3RhdGljIGdldE9wcG9zaXRlRGlyKGRpcikge1xuICAgICAgICBsZXQgbWFwID0ge1xuICAgICAgICAgICAgTjogXCJTXCIsXG4gICAgICAgICAgICBTOiBcIk5cIixcbiAgICAgICAgICAgIEU6IFwiV1wiLFxuICAgICAgICAgICAgVzogXCJFXCJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG1hcFtkaXJdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuZXhwb3J0IGNsYXNzIFJlc0VsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLlJFUy5uYW1lLCBFbGVtZW50VHlwZXMuUkVTLnR5cGUpO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIGV3Lm9yaWdpbi5zd2FwQXRvbXMoZXcuZ2V0QWRqYWNlbnQ0V2F5KHRydWUsIEVsZW1lbnRUeXBlcy5FTVBUWSkpO1xuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi4vQXRvbVwiO1xuZXhwb3J0IGNsYXNzIFNlbnRyeUVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLlNFTlRSWS5uYW1lLCBFbGVtZW50VHlwZXMuU0VOVFJZLnR5cGUpO1xuICAgICAgICB0aGlzLm9uSGlnaEFsZXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMucFNFTlRSWV9DUkVBVEUgPSAyMDtcbiAgICAgICAgdGhpcy5wUkVTX0NSRUFURSA9IDEwMDA7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgICAgIGxldCBmYiA9IGV3LmdldE5lYXJlc3QoRWxlbWVudFR5cGVzLkZPUktfQk9NQik7XG4gICAgICAgIC8vZm9yayBib21icyBhcmUgbmVhciEgSGlnaCBBbGVydCFcbiAgICAgICAgaWYgKGZiKSB7XG4gICAgICAgICAgICB0aGlzLm9uSGlnaEFsZXJ0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2UgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5TRU5UUlkpO1xuICAgICAgICAvL05lYXJieSBTbmV0cnkgaXMgb24gaGlnaCBhbGVydCEgV2Ugc2hvdWxkIGJlIHRvbyFcbiAgICAgICAgaWYgKHNlICYmIHNlLmF0b20uZWxlbS5vbkhpZ2hBbGVydCkge1xuICAgICAgICAgICAgdGhpcy5vbkhpZ2hBbGVydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRvdGFsTmVhcmJ5U2VudHJ5ID0gZXcuZ2V0QWxsKEVsZW1lbnRUeXBlcy5TRU5UUlkpLmxlbmd0aDtcbiAgICAgICAgLy9LaW5kYSBib3JpbmcgYW5kIGNyb3dkZWQgYXJvdW5kIGhlcmUsIHJlcXVlc3RpbmcgaG9ub3JhYmxlIGRpc2NoYXJnZSwgc2lyIVxuICAgICAgICBpZiAoIXRoaXMub25IaWdoQWxlcnQgJiYgdG90YWxOZWFyYnlTZW50cnkgPiAyKSB7XG4gICAgICAgICAgICBldy5vcmlnaW4ua2lsbFNlbGYobmV3IEF0b20oRWxlbWVudFR5cGVzLlJFUykpO1xuICAgICAgICB9XG4gICAgICAgIC8vUmVzIG5lYXJieT8gTWF5YmUgcmVjcnVpdCBzb21lb25lIGZvciB0aGUgY2F1c2VcbiAgICAgICAgdmFyIHJlcyA9IGV3LmdldEFkamFjZW50OFdheSh0cnVlLCBFbGVtZW50VHlwZXMuUkVTKTtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgLy9pZiBoaWdoIGFsZXJ0LCBkZWZpbml0ZWx5IHJlY3J1aXQsIG90aGVyd2lzZSwgbWF5YmVcbiAgICAgICAgICAgIGlmICh0aGlzLm9uSGlnaEFsZXJ0IHx8IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBTRU5UUllfQ1JFQVRFIDwgMSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKHJlcywgbmV3IEF0b20oRWxlbWVudFR5cGVzLlNFTlRSWSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9ubyByZXMgbmVhcmJ5LCBtYXliZSB3ZSBzaG91bGQgbWFrZSBvbmUuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoTWF0aC5yYW5kb20oKSAqIHRoaXMucFJFU19DUkVBVEUgPCAxKSB7XG4gICAgICAgICAgICBsZXQgbmVhckVtcHR5ID0gZXcuZ2V0TmVhcmVzdChFbGVtZW50VHlwZXMuRU1QVFkpO1xuICAgICAgICAgICAgaWYgKG5lYXJFbXB0eSkge1xuICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKG5lYXJFbXB0eSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLlJFUykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vRmlyZSEhIVxuICAgICAgICBpZiAodGhpcy5vbkhpZ2hBbGVydCkge1xuICAgICAgICAgICAgdmFyIGUgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5FTVBUWSk7XG4gICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIpKTtcbiAgICAgICAgICAgIHRoaXMub25IaWdoQWxlcnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvL3BhdHJvbFxuICAgICAgICBldy5vcmlnaW4uc3dhcEF0b21zKGV3LmdldEFkamFjZW50NFdheSh0cnVlLCBFbGVtZW50VHlwZXMuRU1QVFkpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmV4cG9ydCBjbGFzcyBXYWxsRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuV0FMTC5uYW1lLCBFbGVtZW50VHlwZXMuV0FMTC50eXBlLCAwLCAxMDApO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50V2luZG93IH0gZnJvbSBcIi4uL2NsYXNzZXMvRXZlbnR3aW5kb3dcIjtcbmV4cG9ydCBjbGFzcyBNRk1VdGlscyB7XG4gICAgc3RhdGljIEN0b0lEKGMpIHtcbiAgICAgICAgcmV0dXJuIGAke2Mucm93fToke2MuY29sfWA7XG4gICAgfVxuICAgIHN0YXRpYyBJRHRvQyhpZCkge1xuICAgICAgICBsZXQgcmNhID0gaWQuc3BsaXQoXCI6XCIpO1xuICAgICAgICByZXR1cm4geyByb3c6IHBhcnNlSW50KHJjYVswXSksIGNvbDogcGFyc2VJbnQocmNhWzFdKSB9O1xuICAgIH1cbiAgICBzdGF0aWMgR2VuZXJhdGVFdmVudFdpbmRvdyh0aWxlLCB3LCBoKSB7XG4gICAgICAgIGxldCByYyA9IChNYXRoLnJhbmRvbSgpICogdykgPj4gMDtcbiAgICAgICAgbGV0IHJyID0gKE1hdGgucmFuZG9tKCkgKiBoKSA+PiAwO1xuICAgICAgICByZXR1cm4gbmV3IEV2ZW50V2luZG93KHRpbGUsIHsgcm93OiByciwgY29sOiByYyB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9