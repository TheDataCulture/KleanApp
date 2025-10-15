import { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  TextInput,
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

const BG = "#00140B";

const rules = {
  len: (v: string) => v.length >= 8,
  letter: (v: string) => /[A-Za-z]/.test(v),
  number: (v: string) => /\d/.test(v),
  personal: (v: string) => !/name|user|email/i.test(v), // demo
  reuse: (_: string) => true, // demo
  symbols: (v: string) => /[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]/.test(v),
};

type Styles = {
  root: ViewStyle;
  safe: ViewStyle;
  bg: ImageStyle;

  header: ViewStyle;
  logo: ImageStyle;
  title: TextStyle;

  card: ViewStyle;
  innerShadowTop: ViewStyle;

  form: ViewStyle;
  helper: TextStyle;

  label: TextStyle;
  row: ViewStyle;
  input: TextStyle;
  toggle: TextStyle;

  list: ViewStyle;
  item: ViewStyle;
  dotBase: ViewStyle;
  ruleText: TextStyle;

  cta: ViewStyle;
  ctaText: TextStyle;
};

export default function RecoveryReset() {
  const { t } = useTranslation();
  const r = useResponsive();
  const { email = "" } = useLocalSearchParams<{ email?: string }>();

  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const ok = {
    len: rules.len(pwd),
    letter: rules.letter(pwd),
    number: rules.number(pwd),
    personal: rules.personal(pwd),
    reuse: rules.reuse(pwd),
    symbols: rules.symbols(pwd),
  };
  const allValid = Object.values(ok).every(Boolean) && confirm === pwd;

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

        form: {
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: r.mScale(24),
          gap: r.mScale(14),
        },
        helper: {
          color: "#6B6B6B",
          textAlign: "center",
          fontSize: r.mScale(12),
          marginBottom: r.mScale(4),
        },

        label: {
          color: "#3A3A3A",
          marginBottom: r.mScale(6),
          fontSize: r.mScale(12),
        },
        row: {
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
        toggle: {
          marginLeft: r.mScale(10),
          color: "#6B6B6B",
          fontSize: r.mScale(12),
        },

        list: { marginTop: r.mScale(6), gap: r.mScale(6) },
        item: { flexDirection: "row", alignItems: "center", gap: r.mScale(8) },
        dotBase: {
          width: r.mScale(8),
          height: r.mScale(8),
          borderRadius: 99,
          backgroundColor: "#D32F2F",
        },
        ruleText: { fontSize: r.mScale(11), color: "#6B6B6B" },

        cta: {
          marginTop: r.mScale(18),
          alignSelf: "center",
          backgroundColor: "#B0F200",
          opacity: allValid ? 1 : 0.5,
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
      }),
    [r, allValid]
  );

  const submit = () => {
    if (!allValid) return;
    router.replace("/login");
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
          <Text style={s.title}>{t("reset.title")}</Text>
        </View>

        <View style={s.card}>
          <LinearGradient
            colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.12)", "transparent"]}
            locations={[0, 0.5, 1]}
            style={s.innerShadowTop}
          />

          <View style={s.form}>
            <Text style={s.helper}>{t("reset.helper")}</Text>

            <Text style={s.label}>{t("reset.newPwd")}</Text>
            <View style={s.row}>
              <TextInput
                style={s.input}
                secureTextEntry={!show1}
                value={pwd}
                onChangeText={setPwd}
                placeholder={t("reset.newPwdPh")}
                placeholderTextColor="#A7A7A7"
              />
              <Pressable onPress={() => setShow1((v) => !v)}>
                <Text style={s.toggle}>
                  {show1 ? t("login.hide") : t("login.show")}
                </Text>
              </Pressable>
            </View>

            <Text style={s.label}>{t("reset.confirmPwd")}</Text>
            <View style={s.row}>
              <TextInput
                style={s.input}
                secureTextEntry={!show2}
                value={confirm}
                onChangeText={setConfirm}
                placeholder={t("reset.confirmPwdPh")}
                placeholderTextColor="#A7A7A7"
              />
              <Pressable onPress={() => setShow2((v) => !v)}>
                <Text style={s.toggle}>
                  {show2 ? t("login.hide") : t("login.show")}
                </Text>
              </Pressable>
            </View>

            <View style={s.list}>
              <View style={s.item}>
                <View
                  style={[
                    s.dotBase,
                    { backgroundColor: ok.len ? "#7BC400" : "#D32F2F" },
                  ]}
                />
                <Text style={s.ruleText}>{t("reset.rules.len")}</Text>
              </View>
              <View style={s.item}>
                <View
                  style={[
                    s.dotBase,
                    { backgroundColor: ok.letter ? "#7BC400" : "#D32F2F" },
                  ]}
                />
                <Text style={s.ruleText}>{t("reset.rules.letter")}</Text>
              </View>
              <View style={s.item}>
                <View
                  style={[
                    s.dotBase,
                    { backgroundColor: ok.number ? "#7BC400" : "#D32F2F" },
                  ]}
                />
                <Text style={s.ruleText}>{t("reset.rules.number")}</Text>
              </View>
              <View style={s.item}>
                <View
                  style={[
                    s.dotBase,
                    { backgroundColor: ok.personal ? "#7BC400" : "#D32F2F" },
                  ]}
                />
                <Text style={s.ruleText}>{t("reset.rules.personal")}</Text>
              </View>
              <View style={s.item}>
                <View
                  style={[
                    s.dotBase,
                    { backgroundColor: ok.reuse ? "#7BC400" : "#D32F2F" },
                  ]}
                />
                <Text style={s.ruleText}>{t("reset.rules.reuse")}</Text>
              </View>
              <View style={s.item}>
                <View
                  style={[
                    s.dotBase,
                    { backgroundColor: ok.symbols ? "#7BC400" : "#D32F2F" },
                  ]}
                />
                <Text style={s.ruleText}>{t("reset.rules.symbols")}</Text>
              </View>
            </View>

            <Pressable disabled={!allValid} onPress={submit} style={s.cta}>
              <Text style={s.ctaText}>{t("reset.submit")}</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
