export enum SPRITES_ENUM {
  BirdUp,
  BirdDown,
  Cactus,
  CactusDouble,
  CactusDoubleB,
  CactusTriple,
  Cloud,
  Dino,
  DinoDuckLeftLeg,
  DinoDuckRIghtLeg,
  DinoLeftLeg,
  DinoRightLeg,
  Ground,
  ReplayIcon,
}

export const SPRITE_LOCATION: {
  [key in SPRITES_ENUM]: any
} = {
  [SPRITES_ENUM.BirdUp]: { h: 52, w: 84, x: 708, y: 31 },
  [SPRITES_ENUM.BirdDown]: { h: 60, w: 84, x: 708, y: 85 },
  [SPRITES_ENUM.Cactus]: { h: 92, w: 46, x: 70, y: 31 },
  [SPRITES_ENUM.CactusDouble]: { h: 66, w: 64, x: 118, y: 31 },
  [SPRITES_ENUM.CactusDoubleB]: { h: 92, w: 80, x: 184, y: 31 },
  [SPRITES_ENUM.CactusTriple]: { h: 66, w: 82, x: 266, y: 31 },
  [SPRITES_ENUM.Cloud]: { h: 28, w: 92, x: 794, y: 31 },
  [SPRITES_ENUM.Dino]: { h: 86, w: 80, x: 350, y: 31 },
  [SPRITES_ENUM.DinoDuckLeftLeg]: { h: 52, w: 110, x: 596, y: 31 },
  [SPRITES_ENUM.DinoDuckRIghtLeg]: { h: 52, w: 110, x: 596, y: 85 },
  [SPRITES_ENUM.DinoLeftLeg]: { h: 86, w: 80, x: 432, y: 31 },
  [SPRITES_ENUM.DinoRightLeg]: { h: 86, w: 80, x: 514, y: 31 },
  [SPRITES_ENUM.Ground]: { h: 28, w: 2400, x: 0, y: 2 },
  [SPRITES_ENUM.ReplayIcon]: { h: 60, w: 68, x: 0, y: 31 },
};


