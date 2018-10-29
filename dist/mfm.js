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
            timeSpeed: 1000,
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
            this.colors.set(_mfm_classes_ElementTypes__WEBPACK_IMPORTED_MODULE_1__["ElementTypes"].EMPTY, p.color(32, 32, 32, 127));
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
                this.p.background(100);
                this.drawGrid(this.g);
                this.run();
            };
            this.p.mouseDragged = this.handleClick;
            this.p.mouseClicked = this.handleClick;
        },
        run() {
            for (var i = 0; i < this.timeSpeed; i++) {
                let ew = _mfm_utils_utils__WEBPACK_IMPORTED_MODULE_2__["MFMUtils"].GenerateEventWindow(this.g, this.g.width, this.g.height);
                ew.origin.atom.exec(ew);
            }
        },
        drawGrid(t) {
            this.p.push();
            this.p.translate(this.gridOffset, this.gridOffset);
            t.sites.forEach((site) => {
                this.p.stroke(0, 0, 0, 0);
                this.p.fill(this.colors.get(site.atom.type));
                this.p.ellipse(site.tilePos.col * this.siteSize, site.tilePos.row * this.siteSize, this.siteSize, this.siteSize);
            });
            this.p.pop();
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
// let g: Tile = new Tile(48, 48);
// var sketch = (p: any) => {
//   let siteSize = 14;
//   let gridOffset = 20;
//   p.preload = () => {};
//   p.setup = () => {
//     p.createCanvas(700, 700);
//   };
//   //   p.windowResized = () => {
//   //     p.resizeCanvas(p.windowWidth - 50, p.windowHeight - 50);
//   //   };
//   //Establish the elment colors here
//   let colors: Map<IElementType, any> = new Map<IElementType, any>();
//   colors.set(ElementTypes.EMPTY, p.color(32, 32, 32, 127));
//   colors.set(ElementTypes.DREG, p.color(255, 32, 32));
//   colors.set(ElementTypes.RES, p.color(32, 255, 64));
//   colors.set(ElementTypes.WALL, p.color(32, 32, 255));
//   colors.set(ElementTypes.MASON, p.color(32, 255, 255));
//   colors.set(ElementTypes.FORK_BOMB, p.color(170, 32, 32));
//   colors.set(ElementTypes.ANTI_FORK_BOMB, p.color(127, 127, 32));
//   colors.set(ElementTypes.SENTRY, p.color(127, 127, 255));
//   let drawGrid = (p: any, t: Tile) => {
//     p.push();
//     p.translate(gridOffset, gridOffset);
//     t.sites.forEach((site: Site) => {
//       p.stroke(0, 0, 0, 0);
//       p.fill(colors.get(site.atom.type));
//       p.ellipse(site.tilePos.col * siteSize, site.tilePos.row * siteSize, siteSize, siteSize);
//     });
//     p.pop();
//   };
//   let run = () => {
//     let speed = 5000;
//     for (var i = 0; i < speed; i++) {
//       let ew = MFMUtils.GenerateEventWindow(g, g.width, g.height);
//       ew.origin.atom.exec(ew);
//     }
//   };
//   let getSiteFromCanvasXY = (x: number, y: number): Site => {
//     x = x - gridOffset + siteSize * 0.5;
//     y = y - gridOffset + siteSize * 0.5;
//     x = (x / siteSize) >> 0;
//     y = (y / siteSize) >> 0;
//     return g.getSiteByCoord({ row: y, col: x });
//   };
//   p.draw = () => {
//     p.background(100);
//     drawGrid(p, g);
//     run();
//   };
//   let handleClick = () => {
//     let site: Site = getSiteFromCanvasXY(p.mouseX, p.mouseY);
//     if (site) {
//       if (p.keyIsPressed) {
//         switch (p.keyCode) {
//           case 114: //r
//             site.atom = new Atom(ElementTypes.RES);
//             break;
//           case 119: //w
//             site.atom = new Atom(ElementTypes.WALL);
//             break;
//           case 90: //Z
//             site.atom = new Atom(ElementTypes.MASON, [MasonElement.boxPath(24)]);
//             break;
//           case 122: //z
//             site.atom = new Atom(ElementTypes.MASON, [MasonElement.boxPath(12)]);
//             break;
//           case 120: //x
//             site.atom = new Atom(ElementTypes.MASON, [MasonElement.linePath(48, "E")]);
//             break;
//           case 99: //c
//             site.atom = new Atom(ElementTypes.MASON, [MasonElement.linePath(48, "S")]);
//             break;
//           case 101: //e
//             site.atom = new Atom(ElementTypes.EMPTY);
//             break;
//           case 98: //b
//             site.atom = new Atom(ElementTypes.FORK_BOMB);
//             break;
//           case 97: //a
//             site.atom = new Atom(ElementTypes.ANTI_FORK_BOMB);
//             break;
//           case 115: //s
//             site.atom = new Atom(ElementTypes.SENTRY);
//             break;
//         }
//       } else {
//         site.atom = new Atom(ElementTypes.DREG);
//       }
//     }
//   };
//   p.mouseDragged = handleClick;
//   p.mouseClicked = handleClick;
// };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9BdG9tLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9FbGVtZW50VHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL0V2ZW50d2luZG93LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9TaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9UaWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9BbnRpRm9ya0JvbWJFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9EUmVnRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvRW1wdHlFbGVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tZm0vY2xhc3Nlcy9lbGVtZW50cy9Gb3JrQm9tYkVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS9jbGFzc2VzL2VsZW1lbnRzL01hc29uRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvUmVzRWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvU2VudHJ5RWxlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWZtL2NsYXNzZXMvZWxlbWVudHMvV2FsbEVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21mbS91dGlscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwQztBQUNnQjtBQUNiO0FBQ0g7QUFDeUI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscUJBQXFCLHNEQUFJO0FBQ3pCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNFQUFZO0FBQ3hDLDRCQUE0QixzRUFBWTtBQUN4Qyw0QkFBNEIsc0VBQVk7QUFDeEMsNEJBQTRCLHNFQUFZO0FBQ3hDLDRCQUE0QixzRUFBWTtBQUN4Qyw0QkFBNEIsc0VBQVk7QUFDeEMsNEJBQTRCLHNFQUFZO0FBQ3hDLDRCQUE0QixzRUFBWTtBQUN4QyxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwyQkFBMkIsb0JBQW9CO0FBQy9DLHlCQUF5Qix5REFBUTtBQUNqQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsaUJBQWlCO0FBQzNELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsc0RBQUksQ0FBQyxzRUFBWTtBQUM3RDtBQUNBO0FBQ0EsNENBQTRDLHNEQUFJLENBQUMsc0VBQVk7QUFDN0Q7QUFDQTtBQUNBLDRDQUE0QyxzREFBSSxDQUFDLHNFQUFZLFNBQVMsK0VBQVk7QUFDbEY7QUFDQTtBQUNBLDRDQUE0QyxzREFBSSxDQUFDLHNFQUFZLFNBQVMsK0VBQVk7QUFDbEY7QUFDQTtBQUNBLDRDQUE0QyxzREFBSSxDQUFDLHNFQUFZLFNBQVMsK0VBQVk7QUFDbEY7QUFDQTtBQUNBLDRDQUE0QyxzREFBSSxDQUFDLHNFQUFZLFNBQVMsK0VBQVk7QUFDbEY7QUFDQTtBQUNBLDRDQUE0QyxzREFBSSxDQUFDLHNFQUFZO0FBQzdEO0FBQ0E7QUFDQSw0Q0FBNEMsc0RBQUksQ0FBQyxzRUFBWTtBQUM3RDtBQUNBO0FBQ0EsNENBQTRDLHNEQUFJLENBQUMsc0VBQVk7QUFDN0Q7QUFDQTtBQUNBLDRDQUE0QyxzREFBSSxDQUFDLHNFQUFZO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHNEQUFJLENBQUMsc0VBQVk7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsV0FBVztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsaUJBQWlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL01BO0FBQUE7QUFBQTtBQUE4QztBQUN2QztBQUNQLHdCQUF3QiwwREFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDWEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBdUQ7QUFDRjtBQUNGO0FBQ0U7QUFDRTtBQUNNO0FBQ1E7QUFDWjtBQUNsRDtBQUNQO0FBQ0EsK0JBQStCLHVCQUF1QjtBQUN0RDtBQUNBO0FBQ0Esc0JBQXNCLGtDQUFrQyxtRUFBWTtBQUNwRSxxQkFBcUIsaUNBQWlDLGlFQUFXO0FBQ2pFLG9CQUFvQixnQ0FBZ0MsK0RBQVU7QUFDOUQscUJBQXFCLGlDQUFpQyxpRUFBVztBQUNqRSxzQkFBc0IsbUNBQW1DLG1FQUFZO0FBQ3JFLDBCQUEwQix1Q0FBdUMseUVBQWU7QUFDaEYsK0JBQStCLDRDQUE0QyxpRkFBbUI7QUFDOUYsdUJBQXVCLG9DQUFvQyxxRUFBYTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUFBO0FBQUE7QUFBQTtBQUEwQztBQUNJO0FBQzlDO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsMERBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHFEQUFRO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxtQkFBbUI7QUFDeEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxrQkFBa0I7QUFDdkIsS0FBSyxpQkFBaUI7QUFDdEIsS0FBSztBQUNMO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsNEJBQTRCOzs7Ozs7Ozs7Ozs7O0FDckw1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTBDO0FBQ1o7QUFDZ0I7QUFDdkM7QUFDUDtBQUNBO0FBQ0Esa0JBQWtCLHFEQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDBDQUFJLENBQUMsMERBQVk7QUFDbkQ7QUFDQTtBQUNBLCtCQUErQiwwQ0FBSSxDQUFDLDBEQUFZO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDBDQUFJLENBQUMsMERBQVk7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwwQ0FBSTtBQUM1QjtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaERBO0FBQUE7QUFBQTtBQUFBO0FBQThCO0FBQ1k7QUFDbkM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIscURBQVE7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsR0FBRyxHQUFHLEdBQUc7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGdCQUFnQjtBQUN2QztBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQSxrQ0FBa0MsRUFBRSxHQUFHLEVBQUUsT0FBTywwQ0FBSSxFQUFFLGlCQUFpQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ2dCO0FBQ2hCO0FBQ3hCLGtDQUFrQywwQ0FBSTtBQUM3QztBQUNBLGNBQWMsMERBQVksYUFBYSwwREFBWTtBQUNuRCx5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwwREFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QywwQ0FBSSxDQUFDLDBEQUFZO0FBQzFELCtCQUErQiwwREFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMERBQVk7QUFDM0QsbURBQW1ELDBDQUFJLENBQUMsMERBQVk7QUFDcEU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMERBQVk7QUFDM0Q7QUFDQSx1REFBdUQsMENBQUksQ0FBQywwREFBWSxrQkFBa0I7QUFDMUY7QUFDQTtBQUNBLHVEQUF1RCwwQ0FBSSxDQUFDLDBEQUFZO0FBQ3hFO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ2dCO0FBQ2hCO0FBQ3hCLDBCQUEwQiwwQ0FBSTtBQUNyQztBQUNBLGNBQWMsMERBQVksWUFBWSwwREFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMERBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELDBDQUFJLENBQUMsMERBQVk7QUFDdkU7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELDBDQUFJLENBQUMsMERBQVk7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLDBEQUFZO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvQ0E7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDZ0I7QUFDeEMsMkJBQTJCLDBDQUFJO0FBQ3RDO0FBQ0EsY0FBYywwREFBWSxhQUFhLDBEQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ2dCO0FBQ2hCO0FBQ3hCLDhCQUE4QiwwQ0FBSTtBQUN6QztBQUNBLGNBQWMsMERBQVksYUFBYSwwREFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCwwQ0FBSSxDQUFDLDBEQUFZO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDZEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNnQjtBQUNoQjtBQUN4QiwyQkFBMkIsMENBQUk7QUFDdEM7QUFDQTtBQUNBLGNBQWMsMERBQVksYUFBYSwwREFBWTtBQUNuRDtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsMENBQUksQ0FBQywwREFBWTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywwREFBWSxxQ0FBcUMsMERBQVk7QUFDMUcseURBQXlELDBDQUFJLENBQUMsMERBQVk7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsMERBQVkscUNBQXFDLDBEQUFZO0FBQzFHLHlEQUF5RCwwQ0FBSSxDQUFDLDBEQUFZO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDBDQUFJLENBQUMsMERBQVk7QUFDaEU7QUFDQTtBQUNBLCtDQUErQywwQ0FBSSxDQUFDLDBEQUFZO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqTEE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDZ0I7QUFDeEMseUJBQXlCLDBDQUFJO0FBQ3BDO0FBQ0EsY0FBYywwREFBWSxXQUFXLDBEQUFZO0FBQ2pEO0FBQ0E7QUFDQSxxREFBcUQsMERBQVk7QUFDakU7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNnQjtBQUNoQjtBQUN4Qiw0QkFBNEIsMENBQUk7QUFDdkM7QUFDQSxjQUFjLDBEQUFZLGNBQWMsMERBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDBEQUFZO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDBEQUFZO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDBEQUFZO0FBQ3REO0FBQ0E7QUFDQSxtQ0FBbUMsMENBQUksQ0FBQywwREFBWTtBQUNwRDtBQUNBO0FBQ0EsMkNBQTJDLDBEQUFZO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QywwQ0FBSSxDQUFDLDBEQUFZO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDBEQUFZO0FBQ3REO0FBQ0Esb0RBQW9ELDBDQUFJLENBQUMsMERBQVk7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsMERBQVk7QUFDOUMsd0NBQXdDLDBDQUFJLENBQUMsMERBQVk7QUFDekQ7QUFDQTtBQUNBO0FBQ0EscURBQXFELDBEQUFZO0FBQ2pFO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuREE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDZ0I7QUFDeEMsMEJBQTBCLDBDQUFJO0FBQ3JDO0FBQ0EsY0FBYywwREFBWSxZQUFZLDBEQUFZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUFBO0FBQUE7QUFBcUQ7QUFDOUM7QUFDUDtBQUNBLGtCQUFrQixNQUFNLEdBQUcsTUFBTTtBQUNqQztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0VBQVcsUUFBUSxtQkFBbUI7QUFDekQ7QUFDQSIsImZpbGUiOiJtZm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IFRpbGUgfSBmcm9tIFwiLi9tZm0vY2xhc3Nlcy9UaWxlXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi9tZm0vY2xhc3Nlcy9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IE1GTVV0aWxzIH0gZnJvbSBcIi4vbWZtL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvQXRvbVwiO1xuaW1wb3J0IHsgTWFzb25FbGVtZW50IH0gZnJvbSBcIi4vbWZtL2NsYXNzZXMvZWxlbWVudHMvTWFzb25FbGVtZW50XCI7XG5sZXQgYXBwID0gbmV3IFZ1ZSh7XG4gICAgZWw6IFwiI2FwcFwiLFxuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpbWVTcGVlZDogMTAwMCxcbiAgICAgICAgICAgIGdyaWRPZmZzZXQ6IDIwLFxuICAgICAgICAgICAgc2l0ZVNpemU6IDE0LFxuICAgICAgICAgICAgY29sb3JzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBza2V0Y2g6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGc6IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy5nID0gbmV3IFRpbGUoNDgsIDQ4KTtcbiAgICAgICAgdGhpcy5za2V0Y2ggPSB0aGlzLmluaXRNRk07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXRNRk0ocCkge1xuICAgICAgICAgICAgdGhpcy5wID0gcDtcbiAgICAgICAgICAgIHRoaXMuY29sb3JzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5jb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5FTVBUWSwgcC5jb2xvcigzMiwgMzIsIDMyLCAxMjcpKTtcbiAgICAgICAgICAgIHRoaXMuY29sb3JzLnNldChFbGVtZW50VHlwZXMuRFJFRywgcC5jb2xvcigyNTUsIDMyLCAzMikpO1xuICAgICAgICAgICAgdGhpcy5jb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5SRVMsIHAuY29sb3IoMzIsIDI1NSwgNjQpKTtcbiAgICAgICAgICAgIHRoaXMuY29sb3JzLnNldChFbGVtZW50VHlwZXMuV0FMTCwgcC5jb2xvcigzMiwgMzIsIDI1NSkpO1xuICAgICAgICAgICAgdGhpcy5jb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5NQVNPTiwgcC5jb2xvcigzMiwgMjU1LCAyNTUpKTtcbiAgICAgICAgICAgIHRoaXMuY29sb3JzLnNldChFbGVtZW50VHlwZXMuRk9SS19CT01CLCBwLmNvbG9yKDE3MCwgMzIsIDMyKSk7XG4gICAgICAgICAgICB0aGlzLmNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CLCBwLmNvbG9yKDEyNywgMTI3LCAzMikpO1xuICAgICAgICAgICAgdGhpcy5jb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5TRU5UUlksIHAuY29sb3IoMTI3LCAxMjcsIDI1NSkpO1xuICAgICAgICAgICAgdGhpcy5wLnByZWxvYWQgPSAoKSA9PiB7IH07XG4gICAgICAgICAgICB0aGlzLnAuc2V0dXAgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wLmNyZWF0ZUNhbnZhcyg3MDAsIDcwMCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5wLmRyYXcgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wLmJhY2tncm91bmQoMTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdHcmlkKHRoaXMuZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5ydW4oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnAubW91c2VEcmFnZ2VkID0gdGhpcy5oYW5kbGVDbGljaztcbiAgICAgICAgICAgIHRoaXMucC5tb3VzZUNsaWNrZWQgPSB0aGlzLmhhbmRsZUNsaWNrO1xuICAgICAgICB9LFxuICAgICAgICBydW4oKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGltZVNwZWVkOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZXcgPSBNRk1VdGlscy5HZW5lcmF0ZUV2ZW50V2luZG93KHRoaXMuZywgdGhpcy5nLndpZHRoLCB0aGlzLmcuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4uYXRvbS5leGVjKGV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZHJhd0dyaWQodCkge1xuICAgICAgICAgICAgdGhpcy5wLnB1c2goKTtcbiAgICAgICAgICAgIHRoaXMucC50cmFuc2xhdGUodGhpcy5ncmlkT2Zmc2V0LCB0aGlzLmdyaWRPZmZzZXQpO1xuICAgICAgICAgICAgdC5zaXRlcy5mb3JFYWNoKChzaXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wLnN0cm9rZSgwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnAuZmlsbCh0aGlzLmNvbG9ycy5nZXQoc2l0ZS5hdG9tLnR5cGUpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnAuZWxsaXBzZShzaXRlLnRpbGVQb3MuY29sICogdGhpcy5zaXRlU2l6ZSwgc2l0ZS50aWxlUG9zLnJvdyAqIHRoaXMuc2l0ZVNpemUsIHRoaXMuc2l0ZVNpemUsIHRoaXMuc2l0ZVNpemUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnAucG9wKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFNpdGVGcm9tQ2FudmFzWFkoeCwgeSkge1xuICAgICAgICAgICAgeCA9IHggLSB0aGlzLmdyaWRPZmZzZXQgKyB0aGlzLnNpdGVTaXplICogMC41O1xuICAgICAgICAgICAgeSA9IHkgLSB0aGlzLmdyaWRPZmZzZXQgKyB0aGlzLnNpdGVTaXplICogMC41O1xuICAgICAgICAgICAgeCA9ICh4IC8gdGhpcy5zaXRlU2l6ZSkgPj4gMDtcbiAgICAgICAgICAgIHkgPSAoeSAvIHRoaXMuc2l0ZVNpemUpID4+IDA7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nLmdldFNpdGVCeUNvb3JkKHsgcm93OiB5LCBjb2w6IHggfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZUNsaWNrKCkge1xuICAgICAgICAgICAgbGV0IHNpdGUgPSB0aGlzLmdldFNpdGVGcm9tQ2FudmFzWFkodGhpcy5wLm1vdXNlWCwgdGhpcy5wLm1vdXNlWSk7XG4gICAgICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnAua2V5SXNQcmVzc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wLmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTE0OiAvL3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuUkVTKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTE5OiAvL3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuV0FMTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDkwOiAvL1pcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuTUFTT04sIFtNYXNvbkVsZW1lbnQuYm94UGF0aCgyNCldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTIyOiAvL3pcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuTUFTT04sIFtNYXNvbkVsZW1lbnQuYm94UGF0aCgxMildKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTIwOiAvL3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuTUFTT04sIFtNYXNvbkVsZW1lbnQubGluZVBhdGgoNDgsIFwiRVwiKV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5OTogLy9jXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLk1BU09OLCBbTWFzb25FbGVtZW50LmxpbmVQYXRoKDQ4LCBcIlNcIildKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTAxOiAvL2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5ODogLy9iXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkZPUktfQk9NQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk3OiAvL2FcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTU6IC8vc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5TRU5UUlkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRFJFRyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4vLyBsZXQgZzogVGlsZSA9IG5ldyBUaWxlKDQ4LCA0OCk7XG4vLyB2YXIgc2tldGNoID0gKHA6IGFueSkgPT4ge1xuLy8gICBsZXQgc2l0ZVNpemUgPSAxNDtcbi8vICAgbGV0IGdyaWRPZmZzZXQgPSAyMDtcbi8vICAgcC5wcmVsb2FkID0gKCkgPT4ge307XG4vLyAgIHAuc2V0dXAgPSAoKSA9PiB7XG4vLyAgICAgcC5jcmVhdGVDYW52YXMoNzAwLCA3MDApO1xuLy8gICB9O1xuLy8gICAvLyAgIHAud2luZG93UmVzaXplZCA9ICgpID0+IHtcbi8vICAgLy8gICAgIHAucmVzaXplQ2FudmFzKHAud2luZG93V2lkdGggLSA1MCwgcC53aW5kb3dIZWlnaHQgLSA1MCk7XG4vLyAgIC8vICAgfTtcbi8vICAgLy9Fc3RhYmxpc2ggdGhlIGVsbWVudCBjb2xvcnMgaGVyZVxuLy8gICBsZXQgY29sb3JzOiBNYXA8SUVsZW1lbnRUeXBlLCBhbnk+ID0gbmV3IE1hcDxJRWxlbWVudFR5cGUsIGFueT4oKTtcbi8vICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuRU1QVFksIHAuY29sb3IoMzIsIDMyLCAzMiwgMTI3KSk7XG4vLyAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkRSRUcsIHAuY29sb3IoMjU1LCAzMiwgMzIpKTtcbi8vICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuUkVTLCBwLmNvbG9yKDMyLCAyNTUsIDY0KSk7XG4vLyAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLldBTEwsIHAuY29sb3IoMzIsIDMyLCAyNTUpKTtcbi8vICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuTUFTT04sIHAuY29sb3IoMzIsIDI1NSwgMjU1KSk7XG4vLyAgIGNvbG9ycy5zZXQoRWxlbWVudFR5cGVzLkZPUktfQk9NQiwgcC5jb2xvcigxNzAsIDMyLCAzMikpO1xuLy8gICBjb2xvcnMuc2V0KEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQiwgcC5jb2xvcigxMjcsIDEyNywgMzIpKTtcbi8vICAgY29sb3JzLnNldChFbGVtZW50VHlwZXMuU0VOVFJZLCBwLmNvbG9yKDEyNywgMTI3LCAyNTUpKTtcbi8vICAgbGV0IGRyYXdHcmlkID0gKHA6IGFueSwgdDogVGlsZSkgPT4ge1xuLy8gICAgIHAucHVzaCgpO1xuLy8gICAgIHAudHJhbnNsYXRlKGdyaWRPZmZzZXQsIGdyaWRPZmZzZXQpO1xuLy8gICAgIHQuc2l0ZXMuZm9yRWFjaCgoc2l0ZTogU2l0ZSkgPT4ge1xuLy8gICAgICAgcC5zdHJva2UoMCwgMCwgMCwgMCk7XG4vLyAgICAgICBwLmZpbGwoY29sb3JzLmdldChzaXRlLmF0b20udHlwZSkpO1xuLy8gICAgICAgcC5lbGxpcHNlKHNpdGUudGlsZVBvcy5jb2wgKiBzaXRlU2l6ZSwgc2l0ZS50aWxlUG9zLnJvdyAqIHNpdGVTaXplLCBzaXRlU2l6ZSwgc2l0ZVNpemUpO1xuLy8gICAgIH0pO1xuLy8gICAgIHAucG9wKCk7XG4vLyAgIH07XG4vLyAgIGxldCBydW4gPSAoKSA9PiB7XG4vLyAgICAgbGV0IHNwZWVkID0gNTAwMDtcbi8vICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwZWVkOyBpKyspIHtcbi8vICAgICAgIGxldCBldyA9IE1GTVV0aWxzLkdlbmVyYXRlRXZlbnRXaW5kb3coZywgZy53aWR0aCwgZy5oZWlnaHQpO1xuLy8gICAgICAgZXcub3JpZ2luLmF0b20uZXhlYyhldyk7XG4vLyAgICAgfVxuLy8gICB9O1xuLy8gICBsZXQgZ2V0U2l0ZUZyb21DYW52YXNYWSA9ICh4OiBudW1iZXIsIHk6IG51bWJlcik6IFNpdGUgPT4ge1xuLy8gICAgIHggPSB4IC0gZ3JpZE9mZnNldCArIHNpdGVTaXplICogMC41O1xuLy8gICAgIHkgPSB5IC0gZ3JpZE9mZnNldCArIHNpdGVTaXplICogMC41O1xuLy8gICAgIHggPSAoeCAvIHNpdGVTaXplKSA+PiAwO1xuLy8gICAgIHkgPSAoeSAvIHNpdGVTaXplKSA+PiAwO1xuLy8gICAgIHJldHVybiBnLmdldFNpdGVCeUNvb3JkKHsgcm93OiB5LCBjb2w6IHggfSk7XG4vLyAgIH07XG4vLyAgIHAuZHJhdyA9ICgpID0+IHtcbi8vICAgICBwLmJhY2tncm91bmQoMTAwKTtcbi8vICAgICBkcmF3R3JpZChwLCBnKTtcbi8vICAgICBydW4oKTtcbi8vICAgfTtcbi8vICAgbGV0IGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuLy8gICAgIGxldCBzaXRlOiBTaXRlID0gZ2V0U2l0ZUZyb21DYW52YXNYWShwLm1vdXNlWCwgcC5tb3VzZVkpO1xuLy8gICAgIGlmIChzaXRlKSB7XG4vLyAgICAgICBpZiAocC5rZXlJc1ByZXNzZWQpIHtcbi8vICAgICAgICAgc3dpdGNoIChwLmtleUNvZGUpIHtcbi8vICAgICAgICAgICBjYXNlIDExNDogLy9yXG4vLyAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuUkVTKTtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgIGNhc2UgMTE5OiAvL3dcbi8vICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5XQUxMKTtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgIGNhc2UgOTA6IC8vWlxuLy8gICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLk1BU09OLCBbTWFzb25FbGVtZW50LmJveFBhdGgoMjQpXSk7XG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgICBjYXNlIDEyMjogLy96XG4vLyAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuTUFTT04sIFtNYXNvbkVsZW1lbnQuYm94UGF0aCgxMildKTtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgIGNhc2UgMTIwOiAvL3hcbi8vICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTiwgW01hc29uRWxlbWVudC5saW5lUGF0aCg0OCwgXCJFXCIpXSk7XG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgICBjYXNlIDk5OiAvL2Ncbi8vICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5NQVNPTiwgW01hc29uRWxlbWVudC5saW5lUGF0aCg0OCwgXCJTXCIpXSk7XG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgICBjYXNlIDEwMTogLy9lXG4vLyAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpO1xuLy8gICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgICAgY2FzZSA5ODogLy9iXG4vLyAgICAgICAgICAgICBzaXRlLmF0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRk9SS19CT01CKTtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgIGNhc2UgOTc6IC8vYVxuLy8gICAgICAgICAgICAgc2l0ZS5hdG9tID0gbmV3IEF0b20oRWxlbWVudFR5cGVzLkFOVElfRk9SS19CT01CKTtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgIGNhc2UgMTE1OiAvL3Ncbi8vICAgICAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5TRU5UUlkpO1xuLy8gICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5EUkVHKTtcbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgIH07XG4vLyAgIHAubW91c2VEcmFnZ2VkID0gaGFuZGxlQ2xpY2s7XG4vLyAgIHAubW91c2VDbGlja2VkID0gaGFuZGxlQ2xpY2s7XG4vLyB9O1xubGV0IHNrZXRjaFAgPSBuZXcgcDUoYXBwLnNrZXRjaCwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZm1cIikpO1xuIiwiaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgQXRvbSB7XG4gICAgY29uc3RydWN0b3IoX3R5cGUgPSBFbGVtZW50VHlwZXMuRU1QVFksIHBhcmFtcykge1xuICAgICAgICB0aGlzLnR5cGUgPSBfdHlwZTtcbiAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5lbGVtID0gbmV3IHRoaXMudHlwZS5jbGFzcyguLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtID0gbmV3IHRoaXMudHlwZS5jbGFzcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgdGhpcy5lbGVtLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcihfbmFtZSwgX3R5cGUsIF9tb3ZlYWJpbGl0eSA9IDEwMCwgX2Rlc3Ryb3lhYmlsaXR5ID0gMTAwKSB7XG4gICAgICAgIHRoaXMuYWdlID0gMDtcbiAgICAgICAgdGhpcy5uYW1lID0gX25hbWU7XG4gICAgICAgIHRoaXMudHlwZSA9IF90eXBlO1xuICAgICAgICB0aGlzLm1vdmVhYmlsaXR5ID0gX21vdmVhYmlsaXR5O1xuICAgICAgICB0aGlzLmRlc3Ryb3lhYmlsaXR5ID0gX2Rlc3Ryb3lhYmlsaXR5O1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIHRoaXMuYWdlKys7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRW1wdHlFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvRW1wdHlFbGVtZW50XCI7XG5pbXBvcnQgeyBEUmVnRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRzL0RSZWdFbGVtZW50XCI7XG5pbXBvcnQgeyBSZXNFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvUmVzRWxlbWVudFwiO1xuaW1wb3J0IHsgV2FsbEVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9XYWxsRWxlbWVudFwiO1xuaW1wb3J0IHsgTWFzb25FbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvTWFzb25FbGVtZW50XCI7XG5pbXBvcnQgeyBGb3JrQm9tYkVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9Gb3JrQm9tYkVsZW1lbnRcIjtcbmltcG9ydCB7IEFudGlGb3JrQm9tYkVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50cy9BbnRpRm9ya0JvbWJFbGVtZW50XCI7XG5pbXBvcnQgeyBTZW50cnlFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudHMvU2VudHJ5RWxlbWVudFwiO1xuZXhwb3J0IGNsYXNzIEVsZW1lbnRUeXBlcyB7XG4gICAgc3RhdGljIHJlZ2lzdGVyVHlwZShuYW1lLCB0eXBlLCBjKSB7XG4gICAgICAgIHRoaXMuVFlQRVNfQVJSQVkucHVzaCh7IG5hbWUsIHR5cGUsIGNsYXNzOiBjIH0pO1xuICAgIH1cbn1cbkVsZW1lbnRUeXBlcy5FTVBUWSA9IHsgbmFtZTogXCJFTVBUWVwiLCB0eXBlOiBcIkVcIiwgY2xhc3M6IEVtcHR5RWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLkRSRUcgPSB7IG5hbWU6IFwiRFJFR1wiLCB0eXBlOiBcIkRcIiwgY2xhc3M6IERSZWdFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuUkVTID0geyBuYW1lOiBcIlJFU1wiLCB0eXBlOiBcIlJcIiwgY2xhc3M6IFJlc0VsZW1lbnQgfTtcbkVsZW1lbnRUeXBlcy5XQUxMID0geyBuYW1lOiBcIldBTExcIiwgdHlwZTogXCJXXCIsIGNsYXNzOiBXYWxsRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLk1BU09OID0geyBuYW1lOiBcIk1BU09OXCIsIHR5cGU6IFwiTWFcIiwgY2xhc3M6IE1hc29uRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLkZPUktfQk9NQiA9IHsgbmFtZTogXCJGT1JLIEJPTUJcIiwgdHlwZTogXCJGYlwiLCBjbGFzczogRm9ya0JvbWJFbGVtZW50IH07XG5FbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIgPSB7IG5hbWU6IFwiQU5USSBGT1JLIEJPTUJcIiwgdHlwZTogXCJBZlwiLCBjbGFzczogQW50aUZvcmtCb21iRWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLlNFTlRSWSA9IHsgbmFtZTogXCJTRU5UUllcIiwgdHlwZTogXCJTZVwiLCBjbGFzczogU2VudHJ5RWxlbWVudCB9O1xuRWxlbWVudFR5cGVzLlRZUEVTX0FSUkFZID0gW1xuICAgIEVsZW1lbnRUeXBlcy5FTVBUWSxcbiAgICBFbGVtZW50VHlwZXMuRFJFRyxcbiAgICBFbGVtZW50VHlwZXMuUkVTLFxuICAgIEVsZW1lbnRUeXBlcy5XQUxMLFxuICAgIEVsZW1lbnRUeXBlcy5NQVNPTixcbiAgICBFbGVtZW50VHlwZXMuRk9SS19CT01CLFxuICAgIEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQixcbiAgICBFbGVtZW50VHlwZXMuU0VOVFJZXG5dO1xuIiwiaW1wb3J0IHsgTUZNVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuL0VsZW1lbnRUeXBlc1wiO1xuLy9FdmVudCB3aW5kb3cgYXMgZGVzY3JpYmJlZCBoZXJlOiBodHRwOi8vcm9idXN0LmNzLnVubS5lZHUvbGliL2V4ZS9mZXRjaC5waHA/dz0zMDAmdG9rPTRjOGY0OSZtZWRpYT1kZXY6ZXZlbnQtd2luZG93LTEwLnBuZ1xuLy9Db2xsZWN0aW9uIG9mIHNpdGVzIHdoaWNoIGNvbnRhaW4gYXRvbXMsIGJ1aWx0IGZyb20gYW4gb3JpZ2luIChjZW50ZXIpIHNpdGVcbmV4cG9ydCBjbGFzcyBFdmVudFdpbmRvdyB7XG4gICAgY29uc3RydWN0b3IoX3RpbGUsIF9vcmlnaW4pIHtcbiAgICAgICAgdGhpcy50aWxlID0gX3RpbGU7XG4gICAgICAgIHRoaXMubWFrZVdpbmRvdyhfdGlsZSwgX29yaWdpbik7XG4gICAgfVxuICAgIG1ha2VXaW5kb3codGlsZSwgb3JpZ2luKSB7XG4gICAgICAgIHRoaXMud2luZG93ID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMudGlsZS5nZXRTaXRlQnlDb29yZChvcmlnaW4pO1xuICAgICAgICAvL2lmIHRoZSBvcmlnaW4gaXMgRU1QVFkgRWxlbWVudCwgbGV0J3Mgc2F2ZSBzb21lIGN5Y2xlcyAoZ29vZCwgYmFkPylcbiAgICAgICAgaWYgKHRoaXMub3JpZ2luLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLndpbmRvdy5zZXQodGhpcy5vcmlnaW4uaWQsIHRoaXMub3JpZ2luKTtcbiAgICAgICAgbGV0IHdpbmRvd0FycmF5ID0gRXZlbnRXaW5kb3cuV0lORE9XX09SREVSX09GRlNFVFMubWFwKChvZmZzZXQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk9mZnNldEZyb21PcmlnaW4ob3JpZ2luLCBvZmZzZXQucm93LCBvZmZzZXQuY29sKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvd0FycmF5LmZvckVhY2goKHRpbGVDb29yZCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNpdGUgPSB0aWxlLmdldFNpdGVCeUNvb3JkKHRpbGVDb29yZCk7XG4gICAgICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMud2luZG93LnNldChzaXRlLmlkLCBzaXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9mZnNldEZyb21PcmlnaW4ob3JpZ2luLCByb3dPZmZzZXQsIGNvbE9mZnNldCkge1xuICAgICAgICByZXR1cm4geyByb3c6IG9yaWdpbi5yb3cgKyByb3dPZmZzZXQsIGNvbDogb3JpZ2luLmNvbCArIGNvbE9mZnNldCB9O1xuICAgIH1cbiAgICBnZXRBbGwoc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxldCB3YSA9IEFycmF5LmZyb20odGhpcy53aW5kb3cudmFsdWVzKCkpO1xuICAgICAgICBpZiAoc3BlY2lmaWNUeXBlKSB7XG4gICAgICAgICAgICB3YSA9IHdhLmZpbHRlcihzaXRlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2l0ZS5hdG9tLnR5cGUgPT09IHNwZWNpZmljVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2E7XG4gICAgfVxuICAgIGdldFNpdGVCeUluZGV4KGluZGV4KSB7XG4gICAgICAgIGxldCB3YSA9IEFycmF5LmZyb20odGhpcy53aW5kb3cudmFsdWVzKCkpO1xuICAgICAgICBpZiAoaW5kZXggPj0gd2EubGVuZ3RoIHx8IGluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2FbaW5kZXhdO1xuICAgIH1cbiAgICBnZXRSYW5kb20oc3BlY2lmaWNUeXBlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNpdGVGcm9tQ2FuZGlkYXRlcyhBcnJheS5mcm9tKHRoaXMud2luZG93LnZhbHVlcygpKSwgdHJ1ZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgLy9tb3N0IHVzZWZ1bCB3aGVuIHVzaW5nIHNwZWNpZmljVHlwZVxuICAgIC8vdHJhdmVyc2VzIHRoZSB3aW5kb3cgdW50aWwgaXQgY29tZXMgYWNyb3NzIHdoYXQgeW91J3JlIGxvb2tpbmcgZm9yXG4gICAgZ2V0TmVhcmVzdChzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKEFycmF5LmZyb20odGhpcy53aW5kb3cudmFsdWVzKCkpLCBmYWxzZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgZ2V0RWFzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX0VBU1QpO1xuICAgIH1cbiAgICBnZXRXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfV0VTVCk7XG4gICAgfVxuICAgIGdldE5vcnRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEgpO1xuICAgIH1cbiAgICBnZXRTb3V0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0aW9uKEV2ZW50V2luZG93LkVXX1NPVVRIKTtcbiAgICB9XG4gICAgZ2V0Tm9ydGhXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEhXRVNUKTtcbiAgICB9XG4gICAgZ2V0U291dGhXZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfU09VVEhXRVNUKTtcbiAgICB9XG4gICAgZ2V0Tm9ydGhFYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfTk9SVEhFQVNUKTtcbiAgICB9XG4gICAgZ2V0U291dGhFYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3Rpb24oRXZlbnRXaW5kb3cuRVdfU09VVEhFQVNUKTtcbiAgICB9XG4gICAgZ2V0QWRqYWNlbnQ0V2F5KHJhbmRvbWl6ZSA9IHRydWUsIHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTaXRlRnJvbUNhbmRpZGF0ZXMoW3RoaXMuZ2V0V2VzdCgpLCB0aGlzLmdldE5vcnRoKCksIHRoaXMuZ2V0U291dGgoKSwgdGhpcy5nZXRFYXN0KCldLCByYW5kb21pemUsIHNwZWNpZmljVHlwZSk7XG4gICAgfVxuICAgIGdldEFkamFjZW50OFdheShyYW5kb21pemUgPSB0cnVlLCBzcGVjaWZpY1R5cGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2l0ZUZyb21DYW5kaWRhdGVzKFtcbiAgICAgICAgICAgIHRoaXMuZ2V0V2VzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXROb3J0aCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRTb3V0aCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRFYXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldE5vcnRoV2VzdCgpLFxuICAgICAgICAgICAgdGhpcy5nZXRTb3V0aFdlc3QoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm9ydGhFYXN0KCksXG4gICAgICAgICAgICB0aGlzLmdldFNvdXRoRWFzdCgpXG4gICAgICAgIF0sIHJhbmRvbWl6ZSwgc3BlY2lmaWNUeXBlKTtcbiAgICB9XG4gICAgLy9HaXZlbiBhbiBhcnJheSBvZiBjYW5kaWRhdGUgc2l0ZXMgKHN5bW1ldHJpZXMgaW4gdGhlIGZ1dHVyZSBJIGhvcGUpLFxuICAgIC8vZ2l2ZSBtZSBiYWNrIG9uZSwgcmFuZG9tIGJ5IGRlZmF1bHQsIG5vdCBmaWx0ZXJlZCBieSB0eXBlIGJ5IGRlZmF1bHRcbiAgICBnZXRTaXRlRnJvbUNhbmRpZGF0ZXMoY2FuZGlkYXRlU2l0ZXMsIHJhbmRvbWl6ZSA9IHRydWUsIHNwZWNpZmljVHlwZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBjYW5kaWRhdGVTaXRlcyA9IGNhbmRpZGF0ZVNpdGVzLmZpbHRlcihzaXRlID0+IHtcbiAgICAgICAgICAgIGlmICghc2l0ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIXNwZWNpZmljVHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3BlY2lmaWNUeXBlICYmIHNpdGUuYXRvbS50eXBlID09PSBzcGVjaWZpY1R5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vbm8gc2l0ZXMhIHlpa2VzISBwb3NzaWJsZSE/ISBwcm9iYWJseSBvbmx5IHdoZW4gdXNpbmcgc3BlY2lmaWNUeXBlIGFuZCBsb29raW5nIGZvciBhIHJhcmUgZWxlbWVudFxuICAgICAgICBpZiAoY2FuZGlkYXRlU2l0ZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvL3JldHVybiByYW5kb21cbiAgICAgICAgaWYgKHJhbmRvbWl6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZVNpdGVzWyhNYXRoLnJhbmRvbSgpICogY2FuZGlkYXRlU2l0ZXMubGVuZ3RoKSA+PiAwXTtcbiAgICAgICAgfVxuICAgICAgICAvL3JldHVybiBmaXJzdCBtYXRjaGluZ1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlU2l0ZXNbMF07XG4gICAgfVxuICAgIGdldERpcmVjdGlvbihkaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IHNpdGUgPSB0aGlzLnRpbGUuc2l0ZXMuZ2V0KE1GTVV0aWxzLkN0b0lEKHRoaXMuT2Zmc2V0RnJvbU9yaWdpbih0aGlzLm9yaWdpbi50aWxlUG9zLCBkaXJlY3Rpb24ucm93LCBkaXJlY3Rpb24uY29sKSkpO1xuICAgICAgICBpZiAoc2l0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNpdGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5FdmVudFdpbmRvdy5XSU5ET1dfT1JERVJfT0ZGU0VUUyA9IFtcbiAgICB7IGNvbDogMCwgcm93OiAwIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDAgfSxcbiAgICB7IGNvbDogMCwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAwLCByb3c6IDEgfSxcbiAgICB7IGNvbDogMSwgcm93OiAwIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IC0xLCByb3c6IDEgfSxcbiAgICB7IGNvbDogMSwgcm93OiAtMSB9LFxuICAgIHsgY29sOiAxLCByb3c6IDEgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogMCB9LFxuICAgIHsgY29sOiAwLCByb3c6IC0xIH0sXG4gICAgeyBjb2w6IDAsIHJvdzogMiB9LFxuICAgIHsgY29sOiAyLCByb3c6IDAgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogLTIsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAtMiB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAyIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogLTIgfSxcbiAgICB7IGNvbDogMSwgcm93OiAyIH0sXG4gICAgeyBjb2w6IDIsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMiwgcm93OiAxIH0sXG4gICAgeyBjb2w6IC0zLCByb3c6IDAgfSxcbiAgICB7IGNvbDogMCwgcm93OiAtMyB9LFxuICAgIHsgY29sOiAwLCByb3c6IDMgfSxcbiAgICB7IGNvbDogMywgcm93OiAwIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IC0yIH0sXG4gICAgeyBjb2w6IC0yLCByb3c6IDIgfSxcbiAgICB7IGNvbDogMiwgcm93OiAtMiB9LFxuICAgIHsgY29sOiAyLCByb3c6IDIgfSxcbiAgICB7IGNvbDogLTMsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogLTMsIHJvdzogMSB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAtMyB9LFxuICAgIHsgY29sOiAtMSwgcm93OiAzIH0sXG4gICAgeyBjb2w6IDEsIHJvdzogLTMgfSxcbiAgICB7IGNvbDogMSwgcm93OiAzIH0sXG4gICAgeyBjb2w6IDMsIHJvdzogLTEgfSxcbiAgICB7IGNvbDogMywgcm93OiAxIH0sXG4gICAgeyBjb2w6IC00LCByb3c6IDAgfSxcbiAgICB7IGNvbDogMCwgcm93OiAtNCB9LFxuICAgIHsgY29sOiAwLCByb3c6IDQgfSxcbiAgICB7IGNvbDogNCwgcm93OiAwIH1cbl07XG4vL2JlY2F1c2UsIGxhenlcbkV2ZW50V2luZG93LkVXX1dFU1QgPSB7IGNvbDogLTEsIHJvdzogMCB9O1xuRXZlbnRXaW5kb3cuRVdfRUFTVCA9IHsgY29sOiAxLCByb3c6IDAgfTtcbkV2ZW50V2luZG93LkVXX05PUlRIID0geyBjb2w6IDAsIHJvdzogLTEgfTtcbkV2ZW50V2luZG93LkVXX1NPVVRIID0geyBjb2w6IDAsIHJvdzogMSB9O1xuRXZlbnRXaW5kb3cuRVdfTk9SVEhXRVNUID0geyBjb2w6IC0xLCByb3c6IC0xIH07XG5FdmVudFdpbmRvdy5FV19TT1VUSFdFU1QgPSB7IGNvbDogLTEsIHJvdzogMSB9O1xuRXZlbnRXaW5kb3cuRVdfTk9SVEhFQVNUID0geyBjb2w6IDEsIHJvdzogLTEgfTtcbkV2ZW50V2luZG93LkVXX1NPVVRIRUFTVCA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiIsImltcG9ydCB7IE1GTVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4vQXRvbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgU2l0ZSB7XG4gICAgY29uc3RydWN0b3IoX3Bvcykge1xuICAgICAgICB0aGlzLnRpbGVQb3MgPSBfcG9zO1xuICAgICAgICB0aGlzLmlkID0gTUZNVXRpbHMuQ3RvSUQodGhpcy50aWxlUG9zKTtcbiAgICAgICAgdGhpcy5jcmVhdGUoKTtcbiAgICB9XG4gICAgLy9pZiB0YXJnZXRTaXRlIGlzIGtpbGxhYmxlXG4gICAgLy9raWxsIGl0cyBhdG9tIChyZXBsYWNlIHdpdGggZW1wdHkpXG4gICAga2lsbEF0b20odGFyZ2V0U2l0ZSkge1xuICAgICAgICBsZXQga2lsbCA9IE1hdGgucmFuZG9tKCkgKiAxMDAgPCB0YXJnZXRTaXRlLmF0b20uZWxlbS5kZXN0cm95YWJpbGl0eTtcbiAgICAgICAgaWYgKGtpbGwpIHtcbiAgICAgICAgICAgIHRhcmdldFNpdGUuYXRvbSA9IG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5FTVBUWSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAga2lsbFNlbGYobGVhdmluZ0F0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpKSB7XG4gICAgICAgIHRoaXMuYXRvbSA9IGxlYXZpbmdBdG9tO1xuICAgIH1cbiAgICAvL2lmIHRhcmdldCBzaXRlIGlzIGtpbGxhYmxlXG4gICAgLy9tb3ZlIHRoaXMgYXRvbSB0byB0YXJnZXRTaXRlLCBhbmQgbGVhdmUgYmVoaW5kIGxlYXZpbmdBdG9tLCB3aGljaCBieSBkZWZhdWx0IGlzIGVtcHR5XG4gICAgbW92ZUF0b20odGFyZ2V0U2l0ZSwgbGVhdmluZ0F0b20gPSBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpKSB7XG4gICAgICAgIGlmICh0YXJnZXRTaXRlICYmIHRhcmdldFNpdGUuY2FuRGVzdHJveSgpKSB7XG4gICAgICAgICAgICBbdGhpcy5hdG9tLCB0YXJnZXRTaXRlLmF0b21dID0gW2xlYXZpbmdBdG9tLCB0aGlzLmF0b21dO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vaWYgdGFyZ2V0U2l0ZSBpcyBtb3ZlYWJsZVxuICAgIC8vc3dhcCBhdG9tcyB3aXRoIHRoaXMgb25lXG4gICAgc3dhcEF0b21zKHRhcmdldFNpdGUpIHtcbiAgICAgICAgaWYgKHRhcmdldFNpdGUgJiYgdGFyZ2V0U2l0ZS5jYW5Nb3ZlKCkpIHtcbiAgICAgICAgICAgIFt0aGlzLmF0b20sIHRhcmdldFNpdGUuYXRvbV0gPSBbdGFyZ2V0U2l0ZS5hdG9tLCB0aGlzLmF0b21dO1xuICAgICAgICB9XG4gICAgfVxuICAgIG11dGF0ZVNpdGUodGFyZ2V0U2l0ZSwgbmV3QXRvbSkge1xuICAgICAgICBpZiAodGFyZ2V0U2l0ZSAmJiB0YXJnZXRTaXRlLmNhbkRlc3Ryb3koKSkge1xuICAgICAgICAgICAgdGFyZ2V0U2l0ZS5hdG9tID0gbmV3QXRvbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYW5EZXN0cm95KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDEwMCA8IHRoaXMuYXRvbS5lbGVtLmRlc3Ryb3lhYmlsaXR5O1xuICAgIH1cbiAgICBjYW5Nb3ZlKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDEwMCA8IHRoaXMuYXRvbS5lbGVtLm1vdmVhYmlsaXR5O1xuICAgIH1cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuYXRvbSA9IG5ldyBBdG9tKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU2l0ZSB9IGZyb20gXCIuL1NpdGVcIjtcbmltcG9ydCB7IE1GTVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5leHBvcnQgY2xhc3MgVGlsZSB7XG4gICAgY29uc3RydWN0b3IoX3dpZHRoID0gMSwgX2hlaWdodCA9IDEpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IF93aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBfaGVpZ2h0O1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgIH1cbiAgICBnZXRTaXRlQnlDb29yZChjKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNpdGVzLmdldChNRk1VdGlscy5DdG9JRChjKSk7XG4gICAgfVxuICAgIGdldFJhbmRvbVNpdGUoKSB7XG4gICAgICAgIGxldCByciA9IChNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQpID4+IDA7XG4gICAgICAgIGxldCByYyA9IChNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCkgPj4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l0ZXMuZ2V0KGAke3JyfToke3JjfWApO1xuICAgIH1cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHRoaXMuc2l0ZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAvL2Fjcm9zcyBjb2x1bW5zXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuaGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAvL2Rvd24gcm93c1xuICAgICAgICAgICAgICAgIHRoaXMuc2l0ZXMuc2V0KGAke2p9OiR7aX1gLCBuZXcgU2l0ZSh7IHJvdzogaiwgY29sOiBpIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgQW50aUZvcmtCb21iRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKF9iaXJ0aGVkSW5kZXggPSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLkVNUFRZLm5hbWUsIEVsZW1lbnRUeXBlcy5FTVBUWS50eXBlKTtcbiAgICAgICAgdGhpcy5wRElFID0gMS4zMzsgLy9+NzUlIGNoYW5jZSB0byBkaWVcbiAgICAgICAgdGhpcy5wRVhQTE9ERSA9IDU7IC8vMjAlIGNoYW5jZSB0byBleHBsb2RlXG4gICAgICAgIHRoaXMuYmlydGhlZEluZGV4ID0gX2JpcnRoZWRJbmRleDtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBsZXQgZmIgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5GT1JLX0JPTUIpO1xuICAgICAgICAvL3JhbmRvbWx5IGRpZSBpZiBubyBmb3JrIGJvbWJzIGFyb3VuZFxuICAgICAgICBpZiAoIWZiICYmIE1hdGgucmFuZG9tKCkgKiB0aGlzLnBESUUgPCAxKSB7XG4gICAgICAgICAgICBldy5vcmlnaW4ua2lsbFNlbGYoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvL3doaWxlIHRoZXJlIGFyZSBmb3JrYm9tYnMgcHJlc2VudCwgZGVzdHJveSB0aGVtIVxuICAgICAgICB3aGlsZSAoZmIpIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKGZiLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuRU1QVFkpKTtcbiAgICAgICAgICAgIGZiID0gZXcuZ2V0TmVhcmVzdChFbGVtZW50VHlwZXMuRk9SS19CT01CKTtcbiAgICAgICAgfVxuICAgICAgICAvL1JFRCBBTEVSVCEgTWFrZSBuZXcgYW50aSBmb3JrIGJvbWJzIGluIGFsbCBFTVBUWSBkaXJlY3Rpb25zXG4gICAgICAgIGlmICghdGhpcy5iaXJ0aGVkSW5kZXgpIHtcbiAgICAgICAgICAgIC8vdGhpcyBpcyB0aGUgZmlyc3RcbiAgICAgICAgICAgIFsuLi5BcnJheSg0MCkua2V5cygpXS5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2l0ZSA9IGV3LmdldFNpdGVCeUluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAoc2l0ZSAmJiBzaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKHNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQiwgW2luZGV4XSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy90aGlzIGlzIGEgY2hpbGQsIGp1c3QgY29udGludWUgdGhhdCB3YXlcbiAgICAgICAgICAgIFtldy5nZXRTaXRlQnlJbmRleCh0aGlzLmJpcnRoZWRJbmRleCldLmZvckVhY2goc2l0ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNpdGUgJiYgc2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5FTVBUWSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSAqIHRoaXMucEVYUExPREUgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShzaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIpKTsgLy9leHBsb2RlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShzaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuQU5USV9GT1JLX0JPTUIsIFt0aGlzLmJpcnRoZWRJbmRleF0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGV3Lm9yaWdpbi5raWxsU2VsZigpO1xuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFbGVtIH0gZnJvbSBcIi4uL0VsZW1cIjtcbmltcG9ydCB7IEVsZW1lbnRUeXBlcyB9IGZyb20gXCIuLi9FbGVtZW50VHlwZXNcIjtcbmltcG9ydCB7IEF0b20gfSBmcm9tIFwiLi4vQXRvbVwiO1xuZXhwb3J0IGNsYXNzIERSZWdFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5EUkVHLm5hbWUsIEVsZW1lbnRUeXBlcy5EUkVHLnR5cGUpO1xuICAgICAgICB0aGlzLnBEUkVHX0NSRUFURSA9IDEwMDA7XG4gICAgICAgIHRoaXMucFJFU19DUkVBVEUgPSAzMDA7XG4gICAgICAgIHRoaXMucERSRUdfREVTVFJPWSA9IDEwO1xuICAgICAgICB0aGlzLnBBTllfREVTVFJPWSA9IDEwMDtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICAvL2dldCBhIHJhbmRvbSBORVNXIHNpdGVcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlU2l0ZSA9IGV3LmdldEFkamFjZW50NFdheSgpO1xuICAgICAgICAvL0NSRUFUSU9OXG4gICAgICAgIGlmIChhdmFpbGFibGVTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKSB7XG4gICAgICAgICAgICBjb25zdCBjcmVhdGVEUmVnID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucERSRUdfQ1JFQVRFIDwgMTtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVJlcyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnBSRVNfQ1JFQVRFIDwgMTtcbiAgICAgICAgICAgIGlmIChjcmVhdGVEUmVnKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5EUkVHKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEUkVHIENSRUFURURcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjcmVhdGVSZXMpIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubW92ZUF0b20oYXZhaWxhYmxlU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLlJFUykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTIENSRUFURURcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4uc3dhcEF0b21zKGF2YWlsYWJsZVNpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF2YWlsYWJsZVNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRFJFRykge1xuICAgICAgICAgICAgY29uc3QgZGVzdHJveURSZWcgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5wRFJFR19ERVNUUk9ZIDwgMTtcbiAgICAgICAgICAgIGlmIChkZXN0cm95RFJlZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRFJFRyBERVNUUk9ZRURcIik7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm1vdmVBdG9tKGF2YWlsYWJsZVNpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy9pdCdzIHNvbWV0aGluZyBlbHNlXG4gICAgICAgICAgICBjb25zdCBkZXN0cm95QW55ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucEFOWV9ERVNUUk9ZIDwgMTtcbiAgICAgICAgICAgIGlmIChkZXN0cm95QW55KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXZhaWxhYmxlU2l0ZS5hdG9tLnR5cGUubmFtZSArIFwiIERFU1RST1lFRFwiKTtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubW92ZUF0b20oYXZhaWxhYmxlU2l0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgRW1wdHlFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5FTVBUWS5uYW1lLCBFbGVtZW50VHlwZXMuRU1QVFkudHlwZSk7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5pbXBvcnQgeyBBdG9tIH0gZnJvbSBcIi4uL0F0b21cIjtcbmV4cG9ydCBjbGFzcyBGb3JrQm9tYkVsZW1lbnQgZXh0ZW5kcyBFbGVtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRWxlbWVudFR5cGVzLkVNUFRZLm5hbWUsIEVsZW1lbnRUeXBlcy5FTVBUWS50eXBlKTtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBsZXQgbmV4dFZpY3RpbSA9IGV3LmdldEFkamFjZW50OFdheSgpO1xuICAgICAgICBpZiAobmV4dFZpY3RpbSkge1xuICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUobmV4dFZpY3RpbSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLkZPUktfQk9NQikpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgTWFzb25FbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgLy9pdCdzIGltcG9ydGFudCB0aGF0IHRoZSBwYXRoIGxvb3BzIG9uIGl0c2VsZiwgZXZlbiBpZiBpdCBqdXN0IG1lYW5zIHJldmVyc2luZyBiYWNrIHRvIHRoZSBiZWdpbm5pbmdcbiAgICBjb25zdHJ1Y3RvcihfcGF0aCA9IHVuZGVmaW5lZCwgX2N1ckluZGV4ID0gMCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuTUFTT04ubmFtZSwgRWxlbWVudFR5cGVzLk1BU09OLnR5cGUsIDEwMCwgMTAwKTtcbiAgICAgICAgdGhpcy5wYXRoID0gW107XG4gICAgICAgIHRoaXMuY3VySW5kZXggPSAwOyAvL3VzZWQgdG8gdHJhdmVyc2UgaW5kZXgsIGJ1dCBub3cgdGhpcyBpcyBzb3J0IG9mIGxpa2UgdGhlIG1hc29uJ3MgSUQgaW4gdGhlIHBhdGgsIGl0IGRvZXNuJ3QgY2hhbmdlIGZvciB0aGUgaW5kaXZpZHVhbCwgYnV0IGlzIGtlcHQgdXAgKCsxLC0xKSBieSBuZWlnaGJvciBtYXNvbnNcbiAgICAgICAgaWYgKCFfcGF0aCkge1xuICAgICAgICAgICAgX3BhdGggPSBNYXNvbkVsZW1lbnQuYm94UGF0aCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UGF0aChfcGF0aCk7XG4gICAgICAgIHRoaXMuY3VySW5kZXggPSBfY3VySW5kZXg7XG4gICAgfVxuICAgIHNldFBhdGgocGF0aCkge1xuICAgICAgICB0aGlzLnBhdGggPSBwYXRoLnNwbGl0KFwiXCIpO1xuICAgIH1cbiAgICBleGVjKGV3KSB7XG4gICAgICAgIGlmICh0aGlzLmN1ckluZGV4ID49IHRoaXMucGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VySW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY3VySW5kZXggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmN1ckluZGV4ID0gdGhpcy5wYXRoLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhc3RkaXIgPSB0aGlzLmN1ckluZGV4ID09PSAwID8gdGhpcy5wYXRoW3RoaXMucGF0aC5sZW5ndGggLSAxXSA6IHRoaXMucGF0aFt0aGlzLmN1ckluZGV4IC0gMV07XG4gICAgICAgIGxldCByZXZlcnNlRGlyID0gTWFzb25FbGVtZW50LmdldE9wcG9zaXRlRGlyKGxhc3RkaXIpO1xuICAgICAgICBsZXQgZGlyID0gdGhpcy5wYXRoW3RoaXMuY3VySW5kZXhdO1xuICAgICAgICBsZXQgYmx1ZXByaW50cyA9IHtcbiAgICAgICAgICAgIEU6IHtcbiAgICAgICAgICAgICAgICBtb3ZlU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldEVhc3QoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0U291dGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlubmVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0Tm9ydGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgTjoge1xuICAgICAgICAgICAgICAgIG1vdmVTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0Tm9ydGgoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dGVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0RWFzdCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5uZXJCdWlsZFNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRXZXN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFM6IHtcbiAgICAgICAgICAgICAgICBtb3ZlU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFNvdXRoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvdXRlckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFdlc3QoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlubmVyQnVpbGRTaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXcuZ2V0RWFzdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBXOiB7XG4gICAgICAgICAgICAgICAgbW92ZVNpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldy5nZXRXZXN0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvdXRlckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldE5vcnRoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbm5lckJ1aWxkU2l0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV3LmdldFNvdXRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBtb3ZlU2l0ZSA9IGJsdWVwcmludHNbZGlyXS5tb3ZlU2l0ZSgpO1xuICAgICAgICBjb25zdCBsYXN0U2l0ZSA9IGJsdWVwcmludHNbcmV2ZXJzZURpcl0ubW92ZVNpdGUoKTtcbiAgICAgICAgY29uc3Qgb3V0ZXJCdWlsZFNpdGUgPSBibHVlcHJpbnRzW2Rpcl0ub3V0ZXJCdWlsZFNpdGUoKTtcbiAgICAgICAgY29uc3QgaW5uZXJCdWlsZFNpdGUgPSBibHVlcHJpbnRzW2Rpcl0uaW5uZXJCdWlsZFNpdGUoKTtcbiAgICAgICAgLy9mb3IgY2hhbmdpbmcgZGlyZWN0aW9uc1xuICAgICAgICBpZiAobGFzdGRpciAhPT0gZGlyKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0T3V0ZXJCdWlsZFNpdGUgPSBibHVlcHJpbnRzW2xhc3RkaXJdLm91dGVyQnVpbGRTaXRlKCk7XG4gICAgICAgICAgICBpZiAobGFzdE91dGVyQnVpbGRTaXRlKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUobGFzdE91dGVyQnVpbGRTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuV0FMTCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vYnVpbGQgdGhlIG91dGVyIHdhbGxcbiAgICAgICAgaWYgKG91dGVyQnVpbGRTaXRlKSB7XG4gICAgICAgICAgICBpZiAob3V0ZXJCdWlsZFNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuUkVTIHx8IG91dGVyQnVpbGRTaXRlLmF0b20udHlwZSA9PT0gRWxlbWVudFR5cGVzLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUob3V0ZXJCdWlsZFNpdGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5XQUxMKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9idWlsZCB0aGUgaW5uZXIgd2FsbFxuICAgICAgICBpZiAoaW5uZXJCdWlsZFNpdGUpIHtcbiAgICAgICAgICAgIGlmIChpbm5lckJ1aWxkU2l0ZS5hdG9tLnR5cGUgPT09IEVsZW1lbnRUeXBlcy5SRVMgfHwgaW5uZXJCdWlsZFNpdGUuYXRvbS50eXBlID09PSBFbGVtZW50VHlwZXMuRU1QVFkpIHtcbiAgICAgICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShpbm5lckJ1aWxkU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLldBTEwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL21vdmUgdG8gbmV4dCBzaXRlIGFuZCBsZWF2ZSBhbm90aGVyIG1hc29uIHRvIGhlbHBcbiAgICAgICAgaWYgKG1vdmVTaXRlKSB7XG4gICAgICAgICAgICBldy5vcmlnaW4ubXV0YXRlU2l0ZShtb3ZlU2l0ZSwgbmV3IEF0b20oRWxlbWVudFR5cGVzLk1BU09OLCBbTWFzb25FbGVtZW50LnBhdGhUb1N0cmluZyh0aGlzLnBhdGgpLCB0aGlzLmN1ckluZGV4ICsgMV0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdFNpdGUpIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKGxhc3RTaXRlLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuTUFTT04sIFtNYXNvbkVsZW1lbnQucGF0aFRvU3RyaW5nKHRoaXMucGF0aCksIHRoaXMuY3VySW5kZXggLSAxXSkpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbiAgICAvL1N0YXRpYyBwYXRoIGhlbHBlciBtZXRob2RzXG4gICAgLy9BdCBzb21lIHBvaW50IEkgdGhpbmsgdGhpcyBzaG91bGQgYmUgYnJva2VuIG91dCBpbnRvIGEgdXRpbGl0eSBjbGFzc1xuICAgIC8vTW9yZSBlbGVtZW50cyB3aWxsIHByb2JhYmx5IGJlbmVmaXQgZnJvbSBoYXZpbmcgdGhlIGNvbmNlcHQgb2YgYSBkZWZpbmVkIHBhdGhcbiAgICAvL21ha2UgYSByYW5kb20gd2FsbCBwYXRoXG4gICAgc3RhdGljIHJhbmRvbVBhdGgoKSB7XG4gICAgICAgIGxldCBwYXRoID0gXCJcIjtcbiAgICAgICAgY29uc3QgciA9IChNYXRoLnJhbmRvbSgpICogOCArIDYpID4+IDA7XG4gICAgICAgIGNvbnN0IGNob2ljZXMgPSBbXCJFXCIsIFwiTlwiLCBcIlNcIiwgXCJXXCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZCA9IChNYXRoLnJhbmRvbSgpICogY2hvaWNlcy5sZW5ndGgpID4+IDA7XG4gICAgICAgICAgICBjb25zdCBsID0gKE1hdGgucmFuZG9tKCkgKiAzICsgMykgPj4gMDtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IGNob2ljZXNbZF07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGw7IGorKykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLmNvbmNhdChkaXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICBzdGF0aWMgbGluZVBhdGgobGVuZ3RoID0gNDgsIGRpcmVjdGlvbiA9IFwiRVwiKSB7XG4gICAgICAgIGxldCBwYXRoID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGF0aCA9IHBhdGguY29uY2F0KGRpcmVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcGF0aCA9IHBhdGguY29uY2F0KHRoaXMucmV2ZXJzZVBhdGgocGF0aCkpO1xuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG4gICAgLy9tYWtlIGEgYm94IHBhdGhcbiAgICBzdGF0aWMgYm94UGF0aChzaWRlTGVuZ3RoID0gNykge1xuICAgICAgICBsZXQgcGF0aCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGNob2ljZXMgPSBbXCJFXCIsIFwiTlwiLCBcIldcIiwgXCJTXCJdO1xuICAgICAgICB3aGlsZSAoY2hvaWNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IGNob2ljZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2lkZUxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguY29uY2F0KGRpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9wYXRoID0gcGF0aC5jb25jYXQodGhpcy5yZXZlcnNlUGF0aChwYXRoKSk7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICAvL2NvbnZlcnQgYSBzdHJpbmdbXSB0byBzdHJpbmcgKHBhdGggc2VyaWFsaXphdGlvbilcbiAgICBzdGF0aWMgcGF0aFRvU3RyaW5nKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGgucmVkdWNlKChhY2MsIGRpciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhY2MuY29uY2F0KGRpcik7XG4gICAgICAgIH0sIFwiXCIpO1xuICAgIH1cbiAgICAvL3Rha2UgYSBwYXRoIHdpdGggTixTLEUsVyBhbmQgcmV2ZXJzZSB0aGUgZGlyZWN0aW9uc1xuICAgIHN0YXRpYyByZXZlcnNlUGF0aChwYXRoKSB7XG4gICAgICAgIHBhdGggPSBwYXRoXG4gICAgICAgICAgICAuc3BsaXQoXCJcIilcbiAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgZGlyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQoZGlyKTtcbiAgICAgICAgfSwgXCJcIik7XG4gICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL04vZywgXCJUXCIpO1xuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9TL2csIFwiTlwiKTtcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvVC9nLCBcIlNcIik7XG4gICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL0UvZywgXCJUXCIpO1xuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9XL2csIFwiRVwiKTtcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvVC9nLCBcIldcIik7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICAvL3JldmVyc2UgYSBkaXJlY3Rpb25cbiAgICBzdGF0aWMgZ2V0T3Bwb3NpdGVEaXIoZGlyKSB7XG4gICAgICAgIGxldCBtYXAgPSB7XG4gICAgICAgICAgICBOOiBcIlNcIixcbiAgICAgICAgICAgIFM6IFwiTlwiLFxuICAgICAgICAgICAgRTogXCJXXCIsXG4gICAgICAgICAgICBXOiBcIkVcIlxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbWFwW2Rpcl07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbSB9IGZyb20gXCIuLi9FbGVtXCI7XG5pbXBvcnQgeyBFbGVtZW50VHlwZXMgfSBmcm9tIFwiLi4vRWxlbWVudFR5cGVzXCI7XG5leHBvcnQgY2xhc3MgUmVzRWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuUkVTLm5hbWUsIEVsZW1lbnRUeXBlcy5SRVMudHlwZSk7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgZXcub3JpZ2luLnN3YXBBdG9tcyhldy5nZXRBZGphY2VudDRXYXkodHJ1ZSwgRWxlbWVudFR5cGVzLkVNUFRZKSk7XG4gICAgICAgIHN1cGVyLmV4ZWMoZXcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuaW1wb3J0IHsgQXRvbSB9IGZyb20gXCIuLi9BdG9tXCI7XG5leHBvcnQgY2xhc3MgU2VudHJ5RWxlbWVudCBleHRlbmRzIEVsZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihFbGVtZW50VHlwZXMuU0VOVFJZLm5hbWUsIEVsZW1lbnRUeXBlcy5TRU5UUlkudHlwZSk7XG4gICAgICAgIHRoaXMub25IaWdoQWxlcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wU0VOVFJZX0NSRUFURSA9IDIwO1xuICAgICAgICB0aGlzLnBSRVNfQ1JFQVRFID0gMTAwMDtcbiAgICB9XG4gICAgZXhlYyhldykge1xuICAgICAgICBzdXBlci5leGVjKGV3KTtcbiAgICAgICAgbGV0IGZiID0gZXcuZ2V0TmVhcmVzdChFbGVtZW50VHlwZXMuRk9SS19CT01CKTtcbiAgICAgICAgLy9mb3JrIGJvbWJzIGFyZSBuZWFyISBIaWdoIEFsZXJ0IVxuICAgICAgICBpZiAoZmIpIHtcbiAgICAgICAgICAgIHRoaXMub25IaWdoQWxlcnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZSA9IGV3LmdldE5lYXJlc3QoRWxlbWVudFR5cGVzLlNFTlRSWSk7XG4gICAgICAgIC8vTmVhcmJ5IFNuZXRyeSBpcyBvbiBoaWdoIGFsZXJ0ISBXZSBzaG91bGQgYmUgdG9vIVxuICAgICAgICBpZiAoc2UgJiYgc2UuYXRvbS5lbGVtLm9uSGlnaEFsZXJ0KSB7XG4gICAgICAgICAgICB0aGlzLm9uSGlnaEFsZXJ0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG90YWxOZWFyYnlTZW50cnkgPSBldy5nZXRBbGwoRWxlbWVudFR5cGVzLlNFTlRSWSkubGVuZ3RoO1xuICAgICAgICAvL0tpbmRhIGJvcmluZyBhbmQgY3Jvd2RlZCBhcm91bmQgaGVyZSwgcmVxdWVzdGluZyBob25vcmFibGUgZGlzY2hhcmdlLCBzaXIhXG4gICAgICAgIGlmICghdGhpcy5vbkhpZ2hBbGVydCAmJiB0b3RhbE5lYXJieVNlbnRyeSA+IDIpIHtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5raWxsU2VsZihuZXcgQXRvbShFbGVtZW50VHlwZXMuUkVTKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9SZXMgbmVhcmJ5PyBNYXliZSByZWNydWl0IHNvbWVvbmUgZm9yIHRoZSBjYXVzZVxuICAgICAgICB2YXIgcmVzID0gZXcuZ2V0QWRqYWNlbnQ4V2F5KHRydWUsIEVsZW1lbnRUeXBlcy5SRVMpO1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAvL2lmIGhpZ2ggYWxlcnQsIGRlZmluaXRlbHkgcmVjcnVpdCwgb3RoZXJ3aXNlLCBtYXliZVxuICAgICAgICAgICAgaWYgKHRoaXMub25IaWdoQWxlcnQgfHwgTWF0aC5yYW5kb20oKSAqIHRoaXMucFNFTlRSWV9DUkVBVEUgPCAxKSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUocmVzLCBuZXcgQXRvbShFbGVtZW50VHlwZXMuU0VOVFJZKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL25vIHJlcyBuZWFyYnksIG1heWJlIHdlIHNob3VsZCBtYWtlIG9uZS5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChNYXRoLnJhbmRvbSgpICogdGhpcy5wUkVTX0NSRUFURSA8IDEpIHtcbiAgICAgICAgICAgIGxldCBuZWFyRW1wdHkgPSBldy5nZXROZWFyZXN0KEVsZW1lbnRUeXBlcy5FTVBUWSk7XG4gICAgICAgICAgICBpZiAobmVhckVtcHR5KSB7XG4gICAgICAgICAgICAgICAgZXcub3JpZ2luLm11dGF0ZVNpdGUobmVhckVtcHR5LCBuZXcgQXRvbShFbGVtZW50VHlwZXMuUkVTKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9GaXJlISEhXG4gICAgICAgIGlmICh0aGlzLm9uSGlnaEFsZXJ0KSB7XG4gICAgICAgICAgICB2YXIgZSA9IGV3LmdldE5lYXJlc3QoRWxlbWVudFR5cGVzLkVNUFRZKTtcbiAgICAgICAgICAgIGV3Lm9yaWdpbi5tdXRhdGVTaXRlKGUsIG5ldyBBdG9tKEVsZW1lbnRUeXBlcy5BTlRJX0ZPUktfQk9NQikpO1xuICAgICAgICAgICAgdGhpcy5vbkhpZ2hBbGVydCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vcGF0cm9sXG4gICAgICAgIGV3Lm9yaWdpbi5zd2FwQXRvbXMoZXcuZ2V0QWRqYWNlbnQ0V2F5KHRydWUsIEVsZW1lbnRUeXBlcy5FTVBUWSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVsZW0gfSBmcm9tIFwiLi4vRWxlbVwiO1xuaW1wb3J0IHsgRWxlbWVudFR5cGVzIH0gZnJvbSBcIi4uL0VsZW1lbnRUeXBlc1wiO1xuZXhwb3J0IGNsYXNzIFdhbGxFbGVtZW50IGV4dGVuZHMgRWxlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEVsZW1lbnRUeXBlcy5XQUxMLm5hbWUsIEVsZW1lbnRUeXBlcy5XQUxMLnR5cGUsIDAsIDEwMCk7XG4gICAgfVxuICAgIGV4ZWMoZXcpIHtcbiAgICAgICAgc3VwZXIuZXhlYyhldyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnRXaW5kb3cgfSBmcm9tIFwiLi4vY2xhc3Nlcy9FdmVudHdpbmRvd1wiO1xuZXhwb3J0IGNsYXNzIE1GTVV0aWxzIHtcbiAgICBzdGF0aWMgQ3RvSUQoYykge1xuICAgICAgICByZXR1cm4gYCR7Yy5yb3d9OiR7Yy5jb2x9YDtcbiAgICB9XG4gICAgc3RhdGljIElEdG9DKGlkKSB7XG4gICAgICAgIGxldCByY2EgPSBpZC5zcGxpdChcIjpcIik7XG4gICAgICAgIHJldHVybiB7IHJvdzogcGFyc2VJbnQocmNhWzBdKSwgY29sOiBwYXJzZUludChyY2FbMV0pIH07XG4gICAgfVxuICAgIHN0YXRpYyBHZW5lcmF0ZUV2ZW50V2luZG93KHRpbGUsIHcsIGgpIHtcbiAgICAgICAgbGV0IHJjID0gKE1hdGgucmFuZG9tKCkgKiB3KSA+PiAwO1xuICAgICAgICBsZXQgcnIgPSAoTWF0aC5yYW5kb20oKSAqIGgpID4+IDA7XG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRXaW5kb3codGlsZSwgeyByb3c6IHJyLCBjb2w6IHJjIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=