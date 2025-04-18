import { EWIndex, EventWindow } from "./EventWindow";
import { Site } from "./Site";
import { ICoordinate, TileCoordinate } from "./TileCoordinate";

//indexes up to 144
export type VirtualEWIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144;


export class VirtualEventWindow {

  static VIRTUAL_WINDOW_OFFSETS: Array<ICoordinate> = [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: -1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -2, y: 0 },
    { x: 0, y: -2 },
    { x: 0, y: 2 },
    { x: 2, y: 0 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: -2 },
    { x: -1, y: 2 },
    { x: 1, y: -2 },
    { x: 1, y: 2 },
    { x: 2, y: -1 },
    { x: 2, y: 1 },
    { x: -3, y: 0 },
    { x: 0, y: -3 },
    { x: 0, y: 3 },
    { x: 3, y: 0 },
    { x: -2, y: -2 },
    { x: -2, y: 2 },
    { x: 2, y: -2 },
    { x: 2, y: 2 },
    { x: -3, y: -1 },
    { x: -3, y: 1 },
    { x: -1, y: -3 },
    { x: -1, y: 3 },
    { x: 1, y: -3 },
    { x: 1, y: 3 },
    { x: 3, y: -1 },
    { x: 3, y: 1 },
    { x: -4, y: 0 },
    { x: 0, y: -4 },
    { x: 0, y: 4 },
    { x: 4, y: 0 },
    { x: -3, y: -2 },
    { x: -3, y: 2 },
    { x: -2, y: -3 },
    { x: -2, y: 3 },
    { x: 2, y: -3 },
    { x: 2, y: 3 },
    { x: 3, y: -2 },
    { x: 3, y: 2 },
    { x: -4, y: -1 },
    { x: -4, y: 1 },
    { x: -1, y: -4 },
    { x: -1, y: 4 },
    { x: 1, y: -4 },
    { x: 1, y: 4 },
    { x: 4, y: -1 },
    { x: 4, y: 1 },
    { x: -5, y: 0 },
    { x: 0, y: -5 },
    { x: 0, y: 5 },
    { x: 5, y: 0 },
    { x: -3, y: -3 },
    { x: -3, y: 3 },
    { x: 3, y: -3 },
    { x: 3, y: 3 },
    { x: -4, y: -2 },
    { x: -4, y: 2 },
    { x: -2, y: -4 },
    { x: -2, y: 4 },
    { x: 2, y: -4 },
    { x: 2, y: 4 },
    { x: 4, y: -2 },
    { x: 4, y: 2 },
    { x: -5, y: -1 },
    { x: -5, y: 1 },
    { x: -1, y: -5 },
    { x: -1, y: 5 },
    { x: 1, y: -5 },
    { x: 1, y: 5 },
    { x: 5, y: -1 },
    { x: 5, y: 1 },
    { x: -6, y: 0 },
    { x: 0, y: -6 },
    { x: 0, y: 6 },
    { x: 6, y: 0 },
    { x: -4, y: -3 },
    { x: -4, y: 3 },
    { x: -3, y: -4 },
    { x: -3, y: 4 },
    { x: 3, y: -4 },
    { x: 3, y: 4 },
    { x: 4, y: -3 },
    { x: 4, y: 3 },
    { x: -5, y: -2 },
    { x: -5, y: 2 },
    { x: -2, y: -5 },
    { x: -2, y: 5 },
    { x: 2, y: -5 },
    { x: 2, y: 5 },
    { x: 5, y: -2 },
    { x: 5, y: 2 },
    { x: -6, y: -1 },
    { x: -6, y: 1 },
    { x: -1, y: -6 },
    { x: -1, y: 6 },
    { x: 1, y: -6 },
    { x: 1, y: 6 },
    { x: 6, y: -1 },
    { x: 6, y: 1 },
    { x: -7, y: 0 },
    { x: 0, y: -7 },
    { x: 0, y: 7 },
    { x: 7, y: 0 },
    { x: -4, y: -4 },
    { x: -4, y: 4 },
    { x: 4, y: -4 },
    { x: 4, y: 4 },
    { x: -5, y: -3 },
    { x: -5, y: 3 },
    { x: -3, y: -5 },
    { x: -3, y: 5 },
    { x: 3, y: -5 },
    { x: 3, y: 5 },
    { x: 5, y: -3 },
    { x: 5, y: 3 },
    { x: -6, y: -2 },
    { x: -6, y: 2 },
    { x: -2, y: -6 },
    { x: -2, y: 6 },
    { x: 2, y: -6 },
    { x: 2, y: 6 },
    { x: 6, y: -2 },
    { x: 6, y: 2 },
    { x: -7, y: -1 },
    { x: -7, y: 1 },
    { x: -1, y: -7 },
    { x: -1, y: 7 },
    { x: 1, y: -7 },
    { x: 1, y: 7 },
    { x: 7, y: -1 },
    { x: 7, y: 1 },
    { x: -8, y: 0 },
    { x: 0, y: -8 },
    { x: 0, y: 8 },
    { x: 8, y: 0 }
  ]

  static VIRTUAL_WINDOW_OFFSETS_MAP: Map< string, number > = new Map< string, number >(
    VirtualEventWindow.VIRTUAL_WINDOW_OFFSETS.map( (c, i) => [ TileCoordinate.CoordinateToId(c), i ] )
  );

  static ORIENTATIONS: Array<Map<VirtualEWIndex, EWIndex>> = EventWindow.ALL.map( i => VirtualEventWindow.CREATE_VIRTUAL_TO_EW_MAP(i) );
  static REVERSE_ORIENTATIONS: Array<Map<EWIndex, VirtualEWIndex>> = EventWindow.ALL.map( i => VirtualEventWindow.CREATE_EW_TO_VIRTUAL_MAP(i) );

  /*
  //I don't think I need this for now, but not ready to delete
  //The static functions provided are enough to translate between virtual and real EW indexes.
  //But in the future, maybe it's a lot less thinking to be done if you just get a new EventWindow object that JustWorks(TM)

  static REORIENT( ew: EventWindow, centerIndex: EWIndex ):EventWindow {

    const newEW = new EventWindow(null, null);
    newEW.origin = ew.getSite(centerIndex);
    newEW.window = new Array<Site>(145);

    const offset = EventWindow.WINDOW_OFFSETS[centerIndex];

    for( let i = 0; i < VirtualEventWindow.VIRTUAL_WINDOW_OFFSETS.length; i++ ) {
      const itemCoordinate:ICoordinate = VirtualEventWindow.VIRTUAL_WINDOW_OFFSETS[i];
      const offsetCoordinate:ICoordinate = { x: itemCoordinate.x + offset.x, y: itemCoordinate.y + offset.y };
      const offsetID = TileCoordinate.CoordinateToId(offsetCoordinate);
      newEW.window[i] = ew.getSite( VirtualEventWindow.VIRTUAL_WINDOW_OFFSETS_MAP.get( offsetID ) as EWIndex);
    }
    return newEW;
  }
  */

  static CREATE_EW_TO_VIRTUAL_MAP( centerIndex: EWIndex ):Map<EWIndex, VirtualEWIndex> {

    const offset = EventWindow.WINDOW_OFFSETS[centerIndex];
    const reorientation:Map<EWIndex, VirtualEWIndex> = new Map<EWIndex, VirtualEWIndex>();

    for( let i = 0; i < EventWindow.WINDOW_OFFSETS.length; i++ ) {
      const itemCoordinate:ICoordinate = EventWindow.WINDOW_OFFSETS[i];
      const offsetCoordinate:ICoordinate = { x: itemCoordinate.x - offset.x, y: itemCoordinate.y - offset.y };
      const offsetID = TileCoordinate.CoordinateToId(offsetCoordinate);

      reorientation.set( i as EWIndex, VirtualEventWindow.VIRTUAL_WINDOW_OFFSETS_MAP.get( offsetID ) as VirtualEWIndex );
    }

    return reorientation;

  }

  static CREATE_VIRTUAL_TO_EW_MAP( centerIndex: EWIndex ):Map<VirtualEWIndex, EWIndex> {
      
      const offset = EventWindow.WINDOW_OFFSETS[centerIndex];
      const reorientation:Map<VirtualEWIndex, EWIndex> = new Map<VirtualEWIndex, EWIndex>();
  
      for( let i = 0; i < EventWindow.WINDOW_OFFSETS.length; i++ ) {
        const itemCoordinate:ICoordinate = EventWindow.WINDOW_OFFSETS[i];
        const offsetCoordinate:ICoordinate = { x: itemCoordinate.x - offset.x, y: itemCoordinate.y - offset.y };
        const offsetID = TileCoordinate.CoordinateToId(offsetCoordinate);
  
        reorientation.set( VirtualEventWindow.VIRTUAL_WINDOW_OFFSETS_MAP.get( offsetID ) as VirtualEWIndex, i as EWIndex );
      }
  
      return reorientation;
  }

  //Given an orientation (self/0 moved in the EventWindow) and a virtual site index,
  //return the site in the event window (may return undefined when site is not in original EW view)
  // e.g. VirtualEventWindow.getOrientedSite(39, 2, ew) returns the site one step North of 39 (in the original EW view)
  static getOrientedSite( fromOrientation: EWIndex, virtualIndex: VirtualEWIndex, ew: EventWindow ):Site {
    return ew.getSite( VirtualEventWindow.ORIENTATIONS[fromOrientation].get( virtualIndex ) as EWIndex );
  }

  static getOrientedSites( fromOrientation: EWIndex, virtualIndexes: VirtualEWIndex[], ew: EventWindow ):Site[] {
    return virtualIndexes.map( (i) => VirtualEventWindow.getOrientedSite( fromOrientation, i, ew ) ).filter( (s) => s );
  }

  static getOrientedSiteIndex( fromOrientation: EWIndex, virtualIndex: VirtualEWIndex ):EWIndex {
    return VirtualEventWindow.ORIENTATIONS[fromOrientation].get( virtualIndex ) as EWIndex;
  }

  static getOrientedSiteIndexes( fromOrientation: EWIndex, virtualIndexes: VirtualEWIndex[] ):EWIndex[] {
    return virtualIndexes.map( (i) => VirtualEventWindow.getOrientedSiteIndex( fromOrientation, i ) ).filter( (s) => s );
  }

  static getVirtualIndex( fromOrientation: EWIndex, siteIndex: EWIndex ):VirtualEWIndex {
    return VirtualEventWindow.REVERSE_ORIENTATIONS[fromOrientation].get( siteIndex ) as VirtualEWIndex;
  }

  static getVirtualIndexes( fromOrientation: EWIndex, siteIndexes: EWIndex[] ):VirtualEWIndex[] {
    return siteIndexes.map( (i) => VirtualEventWindow.getVirtualIndex( fromOrientation, i ) ).filter( (s) => s );
  }
}

