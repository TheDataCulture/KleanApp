import React, { useEffect, useMemo, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Animated,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Text } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";

type Size = "sm" | "md" | "lg";

export type AppButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  size?: Size;
  style?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle | TextStyle[];
  enabledBg?: string;       
  disabledBg?: string;      
  enabledText?: string;      
  disabledText?: string;   
  duration?: number;
  animated?: boolean;       
  testID?: string;
};

export default function AppButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = true,
  size = "md",
  style,
  labelStyle,
  enabledBg = "#B0F200",
  disabledBg = "#A4A4A4",
  enabledText = "#494949",  
  disabledText = "#FFFFFF",
  duration = 220,
  animated = true,
  testID,
}: AppButtonProps) {
  const r = useResponsive();
  const progress = useRef(new Animated.Value(disabled ? 0 : 1)).current;

  useEffect(() => {
    if (!animated) {
      progress.setValue(disabled ? 0 : 1);
      return;
    }
    Animated.timing(progress, {
      toValue: disabled ? 0 : 1,
      duration,
      useNativeDriver: false,
    }).start();
  }, [disabled, duration, animated, progress]);

  const { paddV, paddH, radius, fontSize } = useMemo(() => {
    const map: Record<Size, { paddV: number; paddH: number; radius: number; fontSize: number }> = {
      sm: { paddV: r.mScale(10), paddH: r.mScale(20), radius: r.mScale(22), fontSize: r.mScale(14) },
      md: { paddV: r.mScale(14), paddH: r.mScale(38), radius: r.mScale(28), fontSize: r.mScale(16) },
      lg: { paddV: r.mScale(18), paddH: r.mScale(44), radius: r.mScale(30), fontSize: r.mScale(18) },
    };
    return map[size];
  }, [r, size]);

  const bgColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [disabledBg, enabledBg],
  });
  const fgColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [disabledText, enabledText],
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: bgColor,
          borderRadius: radius,
          alignSelf: fullWidth ? "stretch" : "center",
        },
        style,
      ]}
    >
      <Pressable
        disabled={disabled || loading}
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          {
            paddingVertical: paddV,
            paddingHorizontal: paddH,
            opacity: pressed ? 0.9 : 1,
            fontWeight: 600,
          },
        ]}
        testID={testID}
      >
        {loading ? (
          <ActivityIndicator color={enabledText} />
        ) : (
          <Animated.Text
            style={[
              styles.label,
              { fontSize, color: fgColor },
              labelStyle,
            ]}
          >
            {label}
          </Animated.Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 160,
  },
  label: {
    fontWeight: "700",
  },
});
