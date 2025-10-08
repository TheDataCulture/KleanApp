import { useMemo } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";

const BG = "#00140B";

export default function OnboardingAccess() {
  const { t } = useTranslation();
  const r = useResponsive();

  const s = useMemo(
    () =>
      StyleSheet.create({
        root: { flex: 1, backgroundColor: BG },
        safe: { flex: 1 },
        bg: { ...StyleSheet.absoluteFillObject },

        // Header
        header: {
          paddingTop: r.mScale(16),
          alignItems: "center",
          marginTop: r.mScale(40),
        },
        logo: { width: r.mScale(122), height: r.mScale(102), marginBottom: r.mScale(20) },
        headerTitle: {
          color: "#B0F200",
          fontSize: r.mScale(28),
          fontWeight: "700",
          textAlign: "center",
        },

        // Card contenedor
        card: {
          flex: 1,
          backgroundColor: "#fff",
          marginTop: r.mScale(32),
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
          marginTop: 90,
          paddingHorizontal: r.mScale(32),
          paddingTop: r.mScale(28),
          alignItems: "center",
          gap: r.mScale(20),
        },
        helper: {
          color: "#4A4A4A",
          textAlign: "center",
          fontSize: r.mScale(16),
          lineHeight: r.mScale(22),
          marginBottom: r.mScale(8),
        },

        // Botones
        btn: {
          alignSelf: "stretch",
          backgroundColor: "#B0F200",
          borderRadius: r.mScale(30),
          paddingVertical: r.mScale(14),
          alignItems: "center",
          justifyContent: "center",
          marginTop: r.mScale(10),
        },
        btnText: {
          color: "#494949",
          fontWeight: "600",
          fontSize: r.mScale(16),
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
        {/* Header */}
        <View style={s.header}>
          <Image
            source={require("../../assets/images/logo-icon.png")}
            style={s.logo}
            contentFit="contain"
          />
          <Text style={s.headerTitle}>{t("access.title", {brand:"Klutch Klean"})}</Text>


          
        </View>

        {/* Card */}
        <View style={s.card}>
          <LinearGradient
            colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.12)", "transparent"]}
            locations={[0, 0.5, 1]}
            style={s.innerShadowTop}
          />

          <View style={s.body}>
            <Text style={s.helper}>{t("access.helper")}</Text>

            <Pressable style={s.btn} onPress={() => router.push("/onboarding/tutorials")}>
              <Text style={s.btnText}>{t("access.tutorial")}</Text>
            </Pressable>

            <Pressable style={s.btn} onPress={() => router.push("/login")}>
              <Text style={s.btnText}>{t("access.login")}</Text>
            </Pressable>

            <Pressable style={s.btn} onPress={() => router.push("/signup")}>
              <Text style={s.btnText}>{t("access.signup")}</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
