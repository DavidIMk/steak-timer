// Enum to represent Doneness
export enum Doneness {
  Rare = "Rare",
  MediumRare = "Medium Rare",
  Medium = "Medium",
  MediumWell = "Medium Well",
  WellDone = "Well Done",
}

// Enum to represent Cut
export enum Cut {
  Ribeye = "Ribeye",
  Sirloin = "Sirloin",
  Tenderloin = "Tenderloin",
}

// Cooking times (in seconds per inch) keyed by Cut and Doneness
export const cookingTimes: Record<Cut, Record<Doneness, number>> = {
  [Cut.Ribeye]: {
    [Doneness.Rare]: 120,
    [Doneness.MediumRare]: 180,
    [Doneness.Medium]: 240,
    [Doneness.MediumWell]: 300,
    [Doneness.WellDone]: 360,
  },
  [Cut.Sirloin]: {
    [Doneness.Rare]: 100,
    [Doneness.MediumRare]: 150,
    [Doneness.Medium]: 210,
    [Doneness.MediumWell]: 270,
    [Doneness.WellDone]: 330,
  },
  [Cut.Tenderloin]: {
    [Doneness.Rare]: 140,
    [Doneness.MediumRare]: 200,
    [Doneness.Medium]: 270,
    [Doneness.MediumWell]: 330,
    [Doneness.WellDone]: 390,
  },
};
