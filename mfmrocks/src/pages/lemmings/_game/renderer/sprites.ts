import { Sprite, Assets, Texture } from "pixi.js";

import DEFAULT from "./element.png";
import SOLID from "./sprites/SOLID.png";
import LEMM from "./sprites/LEMM.png";
import LEMM_HEAD from "./sprites/LEMM_HEAD.png";
import DIRT from "./sprites/DIRT.png";

export const DEFAULT_TEXTURE = await Assets.load( DEFAULT );

const SPRITE_LIST = [
  ["LEMM", LEMM],
  ["LEMM_HEAD", LEMM_HEAD],
  ["DIRT", DIRT],
  ["ROCK", DIRT]
]

export const LEMMING_TEXTURES = {}

await init();

async function init() {
  for( let [name, texture] of SPRITE_LIST ) {
    LEMMING_TEXTURES[name] = await Assets.load( texture );
  }
}