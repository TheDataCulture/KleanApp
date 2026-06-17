import { useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Animated,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";
import AppButton from "@/components/ui/AppButton";
import Svg, { Path } from "react-native-svg";

const BG = "#00140B";

type Styles = {
  root: ViewStyle;
  safe: ViewStyle;
  bg: ImageStyle;

  header: ViewStyle;
  logo: ImageStyle;
  title: TextStyle;

  card: ViewStyle;
  innerShadowTop: ViewStyle;

  body: ViewStyle;
  center: ViewStyle;
  illustration: ViewStyle;
  cta: ViewStyle;
  statusText: TextStyle;
};

export default function RecoveryVerified() {
  const { t } = useTranslation();
  const r = useResponsive();

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 720,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        damping: 12,
        stiffness: 180,
        mass: 0.6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  const s = useMemo(
    () =>
      StyleSheet.create<Styles>({
        root: { flex: 1, backgroundColor: BG },
        safe: { flex: 1 },
        bg: { ...StyleSheet.absoluteFillObject },

        header: {
          paddingTop: r.mScale(16),
          alignItems: "center",
          marginTop: r.mScale(40),
        },
        logo: {
          width: r.mScale(122),
          height: r.mScale(102),
          marginBottom: r.mScale(12),
        },
        title: {
          color: "#B0F200",
          fontSize: r.mScale(28),
          fontWeight: "700",
          textAlign: "center",
          marginTop: r.mScale(50),
        },

        card: {
          flex: 1,
          backgroundColor: "#fff",
          marginTop: r.mScale(53),
          borderTopLeftRadius: r.mScale(28),
          borderTopRightRadius: r.mScale(28),
          overflow: "hidden",
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOpacity: 0.22,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: -2 },
            },
            android: { elevation: 6 },
            default: {},
          }),
        },
        innerShadowTop: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: r.mScale(15),
          borderTopLeftRadius: r.mScale(28),
          borderTopRightRadius: r.mScale(28),
        },

        body: {
          flex: 1,
          justifyContent: "space-between",
          alignItems: "stretch",
          paddingHorizontal: r.mScale(60),
          paddingBottom: r.mScale(24),
          gap: r.mScale(22),
        },
        center: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: r.mScale(16),
        },
        illustration: {
          width: "40%",
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        },
        cta: {
          alignSelf: "stretch",
          marginTop: r.mScale(8),
        },
        statusText: {
          color: "#494949",
          fontSize: r.mScale(16),
          textAlign: "center",
          fontWeight: "700",
        },
      }),
    [r]
  );

  return (
    <View style={s.root}>
      <Image
        source={require("../../assets/images/bg-onboarding.png")}
        style={s.bg}
        contentFit="cover"
      />
      <SafeAreaView style={s.safe}>
        <View style={s.header}>
          <Image
            source={require("../../assets/images/logo-icon.png")}
            style={s.logo}
            contentFit="contain"
          />
          <Text style={s.title}>
            {t("reset.setNewTitle", "Set new password")}
          </Text>
        </View>

        <View style={s.card}>
          <LinearGradient
            colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.12)", "transparent"]}
            locations={[0, 0.5, 1]}
            style={s.innerShadowTop}
          />

          <View style={s.body}>
            <View style={s.center}>
              <Animated.View
                style={[s.illustration, { opacity, transform: [{ scale }] }]}
              >
                <Svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 118 118"
                  fill="none"
                >
                  <Path
                    opacity={0.4}
                    d="M59 118C91.5848 118 118 91.5848 118 59C118 26.4152 91.5848 0 59 0C26.4152 0 0 26.4152 0 59C0 91.5848 26.4152 118 59 118Z"
                    fill="#8DC200"
                  />
                  <Path
                    d="M50.6229 80.1242C49.4429 80.1242 48.3219 79.6522 47.4959 78.8262L30.7989 62.1292C29.0879 60.4182 29.0879 57.5862 30.7989 55.8752C32.5099 54.1642 35.3419 54.1642 37.0529 55.8752L50.6229 69.4452L80.9489 39.1192C82.6599 37.4082 85.4919 37.4082 87.2029 39.1192C88.9139 40.8302 88.9139 43.6622 87.2029 45.3732L53.7499 78.8262C52.9239 79.6522 51.8029 80.1242 50.6229 80.1242Z"
                    fill="#8DC200"
                  />
                </Svg>
              </Animated.View>

              <Text style={s.statusText}>
                {t("reset.verified", "Verified")}
              </Text>
            </View>

            <AppButton
              label={t("common.continue", "Continue")}
              onPress={() => router.replace("/login")}
              size="md"
              enabledBg="#B0F200"
              disabledBg="#A4A4A4"
              enabledText="#494949"
              disabledText="#FFFFFF"
              style={s.cta}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
