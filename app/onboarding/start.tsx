import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowRightIcon from "@/components/ArrowRightIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation, Trans } from "react-i18next";
import { useMemo } from "react";
import { useResponsive } from "@/hooks/useResponsive";

const VALID_LANGS = ["fr", "en", "es", "pt", "zh", "de"] as const;

export default function OnboardingStart() {
  const { t } = useTranslation();
  const r = useResponsive();

  const handleStart = async () => {
    if (__DEV__) {
      await AsyncStorage.removeItem("prefLang").catch(() => {});
      router.replace("/onboarding/choose-language");
      return;
    }
    try {
      const lang = await AsyncStorage.getItem("prefLang");
      const hasValidLang =
        !!lang && (VALID_LANGS as readonly string[]).includes(lang);
      router.replace(hasValidLang ? "/" : "/onboarding/choose-language");
    } catch {
      router.replace("/onboarding/choose-language");
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: { flex: 1, backgroundColor: "#00140B" },
        safe: { flex: 1 },
        content: {
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: r.space.lg,
          gap: r.mScale(90),
        },
        logo: {
          width: r.mScale(122),
          height: r.mScale(102),
          alignSelf: "center",
          marginBottom: r.space.sm,
          marginTop: r.mScale(120),
        },
        brand: {
          alignSelf: "center",
          color: "#fff",
          fontSize: r.text.xl,
          fontWeight: "800",
          letterSpacing: 1,
        },
        tagline: {
          marginTop: r.mScale(80),
          color: "#EAF5EE",
          fontSize: r.text.xl,
          lineHeight: r.text.xl * 1.1,
          fontWeight: "600",
          textAlign: "center",
          alignSelf: "center",
          width: "86%", // mantiene el texto contenido y centrado
        },
        accent: { color: "#009F4B", fontWeight: "700" },
        btn: {
          marginTop: r.mScale(80),
          marginBottom: r.mScale(12),
          alignSelf: "center",
          backgroundColor: "#B0F200",
          paddingHorizontal: r.space.lg,
          paddingVertical: r.space.sm,
          borderRadius: r.mScale(30),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          minWidth: r.mScale(220),
          gap: r.space.sm,
          overflow: "hidden", // asegura recorte visual
        },
        // Recorta la línea del ícono para que no subraye el texto
        iconWrap: {
          width: r.mScale(28),
          height: r.mScale(28),
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        },
        btnText: { color: "#494949", fontWeight: "700", fontSize: r.text.lg },
      }),
    [r]
  );

  return (
    <View style={styles.root}>
      <Image
        source={require("../../assets/images/bg-onboarding.png")}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <Image
            source={require("../../assets/images/logo-icon.png")}
            style={styles.logo}
            contentFit="contain"
          />

          <Text style={styles.tagline}>
            <Trans
              i18nKey="start.tagline"
              values={{ brand: "Klean" }}
              components={{ accent: <Text style={styles.accent} /> }}
            />
          </Text>

          <Pressable
            onPress={handleStart}
            style={({ pressed }) => [styles.btn, pressed && { opacity: 0.9 }]}
          >
            <View style={styles.iconWrap}>
              <ArrowRightIcon size={r.mScale(35)} color="#494949" />
            </View>
            <Text style={styles.btnText}>{t("common.start")}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
