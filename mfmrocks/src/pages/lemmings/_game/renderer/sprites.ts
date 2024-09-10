import { Sprite, Assets, Texture } from "pixi.js";

//@ts-ignore
import DEFAULT from "./element.png";
//@ts-ignore
import LEMM from "./sprites/LEMM.png";
//@ts-ignore
import LEMM_HEAD from "./sprites/LEMM_HEAD.png";

export const DEFAULT_TEXTURE = await Assets.load( DEFAULT );

const SPRITE_LIST = [
  ["LEMM", LEMM],
  ["LEMM_HEAD", LEMM_HEAD],
]

export const LEMMING_TEXTURES = {}

await init();

async function init() {
  for( let [name, texture] of SPRITE_LIST ) {
    LEMMING_TEXTURES[name] = await Assets.load( texture );
  }
}