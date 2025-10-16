import { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";
import AppButton from "@/components/ui/AppButton";

const BG = "#00140B";
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function RecoveryRequest() {
  const { t } = useTranslation();
  const r = useResponsive();

  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const valid = isEmail(email);

  const s = useMemo(
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
          paddingHorizontal: r.mScale(24),
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

        form: {
          flex: 1,
          paddingHorizontal: r.mScale(24),
          gap: r.mScale(80),
          justifyContent: "center",
        },

        helperWrap: {
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: r.mScale(12),
          marginTop: r.mScale(90),
        },

        helper: {
          color: "#4A4A4A",
          textAlign: "center",
          fontSize: r.mScale(12),
          lineHeight: r.mScale(18),
          opacity: 0.9,
          marginBottom: r.mScale(8),
        },

        label: {
          color: "#3A3A3A",
          marginBottom: r.mScale(6),
          fontSize: r.mScale(12),
        },
        inputWrap: {
          borderWidth: 1,
          borderColor: "#E5E5E5",
          backgroundColor: "#F8F8F8",
          borderRadius: r.mScale(10),
          paddingHorizontal: r.mScale(12),
          height: r.mScale(44),
          flexDirection: "row",
          alignItems: "center",
        },
        input: { flex: 1, color: "#222", fontSize: r.mScale(14) },
        error: {
          color: "#D32F2F",
          fontSize: r.mScale(11),
          marginTop: r.mScale(6),
        },
        footerRow: {
          marginTop: r.mScale(16),
          flexDirection: "row",
          justifyContent: "center",
          gap: r.mScale(6),
          marginBottom: r.mScale(30),
        },
        link: { color: "#7BC400", fontSize: r.mScale(12) },
        muted: { color: "#8F8F8F", fontSize: r.mScale(12) },
      }),
    [r, valid]
  );

  const send = () => {
    if (!valid) return;
    router.push({ pathname: "/recovery/code", params: { email } });
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
          <Text style={s.title}>{t("recovery.title")}</Text>
        </View>

        <View style={s.card}>
          <LinearGradient
            colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.12)", "transparent"]}
            locations={[0, 0.5, 1]}
            style={s.innerShadowTop}
          />
          <View style={s.form}>
            <View style={s.helperWrap}>
              <Text style={s.helper}>{t("recovery.helper")}</Text>
            </View>

            <View>
              <Text style={s.label}>{t("recovery.emailLabel")}</Text>
              <View
                style={[
                  s.inputWrap,
                  touched &&
                    !valid && {
                      borderColor: "#EF5350",
                      backgroundColor: "#FFF",
                    },
                ]}
              >
                <TextInput
                  style={s.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder={t("recovery.emailPlaceholder")}
                  placeholderTextColor="#A7A7A7"
                  value={email}
                  onChangeText={setEmail}
                  onBlur={() => setTouched(true)}
                />
              </View>

              <AppButton
                label={t("recovery.send")}
                onPress={send}
                disabled={!valid}
                size="md"
                enabledBg="#B0F200"
                disabledBg="#A4A4A4"
                enabledText="#494949"
                disabledText="#FFFFFF"
                style={{ minWidth: r.mScale(200), marginTop: r.mScale(24) }}
              />

              <View style={s.footerRow}>
                <Text style={s.muted}>{t("recovery.remembered")}</Text>
                <Pressable onPress={() => router.replace("/login")}>
                  <Text style={s.link}>{t("recovery.backToLogin")}</Text>
                </Pressable>
              </View>
            </View>

            {touched && !valid ? (
              <Text style={s.error}>{t("recovery.invalidEmail")}</Text>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
