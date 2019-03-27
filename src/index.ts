import { Tile } from "./mfm/classes/Tile";
import { MFMRenderer } from "./renderer/MFMRenderer";

declare var Vue: any;

let app = new Vue({
  el: "#app",
  data: function() {
    return {
      gridSize: "48x48" as string,
      timeSpeed: 5000 as number,
      g: undefined as Tile,
      mfmRenderer: MFMRenderer,
      customSequence: "" as string
    };
  },
  mounted() {
    this.initTile();
  },
  methods: {
    initTile() {
      this.g = new Tile(this.gridCols, this.gridRows);
      this.mfmRenderer = new MFMRenderer(this.g, document.querySelector("#mfm"));
    }
  },
  computed: {
    gridCols() {
      return this.gridSize.split("x")[0];
    },
    gridRows() {
      return this.gridSize.split("x")[1];
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
