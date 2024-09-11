import { Sprite, Assets, Texture, Spritesheet } from "pixi.js";

import DEFAULT from "./sprites/CIRCLE.png";
// import SOLID from "./sprites/SOLID.png";
// import LEMM from "./sprites/LEMM.png";
// import LEMM_HEAD from "./sprites/LEMM_HEAD.png";
// import DIRT from "./sprites/DIRT.png";
// import ROCK from "./sprites/ROCK.png";
// import POWER from "./sprites/POWER.png";

import SPRITESHEET_DATA from './sprites/lemmings.json';
import SPRITESHEET from './sprites/lemmings.png';

export const DEFAULT_TEXTURE = await Assets.load( DEFAULT );

const SPRITE_MAP = {
  // "EMPTY": "DEFAULT",
  "LEMM": "LEMM",
  "LEMM_HEAD": "LEMM_HEAD",
  // "DIRT": "DIRT",
  // "ROCK": "ROCK",
  // "TODE_RED": "CIRCLE",
  // "TODE_GREEN": "CIRCLE",
  // "TODE_BLACK": "CIRCLE",
  // "SAND": "DIRT",
  // "MOSS": "DIRT",
  // "SOLID": "CIRCLE",
  // "EXIT_FRAME": "ROCK",
  // "EMPTY_EXIT": "ROCK",
  // "EXIT": "ROCK",
}

const SPRITE_SHEET_TEXTURE = await Assets.load( SPRITESHEET );
export const SPRITES = new Spritesheet(
  SPRITE_SHEET_TEXTURE,
  SPRITESHEET_DATA
);

await SPRITES.parse();

console.log( SPRITES );

export const LEMMING_TEXTURES = {}


export function getTexture( name, rotate ) {

  // rotate = [0,2,4,6,8][~~(Math.random() * 4)];

  const t = SPRITES.textures[`${SPRITE_MAP[name]}.png`] || LEMMING_TEXTURES[name] || DEFAULT_TEXTURE;

  if( rotate ) {
    return rotateTexture( t, rotate );
  }
  return t;
}

function rotateTexture( texture, rotation ) {
  return new Texture( {
    source: texture.baseTexture, 
    frame: texture.frame, 
    orig: texture.orig,
    trim:texture.trim,
    rotate: rotation ?? 0
  });
}