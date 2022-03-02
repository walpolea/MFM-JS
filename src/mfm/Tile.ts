import { Empty } from "../elements/core/Empty";
import { IElementType } from "./Element";
import { EventWindow } from "./EventWindow";
import { Site } from "./Site";
import { ICoordinate, TileCoordinate } from "./TileCoordinate";

export class Tile {
  width: number;
  height: number;
  sites: Map<string, Site>;
  sitesArray: Site[];

  rands: Array<number>;
  cur: number = 0;

  isRunning: boolean = false;

  constructor(_width: number = 1, _height: number = 1) {
    this.width = _width;
    this.height = _height;
    this.create();

    this.seedRandoms();
  }

  seedRandoms() {
    this.rands = new Array<number>();
    var array = new Uint32Array(16000);
    /* @ts-ignore */
    crypto.getRandomValues(array);

    for (var i = 0; i < array.length; i++) {
      this.rands.push(array[i] % (this.width * this.height));
    }
  }

  getSiteByCoordinate(c: ICoordinate): Site {
    return this.sites.get(TileCoordinate.CoordinateToId(c));
  }

  getSiteById(id: string): Site {
    return this.sites.get(id);
  }

  getRandomSite(): Site {
    return this.sites.get(`${~~(Math.random() * this.height)}:${~~(Math.random() * this.width)}`);
  }

  getRandomSiteSeeded(): Site {
    if (this.cur > 15998) {
      this.seedRandoms();
      this.cur = 0;
    }
    this.cur++;
    return this.sitesArray[this.rands[this.cur]];
  }

  getRandomSiteInRange(range: number[]) {
    return this.sites.get(`${~~(Math.random() * (range[1] - range[0])) + range[0]}:${~~(Math.random() * (range[3] - range[2])) + range[2]}`);
  }

  getRandomSiteInRangeSeeded(range: number[]) {
    if (this.cur > 15997) {
      this.seedRandoms();
      this.cur = 0;
    }
    this.cur++;

    return this.sites.get(`${(this.rands[this.cur] % (range[1] - range[0])) + range[0]}:${(this.rands[this.cur + 1] % (range[3] - range[2])) + range[2]}`);
  }

  create() {
    this.sites = new Map<string, Site>();

    for (let i: number = 0; i < this.width; i++) {
      //across columns (x)
      for (let j: number = 0; j < this.height; j++) {
        //down rows (y)
        const tc: TileCoordinate = TileCoordinate.fromId(`${j}:${i}`);
        this.sites.set(tc.id, new Site(tc));
      }
    }

    //pregenerate each site's EventWindow and assign it into the site
    this.sites.forEach((s) => {
      s.ew = new EventWindow(this, s.location.coordinate);
    });

    this.sitesArray = Array.from(this.sites.values());
  }

  clear(t: string = undefined) {
    if (t) {
      this.sites.forEach((s) => {
        if (s.atom.is(t)) s.mutate(Empty.CREATE());
      });
    } else {
      this.sites.forEach((s) => {
        s.mutate(Empty.CREATE());
      });
    }
  }
}
