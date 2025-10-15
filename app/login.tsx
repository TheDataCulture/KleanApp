import { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  TextInput,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";
import { EyeIcon } from "@/components/EyeIcon";

const BG = "#00140B";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function Login() {
  const { t } = useTranslation();
  const r = useResponsive();

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [pwdTouched, setPwdTouched] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const emailValid = isEmail(email);
  const pwdValid = password.trim().length >= 6;
  const canSubmit = emailValid && pwdValid;

  // Anim state (0 inactivo, 1 activo)
  const enabled = useRef(new Animated.Value(canSubmit ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(enabled, {
      toValue: canSubmit ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [canSubmit, enabled]);

  const bgColor = enabled.interpolate({
    inputRange: [0, 1],
    outputRange: ["#A4A4A4", "#B0F200"],
  });
  const textColor = enabled.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#00140B"],
  });

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
          marginBottom: r.mScale(52),
        },
        title: {
          color: "#B0F200",
          fontSize: r.mScale(28),
          fontWeight: "700",
          textAlign: "center",
        },
        subtitle: {
          color: "#EAF5EE",
          fontSize: r.mScale(12),
          marginTop: r.mScale(6),
          opacity: 0.9,
          textAlign: "center",
          marginBottom: r.mScale(22),
        },

        card: {
          flex: 1,
          backgroundColor: "#fff",
          marginTop: r.mScale(18),
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

        formWrap: { flex: 1, justifyContent: "center" },
        cardInner: {
          flex: 1,
          position: "relative",
        },
        form: {
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: r.mScale(44),
          gap: r.mScale(10),
          paddingBottom: r.mScale(50),
        },

        label: {
          color: "#3A3A3A",
          marginBottom: r.mScale(6),
          fontSize: r.mScale(12),
        },

        footerFixed: {
          position: "absolute",
          left: r.mScale(24),
          right: r.mScale(24),
          bottom: r.mScale(24),
          alignItems: "stretch",
          paddingHorizontal: r.mScale(20),
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
        input: { flex: 1, color: "#A4A4A4", fontSize: r.mScale(14) },
        rightLink: {
          marginLeft: r.mScale(10),
          color: "#6B6B6B",
          fontSize: r.mScale(12),
        },

        errorText: {
          color: "#D32F2F",
          fontSize: r.mScale(11),
          marginTop: r.mScale(6),
        },

        rowEnd: { alignSelf: "flex-end" },
        link: { color: "#7BC400", fontSize: r.mScale(12) },
        cta: {
          alignSelf: "stretch",
          borderRadius: r.mScale(28),
          paddingVertical: r.mScale(14),
          justifyContent: "center",
          alignItems: "center",
          marginBottom: r.mScale(10),
        },
        ctaText: {
          fontWeight: "700",
          fontSize: r.mScale(16),
        },

        footerRow: {
          marginTop: r.mScale(16),
          flexDirection: "row",
          justifyContent: "space-between",
          gap: r.mScale(6),
          marginBottom: r.mScale(30),
        },
        footerMuted: { color: "#8F8F8F", fontSize: r.mScale(12) },
        footerLink: { color: "#7BC400", fontSize: r.mScale(12) },
      }),
    [r]
  );

  const submit = () => {
    if (!canSubmit) return;
    router.replace("/");
  };

  return (
    <View style={s.root}>
      <Image
        source={require("../assets/images/bg-onboarding.png")}
        style={s.bg}
        contentFit="cover"
      />

      <SafeAreaView style={s.safe}>
        <View style={s.header}>
          <Image
            source={require("../assets/images/logo-icon.png")}
            style={s.logo}
            contentFit="contain"
          />
          <Text style={s.title}>{t("login.title")}</Text>
          <Text style={s.subtitle}>{t("login.subtitle")}</Text>
        </View>

        <View style={s.card}>
          <LinearGradient
            colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.12)", "transparent"]}
            locations={[0, 0.5, 1]}
            style={s.innerShadowTop}
          />

          <View style={s.cardInner}>
            <View style={s.form}>
              <View>
                <Text style={s.label}>{t("login.emailLabel")}</Text>
                <View
                  style={[
                    s.inputWrap,
                    emailTouched &&
                      !emailValid && {
                        borderColor: "#EF5350",
                        backgroundColor: "#FFF",
                      },
                  ]}
                >
                  <TextInput
                    style={s.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder={t("login.emailPlaceholder")}
                    placeholderTextColor="#A7A7A7"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={() => setEmailTouched(true)}
                  />
                </View>
                {emailTouched && !emailValid ? (
                  <Text style={s.errorText}>{t("login.invalidEmail")}</Text>
                ) : null}
              </View>

              <View>
                <Text style={s.label}>{t("login.passwordLabel")}</Text>
                <View
                  style={[
                    s.inputWrap,
                    pwdTouched &&
                      !pwdValid && {
                        borderColor: "#EF5350",
                        backgroundColor: "#FFF",
                      },
                  ]}
                >
                  <TextInput
                    style={s.input}
                    secureTextEntry={!showPwd}
                    placeholder={t("login.passwordPlaceholder")}
                    placeholderTextColor="#A7A7A7"
                    value={password}
                    onChangeText={setPassword}
                    onBlur={() => setPwdTouched(true)}
                  />
                  <Pressable onPress={() => setShowPwd((v) => !v)}>
                    <EyeIcon open={showPwd} />
                  </Pressable>
                </View>
                {pwdTouched && !pwdValid ? (
                  <Text style={s.errorText}>{t("login.invalidPassword")}</Text>
                ) : null}
              </View>

              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/recovery/request",
                  })
                }
                style={s.rowEnd}
              >
                <Text style={s.link}>{t("login.forgot")}</Text>
              </Pressable>
            </View>

            <View style={s.footerFixed}>
              <Animated.View style={[s.cta, { backgroundColor: bgColor }]}>
                <Pressable disabled={!canSubmit} onPress={submit}>
                  <Animated.Text style={[s.ctaText, { color: textColor }]}>
                    {t("login.cta")}
                  </Animated.Text>
                </Pressable>
              </Animated.View>

              <View style={s.footerRow}>
                <Text style={s.footerMuted}>{t("login.noAccount")}</Text>
                <Pressable onPress={() => router.push("/signup")}>
                  <Text style={s.footerLink}>{t("login.createAccount")}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
