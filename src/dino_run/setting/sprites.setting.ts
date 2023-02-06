export enum SPRITES_ENUM {
  BirdUp = 'BirdUp',
  BirdDown = 'BirdDown',
  Cactus = 'Cactus',
  CactusDouble = 'CactusDouble',
  CactusDoubleB = 'CactusDoubleB',
  CactusTriple = 'CactusTriple',
  Cloud = 'Cloud',
  Dino = 'Dino',
  DinoDuckLeftLeg = 'DinoDuckLeftLeg',
  DinoDuckRightLeg = 'DinoDuckRightLeg',
  DinoLeftLeg = 'DinoLeftLeg',
  DinoRightLeg = 'DinoRightLeg',
  Ground = 'Ground',
  ReplayIcon = 'ReplayIcon',
}

export interface SpriteSetting {
  x: number;
  y: number;
  h: number;
  w: number;
}

export const SPRITE_LOCATION: {
  [key in SPRITES_ENUM]: SpriteSetting
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
  [SPRITES_ENUM.DinoDuckRightLeg]: { h: 52, w: 110, x: 596, y: 85 },
  [SPRITES_ENUM.DinoLeftLeg]: { h: 86, w: 80, x: 432, y: 31 },
  [SPRITES_ENUM.DinoRightLeg]: { h: 86, w: 80, x: 514, y: 31 },
  [SPRITES_ENUM.Ground]: { h: 28, w: 2400, x: 0, y: 2 },
  [SPRITES_ENUM.ReplayIcon]: { h: 60, w: 68, x: 0, y: 31 },
};


