import { useEffect, useMemo, useRef, useState } from "react";
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
import { useLocalSearchParams, router } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";
import AppButton from "@/components/ui/AppButton";

const BG = "#00140B";
const CODE_LEN = 4;
const DURATION = 600; // seg

export default function RecoveryCode() {
  const fmt = (n: number) => n.toString().padStart(2, "0");
  const formatTime = (total: number) =>
    `${fmt(Math.floor(total / 60))}:${fmt(total % 60)}`;

  const { t } = useTranslation();
  const r = useResponsive();
  const { email = "" } = useLocalSearchParams<{ email?: string }>();

  const [digits, setDigits] = useState<string[]>(Array(CODE_LEN).fill(""));
  const [sec, setSec] = useState(DURATION);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const id = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const code = digits.join("");
  const valid = code.length === CODE_LEN;

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
        enter: {
          color: "#494949",
          textAlign: "center",
          fontSize: r.mScale(22),
          fontWeight: 700,
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
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: r.mScale(24),
          gap: r.mScale(18),
        },
        hint: { color: "#494949", textAlign: "center", fontSize: r.mScale(12) },

        codeRow: {
          flexDirection: "row",
          gap: r.mScale(6),
          marginTop: r.mScale(8),
          marginBottom: r.mScale(6),
        },
        box: {
          width: r.mScale(64),
          height: r.mScale(64),
          borderRadius: r.mScale(8),
          borderWidth: 1,
          borderColor: "#E5E5E5",
          textAlign: "center",
          fontSize: r.mScale(18),
          color: "#222",
        },

        timer: { color: "#494949", fontSize: r.mScale(14) },

        cta: {
          marginTop: r.mScale(10),
          marginHorizontal: r.mScale(28),
          alignSelf: "stretch",
          backgroundColor: "#B0F200",
          opacity: valid ? 1 : 0.5,
          borderRadius: r.mScale(28),
          paddingVertical: r.mScale(14),
          paddingHorizontal: r.mScale(38),
          minWidth: r.mScale(200),
          alignItems: "center",
          justifyContent: "center",
        },
        ctaText: {
          color: "#1C1C1C",
          fontWeight: "700",
          fontSize: r.mScale(16),
        },
        email: { fontWeight: "500", color: "#767676", fontSize: r.mScale(16) },

        linksRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          marginTop: r.mScale(8),
          paddingHorizontal: r.mScale(30),
        },
        link: { color: "#7BC400", fontSize: r.mScale(12) },
      }),
    [r, valid]
  );

  const onChange = (i: number, v: string) => {
    const ch = v.slice(-1).replace(/\D/g, "");
    const arr = [...digits];
    arr[i] = ch;
    setDigits(arr);
    if (ch && i < CODE_LEN - 1) inputs.current[i + 1]?.focus();
    if (!ch && i > 0) inputs.current[i - 1]?.focus();
  };

  const sent = t("code.sentTo", { email }).replace(/\\n|\/n/g, "\n");
  const parts = sent.split(email); // [antesDelEmail, despuesDelEmail]

  const verify = () => {
    if (!valid) return;
    router.push({ pathname: "/recovery/reset", params: { email } });
  };

  const resend = () => {
    setSec(DURATION);
    setDigits(Array(CODE_LEN).fill(""));
    inputs.current[0]?.focus();
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
          <View style={s.body}>
            <Text style={s.enter}>{t("code.enter")}</Text>
            <Text style={s.hint}>
              {parts[0]}
              <Text style={s.email}>{email}</Text>
              {parts[1] ?? ""}
            </Text>

            <Text style={s.hint}>
              {t("code.validFor", { minutes: Math.floor(DURATION / 60) })}
              {"\n"}
              {t("code.securityOnce")}
            </Text>

            <View style={s.codeRow}>
              {Array.from({ length: CODE_LEN }).map((_, i) => (
                <TextInput
                  key={i}
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  style={s.box}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digits[i]}
                  onChangeText={(v) => onChange(i, v)}
                />
              ))}
            </View>

            <Text style={s.timer}>
              {sec > 0
                ? t("code.timerMin", { time: formatTime(sec) })
                : t("code.expired")}
            </Text>

            <View style={s.linksRow}>
              <Text style={s.hint}>{t("login.noAccount")}</Text>
              <Pressable onPress={() => router.replace("/login")}>
                <Text style={s.link}>{t("login.createAccount")}</Text>
              </Pressable>
            </View>

            <AppButton
              label={t("recovery.send")}
              disabled={!valid}
              size="md"
              enabledBg="#B0F200"
              disabledBg="#A4A4A4"
              enabledText="#494949"
              disabledText="#FFFFFF"
              style={{ minWidth: r.mScale(200), marginHorizontal: r.mScale(30)}}
            />

            <View style={s.linksRow}>
              <Text style={s.hint}>{t("code.didntReceive")}</Text>
              <Pressable onPress={resend} disabled={sec > 0}>
                <Text style={s.link}>{t("code.resend")}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
