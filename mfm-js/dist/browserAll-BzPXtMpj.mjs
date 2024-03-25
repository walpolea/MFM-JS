import { P as m, r as J, E as w, T as B, U as Q, a as ee, w as y, e as z, C as Z } from "./main-Dh78mr3i.mjs";
import "./webworkerAll-DXpoY56r.mjs";
class M {
  /**
   * @param manager - The event boundary which manages this event. Propagation can only occur
   *  within the boundary's jurisdiction.
   */
  constructor(e) {
    this.bubbles = !0, this.cancelBubble = !0, this.cancelable = !1, this.composed = !1, this.defaultPrevented = !1, this.eventPhase = M.prototype.NONE, this.propagationStopped = !1, this.propagationImmediatelyStopped = !1, this.layer = new m(), this.page = new m(), this.NONE = 0, this.CAPTURING_PHASE = 1, this.AT_TARGET = 2, this.BUBBLING_PHASE = 3, this.manager = e;
  }
  /** @readonly */
  get layerX() {
    return this.layer.x;
  }
  /** @readonly */
  get layerY() {
    return this.layer.y;
  }
  /** @readonly */
  get pageX() {
    return this.page.x;
  }
  /** @readonly */
  get pageY() {
    return this.page.y;
  }
  /**
   * Fallback for the deprecated @code{InteractionEvent.data}.
   * @deprecated since 7.0.0
   */
  get data() {
    return this;
  }
  /** The propagation path for this event. Alias for {@link EventBoundary.propagationPath}. */
  composedPath() {
    return this.manager && (!this.path || this.path[this.path.length - 1] !== this.target) && (this.path = this.target ? this.manager.propagationPath(this.target) : []), this.path;
  }
  /**
   * Unimplemented method included for implementing the DOM interface {@code Event}. It will throw an {@code Error}.
   * @deprecated
   * @param _type
   * @param _bubbles
   * @param _cancelable
   */
  initEvent(e, t, i) {
    throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.");
  }
  /**
   * Unimplemented method included for implementing the DOM interface {@code UIEvent}. It will throw an {@code Error}.
   * @deprecated
   * @param _typeArg
   * @param _bubblesArg
   * @param _cancelableArg
   * @param _viewArg
   * @param _detailArg
   */
  initUIEvent(e, t, i, n, s) {
    throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.");
  }
  /** Prevent default behavior of PixiJS and the user agent. */
  preventDefault() {
    this.nativeEvent instanceof Event && this.nativeEvent.cancelable && this.nativeEvent.preventDefault(), this.defaultPrevented = !0;
  }
  /**
   * Stop this event from propagating to any addition listeners, including on the
   * {@link FederatedEventTarget.currentTarget currentTarget} and also the following
   * event targets on the propagation path.
   */
  stopImmediatePropagation() {
    this.propagationImmediatelyStopped = !0;
  }
  /**
   * Stop this event from propagating to the next {@link FederatedEventTarget}. The rest of the listeners
   * on the {@link FederatedEventTarget.currentTarget currentTarget} will still be notified.
   */
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
var O = /iPhone/i, C = /iPod/i, S = /iPad/i, U = /\biOS-universal(?:.+)Mac\b/i, k = /\bAndroid(?:.+)Mobile\b/i, H = /Android/i, b = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, A = /Silk/i, g = /Windows Phone/i, X = /\bWindows(?:.+)ARM\b/i, R = /BlackBerry/i, F = /BB10/i, Y = /Opera Mini/i, K = /\b(CriOS|Chrome)(?:.+)Mobile/i, $ = /Mobile(?:.+)Firefox\b/i, G = function(r) {
  return typeof r < "u" && r.platform === "MacIntel" && typeof r.maxTouchPoints == "number" && r.maxTouchPoints > 1 && typeof MSStream > "u";
};
function te(r) {
  return function(e) {
    return e.test(r);
  };
}
function W(r) {
  var e = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  !r && typeof navigator < "u" ? e = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  } : typeof r == "string" ? e.userAgent = r : r && r.userAgent && (e = {
    userAgent: r.userAgent,
    platform: r.platform,
    maxTouchPoints: r.maxTouchPoints || 0
  });
  var t = e.userAgent, i = t.split("[FBAN");
  typeof i[1] < "u" && (t = i[0]), i = t.split("Twitter"), typeof i[1] < "u" && (t = i[0]);
  var n = te(t), s = {
    apple: {
      phone: n(O) && !n(g),
      ipod: n(C),
      tablet: !n(O) && (n(S) || G(e)) && !n(g),
      universal: n(U),
      device: (n(O) || n(C) || n(S) || n(U) || G(e)) && !n(g)
    },
    amazon: {
      phone: n(b),
      tablet: !n(b) && n(A),
      device: n(b) || n(A)
    },
    android: {
      phone: !n(g) && n(b) || !n(g) && n(k),
      tablet: !n(g) && !n(b) && !n(k) && (n(A) || n(H)),
      device: !n(g) && (n(b) || n(A) || n(k) || n(H)) || n(/\bokhttp\b/i)
    },
    windows: {
      phone: n(g),
      tablet: n(X),
      device: n(g) || n(X)
    },
    other: {
      blackberry: n(R),
      blackberry10: n(F),
      opera: n(Y),
      firefox: n($),
      chrome: n(K),
      device: n(R) || n(F) || n(Y) || n($) || n(K)
    },
    any: !1,
    phone: !1,
    tablet: !1
  };
  return s.any = s.apple.device || s.android.device || s.windows.device || s.other.device, s.phone = s.apple.phone || s.android.phone || s.windows.phone, s.tablet = s.apple.tablet || s.android.tablet || s.windows.tablet, s;
}
const ie = W.default ?? W, ne = ie(globalThis.navigator), se = 9, I = 100, oe = 0, re = 0, j = 2, N = 1, ae = -1e3, he = -1e3, le = 2;
class V {
  // 2fps
  // eslint-disable-next-line jsdoc/require-param
  /**
   * @param {WebGLRenderer|WebGPURenderer} renderer - A reference to the current renderer
   */
  constructor(e, t = ne) {
    this._mobileInfo = t, this.debug = !1, this._isActive = !1, this._isMobileAccessibility = !1, this._pool = [], this._renderId = 0, this._children = [], this._androidUpdateCount = 0, this._androidUpdateFrequency = 500, this._hookDiv = null, (t.tablet || t.phone) && this._createTouchHook();
    const i = document.createElement("div");
    i.style.width = `${I}px`, i.style.height = `${I}px`, i.style.position = "absolute", i.style.top = `${oe}px`, i.style.left = `${re}px`, i.style.zIndex = j.toString(), this._div = i, this._renderer = e, this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), globalThis.addEventListener("keydown", this._onKeyDown, !1);
  }
  /**
   * Value of `true` if accessibility is currently active and accessibility layers are showing.
   * @member {boolean}
   * @readonly
   */
  get isActive() {
    return this._isActive;
  }
  /**
   * Value of `true` if accessibility is enabled for touch devices.
   * @member {boolean}
   * @readonly
   */
  get isMobileAccessibility() {
    return this._isMobileAccessibility;
  }
  get hookDiv() {
    return this._hookDiv;
  }
  /**
   * Creates the touch hooks.
   * @private
   */
  _createTouchHook() {
    const e = document.createElement("button");
    e.style.width = `${N}px`, e.style.height = `${N}px`, e.style.position = "absolute", e.style.top = `${ae}px`, e.style.left = `${he}px`, e.style.zIndex = le.toString(), e.style.backgroundColor = "#FF0000", e.title = "select to enable accessibility for this content", e.addEventListener("focus", () => {
      this._isMobileAccessibility = !0, this._activate(), this._destroyTouchHook();
    }), document.body.appendChild(e), this._hookDiv = e;
  }
  /**
   * Destroys the touch hooks.
   * @private
   */
  _destroyTouchHook() {
    this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null);
  }
  /**
   * Activating will cause the Accessibility layer to be shown.
   * This is called when a user presses the tab key.
   * @private
   */
  _activate() {
    var e;
    this._isActive || (this._isActive = !0, globalThis.document.addEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown, !1), this._renderer.runners.postrender.add(this), (e = this._renderer.view.canvas.parentNode) == null || e.appendChild(this._div));
  }
  /**
   * Deactivating will cause the Accessibility layer to be hidden.
   * This is called when a user moves the mouse.
   * @private
   */
  _deactivate() {
    var e;
    !this._isActive || this._isMobileAccessibility || (this._isActive = !1, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.addEventListener("keydown", this._onKeyDown, !1), this._renderer.runners.postrender.remove(this), (e = this._div.parentNode) == null || e.removeChild(this._div));
  }
  /**
   * This recursive function will run through the scene graph and add any new accessible objects to the DOM layer.
   * @private
   * @param {Container} container - The Container to check.
   */
  _updateAccessibleObjects(e) {
    if (!e.visible || !e.accessibleChildren)
      return;
    e.accessible && e.isInteractive() && (e._accessibleActive || this._addChild(e), e._renderId = this._renderId);
    const t = e.children;
    if (t)
      for (let i = 0; i < t.length; i++)
        this._updateAccessibleObjects(t[i]);
  }
  /**
   * Runner init called, view is available at this point.
   * @ignore
   */
  init(e) {
    this.debug = (e == null ? void 0 : e.debug) ?? this.debug, this._renderer.runners.postrender.remove(this);
  }
  /**
   * Runner postrender was called, ensure that all divs are mapped correctly to their Containers.
   * Only fires while active.
   * @ignore
   */
  postrender() {
    const e = performance.now();
    if (this._mobileInfo.android.device && e < this._androidUpdateCount || (this._androidUpdateCount = e + this._androidUpdateFrequency, !this._renderer.renderingToScreen || !this._renderer.view.canvas))
      return;
    this._renderer.lastObjectRendered && this._updateAccessibleObjects(this._renderer.lastObjectRendered);
    const { x: t, y: i, width: n, height: s } = this._renderer.view.canvas.getBoundingClientRect(), { width: o, height: a, resolution: c } = this._renderer, p = n / o * c, v = s / a * c;
    let h = this._div;
    h.style.left = `${t}px`, h.style.top = `${i}px`, h.style.width = `${o}px`, h.style.height = `${a}px`;
    for (let l = 0; l < this._children.length; l++) {
      const u = this._children[l];
      if (u._renderId !== this._renderId)
        u._accessibleActive = !1, J(this._children, l, 1), this._div.removeChild(u._accessibleDiv), this._pool.push(u._accessibleDiv), u._accessibleDiv = null, l--;
      else {
        h = u._accessibleDiv;
        let d = u.hitArea;
        const _ = u.worldTransform;
        u.hitArea ? (h.style.left = `${(_.tx + d.x * _.a) * p}px`, h.style.top = `${(_.ty + d.y * _.d) * v}px`, h.style.width = `${d.width * _.a * p}px`, h.style.height = `${d.height * _.d * v}px`) : (d = u.getBounds().rectangle, this._capHitArea(d), h.style.left = `${d.x * p}px`, h.style.top = `${d.y * v}px`, h.style.width = `${d.width * p}px`, h.style.height = `${d.height * v}px`, h.title !== u.accessibleTitle && u.accessibleTitle !== null && (h.title = u.accessibleTitle), h.getAttribute("aria-label") !== u.accessibleHint && u.accessibleHint !== null && h.setAttribute("aria-label", u.accessibleHint)), (u.accessibleTitle !== h.title || u.tabIndex !== h.tabIndex) && (h.title = u.accessibleTitle, h.tabIndex = u.tabIndex, this.debug && this._updateDebugHTML(h));
      }
    }
    this._renderId++;
  }
  /**
   * private function that will visually add the information to the
   * accessibility div
   * @param {HTMLElement} div -
   */
  _updateDebugHTML(e) {
    e.innerHTML = `type: ${e.type}</br> title : ${e.title}</br> tabIndex: ${e.tabIndex}`;
  }
  /**
   * Adjust the hit area based on the bounds of a display object
   * @param {Rectangle} hitArea - Bounds of the child
   */
  _capHitArea(e) {
    e.x < 0 && (e.width += e.x, e.x = 0), e.y < 0 && (e.height += e.y, e.y = 0);
    const { width: t, height: i } = this._renderer;
    e.x + e.width > t && (e.width = t - e.x), e.y + e.height > i && (e.height = i - e.y);
  }
  /**
   * Adds a Container to the accessibility manager
   * @private
   * @param {Container} container - The child to make accessible.
   */
  _addChild(e) {
    let t = this._pool.pop();
    t || (t = document.createElement("button"), t.style.width = `${I}px`, t.style.height = `${I}px`, t.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", t.style.position = "absolute", t.style.zIndex = j.toString(), t.style.borderStyle = "none", navigator.userAgent.toLowerCase().includes("chrome") ? t.setAttribute("aria-live", "off") : t.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? t.setAttribute("aria-relevant", "additions") : t.setAttribute("aria-relevant", "text"), t.addEventListener("click", this._onClick.bind(this)), t.addEventListener("focus", this._onFocus.bind(this)), t.addEventListener("focusout", this._onFocusOut.bind(this))), t.style.pointerEvents = e.accessiblePointerEvents, t.type = e.accessibleType, e.accessibleTitle && e.accessibleTitle !== null ? t.title = e.accessibleTitle : (!e.accessibleHint || e.accessibleHint === null) && (t.title = `container ${e.tabIndex}`), e.accessibleHint && e.accessibleHint !== null && t.setAttribute("aria-label", e.accessibleHint), this.debug && this._updateDebugHTML(t), e._accessibleActive = !0, e._accessibleDiv = t, t.container = e, this._children.push(e), this._div.appendChild(e._accessibleDiv), e._accessibleDiv.tabIndex = e.tabIndex;
  }
  /**
   * Dispatch events with the EventSystem.
   * @param e
   * @param type
   * @private
   */
  _dispatchEvent(e, t) {
    const { container: i } = e.target, n = this._renderer.events.rootBoundary, s = Object.assign(new M(n), { target: i });
    n.rootTarget = this._renderer.lastObjectRendered, t.forEach((o) => n.dispatchEvent(s, o));
  }
  /**
   * Maps the div button press to pixi's EventSystem (click)
   * @private
   * @param {MouseEvent} e - The click event.
   */
  _onClick(e) {
    this._dispatchEvent(e, ["click", "pointertap", "tap"]);
  }
  /**
   * Maps the div focus events to pixi's EventSystem (mouseover)
   * @private
   * @param {FocusEvent} e - The focus event.
   */
  _onFocus(e) {
    e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "assertive"), this._dispatchEvent(e, ["mouseover"]);
  }
  /**
   * Maps the div focus events to pixi's EventSystem (mouseout)
   * @private
   * @param {FocusEvent} e - The focusout event.
   */
  _onFocusOut(e) {
    e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "polite"), this._dispatchEvent(e, ["mouseout"]);
  }
  /**
   * Is called when a key is pressed
   * @private
   * @param {KeyboardEvent} e - The keydown event.
   */
  _onKeyDown(e) {
    e.keyCode === se && this._activate();
  }
  /**
   * Is called when the mouse moves across the renderer element
   * @private
   * @param {MouseEvent} e - The mouse event.
   */
  _onMouseMove(e) {
    e.movementX === 0 && e.movementY === 0 || this._deactivate();
  }
  /** Destroys the accessibility manager */
  destroy() {
    this._destroyTouchHook(), this._div = null, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown), this._pool = null, this._children = null, this._renderer = null;
  }
}
V.extension = {
  type: [
    w.WebGLSystem,
    w.WebGPUSystem
  ],
  name: "accessibility"
};
const ue = {
  /**
   * Flag for if the object is accessible. If true AccessibilityManager will overlay a
   * shadow div with attributes set
   * @member {boolean}
   * @memberof scene.Container#
   */
  accessible: !1,
  /**
   * Sets the title attribute of the shadow div
   * If accessibleTitle AND accessibleHint has not been this will default to 'container [tabIndex]'
   * @member {string}
   * @memberof scene.Container#
   */
  accessibleTitle: null,
  /**
   * Sets the aria-label attribute of the shadow div
   * @member {string}
   * @memberof scene.Container#
   */
  accessibleHint: null,
  /**
   * @member {number}
   * @memberof scene.Container#
   * @todo Needs docs.
   */
  tabIndex: 0,
  /**
   * @member {boolean}
   * @memberof scene.Container#
   * @private
   */
  _accessibleActive: !1,
  /**
   * @memberof scene.Container#
   * @private
   */
  _accessibleDiv: null,
  /**
   * Specify the type of div the accessible layer is. Screen readers treat the element differently
   * depending on this type. Defaults to button.
   * @member {string}
   * @memberof scene.Container#
   * @default 'button'
   */
  accessibleType: "button",
  /**
   * Specify the pointer-events the accessible div will use
   * Defaults to auto.
   * @type {PointerEvents}
   * @memberof scene.Container#
   * @default 'auto'
   */
  accessiblePointerEvents: "auto",
  /**
   * Setting to false will prevent any children inside this container to
   * be accessible. Defaults to true.
   * @member {boolean}
   * @memberof scene.Container#
   * @default true
   */
  accessibleChildren: !0,
  /**
   * @member {number}
   * @memberof scene.Container#
   * @private
   */
  _renderId: -1
};
class de {
  constructor() {
    this.interactionFrequency = 10, this._deltaTime = 0, this._didMove = !1, this._tickerAdded = !1, this._pauseUpdate = !0;
  }
  /**
   * Initializes the event ticker.
   * @param events - The event system.
   */
  init(e) {
    this.removeTickerListener(), this.events = e, this.interactionFrequency = 10, this._deltaTime = 0, this._didMove = !1, this._tickerAdded = !1, this._pauseUpdate = !0;
  }
  /** Whether to pause the update checks or not. */
  get pauseUpdate() {
    return this._pauseUpdate;
  }
  set pauseUpdate(e) {
    this._pauseUpdate = e;
  }
  /** Adds the ticker listener. */
  addTickerListener() {
    this._tickerAdded || !this.domElement || (B.system.add(this._tickerUpdate, this, Q.INTERACTION), this._tickerAdded = !0);
  }
  /** Removes the ticker listener. */
  removeTickerListener() {
    this._tickerAdded && (B.system.remove(this._tickerUpdate, this), this._tickerAdded = !1);
  }
  /** Sets flag to not fire extra events when the user has already moved there mouse */
  pointerMoved() {
    this._didMove = !0;
  }
  /** Updates the state of interactive objects. */
  _update() {
    if (!this.domElement || this._pauseUpdate)
      return;
    if (this._didMove) {
      this._didMove = !1;
      return;
    }
    const e = this.events._rootPointerEvent;
    this.events.supportsTouchEvents && e.pointerType === "touch" || globalThis.document.dispatchEvent(new PointerEvent("pointermove", {
      clientX: e.clientX,
      clientY: e.clientY
    }));
  }
  /**
   * Updates the state of interactive objects if at least {@link interactionFrequency}
   * milliseconds have passed since the last invocation.
   *
   * Invoked by a throttled ticker update from {@link Ticker.system}.
   * @param ticker - The throttled ticker.
   */
  _tickerUpdate(e) {
    this._deltaTime += e.deltaTime, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this._update());
  }
}
const E = new de();
class D extends M {
  constructor() {
    super(...arguments), this.client = new m(), this.movement = new m(), this.offset = new m(), this.global = new m(), this.screen = new m();
  }
  /** @readonly */
  get clientX() {
    return this.client.x;
  }
  /** @readonly */
  get clientY() {
    return this.client.y;
  }
  /**
   * Alias for {@link FederatedMouseEvent.clientX this.clientX}.
   * @readonly
   */
  get x() {
    return this.clientX;
  }
  /**
   * Alias for {@link FederatedMouseEvent.clientY this.clientY}.
   * @readonly
   */
  get y() {
    return this.clientY;
  }
  /** @readonly */
  get movementX() {
    return this.movement.x;
  }
  /** @readonly */
  get movementY() {
    return this.movement.y;
  }
  /** @readonly */
  get offsetX() {
    return this.offset.x;
  }
  /** @readonly */
  get offsetY() {
    return this.offset.y;
  }
  /** @readonly */
  get globalX() {
    return this.global.x;
  }
  /** @readonly */
  get globalY() {
    return this.global.y;
  }
  /**
   * The pointer coordinates in the renderer's screen. Alias for {@code screen.x}.
   * @readonly
   */
  get screenX() {
    return this.screen.x;
  }
  /**
   * The pointer coordinates in the renderer's screen. Alias for {@code screen.y}.
   * @readonly
   */
  get screenY() {
    return this.screen.y;
  }
  /**
   * This will return the local coordinates of the specified container for this InteractionData
   * @param {Container} container - The Container that you would like the local
   *  coords off
   * @param {PointData} point - A Point object in which to store the value, optional (otherwise
   *  will create a new point)
   * @param {PointData} globalPos - A Point object containing your custom global coords, optional
   *  (otherwise will use the current global coords)
   * @returns - A point containing the coordinates of the InteractionData position relative
   *  to the Container
   */
  getLocalPosition(e, t, i) {
    return e.worldTransform.applyInverse(i || this.global, t);
  }
  /**
   * Whether the modifier key was pressed when this event natively occurred.
   * @param key - The modifier key.
   */
  getModifierState(e) {
    return "getModifierState" in this.nativeEvent && this.nativeEvent.getModifierState(e);
  }
  /**
   * Not supported.
   * @param _typeArg
   * @param _canBubbleArg
   * @param _cancelableArg
   * @param _viewArg
   * @param _detailArg
   * @param _screenXArg
   * @param _screenYArg
   * @param _clientXArg
   * @param _clientYArg
   * @param _ctrlKeyArg
   * @param _altKeyArg
   * @param _shiftKeyArg
   * @param _metaKeyArg
   * @param _buttonArg
   * @param _relatedTargetArg
   * @deprecated since 7.0.0
   */
  // eslint-disable-next-line max-params
  initMouseEvent(e, t, i, n, s, o, a, c, p, v, h, l, u, d, _) {
    throw new Error("Method not implemented.");
  }
}
class f extends D {
  constructor() {
    super(...arguments), this.width = 0, this.height = 0, this.isPrimary = !1;
  }
  // Only included for completeness for now
  getCoalescedEvents() {
    return this.type === "pointermove" || this.type === "mousemove" || this.type === "touchmove" ? [this] : [];
  }
  // Only included for completeness for now
  getPredictedEvents() {
    throw new Error("getPredictedEvents is not supported!");
  }
}
class T extends D {
  constructor() {
    super(...arguments), this.DOM_DELTA_PIXEL = 0, this.DOM_DELTA_LINE = 1, this.DOM_DELTA_PAGE = 2;
  }
}
T.DOM_DELTA_PIXEL = 0;
T.DOM_DELTA_LINE = 1;
T.DOM_DELTA_PAGE = 2;
const ce = 2048, pe = new m(), P = new m();
class ve {
  /**
   * @param rootTarget - The holder of the event boundary.
   */
  constructor(e) {
    this.dispatch = new ee(), this.moveOnAll = !1, this.enableGlobalMoveEvents = !0, this.mappingState = {
      trackingData: {}
    }, this.eventPool = /* @__PURE__ */ new Map(), this._allInteractiveElements = [], this._hitElements = [], this._isPointerMoveEvent = !1, this.rootTarget = e, this.hitPruneFn = this.hitPruneFn.bind(this), this.hitTestFn = this.hitTestFn.bind(this), this.mapPointerDown = this.mapPointerDown.bind(this), this.mapPointerMove = this.mapPointerMove.bind(this), this.mapPointerOut = this.mapPointerOut.bind(this), this.mapPointerOver = this.mapPointerOver.bind(this), this.mapPointerUp = this.mapPointerUp.bind(this), this.mapPointerUpOutside = this.mapPointerUpOutside.bind(this), this.mapWheel = this.mapWheel.bind(this), this.mappingTable = {}, this.addEventMapping("pointerdown", this.mapPointerDown), this.addEventMapping("pointermove", this.mapPointerMove), this.addEventMapping("pointerout", this.mapPointerOut), this.addEventMapping("pointerleave", this.mapPointerOut), this.addEventMapping("pointerover", this.mapPointerOver), this.addEventMapping("pointerup", this.mapPointerUp), this.addEventMapping("pointerupoutside", this.mapPointerUpOutside), this.addEventMapping("wheel", this.mapWheel);
  }
  /**
   * Adds an event mapping for the event `type` handled by `fn`.
   *
   * Event mappings can be used to implement additional or custom events. They take an event
   * coming from the upstream scene (or directly from the {@link EventSystem}) and dispatch new downstream events
   * generally trickling down and bubbling up to {@link EventBoundary.rootTarget this.rootTarget}.
   *
   * To modify the semantics of existing events, the built-in mapping methods of EventBoundary should be overridden
   * instead.
   * @param type - The type of upstream event to map.
   * @param fn - The mapping method. The context of this function must be bound manually, if desired.
   */
  addEventMapping(e, t) {
    this.mappingTable[e] || (this.mappingTable[e] = []), this.mappingTable[e].push({
      fn: t,
      priority: 0
    }), this.mappingTable[e].sort((i, n) => i.priority - n.priority);
  }
  /**
   * Dispatches the given event
   * @param e - The event to dispatch.
   * @param type - The type of event to dispatch. Defaults to `e.type`.
   */
  dispatchEvent(e, t) {
    e.propagationStopped = !1, e.propagationImmediatelyStopped = !1, this.propagate(e, t), this.dispatch.emit(t || e.type, e);
  }
  /**
   * Maps the given upstream event through the event boundary and propagates it downstream.
   * @param e - The event to map.
   */
  mapEvent(e) {
    if (!this.rootTarget)
      return;
    const t = this.mappingTable[e.type];
    if (t)
      for (let i = 0, n = t.length; i < n; i++)
        t[i].fn(e);
    else
      y(`[EventBoundary]: Event mapping not defined for ${e.type}`);
  }
  /**
   * Finds the Container that is the target of a event at the given coordinates.
   *
   * The passed (x,y) coordinates are in the world space above this event boundary.
   * @param x - The x coordinate of the event.
   * @param y - The y coordinate of the event.
   */
  hitTest(e, t) {
    E.pauseUpdate = !0;
    const n = this._isPointerMoveEvent && this.enableGlobalMoveEvents ? "hitTestMoveRecursive" : "hitTestRecursive", s = this[n](
      this.rootTarget,
      this.rootTarget.eventMode,
      pe.set(e, t),
      this.hitTestFn,
      this.hitPruneFn
    );
    return s && s[0];
  }
  /**
   * Propagate the passed event from from {@link EventBoundary.rootTarget this.rootTarget} to its
   * target {@code e.target}.
   * @param e - The event to propagate.
   * @param type - The type of event to propagate. Defaults to `e.type`.
   */
  propagate(e, t) {
    if (!e.target)
      return;
    const i = e.composedPath();
    e.eventPhase = e.CAPTURING_PHASE;
    for (let n = 0, s = i.length - 1; n < s; n++)
      if (e.currentTarget = i[n], this.notifyTarget(e, t), e.propagationStopped || e.propagationImmediatelyStopped)
        return;
    if (e.eventPhase = e.AT_TARGET, e.currentTarget = e.target, this.notifyTarget(e, t), !(e.propagationStopped || e.propagationImmediatelyStopped)) {
      e.eventPhase = e.BUBBLING_PHASE;
      for (let n = i.length - 2; n >= 0; n--)
        if (e.currentTarget = i[n], this.notifyTarget(e, t), e.propagationStopped || e.propagationImmediatelyStopped)
          return;
    }
  }
  /**
   * Emits the event {@code e} to all interactive containers. The event is propagated in the bubbling phase always.
   *
   * This is used in the `globalpointermove` event.
   * @param e - The emitted event.
   * @param type - The listeners to notify.
   * @param targets - The targets to notify.
   */
  all(e, t, i = this._allInteractiveElements) {
    if (i.length === 0)
      return;
    e.eventPhase = e.BUBBLING_PHASE;
    const n = Array.isArray(t) ? t : [t];
    for (let s = i.length - 1; s >= 0; s--)
      n.forEach((o) => {
        e.currentTarget = i[s], this.notifyTarget(e, o);
      });
  }
  /**
   * Finds the propagation path from {@link EventBoundary.rootTarget rootTarget} to the passed
   * {@code target}. The last element in the path is {@code target}.
   * @param target - The target to find the propagation path to.
   */
  propagationPath(e) {
    const t = [e];
    for (let i = 0; i < ce && e !== this.rootTarget && e.parent; i++) {
      if (!e.parent)
        throw new Error("Cannot find propagation path to disconnected target");
      t.push(e.parent), e = e.parent;
    }
    return t.reverse(), t;
  }
  hitTestMoveRecursive(e, t, i, n, s, o = !1) {
    let a = !1;
    if (this._interactivePrune(e))
      return null;
    if ((e.eventMode === "dynamic" || t === "dynamic") && (E.pauseUpdate = !1), e.interactiveChildren && e.children) {
      const v = e.children;
      for (let h = v.length - 1; h >= 0; h--) {
        const l = v[h], u = this.hitTestMoveRecursive(
          l,
          this._isInteractive(t) ? t : l.eventMode,
          i,
          n,
          s,
          o || s(e, i)
        );
        if (u) {
          if (u.length > 0 && !u[u.length - 1].parent)
            continue;
          const d = e.isInteractive();
          (u.length > 0 || d) && (d && this._allInteractiveElements.push(e), u.push(e)), this._hitElements.length === 0 && (this._hitElements = u), a = !0;
        }
      }
    }
    const c = this._isInteractive(t), p = e.isInteractive();
    return p && p && this._allInteractiveElements.push(e), o || this._hitElements.length > 0 ? null : a ? this._hitElements : c && !s(e, i) && n(e, i) ? p ? [e] : [] : null;
  }
  /**
   * Recursive implementation for {@link EventBoundary.hitTest hitTest}.
   * @param currentTarget - The Container that is to be hit tested.
   * @param eventMode - The event mode for the `currentTarget` or one of its parents.
   * @param location - The location that is being tested for overlap.
   * @param testFn - Callback that determines whether the target passes hit testing. This callback
   *  can assume that `pruneFn` failed to prune the container.
   * @param pruneFn - Callback that determiness whether the target and all of its children
   *  cannot pass the hit test. It is used as a preliminary optimization to prune entire subtrees
   *  of the scene graph.
   * @returns An array holding the hit testing target and all its ancestors in order. The first element
   *  is the target itself and the last is {@link EventBoundary.rootTarget rootTarget}. This is the opposite
   *  order w.r.t. the propagation path. If no hit testing target is found, null is returned.
   */
  hitTestRecursive(e, t, i, n, s) {
    if (this._interactivePrune(e) || s(e, i))
      return null;
    if ((e.eventMode === "dynamic" || t === "dynamic") && (E.pauseUpdate = !1), e.interactiveChildren && e.children) {
      const c = e.children, p = i;
      for (let v = c.length - 1; v >= 0; v--) {
        const h = c[v], l = this.hitTestRecursive(
          h,
          this._isInteractive(t) ? t : h.eventMode,
          p,
          n,
          s
        );
        if (l) {
          if (l.length > 0 && !l[l.length - 1].parent)
            continue;
          const u = e.isInteractive();
          return (l.length > 0 || u) && l.push(e), l;
        }
      }
    }
    const o = this._isInteractive(t), a = e.isInteractive();
    return o && n(e, i) ? a ? [e] : [] : null;
  }
  _isInteractive(e) {
    return e === "static" || e === "dynamic";
  }
  _interactivePrune(e) {
    return !e || !e.visible || !e.renderable || e.eventMode === "none" || e.eventMode === "passive" && !e.interactiveChildren;
  }
  /**
   * Checks whether the container or any of its children cannot pass the hit test at all.
   *
   * {@link EventBoundary}'s implementation uses the {@link Container.hitArea hitArea}
   * and {@link Container._mask} for pruning.
   * @param container - The container to prune.
   * @param location - The location to test for overlap.
   */
  hitPruneFn(e, t) {
    if (e.hitArea && (e.worldTransform.applyInverse(t, P), !e.hitArea.contains(P.x, P.y)))
      return !0;
    if (e.effects && e.effects.length)
      for (let i = 0; i < e.effects.length; i++) {
        const n = e.effects[i];
        if (n.containsPoint && !n.containsPoint(t, this.hitTestFn))
          return !0;
      }
    return !1;
  }
  /**
   * Checks whether the container passes hit testing for the given location.
   * @param container - The container to test.
   * @param location - The location to test for overlap.
   * @returns - Whether `container` passes hit testing for `location`.
   */
  hitTestFn(e, t) {
    return e.hitArea ? !0 : e != null && e.containsPoint ? (e.worldTransform.applyInverse(t, P), e.containsPoint(P)) : !1;
  }
  /**
   * Notify all the listeners to the event's `currentTarget`.
   *
   * If the `currentTarget` contains the property `on<type>`, then it is called here,
   * simulating the behavior from version 6.x and prior.
   * @param e - The event passed to the target.
   * @param type - The type of event to notify. Defaults to `e.type`.
   */
  notifyTarget(e, t) {
    var s, o;
    t = t ?? e.type;
    const i = `on${t}`;
    (o = (s = e.currentTarget)[i]) == null || o.call(s, e);
    const n = e.eventPhase === e.CAPTURING_PHASE || e.eventPhase === e.AT_TARGET ? `${t}capture` : t;
    this._notifyListeners(e, n), e.eventPhase === e.AT_TARGET && this._notifyListeners(e, t);
  }
  /**
   * Maps the upstream `pointerdown` events to a downstream `pointerdown` event.
   *
   * `touchstart`, `rightdown`, `mousedown` events are also dispatched for specific pointer types.
   * @param from - The upstream `pointerdown` event.
   */
  mapPointerDown(e) {
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const t = this.createPointerEvent(e);
    if (this.dispatchEvent(t, "pointerdown"), t.pointerType === "touch")
      this.dispatchEvent(t, "touchstart");
    else if (t.pointerType === "mouse" || t.pointerType === "pen") {
      const n = t.button === 2;
      this.dispatchEvent(t, n ? "rightdown" : "mousedown");
    }
    const i = this.trackingData(e.pointerId);
    i.pressTargetsByButton[e.button] = t.composedPath(), this.freeEvent(t);
  }
  /**
   * Maps the upstream `pointermove` to downstream `pointerout`, `pointerover`, and `pointermove` events, in that order.
   *
   * The tracking data for the specific pointer has an updated `overTarget`. `mouseout`, `mouseover`,
   * `mousemove`, and `touchmove` events are fired as well for specific pointer types.
   * @param from - The upstream `pointermove` event.
   */
  mapPointerMove(e) {
    var c, p;
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    this._allInteractiveElements.length = 0, this._hitElements.length = 0, this._isPointerMoveEvent = !0;
    const t = this.createPointerEvent(e);
    this._isPointerMoveEvent = !1;
    const i = t.pointerType === "mouse" || t.pointerType === "pen", n = this.trackingData(e.pointerId), s = this.findMountedTarget(n.overTargets);
    if (((c = n.overTargets) == null ? void 0 : c.length) > 0 && s !== t.target) {
      const v = e.type === "mousemove" ? "mouseout" : "pointerout", h = this.createPointerEvent(e, v, s);
      if (this.dispatchEvent(h, "pointerout"), i && this.dispatchEvent(h, "mouseout"), !t.composedPath().includes(s)) {
        const l = this.createPointerEvent(e, "pointerleave", s);
        for (l.eventPhase = l.AT_TARGET; l.target && !t.composedPath().includes(l.target); )
          l.currentTarget = l.target, this.notifyTarget(l), i && this.notifyTarget(l, "mouseleave"), l.target = l.target.parent;
        this.freeEvent(l);
      }
      this.freeEvent(h);
    }
    if (s !== t.target) {
      const v = e.type === "mousemove" ? "mouseover" : "pointerover", h = this.clonePointerEvent(t, v);
      this.dispatchEvent(h, "pointerover"), i && this.dispatchEvent(h, "mouseover");
      let l = s == null ? void 0 : s.parent;
      for (; l && l !== this.rootTarget.parent && l !== t.target; )
        l = l.parent;
      if (!l || l === this.rootTarget.parent) {
        const d = this.clonePointerEvent(t, "pointerenter");
        for (d.eventPhase = d.AT_TARGET; d.target && d.target !== s && d.target !== this.rootTarget.parent; )
          d.currentTarget = d.target, this.notifyTarget(d), i && this.notifyTarget(d, "mouseenter"), d.target = d.target.parent;
        this.freeEvent(d);
      }
      this.freeEvent(h);
    }
    const o = [], a = this.enableGlobalMoveEvents ?? !0;
    this.moveOnAll ? o.push("pointermove") : this.dispatchEvent(t, "pointermove"), a && o.push("globalpointermove"), t.pointerType === "touch" && (this.moveOnAll ? o.splice(1, 0, "touchmove") : this.dispatchEvent(t, "touchmove"), a && o.push("globaltouchmove")), i && (this.moveOnAll ? o.splice(1, 0, "mousemove") : this.dispatchEvent(t, "mousemove"), a && o.push("globalmousemove"), this.cursor = (p = t.target) == null ? void 0 : p.cursor), o.length > 0 && this.all(t, o), this._allInteractiveElements.length = 0, this._hitElements.length = 0, n.overTargets = t.composedPath(), this.freeEvent(t);
  }
  /**
   * Maps the upstream `pointerover` to downstream `pointerover` and `pointerenter` events, in that order.
   *
   * The tracking data for the specific pointer gets a new `overTarget`.
   * @param from - The upstream `pointerover` event.
   */
  mapPointerOver(e) {
    var o;
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const t = this.trackingData(e.pointerId), i = this.createPointerEvent(e), n = i.pointerType === "mouse" || i.pointerType === "pen";
    this.dispatchEvent(i, "pointerover"), n && this.dispatchEvent(i, "mouseover"), i.pointerType === "mouse" && (this.cursor = (o = i.target) == null ? void 0 : o.cursor);
    const s = this.clonePointerEvent(i, "pointerenter");
    for (s.eventPhase = s.AT_TARGET; s.target && s.target !== this.rootTarget.parent; )
      s.currentTarget = s.target, this.notifyTarget(s), n && this.notifyTarget(s, "mouseenter"), s.target = s.target.parent;
    t.overTargets = i.composedPath(), this.freeEvent(i), this.freeEvent(s);
  }
  /**
   * Maps the upstream `pointerout` to downstream `pointerout`, `pointerleave` events, in that order.
   *
   * The tracking data for the specific pointer is cleared of a `overTarget`.
   * @param from - The upstream `pointerout` event.
   */
  mapPointerOut(e) {
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const t = this.trackingData(e.pointerId);
    if (t.overTargets) {
      const i = e.pointerType === "mouse" || e.pointerType === "pen", n = this.findMountedTarget(t.overTargets), s = this.createPointerEvent(e, "pointerout", n);
      this.dispatchEvent(s), i && this.dispatchEvent(s, "mouseout");
      const o = this.createPointerEvent(e, "pointerleave", n);
      for (o.eventPhase = o.AT_TARGET; o.target && o.target !== this.rootTarget.parent; )
        o.currentTarget = o.target, this.notifyTarget(o), i && this.notifyTarget(o, "mouseleave"), o.target = o.target.parent;
      t.overTargets = null, this.freeEvent(s), this.freeEvent(o);
    }
    this.cursor = null;
  }
  /**
   * Maps the upstream `pointerup` event to downstream `pointerup`, `pointerupoutside`,
   * and `click`/`rightclick`/`pointertap` events, in that order.
   *
   * The `pointerupoutside` event bubbles from the original `pointerdown` target to the most specific
   * ancestor of the `pointerdown` and `pointerup` targets, which is also the `click` event's target. `touchend`,
   * `rightup`, `mouseup`, `touchendoutside`, `rightupoutside`, `mouseupoutside`, and `tap` are fired as well for
   * specific pointer types.
   * @param from - The upstream `pointerup` event.
   */
  mapPointerUp(e) {
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const t = performance.now(), i = this.createPointerEvent(e);
    if (this.dispatchEvent(i, "pointerup"), i.pointerType === "touch")
      this.dispatchEvent(i, "touchend");
    else if (i.pointerType === "mouse" || i.pointerType === "pen") {
      const a = i.button === 2;
      this.dispatchEvent(i, a ? "rightup" : "mouseup");
    }
    const n = this.trackingData(e.pointerId), s = this.findMountedTarget(n.pressTargetsByButton[e.button]);
    let o = s;
    if (s && !i.composedPath().includes(s)) {
      let a = s;
      for (; a && !i.composedPath().includes(a); ) {
        if (i.currentTarget = a, this.notifyTarget(i, "pointerupoutside"), i.pointerType === "touch")
          this.notifyTarget(i, "touchendoutside");
        else if (i.pointerType === "mouse" || i.pointerType === "pen") {
          const c = i.button === 2;
          this.notifyTarget(i, c ? "rightupoutside" : "mouseupoutside");
        }
        a = a.parent;
      }
      delete n.pressTargetsByButton[e.button], o = a;
    }
    if (o) {
      const a = this.clonePointerEvent(i, "click");
      a.target = o, a.path = null, n.clicksByButton[e.button] || (n.clicksByButton[e.button] = {
        clickCount: 0,
        target: a.target,
        timeStamp: t
      });
      const c = n.clicksByButton[e.button];
      if (c.target === a.target && t - c.timeStamp < 200 ? ++c.clickCount : c.clickCount = 1, c.target = a.target, c.timeStamp = t, a.detail = c.clickCount, a.pointerType === "mouse") {
        const p = a.button === 2;
        this.dispatchEvent(a, p ? "rightclick" : "click");
      } else
        a.pointerType === "touch" && this.dispatchEvent(a, "tap");
      this.dispatchEvent(a, "pointertap"), this.freeEvent(a);
    }
    this.freeEvent(i);
  }
  /**
   * Maps the upstream `pointerupoutside` event to a downstream `pointerupoutside` event, bubbling from the original
   * `pointerdown` target to `rootTarget`.
   *
   * (The most specific ancestor of the `pointerdown` event and the `pointerup` event must the
   * `{@link EventBoundary}'s root because the `pointerup` event occurred outside of the boundary.)
   *
   * `touchendoutside`, `mouseupoutside`, and `rightupoutside` events are fired as well for specific pointer
   * types. The tracking data for the specific pointer is cleared of a `pressTarget`.
   * @param from - The upstream `pointerupoutside` event.
   */
  mapPointerUpOutside(e) {
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const t = this.trackingData(e.pointerId), i = this.findMountedTarget(t.pressTargetsByButton[e.button]), n = this.createPointerEvent(e);
    if (i) {
      let s = i;
      for (; s; )
        n.currentTarget = s, this.notifyTarget(n, "pointerupoutside"), n.pointerType === "touch" ? this.notifyTarget(n, "touchendoutside") : (n.pointerType === "mouse" || n.pointerType === "pen") && this.notifyTarget(n, n.button === 2 ? "rightupoutside" : "mouseupoutside"), s = s.parent;
      delete t.pressTargetsByButton[e.button];
    }
    this.freeEvent(n);
  }
  /**
   * Maps the upstream `wheel` event to a downstream `wheel` event.
   * @param from - The upstream `wheel` event.
   */
  mapWheel(e) {
    if (!(e instanceof T)) {
      y("EventBoundary cannot map a non-wheel event as a wheel event");
      return;
    }
    const t = this.createWheelEvent(e);
    this.dispatchEvent(t), this.freeEvent(t);
  }
  /**
   * Finds the most specific event-target in the given propagation path that is still mounted in the scene graph.
   *
   * This is used to find the correct `pointerup` and `pointerout` target in the case that the original `pointerdown`
   * or `pointerover` target was unmounted from the scene graph.
   * @param propagationPath - The propagation path was valid in the past.
   * @returns - The most specific event-target still mounted at the same location in the scene graph.
   */
  findMountedTarget(e) {
    if (!e)
      return null;
    let t = e[0];
    for (let i = 1; i < e.length && e[i].parent === t; i++)
      t = e[i];
    return t;
  }
  /**
   * Creates an event whose {@code originalEvent} is {@code from}, with an optional `type` and `target` override.
   *
   * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The {@code originalEvent} for the returned event.
   * @param [type=from.type] - The type of the returned event.
   * @param target - The target of the returned event.
   */
  createPointerEvent(e, t, i) {
    const n = this.allocateEvent(f);
    return this.copyPointerData(e, n), this.copyMouseData(e, n), this.copyData(e, n), n.nativeEvent = e.nativeEvent, n.originalEvent = e, n.target = i ?? this.hitTest(n.global.x, n.global.y) ?? this._hitElements[0], typeof t == "string" && (n.type = t), n;
  }
  /**
   * Creates a wheel event whose {@code originalEvent} is {@code from}.
   *
   * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The upstream wheel event.
   */
  createWheelEvent(e) {
    const t = this.allocateEvent(T);
    return this.copyWheelData(e, t), this.copyMouseData(e, t), this.copyData(e, t), t.nativeEvent = e.nativeEvent, t.originalEvent = e, t.target = this.hitTest(t.global.x, t.global.y), t;
  }
  /**
   * Clones the event {@code from}, with an optional {@code type} override.
   *
   * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The event to clone.
   * @param [type=from.type] - The type of the returned event.
   */
  clonePointerEvent(e, t) {
    const i = this.allocateEvent(f);
    return i.nativeEvent = e.nativeEvent, i.originalEvent = e.originalEvent, this.copyPointerData(e, i), this.copyMouseData(e, i), this.copyData(e, i), i.target = e.target, i.path = e.composedPath().slice(), i.type = t ?? i.type, i;
  }
  /**
   * Copies wheel {@link FederatedWheelEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + deltaMode
   * + deltaX
   * + deltaY
   * + deltaZ
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyWheelData(e, t) {
    t.deltaMode = e.deltaMode, t.deltaX = e.deltaX, t.deltaY = e.deltaY, t.deltaZ = e.deltaZ;
  }
  /**
   * Copies pointer {@link FederatedPointerEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + pointerId
   * + width
   * + height
   * + isPrimary
   * + pointerType
   * + pressure
   * + tangentialPressure
   * + tiltX
   * + tiltY
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyPointerData(e, t) {
    e instanceof f && t instanceof f && (t.pointerId = e.pointerId, t.width = e.width, t.height = e.height, t.isPrimary = e.isPrimary, t.pointerType = e.pointerType, t.pressure = e.pressure, t.tangentialPressure = e.tangentialPressure, t.tiltX = e.tiltX, t.tiltY = e.tiltY, t.twist = e.twist);
  }
  /**
   * Copies mouse {@link FederatedMouseEvent} data from {@code from} to {@code to}.
   *
   * The following properties are copied:
   * + altKey
   * + button
   * + buttons
   * + clientX
   * + clientY
   * + metaKey
   * + movementX
   * + movementY
   * + pageX
   * + pageY
   * + x
   * + y
   * + screen
   * + shiftKey
   * + global
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyMouseData(e, t) {
    e instanceof D && t instanceof D && (t.altKey = e.altKey, t.button = e.button, t.buttons = e.buttons, t.client.copyFrom(e.client), t.ctrlKey = e.ctrlKey, t.metaKey = e.metaKey, t.movement.copyFrom(e.movement), t.screen.copyFrom(e.screen), t.shiftKey = e.shiftKey, t.global.copyFrom(e.global));
  }
  /**
   * Copies base {@link FederatedEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + isTrusted
   * + srcElement
   * + timeStamp
   * + type
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyData(e, t) {
    t.isTrusted = e.isTrusted, t.srcElement = e.srcElement, t.timeStamp = performance.now(), t.type = e.type, t.detail = e.detail, t.view = e.view, t.which = e.which, t.layer.copyFrom(e.layer), t.page.copyFrom(e.page);
  }
  /**
   * @param id - The pointer ID.
   * @returns The tracking data stored for the given pointer. If no data exists, a blank
   *  state will be created.
   */
  trackingData(e) {
    return this.mappingState.trackingData[e] || (this.mappingState.trackingData[e] = {
      pressTargetsByButton: {},
      clicksByButton: {},
      overTarget: null
    }), this.mappingState.trackingData[e];
  }
  /**
   * Allocate a specific type of event from {@link EventBoundary#eventPool this.eventPool}.
   *
   * This allocation is constructor-agnostic, as long as it only takes one argument - this event
   * boundary.
   * @param constructor - The event's constructor.
   */
  allocateEvent(e) {
    this.eventPool.has(e) || this.eventPool.set(e, []);
    const t = this.eventPool.get(e).pop() || new e(this);
    return t.eventPhase = t.NONE, t.currentTarget = null, t.path = null, t.target = null, t;
  }
  /**
   * Frees the event and puts it back into the event pool.
   *
   * It is illegal to reuse the event until it is allocated again, using `this.allocateEvent`.
   *
   * It is also advised that events not allocated from {@link EventBoundary#allocateEvent this.allocateEvent}
   * not be freed. This is because of the possibility that the same event is freed twice, which can cause
   * it to be allocated twice & result in overwriting.
   * @param event - The event to be freed.
   * @throws Error if the event is managed by another event boundary.
   */
  freeEvent(e) {
    if (e.manager !== this)
      throw new Error("It is illegal to free an event not managed by this EventBoundary!");
    const t = e.constructor;
    this.eventPool.has(t) || this.eventPool.set(t, []), this.eventPool.get(t).push(e);
  }
  /**
   * Similar to {@link EventEmitter.emit}, except it stops if the `propagationImmediatelyStopped` flag
   * is set on the event.
   * @param e - The event to call each listener with.
   * @param type - The event key.
   */
  _notifyListeners(e, t) {
    const i = e.currentTarget._events[t];
    if (i && e.currentTarget.isInteractive())
      if ("fn" in i)
        i.once && e.currentTarget.removeListener(t, i.fn, void 0, !0), i.fn.call(i.context, e);
      else
        for (let n = 0, s = i.length; n < s && !e.propagationImmediatelyStopped; n++)
          i[n].once && e.currentTarget.removeListener(t, i[n].fn, void 0, !0), i[n].fn.call(i[n].context, e);
  }
}
const fe = 1, ge = {
  touchstart: "pointerdown",
  touchend: "pointerup",
  touchendoutside: "pointerupoutside",
  touchmove: "pointermove",
  touchcancel: "pointercancel"
}, L = class x {
  /**
   * @param {Renderer} renderer
   */
  constructor(e) {
    this.supportsTouchEvents = "ontouchstart" in globalThis, this.supportsPointerEvents = !!globalThis.PointerEvent, this.domElement = null, this.resolution = 1, this.renderer = e, this.rootBoundary = new ve(null), E.init(this), this.autoPreventDefault = !0, this._eventsAdded = !1, this._rootPointerEvent = new f(null), this._rootWheelEvent = new T(null), this.cursorStyles = {
      default: "inherit",
      pointer: "pointer"
    }, this.features = new Proxy({ ...x.defaultEventFeatures }, {
      set: (t, i, n) => (i === "globalMove" && (this.rootBoundary.enableGlobalMoveEvents = n), t[i] = n, !0)
    }), this._onPointerDown = this._onPointerDown.bind(this), this._onPointerMove = this._onPointerMove.bind(this), this._onPointerUp = this._onPointerUp.bind(this), this._onPointerOverOut = this._onPointerOverOut.bind(this), this.onWheel = this.onWheel.bind(this);
  }
  /**
   * The default interaction mode for all display objects.
   * @see Container.eventMode
   * @type {EventMode}
   * @readonly
   * @since 7.2.0
   */
  static get defaultEventMode() {
    return this._defaultEventMode;
  }
  /**
   * Runner init called, view is available at this point.
   * @ignore
   */
  init(e) {
    const { canvas: t, resolution: i } = this.renderer;
    this.setTargetElement(t), this.resolution = i, x._defaultEventMode = e.eventMode ?? "passive", Object.assign(this.features, e.eventFeatures ?? {}), this.rootBoundary.enableGlobalMoveEvents = this.features.globalMove;
  }
  /**
   * Handle changing resolution.
   * @ignore
   */
  resolutionChange(e) {
    this.resolution = e;
  }
  /** Destroys all event listeners and detaches the renderer. */
  destroy() {
    this.setTargetElement(null), this.renderer = null, this._currentCursor = null;
  }
  /**
   * Sets the current cursor mode, handling any callbacks or CSS style changes.
   * @param mode - cursor mode, a key from the cursorStyles dictionary
   */
  setCursor(e) {
    e = e || "default";
    let t = !0;
    if (globalThis.OffscreenCanvas && this.domElement instanceof OffscreenCanvas && (t = !1), this._currentCursor === e)
      return;
    this._currentCursor = e;
    const i = this.cursorStyles[e];
    if (i)
      switch (typeof i) {
        case "string":
          t && (this.domElement.style.cursor = i);
          break;
        case "function":
          i(e);
          break;
        case "object":
          t && Object.assign(this.domElement.style, i);
          break;
      }
    else
      t && typeof e == "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, e) && (this.domElement.style.cursor = e);
  }
  /**
   * The global pointer event.
   * Useful for getting the pointer position without listening to events.
   * @since 7.2.0
   */
  get pointer() {
    return this._rootPointerEvent;
  }
  /**
   * Event handler for pointer down events on {@link EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */
  _onPointerDown(e) {
    if (!this.features.click)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    const t = this._normalizeToPointerData(e);
    this.autoPreventDefault && t[0].isNormalized && (e.cancelable || !("cancelable" in e)) && e.preventDefault();
    for (let i = 0, n = t.length; i < n; i++) {
      const s = t[i], o = this._bootstrapEvent(this._rootPointerEvent, s);
      this.rootBoundary.mapEvent(o);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Event handler for pointer move events on on {@link EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch events.
   */
  _onPointerMove(e) {
    if (!this.features.move)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered, E.pointerMoved();
    const t = this._normalizeToPointerData(e);
    for (let i = 0, n = t.length; i < n; i++) {
      const s = this._bootstrapEvent(this._rootPointerEvent, t[i]);
      this.rootBoundary.mapEvent(s);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Event handler for pointer up events on {@link EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */
  _onPointerUp(e) {
    if (!this.features.click)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    let t = e.target;
    e.composedPath && e.composedPath().length > 0 && (t = e.composedPath()[0]);
    const i = t !== this.domElement ? "outside" : "", n = this._normalizeToPointerData(e);
    for (let s = 0, o = n.length; s < o; s++) {
      const a = this._bootstrapEvent(this._rootPointerEvent, n[s]);
      a.type += i, this.rootBoundary.mapEvent(a);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Event handler for pointer over & out events on {@link EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */
  _onPointerOverOut(e) {
    if (!this.features.click)
      return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    const t = this._normalizeToPointerData(e);
    for (let i = 0, n = t.length; i < n; i++) {
      const s = this._bootstrapEvent(this._rootPointerEvent, t[i]);
      this.rootBoundary.mapEvent(s);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Passive handler for `wheel` events on {@link EventSystem.domElement this.domElement}.
   * @param nativeEvent - The native wheel event.
   */
  onWheel(e) {
    if (!this.features.wheel)
      return;
    const t = this.normalizeWheelEvent(e);
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered, this.rootBoundary.mapEvent(t);
  }
  /**
   * Sets the {@link EventSystem#domElement domElement} and binds event listeners.
   *
   * To deregister the current DOM element without setting a new one, pass {@code null}.
   * @param element - The new DOM element.
   */
  setTargetElement(e) {
    this._removeEvents(), this.domElement = e, E.domElement = e, this._addEvents();
  }
  /** Register event listeners on {@link Renderer#domElement this.domElement}. */
  _addEvents() {
    if (this._eventsAdded || !this.domElement)
      return;
    E.addTickerListener();
    const e = this.domElement.style;
    e && (globalThis.navigator.msPointerEnabled ? (e.msContentZooming = "none", e.msTouchAction = "none") : this.supportsPointerEvents && (e.touchAction = "none")), this.supportsPointerEvents ? (globalThis.document.addEventListener("pointermove", this._onPointerMove, !0), this.domElement.addEventListener("pointerdown", this._onPointerDown, !0), this.domElement.addEventListener("pointerleave", this._onPointerOverOut, !0), this.domElement.addEventListener("pointerover", this._onPointerOverOut, !0), globalThis.addEventListener("pointerup", this._onPointerUp, !0)) : (globalThis.document.addEventListener("mousemove", this._onPointerMove, !0), this.domElement.addEventListener("mousedown", this._onPointerDown, !0), this.domElement.addEventListener("mouseout", this._onPointerOverOut, !0), this.domElement.addEventListener("mouseover", this._onPointerOverOut, !0), globalThis.addEventListener("mouseup", this._onPointerUp, !0), this.supportsTouchEvents && (this.domElement.addEventListener("touchstart", this._onPointerDown, !0), this.domElement.addEventListener("touchend", this._onPointerUp, !0), this.domElement.addEventListener("touchmove", this._onPointerMove, !0))), this.domElement.addEventListener("wheel", this.onWheel, {
      passive: !0,
      capture: !0
    }), this._eventsAdded = !0;
  }
  /** Unregister event listeners on {@link EventSystem#domElement this.domElement}. */
  _removeEvents() {
    if (!this._eventsAdded || !this.domElement)
      return;
    E.removeTickerListener();
    const e = this.domElement.style;
    e && (globalThis.navigator.msPointerEnabled ? (e.msContentZooming = "", e.msTouchAction = "") : this.supportsPointerEvents && (e.touchAction = "")), this.supportsPointerEvents ? (globalThis.document.removeEventListener("pointermove", this._onPointerMove, !0), this.domElement.removeEventListener("pointerdown", this._onPointerDown, !0), this.domElement.removeEventListener("pointerleave", this._onPointerOverOut, !0), this.domElement.removeEventListener("pointerover", this._onPointerOverOut, !0), globalThis.removeEventListener("pointerup", this._onPointerUp, !0)) : (globalThis.document.removeEventListener("mousemove", this._onPointerMove, !0), this.domElement.removeEventListener("mousedown", this._onPointerDown, !0), this.domElement.removeEventListener("mouseout", this._onPointerOverOut, !0), this.domElement.removeEventListener("mouseover", this._onPointerOverOut, !0), globalThis.removeEventListener("mouseup", this._onPointerUp, !0), this.supportsTouchEvents && (this.domElement.removeEventListener("touchstart", this._onPointerDown, !0), this.domElement.removeEventListener("touchend", this._onPointerUp, !0), this.domElement.removeEventListener("touchmove", this._onPointerMove, !0))), this.domElement.removeEventListener("wheel", this.onWheel, !0), this.domElement = null, this._eventsAdded = !1;
  }
  /**
   * Maps x and y coords from a DOM object and maps them correctly to the PixiJS view. The
   * resulting value is stored in the point. This takes into account the fact that the DOM
   * element could be scaled and positioned anywhere on the screen.
   * @param  {PointData} point - the point that the result will be stored in
   * @param  {number} x - the x coord of the position to map
   * @param  {number} y - the y coord of the position to map
   */
  mapPositionToPoint(e, t, i) {
    const n = this.domElement.isConnected ? this.domElement.getBoundingClientRect() : {
      x: 0,
      y: 0,
      width: this.domElement.width,
      height: this.domElement.height,
      left: 0,
      top: 0
    }, s = 1 / this.resolution;
    e.x = (t - n.left) * (this.domElement.width / n.width) * s, e.y = (i - n.top) * (this.domElement.height / n.height) * s;
  }
  /**
   * Ensures that the original event object contains all data that a regular pointer event would have
   * @param event - The original event data from a touch or mouse event
   * @returns An array containing a single normalized pointer event, in the case of a pointer
   *  or mouse event, or a multiple normalized pointer events if there are multiple changed touches
   */
  _normalizeToPointerData(e) {
    const t = [];
    if (this.supportsTouchEvents && e instanceof TouchEvent)
      for (let i = 0, n = e.changedTouches.length; i < n; i++) {
        const s = e.changedTouches[i];
        typeof s.button > "u" && (s.button = 0), typeof s.buttons > "u" && (s.buttons = 1), typeof s.isPrimary > "u" && (s.isPrimary = e.touches.length === 1 && e.type === "touchstart"), typeof s.width > "u" && (s.width = s.radiusX || 1), typeof s.height > "u" && (s.height = s.radiusY || 1), typeof s.tiltX > "u" && (s.tiltX = 0), typeof s.tiltY > "u" && (s.tiltY = 0), typeof s.pointerType > "u" && (s.pointerType = "touch"), typeof s.pointerId > "u" && (s.pointerId = s.identifier || 0), typeof s.pressure > "u" && (s.pressure = s.force || 0.5), typeof s.twist > "u" && (s.twist = 0), typeof s.tangentialPressure > "u" && (s.tangentialPressure = 0), typeof s.layerX > "u" && (s.layerX = s.offsetX = s.clientX), typeof s.layerY > "u" && (s.layerY = s.offsetY = s.clientY), s.isNormalized = !0, s.type = e.type, t.push(s);
      }
    else if (!globalThis.MouseEvent || e instanceof MouseEvent && (!this.supportsPointerEvents || !(e instanceof globalThis.PointerEvent))) {
      const i = e;
      typeof i.isPrimary > "u" && (i.isPrimary = !0), typeof i.width > "u" && (i.width = 1), typeof i.height > "u" && (i.height = 1), typeof i.tiltX > "u" && (i.tiltX = 0), typeof i.tiltY > "u" && (i.tiltY = 0), typeof i.pointerType > "u" && (i.pointerType = "mouse"), typeof i.pointerId > "u" && (i.pointerId = fe), typeof i.pressure > "u" && (i.pressure = 0.5), typeof i.twist > "u" && (i.twist = 0), typeof i.tangentialPressure > "u" && (i.tangentialPressure = 0), i.isNormalized = !0, t.push(i);
    } else
      t.push(e);
    return t;
  }
  /**
   * Normalizes the native {@link https://w3c.github.io/uievents/#interface-wheelevent WheelEvent}.
   *
   * The returned {@link FederatedWheelEvent} is a shared instance. It will not persist across
   * multiple native wheel events.
   * @param nativeEvent - The native wheel event that occurred on the canvas.
   * @returns A federated wheel event.
   */
  normalizeWheelEvent(e) {
    const t = this._rootWheelEvent;
    return this._transferMouseData(t, e), t.deltaX = e.deltaX, t.deltaY = e.deltaY, t.deltaZ = e.deltaZ, t.deltaMode = e.deltaMode, this.mapPositionToPoint(t.screen, e.clientX, e.clientY), t.global.copyFrom(t.screen), t.offset.copyFrom(t.screen), t.nativeEvent = e, t.type = e.type, t;
  }
  /**
   * Normalizes the `nativeEvent` into a federateed {@link FederatedPointerEvent}.
   * @param event
   * @param nativeEvent
   */
  _bootstrapEvent(e, t) {
    return e.originalEvent = null, e.nativeEvent = t, e.pointerId = t.pointerId, e.width = t.width, e.height = t.height, e.isPrimary = t.isPrimary, e.pointerType = t.pointerType, e.pressure = t.pressure, e.tangentialPressure = t.tangentialPressure, e.tiltX = t.tiltX, e.tiltY = t.tiltY, e.twist = t.twist, this._transferMouseData(e, t), this.mapPositionToPoint(e.screen, t.clientX, t.clientY), e.global.copyFrom(e.screen), e.offset.copyFrom(e.screen), e.isTrusted = t.isTrusted, e.type === "pointerleave" && (e.type = "pointerout"), e.type.startsWith("mouse") && (e.type = e.type.replace("mouse", "pointer")), e.type.startsWith("touch") && (e.type = ge[e.type] || e.type), e;
  }
  /**
   * Transfers base & mouse event data from the {@code nativeEvent} to the federated event.
   * @param event
   * @param nativeEvent
   */
  _transferMouseData(e, t) {
    e.isTrusted = t.isTrusted, e.srcElement = t.srcElement, e.timeStamp = performance.now(), e.type = t.type, e.altKey = t.altKey, e.button = t.button, e.buttons = t.buttons, e.client.x = t.clientX, e.client.y = t.clientY, e.ctrlKey = t.ctrlKey, e.metaKey = t.metaKey, e.movement.x = t.movementX, e.movement.y = t.movementY, e.page.x = t.pageX, e.page.y = t.pageY, e.relatedTarget = null, e.shiftKey = t.shiftKey;
  }
};
L.extension = {
  name: "events",
  type: [
    w.WebGLSystem,
    w.CanvasSystem,
    w.WebGPUSystem
  ],
  priority: -1
};
L.defaultEventFeatures = {
  /** Enables pointer events associated with pointer movement. */
  move: !0,
  /** Enables global pointer move events. */
  globalMove: !0,
  /** Enables pointer events associated with clicking. */
  click: !0,
  /** Enables wheel events. */
  wheel: !0
};
let q = L;
const me = {
  /**
   * Property-based event handler for the `click` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onclick = (event) => {
   *  //some function here that happens on click
   * }
   */
  onclick: null,
  /**
   * Property-based event handler for the `mousedown` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onmousedown = (event) => {
   *  //some function here that happens on mousedown
   * }
   */
  onmousedown: null,
  /**
   * Property-based event handler for the `mouseenter` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onmouseenter = (event) => {
   *  //some function here that happens on mouseenter
   * }
   */
  onmouseenter: null,
  /**
   * Property-based event handler for the `mouseleave` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onmouseleave = (event) => {
   *  //some function here that happens on mouseleave
   * }
   */
  onmouseleave: null,
  /**
   * Property-based event handler for the `mousemove` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onmousemove = (event) => {
   *  //some function here that happens on mousemove
   * }
   */
  onmousemove: null,
  /**
   * Property-based event handler for the `globalmousemove` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onglobalmousemove = (event) => {
   *  //some function here that happens on globalmousemove
   * }
   */
  onglobalmousemove: null,
  /**
   * Property-based event handler for the `mouseout` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onmouseout = (event) => {
   *  //some function here that happens on mouseout
   * }
   */
  onmouseout: null,
  /**
   * Property-based event handler for the `mouseover` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onmouseover = (event) => {
   *  //some function here that happens on mouseover
   * }
   */
  onmouseover: null,
  /**
   * Property-based event handler for the `mouseup` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onmouseup = (event) => {
   *  //some function here that happens on mouseup
   * }
   */
  onmouseup: null,
  /**
   * Property-based event handler for the `mouseupoutside` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onmouseupoutside = (event) => {
   *  //some function here that happens on mouseupoutside
   * }
   */
  onmouseupoutside: null,
  /**
   * Property-based event handler for the `pointercancel` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onpointercancel = (event) => {
   *  //some function here that happens on pointercancel
   * }
   */
  onpointercancel: null,
  /**
   * Property-based event handler for the `pointerdown` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onpointerdown = (event) => {
   *  //some function here that happens on pointerdown
   * }
   */
  onpointerdown: null,
  /**
   * Property-based event handler for the `pointerenter` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onpointerenter = (event) => {
   *  //some function here that happens on pointerenter
   * }
   */
  onpointerenter: null,
  /**
   * Property-based event handler for the `pointerleave` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onpointerleave = (event) => {
   *  //some function here that happens on pointerleave
   * }
   */
  onpointerleave: null,
  /**
   * Property-based event handler for the `pointermove` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onpointermove = (event) => {
   *  //some function here that happens on pointermove
   * }
   */
  onpointermove: null,
  /**
   * Property-based event handler for the `globalpointermove` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onglobalpointermove = (event) => {
   *  //some function here that happens on globalpointermove
   * }
   */
  onglobalpointermove: null,
  /**
   * Property-based event handler for the `pointerout` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onpointerout = (event) => {
   *  //some function here that happens on pointerout
   * }
   */
  onpointerout: null,
  /**
   * Property-based event handler for the `pointerover` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onpointerover = (event) => {
   *  //some function here that happens on pointerover
   * }
   */
  onpointerover: null,
  /**
   * Property-based event handler for the `pointertap` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onpointertap = (event) => {
   *  //some function here that happens on pointertap
   * }
   */
  onpointertap: null,
  /**
   * Property-based event handler for the `pointerup` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onpointerup = (event) => {
   *  //some function here that happens on pointerup
   * }
   */
  onpointerup: null,
  /**
   * Property-based event handler for the `pointerupoutside` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onpointerupoutside = (event) => {
   *  //some function here that happens on pointerupoutside
   * }
   */
  onpointerupoutside: null,
  /**
   * Property-based event handler for the `rightclick` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onrightclick = (event) => {
   *  //some function here that happens on rightclick
   * }
   */
  onrightclick: null,
  /**
   * Property-based event handler for the `rightdown` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onrightdown = (event) => {
   *  //some function here that happens on rightdown
   * }
   */
  onrightdown: null,
  /**
   * Property-based event handler for the `rightup` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onrightup = (event) => {
   *  //some function here that happens on rightup
   * }
   */
  onrightup: null,
  /**
   * Property-based event handler for the `rightupoutside` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onrightupoutside = (event) => {
   *  //some function here that happens on rightupoutside
   * }
   */
  onrightupoutside: null,
  /**
   * Property-based event handler for the `tap` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.ontap = (event) => {
   *  //some function here that happens on tap
   * }
   */
  ontap: null,
  /**
   * Property-based event handler for the `touchcancel` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.ontouchcancel = (event) => {
   *  //some function here that happens on touchcancel
   * }
   */
  ontouchcancel: null,
  /**
   * Property-based event handler for the `touchend` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.ontouchend = (event) => {
   *  //some function here that happens on touchend
   * }
   */
  ontouchend: null,
  /**
   * Property-based event handler for the `touchendoutside` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.ontouchendoutside = (event) => {
   *  //some function here that happens on touchendoutside
   * }
   */
  ontouchendoutside: null,
  /**
   * Property-based event handler for the `touchmove` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.ontouchmove = (event) => {
   *  //some function here that happens on touchmove
   * }
   */
  ontouchmove: null,
  /**
   * Property-based event handler for the `globaltouchmove` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onglobaltouchmove = (event) => {
   *  //some function here that happens on globaltouchmove
   * }
   */
  onglobaltouchmove: null,
  /**
   * Property-based event handler for the `touchstart` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.ontouchstart = (event) => {
   *  //some function here that happens on touchstart
   * }
   */
  ontouchstart: null,
  /**
   * Property-based event handler for the `wheel` event.
   * @memberof scene.Container#
   * @default null
   * @example
   * this.onwheel = (event) => {
   *  //some function here that happens on wheel
   * }
   */
  onwheel: null,
  /**
   * Enable interaction events for the Container. Touch, pointer and mouse
   * @memberof scene.Container#
   */
  get interactive() {
    return this.eventMode === "dynamic" || this.eventMode === "static";
  },
  set interactive(r) {
    this.eventMode = r ? "static" : "passive";
  },
  /**
   * @ignore
   */
  _internalEventMode: void 0,
  /**
   * Enable interaction events for the Container. Touch, pointer and mouse.
   * There are 5 types of interaction settings:
   * - `'none'`: Ignores all interaction events, even on its children.
   * - `'passive'`: **(default)** Does not emit events and ignores all hit testing on itself and non-interactive children.
   * Interactive children will still emit events.
   * - `'auto'`: Does not emit events but is hit tested if parent is interactive. Same as `interactive = false` in v7
   * - `'static'`: Emit events and is hit tested. Same as `interaction = true` in v7
   * - `'dynamic'`: Emits events and is hit tested but will also receive mock interaction events fired from a ticker to
   * allow for interaction when the mouse isn't moving
   * @example
   * import { Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(texture);
   * sprite.eventMode = 'static';
   * sprite.on('tap', (event) => {
   *     // Handle event
   * });
   * @memberof scene.Container#
   * @since 7.2.0
   */
  get eventMode() {
    return this._internalEventMode ?? q.defaultEventMode;
  },
  set eventMode(r) {
    this._internalEventMode = r;
  },
  /**
   * Determines if the container is interactive or not
   * @returns {boolean} Whether the container is interactive or not
   * @memberof scene.Container#
   * @since 7.2.0
   * @example
   * import { Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(texture);
   * sprite.eventMode = 'static';
   * sprite.isInteractive(); // true
   *
   * sprite.eventMode = 'dynamic';
   * sprite.isInteractive(); // true
   *
   * sprite.eventMode = 'none';
   * sprite.isInteractive(); // false
   *
   * sprite.eventMode = 'passive';
   * sprite.isInteractive(); // false
   *
   * sprite.eventMode = 'auto';
   * sprite.isInteractive(); // false
   */
  isInteractive() {
    return this.eventMode === "static" || this.eventMode === "dynamic";
  },
  /**
   * Determines if the children to the container can be clicked/touched
   * Setting this to false allows PixiJS to bypass a recursive `hitTest` function
   * @memberof scene.Container#
   */
  interactiveChildren: !0,
  /**
   * Interaction shape. Children will be hit first, then this shape will be checked.
   * Setting this will cause this shape to be checked in hit tests rather than the container's bounds.
   * @example
   * import { Rectangle, Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(texture);
   * sprite.interactive = true;
   * sprite.hitArea = new Rectangle(0, 0, 100, 100);
   * @member {IHitArea}
   * @memberof scene.Container#
   */
  hitArea: null,
  /**
   * Unlike `on` or `addListener` which are methods from EventEmitter, `addEventListener`
   * seeks to be compatible with the DOM's `addEventListener` with support for options.
   * @memberof scene.Container
   * @param type - The type of event to listen to.
   * @param listener - The listener callback or object.
   * @param options - Listener options, used for capture phase.
   * @example
   * // Tell the user whether they did a single, double, triple, or nth click.
   * button.addEventListener('click', {
   *     handleEvent(e): {
   *         let prefix;
   *
   *         switch (e.detail) {
   *             case 1: prefix = 'single'; break;
   *             case 2: prefix = 'double'; break;
   *             case 3: prefix = 'triple'; break;
   *             default: prefix = e.detail + 'th'; break;
   *         }
   *
   *         console.log('That was a ' + prefix + 'click');
   *     }
   * });
   *
   * // But skip the first click!
   * button.parent.addEventListener('click', function blockClickOnce(e) {
   *     e.stopImmediatePropagation();
   *     button.parent.removeEventListener('click', blockClickOnce, true);
   * }, {
   *     capture: true,
   * });
   */
  addEventListener(r, e, t) {
    const i = typeof t == "boolean" && t || typeof t == "object" && t.capture, n = typeof t == "object" ? t.signal : void 0, s = typeof t == "object" ? t.once === !0 : !1, o = typeof e == "function" ? void 0 : e;
    r = i ? `${r}capture` : r;
    const a = typeof e == "function" ? e : e.handleEvent, c = this;
    n && n.addEventListener("abort", () => {
      c.off(r, a, o);
    }), s ? c.once(r, a, o) : c.on(r, a, o);
  },
  /**
   * Unlike `off` or `removeListener` which are methods from EventEmitter, `removeEventListener`
   * seeks to be compatible with the DOM's `removeEventListener` with support for options.
   * @memberof scene.Container
   * @param type - The type of event the listener is bound to.
   * @param listener - The listener callback or object.
   * @param options - The original listener options. This is required to deregister a capture phase listener.
   */
  removeEventListener(r, e, t) {
    const i = typeof t == "boolean" && t || typeof t == "object" && t.capture, n = typeof e == "function" ? void 0 : e;
    r = i ? `${r}capture` : r, e = typeof e == "function" ? e : e.handleEvent, this.off(r, e, n);
  },
  /**
   * Dispatch the event on this {@link Container} using the event's {@link EventBoundary}.
   *
   * The target of the event is set to `this` and the `defaultPrevented` flag is cleared before dispatch.
   * @memberof scene.Container
   * @param e - The event to dispatch.
   * @returns Whether the {@link FederatedEvent.preventDefault preventDefault}() method was not invoked.
   * @example
   * // Reuse a click event!
   * button.dispatchEvent(clickEvent);
   */
  dispatchEvent(r) {
    if (!(r instanceof M))
      throw new Error("Container cannot propagate events outside of the Federated Events API");
    return r.defaultPrevented = !1, r.path = null, r.target = this, r.manager.dispatchEvent(r), !r.defaultPrevented;
  }
};
z.add(V);
Z.mixin(ue);
z.add(q);
Z.mixin(me);
