import React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
} from "react-native-svg";

type Props = { style?: StyleProp<ViewStyle> };

/**
 * Overlay SVG que combina:
 *  - desvanecido blanco superior → transparente
 *  - transición a verdes en la parte inferior
 * Escala a todo el contenedor usando preserveAspectRatio="none".
 */
export default function TutorialOverlayGradient({ style }: Props) {
  return (
    <Svg
      style={[styles.abs, style]}
      width="100%"
      height="100%"
      viewBox="0 0 440 956"
      preserveAspectRatio="none"
      pointerEvents="none"
    >
      <Defs>
        <SvgLinearGradient
          id="tutorial_overlay_gradient"
          x1="355.5"
          y1="-100"
          x2="355.5"
          y2="856"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.2" stopColor="#FFFFFF" stopOpacity={0.8} />
          <Stop offset="0.396629" stopColor="#D9D9D9" stopOpacity={0} />
          <Stop offset="0.701923" stopColor="#00592A" stopOpacity={0.2} />
          <Stop offset="0.95" stopColor="#003519" stopOpacity={0.8} />
        </SvgLinearGradient>
      </Defs>

      <Rect x="0" y="0" width="440" height="956" fill="url(#tutorial_overlay_gradient)" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  abs: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
