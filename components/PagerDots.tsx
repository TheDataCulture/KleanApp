import React, { memo, useMemo } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Animated,
} from "react-native";

export type PagerDotsProps = {
  scrollX: Animated.Value;
  count: number;
  itemWidth: number;

  height?: number;
  widthActive?: number;
  gap?: number;

  inactiveColor?: string;

  inactiveCircleColor?: string;
  trackColor?: string;

  activeColor?: string;

  onPress?: (index: number) => void;

  style?: StyleProp<ViewStyle>;
};

function PagerDotsBase({
  scrollX,
  count,
  itemWidth,
  height = 8,
  widthActive = 28,
  gap = 10,

  // defaults legacy
  inactiveCircleColor = "rgba(255,255,255,0.55)",
  trackColor = "rgba(255,255,255,0.35)",
  inactiveColor,

  activeColor = "#B0F200",
  onPress,
  style,
}: PagerDotsProps) {
  const { finalInactiveCircle, finalTrack } = useMemo(() => {
    if (inactiveColor) {
      return { finalInactiveCircle: inactiveColor, finalTrack: inactiveColor };
    }
    return { finalInactiveCircle: inactiveCircleColor, finalTrack: trackColor };
  }, [inactiveColor, inactiveCircleColor, trackColor]);

  const indices = useMemo(
    () => Array.from({ length: count }, (_, i) => i),
    [count]
  );

  return (
    <View style={[styles.row, style]}>
      {indices.map((i) => {
        const inputRange = [
          (i - 1) * itemWidth,
          i * itemWidth,
          (i + 1) * itemWidth,
        ];

        const active = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        });

        const slotWidth = active.interpolate({
          inputRange: [0, 1],
          outputRange: [height, widthActive],
          extrapolate: "clamp",
        });

        const circleOpacity = active.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        });

        const trackOpacity = active;

        const scaleX = active.interpolate({
          inputRange: [0, 1],
          outputRange: [0.01, 1],
          extrapolate: "clamp",
        });

        return (
          <Pressable
            key={i}
            onPress={() => onPress?.(i)}
            hitSlop={10}
            style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
          >
            <Animated.View
              style={[
                styles.slot,
                {
                  width: slotWidth,
                  height,
                  marginHorizontal: gap / 2,
                  borderRadius: height / 2,
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.circle,
                  {
                    width: height,
                    height,
                    borderRadius: height / 2,
                    opacity: circleOpacity,
                    backgroundColor: finalInactiveCircle,
                  },
                ]}
              />

              <Animated.View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor: finalTrack,
                    borderRadius: height / 2,
                    opacity: trackOpacity,
                    transform: [{ scaleX: 0.01 }],
                  },
                ]}
              />

              {/* relleno activo */}
              <Animated.View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor: activeColor,
                    borderRadius: height / 2,
                    opacity: trackOpacity,
                    transform: [{ scaleX }],
                  },
                ]}
              />
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slot: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  circle: {
    position: "absolute",
  },
});

export default memo(PagerDotsBase);
