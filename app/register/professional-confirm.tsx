import { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams, router } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";
import AppButton from "@/components/ui/AppButton";

import  ProfessionalIcon  from "@/components/ProfessionalIcon";
import  IndividualProfessional  from "@/components/IndividualProfessional";

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

  selectedCard: ViewStyle;
  selectedHeader: ViewStyle;
  selectedTitle: TextStyle;
  selectedBadge: ViewStyle;
  selectedBadgeText: TextStyle;

  pager: ViewStyle;
  dot: ViewStyle;
  dotActive: ViewStyle;

  actionsRow: ViewStyle;
  backBtn: ViewStyle;
  nextBtn: ViewStyle;
};

export default function RegisterProfessionalConfirm() {
  const { t } = useTranslation();
  const r = useResponsive();
  const { type = "individual" } = useLocalSearchParams<{ type?: "individual" | "business" }>();

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
        },
        helper: {
          color: "#6B6B6B",
          fontSize: r.mScale(12),
          textAlign: "center",
          lineHeight: r.mScale(18),
          marginBottom: r.mScale(18),
        },

        selectedCard: {
          borderWidth: 1.5,
          borderColor: "#B0F200",
          backgroundColor: "rgba(176,242,0,0.12)",
          borderRadius: r.mScale(14),
          paddingVertical: r.mScale(16),
          paddingHorizontal: r.mScale(14),
          gap: r.mScale(10),
          shadowColor: "#B0F200",
          shadowOpacity: 0.16,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        },
        selectedHeader: {
          alignItems: "center",
          gap: r.mScale(10),
        },
        selectedTitle: {
          color: "#1B1B1B",
          fontSize: r.mScale(18),
          fontWeight: "700",
          textAlign: "center",
        },
        selectedBadge: {
          alignSelf: "center",
          backgroundColor: "#B0F200",
          borderRadius: 999,
          paddingHorizontal: r.mScale(12),
          paddingVertical: r.mScale(4),
        },
        selectedBadgeText: {
          color: "#494949",
          fontWeight: "700",
          fontSize: r.mScale(12),
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
  const finish = () => {
    // siguiente paso de tu onboarding/registro
    //router.push("/register/details"); // ajusta la ruta final
  };

  const isIndividual = type === "individual";

  return (
    <View style={s.root}>
      <Image source={require("../../assets/images/bg-onboarding.png")} style={s.bg} contentFit="cover" />
      <SafeAreaView style={s.safe}>
        <View style={s.header}>
          <Image source={require("../../assets/images/logo-icon.png")} style={s.logo} contentFit="contain" />
          <Text style={s.title}>{t("register.howUse", "How do you want to use Klean?")}</Text>
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
                "register.pro.helper2",
                "How do you currently work?\nChoose whether you’re an independent professional or represent a business."
              )}
            </Text>

            <View style={s.selectedCard}>
              <View style={s.selectedHeader}>
                {isIndividual ? <IndividualProfessional /> : <ProfessionalIcon />}
                <Text style={s.selectedTitle}>
                  {isIndividual
                    ? t("register.individual", "Individual Professional")
                    : t("register.business", "Business Professional")}
                </Text>
              </View>
              <View style={s.selectedBadge}>
                <Text style={s.selectedBadgeText}>
                  {t("register.continueAs", "Continue how")}
                </Text>
              </View>
            </View>

            {/* pager (puedes mantener 2 pasos si lo prefieres) */}
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
                onPress={finish}
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
