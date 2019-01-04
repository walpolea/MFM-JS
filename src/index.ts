import { Tile } from "./mfm/classes/Tile";
import { MFMRenderer } from "./renderer/MFMRenderer";

declare var Vue: any;

let app = new Vue({
  el: "#app",
  data: function() {
    return {
      timeSpeed: 5000 as number,
      g: undefined as Tile,
      mfmRenderer: MFMRenderer
    };
  },
  mounted() {
    this.g = new Tile(96, 96);
    this.mfmRenderer = new MFMRenderer(this.g, document.querySelector("#mfm"));
  },
  methods: {},
  computed: {},
  watch: {
    timeSpeed(val: number) {
      this.mfmRenderer.timeSpeed = val;
    }
  }
});
