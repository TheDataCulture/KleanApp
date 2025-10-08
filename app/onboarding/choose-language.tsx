import { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Platform,
  Animated,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { i18n } from "../../src/i18n";
import { useResponsive } from "@/hooks/useResponsive";

const NEXT_ROUTE = "/onboarding/access";

const LANGS = [
  { code: "fr", label: "French" },
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "pt", label: "Portuguese" },
  { code: "zh", label: "Chinese" },
  { code: "de", label: "German" },
] as const;

type Code = (typeof LANGS)[number]["code"];

export default function ChooseLanguage() {
  const { t } = useTranslation();
  const r = useResponsive();

  const [selected, setSelected] = useState<Code>("en");
  const [saving, setSaving] = useState(false);

  // ❗ Todas las animaciones arrancan en 0
  const anim = useRef(
    Object.fromEntries(
      LANGS.map((l) => [
        l.code,
        { scale: new Animated.Value(0), pad: new Animated.Value(0) },
      ])
    ) as Record<Code, { scale: Animated.Value; pad: Animated.Value }>
  ).current;

  useEffect(() => {
    (async () => {
      const saved = (await AsyncStorage.getItem("prefLang")) as Code | null;
      const initial = (saved || (i18n.language as Code) || "en") as Code;

      // Sin animación: sincroniza el estado visual con el idioma inicial
      LANGS.forEach((l) => {
        anim[l.code].scale.setValue(l.code === initial ? 1 : 0);
        anim[l.code].pad.setValue(l.code === initial ? 1 : 0);
      });

      if (selected !== initial) setSelected(initial);
      if (i18n.language !== initial) {
        try {
          await i18n.changeLanguage(initial);
        } catch {}
      }
    })();
  }, []);

  useEffect(() => {
    const handler = (lng: string) => setSelected(lng as Code);
    i18n.on("languageChanged", handler);
    return () => {
      i18n.off("languageChanged", handler);
    };
  }, []);

  const onSelect = async (code: Code) => {
    const prev = selected;
    if (code === prev) return;

    setSelected(code);
    if (Platform.OS !== "web") Haptics.selectionAsync().catch(() => {});

    anim[prev].scale.stopAnimation();
    anim[prev].pad.stopAnimation();
    anim[code].scale.stopAnimation();
    anim[code].pad.stopAnimation();

    Animated.parallel([
      Animated.spring(anim[prev].scale, {
        toValue: 0,
        useNativeDriver: true,
        stiffness: 220,
        damping: 22,
        mass: 0.9,
        overshootClamping: true,
      }),
      Animated.spring(anim[prev].pad, {
        toValue: 0,
        useNativeDriver: false,
        stiffness: 220,
        damping: 22,
        mass: 0.9,
        overshootClamping: true,
      }),
      Animated.spring(anim[code].scale, {
        toValue: 1,
        useNativeDriver: true,
        stiffness: 240,
        damping: 20,
        mass: 0.9,
        overshootClamping: true,
      }),
      Animated.spring(anim[code].pad, {
        toValue: 1,
        useNativeDriver: false,
        stiffness: 240,
        damping: 20,
        mass: 0.9,
        overshootClamping: true,
      }),
    ]).start();

    i18n.changeLanguage(code).catch(() => {});
  };

  const onNext = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await AsyncStorage.setItem("prefLang", selected);
      router.replace(NEXT_ROUTE);
    } finally {
      setSaving(false);
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          marginBottom: r.mScale(30),
        },
        headerTitle: {
          color: "#B0F200",
          fontSize: r.mScale(30),
          fontWeight: "700",
          marginTop: r.mScale(15),
        },
        card: {
          flex: 1,
          backgroundColor: "#fff",
          marginTop: r.mScale(60),
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
        scrollContent: {
          paddingHorizontal: r.mScale(54),
          paddingTop: r.mScale(24),
          paddingBottom: r.mScale(8),
        },
        row: { alignItems: "center" },
        divider: {
          height: 1,
          backgroundColor: "#0D3327",
          opacity: 0.4,
          marginHorizontal: r.mScale(20),
        },
        dividerActive: { backgroundColor: "#0E5B3F", opacity: 1 },
        lang: { color: "#6B6B6B", fontSize: r.mScale(20), textAlign: "center" },
        langActive: { color: "#0E5B3F", fontWeight: "500" },
        footer: {
          borderColor: "rgba(0,0,0,0.08)",
          paddingTop: r.mScale(20),
          paddingBottom: r.mScale(30),
          paddingHorizontal: r.mScale(50),
          alignItems: "stretch",
        },
        helper: {
          textAlign: "center",
          color: "#6B6B6B",
          marginBottom: r.mScale(14),
          paddingHorizontal: r.mScale(10),
        },
        cta: {
          alignSelf: "stretch",
          width: "100%",
          backgroundColor: "#B0F200",
          borderRadius: r.mScale(28),
          paddingVertical: r.mScale(14),
          justifyContent: "center",
          alignItems: "center",
        },
        ctaText: {
          color: BG,
          fontWeight: "500",
          fontSize: r.mScale(16),
          textAlign: "center",
        },
      }),
    [r]
  );

  return (
    <View style={styles.root}>
      <Image
        source={require("../../assets/images/bg-onboarding.png")}
        style={styles.bg}
        contentFit="cover"
      />

      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/logo-icon.png")}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.headerTitle}>{t("chooseLanguage.title")}</Text>
        </View>

        <View style={styles.card}>
          <LinearGradient
            colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.12)", "transparent"]}
            locations={[0, 0.5, 1]}
            style={styles.innerShadowTop}
          />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {LANGS.map((l, i) => {
              const isActive = selected === l.code;

              const padY = anim[l.code].pad.interpolate({
                inputRange: [0, 1],
                outputRange: [r.mScale(8), r.mScale(14)],
              });

              const scale = anim[l.code].scale.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2],
              });

              const prevCode: Code | undefined =
                i > 0 ? LANGS[i - 1].code : undefined;
              const dividerIsActive =
                selected === l.code || selected === prevCode;

              return (
                <View key={l.code}>
                  {i > 0 && (
                    <View
                      style={[
                        styles.divider,
                        dividerIsActive && styles.dividerActive,
                      ]}
                    />
                  )}

                  <Pressable
                    onPress={() => onSelect(l.code)}
                    style={({ pressed }) => [
                      styles.row,
                      pressed && { opacity: 0.75 },
                    ]}
                  >
                    <Animated.View
                      style={{
                        paddingVertical: padY,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Animated.Text
                        style={[
                          styles.lang,
                          isActive && styles.langActive,
                          { transform: [{ scale }] },
                        ]}
                      >
                        {t(`languages.${l.code}`)}
                      </Animated.Text>
                    </Animated.View>
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.helper}>{t("chooseLanguage.helper")}</Text>

            <Pressable
              onPress={onNext}
              disabled={saving}
              style={({ pressed }) => [
                styles.cta,
                pressed && { opacity: 0.9 },
                saving && { opacity: 0.6 },
              ]}
            >
              <Text style={styles.ctaText}>{saving ? "…" : t("common.next")}</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const BG = "#00140B";
