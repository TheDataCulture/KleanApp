import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
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

import ProfessionalIcon from "@/components/ProfessionalIcon";
import IndividualProfessional from "@/components/IndividualProfessional";
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
  helper: TextStyle;

  proHeader: ViewStyle;
  proLabel: TextStyle;

  list: ViewStyle;
  radio: ViewStyle;
  radioActive: ViewStyle;
  radioRow: ViewStyle;
  radioLeft: ViewStyle;
  radioRight: ViewStyle;
  radioTitle: TextStyle;
  radioSub: TextStyle;
  radioDotWrap: ViewStyle;
  radioDot: ViewStyle;
  radioDotActive: ViewStyle;

  pager: ViewStyle;
  dot: ViewStyle;
  dotActive: ViewStyle;

  actionsRow: ViewStyle;
  backBtn: ViewStyle;
  nextBtn: ViewStyle;
};

export default function RegisterProfessionalType() {
  const { t } = useTranslation();
  const r = useResponsive();
  const [type, setType] = useState<"individual" | "business" | null>(null);

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
        },

        card: {
          flex: 1,
          backgroundColor: "#fff",
          marginTop: r.mScale(28),
          borderTopLeftRadius: r.mScale(28),
          borderTopRightRadius: r.mScale(28),
          justifyContent: "center",
          alignItems: "center",
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
          paddingHorizontal: r.mScale(26),
          paddingTop: r.mScale(26),
          justifyContent: "center",
        },
        helper: {
          color: "#6B6B6B",
          fontSize: r.mScale(12),
          textAlign: "center",
          lineHeight: r.mScale(18),
          marginBottom: r.mScale(18),
        },

        proHeader: {
          alignItems: "center",
          justifyContent: "center",
          marginBottom: r.mScale(12),
          gap: r.mScale(8),
        },
        proLabel: {
          color: "#3A3A3A",
          fontSize: r.mScale(18),
          fontWeight: "700",
        },

        list: { gap: r.mScale(12), marginTop: r.mScale(6) },
        radio: {
          borderWidth: 1,
          borderColor: "#E5E5E5",
          backgroundColor: "#FFFFFF",
          borderRadius: r.mScale(12),
          paddingVertical: r.mScale(12),
          paddingHorizontal: r.mScale(14),
        },
        radioActive: {
          borderColor: "#B0F200",
          backgroundColor: "rgba(176,242,0,0.12)",
          shadowColor: "#B0F200",
          shadowOpacity: 0.16,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 3 },
          elevation: 3,
        },
        radioRow: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: r.mScale(10),
        },
        radioLeft: { flex: 1, gap: r.mScale(6) },
        radioRight: { width: r.mScale(22), alignItems: "center" },
        radioTitle: {
          color: "#1B1B1B",
          fontSize: r.mScale(14),
          fontWeight: "700",
        },
        radioSub: { color: "#6B6B6B", fontSize: r.mScale(11) },

        radioDotWrap: {
          width: r.mScale(20),
          height: r.mScale(20),
          borderRadius: 999,
          borderWidth: 1.5,
          borderColor: "#D1D1D1",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF",
        },
        radioDot: {
          width: r.mScale(9),
          height: r.mScale(9),
          borderRadius: 99,
          backgroundColor: "transparent",
        },
        radioDotActive: {
          backgroundColor: "#B0F200",
        },

        pager: {
          marginTop: r.mScale(24),
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: r.mScale(8),
        },
        dot: {
          width: r.mScale(22),
          height: r.mScale(6),
          borderRadius: 99,
          backgroundColor: "#D9D9D9",
        },
        dotActive: { backgroundColor: "#B0F200" },

        actionsRow: {
          marginTop: r.mScale(16),
          paddingHorizontal: r.mScale(20),
          paddingBottom: r.mScale(24),
          flexDirection: "row",
          gap: r.mScale(12),
        },
        backBtn: { flex: 1 },
        nextBtn: { flex: 1 },
      }),
    [r]
  );

  const goBack = () => router.back();
  const goNext = () => {
    if (!type) return;
    router.push({
      pathname: "/register/professional-confirm",
      params: { type },
    });
  };

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
            {t("register.howUse", "How do you want to use Klean?")}
          </Text>
        </View>

        <View style={s.card}>
          <LinearGradient
            colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.12)", "transparent"]}
            locations={[0, 0.5, 1]}
            style={s.innerShadowTop}
          />

          <View style={s.body}>
            <Text style={s.helper}>
              {t(
                "register.pro.helper",
                "How do you currently work?\nChoose whether you’re an independent professional or represent a business."
              )}
            </Text>

            <View style={s.proHeader}>
              <ProfessionalIcon />
              <Text style={s.proLabel}>
                {t("register.professional", "Professional")}
              </Text>
            </View>

            <View style={s.list}>
              <Pressable
                onPress={() => setType("individual")}
                style={[s.radio, type === "individual" && s.radioActive]}
              >
                <View style={s.radioRow}>
                  <View style={s.radioLeft}>
                    <Text style={s.radioTitle}>
                      {t("register.individual", "Individual Professional")}
                    </Text>
                    <Text style={s.radioSub}>
                      {t(
                        "register.individual.sub",
                        "Individual professional who provides services directly."
                      )}
                    </Text>
                  </View>
                  <View style={s.radioRight}>
                    <View style={s.radioDotWrap}>
                      <View
                        style={[
                          s.radioDot,
                          type === "individual" && s.radioDotActive,
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setType("business")}
                style={[s.radio, type === "business" && s.radioActive]}
              >
                <View style={s.radioRow}>
                  <View style={s.radioLeft}>
                    <Text style={s.radioTitle}>
                      {t("register.business", "Business Professional")}
                    </Text>
                    <Text style={s.radioSub}>
                      {t(
                        "register.business.sub",
                        "Company or contractor with its own operational staff."
                      )}
                    </Text>
                  </View>
                  <View style={s.radioRight}>
                    <View style={s.radioDotWrap}>
                      <View
                        style={[
                          s.radioDot,
                          type === "business" && s.radioDotActive,
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>

            {/* pager (2º paso activo) */}
            <View style={s.pager}>
              <View style={s.dot} />
              <View style={[s.dot, s.dotActive]} />
            </View>

            <View style={s.actionsRow}>
              <AppButton
                label={t("common.back", "Back")}
                onPress={goBack}
                size="md"
                enabledBg="#E0E0E0"
                enabledText="#494949"
                disabledBg="#E0E0E0"
                disabledText="#494949"
                style={s.backBtn}
              />
              <AppButton
                label={t("common.next", "Next")}
                onPress={goNext}
                disabled={!type}
                size="md"
                enabledBg="#B0F200"
                disabledBg="#A4A4A4"
                enabledText="#494949"
                disabledText="#FFFFFF"
                style={s.nextBtn}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
