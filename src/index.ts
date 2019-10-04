import { Tile } from "./mfm/classes/Tile";
import { MFMRenderer } from "./renderer/MFMRenderer";
import { ElementTypes, IElementType } from "./mfm/classes/ElementTypes";
import { ElementIncludes } from "./mfm/ElementIncludes";
import { DReg } from "./mfm/classes/elements/DRegElement";

declare var Vue: any;

let app = new Vue({
  el: "#app",
  data: function () {
    return {
      gridSize: "48x48" as string,
      timeSpeed: 5000 as number,
      g: undefined as Tile,
      mfmRenderer: MFMRenderer,
      customSequence: "" as string,
      curSelectedElement: "" as string,
      curSelectedFunc: undefined as Function
    };
  },
  mounted() {
    this.initTile();
  },
  methods: {
    initTile() {
      this.g = new Tile(this.gridCols, this.gridRows);
      this.mfmRenderer = new MFMRenderer(this.g, document.querySelector("#mfm"));

      this.curSelectedElement = this.curSelectedElement ? this.curSelectedElement : "DREG";
      this.curSelectedFunc = this.curSelectedFunc ? this.curSelectedFunc : DReg.CREATE;
      this.selectElement(this.curSelectedElement, this.curSelectedFunc);
    },
    selectElement(name: string, func: Function) {
      console.log("setting element", name);
      this.curSelectedElement = name;
      this.curSelectedFunc = func;
      this.mfmRenderer.curSelectedElement = this.curSelectedElement;
      this.mfmRenderer.curSelectedElementFunction = this.curSelectedFunc;
    },
    reload() {
      this.mfmRenderer.deconstruct();
      this.initTile();
    }
  },
  computed: {
    gridCols() {
      return this.gridSize.split("x")[0];
    },
    gridRows() {
      return this.gridSize.split("x")[1];
    },
    typeMap() {
      return ElementIncludes.ELEMENT_MENU_MAP;
    }
  },
  watch: {
    timeSpeed(val: number) {
      this.mfmRenderer.timeSpeed = val;
    },
    gridSize(val: string) {
      this.mfmRenderer.deconstruct();
      this.initTile();
    },
    customSequence(val: string) {
      this.mfmRenderer.customSequence = this.customSequence;
    }
  }
});
