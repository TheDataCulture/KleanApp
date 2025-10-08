// hooks/useResponsive.ts
import { useWindowDimensions } from "react-native";

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const shortest = Math.min(width, height);
  const longest = Math.max(width, height);

  // Breakpoints sencillos
  const isSmallPhone = shortest < 360;
  const isTablet = shortest >= 600;

  // Guías base (iPhone X aprox.)
  const BASE_W = 375;
  const BASE_H = 812;

  // Escaladores
  const scale = (size: number) => (width / BASE_W) * size;         // horizontal
  const vScale = (size: number) => (height / BASE_H) * size;       // vertical
  const mScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor; // moderado (recomendado)

  // Tokens rápidos 
  const text = {
    xs: mScale(12),
    sm: mScale(14),
    md: mScale(16),
    lg: mScale(20),
    xl: mScale(28),
  };

  const space = {
    xs: mScale(4),
    sm: mScale(8),
    md: mScale(12),
    lg: mScale(16),
    xl: mScale(24),
    xxl: mScale(32),
  };

  return {
    width, height,
    isSmallPhone, isTablet,
    scale, vScale, mScale,
    text, space,
  };
}
