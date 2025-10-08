import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

export default function OnboardingLoading() {
  const { t } = useTranslation();
  const progress = useRef(new Animated.Value(0)).current;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const id = progress.addListener(({ value }) => setPercent(Math.round(value * 100)));

    Animated.timing(progress, {
      toValue: 1,
      duration: 2400,
      useNativeDriver: false, // animamos width
    }).start(({ finished }) => {
      if (finished) {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => router.replace("/onboarding/start"))
        );
      }
    });

    return () => progress.removeListener(id);
  }, []);

  const width = progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });

  return (
    <View style={styles.root}>
      <Image
        source={require("../../assets/images/bg-onboarding.png")}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <View style={styles.stack}>
            <Image
              source={require("../../assets/images/logo-icon.png")}
              style={styles.icon}
              contentFit="contain"
            />
            <Text style={styles.description}>
              {t("loading.description")}
            </Text>

            <View style={styles.progressRow}>
              <View style={styles.track}>
                <Animated.View style={[styles.fill, { width }]} />
              </View>
              <Text style={styles.percent}>{percent}%</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#00140B" },
  safe: { flex: 1, flexDirection: "column", justifyContent: "space-between", paddingVertical: 272 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  stack: { flexDirection: "column", alignItems: "center", gap: 90, paddingHorizontal: 24 },
  icon: { width: 92, height: 92 },
  description: { color: "#FFFFFF", textAlign: "center", fontSize: 16, lineHeight: 22, opacity: 0.9, paddingHorizontal: 30 },
  progressRow: { width: "68%", flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 },
  track: { flex: 1, height: 8, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.2)", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 999, backgroundColor: "#61FF88" },
  percent: { color: "#9ADFB8", fontSize: 12, width: 36, textAlign: "right" },
});
