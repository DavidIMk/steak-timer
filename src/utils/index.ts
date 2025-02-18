import { Doneness } from "../constants";

// Gradient function for the steak visualization
export const getSteakGradient = (doneness: Doneness, progress: number) => {
  const brown = "#8b4513";
  const red = "#ff6347";
  const factorMap: Record<Doneness, number> = {
    [Doneness.Rare]: 0.1,
    [Doneness.MediumRare]: 0.2,
    [Doneness.Medium]: 0.3,
    [Doneness.MediumWell]: 0.4,
    [Doneness.WellDone]: 0.5,
  };
  const factor = factorMap[doneness] || 0.2;
  const edgeExtent = factor * progress * 100;
  return `linear-gradient(
      to bottom,
      ${brown} 0%,
      ${brown} ${edgeExtent}%,
      ${red} ${edgeExtent}%,
      ${red} calc(100% - ${edgeExtent}%),
      ${brown} calc(100% - ${edgeExtent}%),
      ${brown} 100%
    )`;
};
