import { useMemo, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
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
import ClientIcon from "@/components/ClientIcon";
import ProfessionalIcon from "@/components/ProfessionalIcon";
import PagerDots from "@/components/PagerDots";

const BG = "#00140B";
const WHITE = "#FFFFFF";
const ACTIVE = "#B0F200";
const BORDER = "#D1D1D1";

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

  grid: ViewStyle;
  tile: ViewStyle;
  tileIconWrap: ViewStyle;
  tileLabel: TextStyle;

  pager: ViewStyle;

  actions: ViewStyle;
};

export default function RegisterRole() {
  const { t } = useTranslation();
  const r = useResponsive();

  const [role, setRole] = useState<"client" | "pro" | null>(null);
  const canNext = !!role;

  // Animación press (scale)
  const clientPress = useRef(new Animated.Value(1)).current;
  const proPress = useRef(new Animated.Value(1)).current;

  // Valores de selección (0 → 1)
  const clientAnim = useRef(new Animated.Value(0)).current;
  const proAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(clientAnim, {
      toValue: role === "client" ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
    Animated.timing(proAnim, {
      toValue: role === "pro" ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [role, clientAnim, proAnim]);

  // PagerDots control (step 1 => 0)
  const pagerX = useRef(new Animated.Value(0)).current;

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
        },
        title: {
          color: ACTIVE,
          fontSize: r.mScale(28),
          fontWeight: "700",
          textAlign: "center",
          marginTop: r.mScale(50),
        },

        card: {
          flex: 1,
          backgroundColor: "#fff",
          marginTop: r.mScale(28),
          borderTopLeftRadius: r.mScale(28),
          borderTopRightRadius: r.mScale(28),
          paddingHorizontal: r.mScale(24),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
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
          color: "#494949",
          fontSize: r.mScale(12),
          textAlign: "center",
          lineHeight: r.mScale(18),
          marginBottom: r.mScale(18),
        },

        grid: {
          gap: r.mScale(16),
          marginTop: r.mScale(6),
        },
        tile: {
          borderWidth: 1,
          borderColor: BORDER, // por defecto #D1D1D1
          backgroundColor: WHITE, // base blanca
          borderRadius: r.mScale(18),
          paddingVertical: r.mScale(18),
          paddingHorizontal: r.mScale(16),
          alignItems: "center",
          justifyContent: "center",
          rowGap: r.mScale(12),
          overflow: "hidden", // para el overlay
        },
        tileIconWrap: {
          width: r.mScale(56),
          height: r.mScale(56),
          alignItems: "center",
          justifyContent: "center",
        },
        tileLabel: {
          color: "#3A3A3A",
          fontSize: r.mScale(16),
          fontWeight: "600",
        },

        pager: {
          marginTop: r.mScale(24),
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: r.mScale(8),
        },

        actions: {
          marginTop: r.mScale(16),
          paddingHorizontal: r.mScale(20),
          paddingBottom: r.mScale(24),
        },
      }),
    [r]
  );

  const goNext = () => {
    if (!role) return;
    if (role === "pro") {
      router.push("/register/professional-type");
    } else {
      router.push("/register/professional-type");
    }
  };

  const onPressIn = (v: Animated.Value) => {
    Animated.spring(v, {
      toValue: 0.98,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = (v: Animated.Value) => {
    Animated.spring(v, {
      toValue: 1,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  const Tile = ({
    type,
    label,
    IconComp,
    press,
    anim,
  }: {
    type: "client" | "pro";
    label: string;
    IconComp: React.ComponentType;
    press: Animated.Value;
    anim: Animated.Value;
  }) => {
    const selected = role === type;

    const selectedShadow =
      Platform.OS === "ios"
        ? {
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 30,
            shadowOffset: { width: 10, height: 10 },
          }
        : { elevation: 12 };

    return (
      <Pressable
        onPressIn={() => onPressIn(press)}
        onPressOut={() => onPressOut(press)}
        onPress={() => setRole(type)}
      >
        <Animated.View
          style={[
            s.tile,
            {
              borderColor: selected ? ACTIVE : BORDER,
              transform: [{ scale: press }],
              ...(selected ? selectedShadow : null),
            } as any,
          ]}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: ACTIVE, opacity: anim },
            ]}
          />
          <View style={s.tileIconWrap}>
            <IconComp />
          </View>
          <Text style={s.tileLabel}>{label}</Text>
        </Animated.View>
      </Pressable>
    );
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
            {t("register.howUse")}
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
                "register.helper",
              )}
            </Text>

            <View style={s.grid}>
              <Tile
                type="client"
                label={t("register.client",)}
                IconComp={ClientIcon}
                press={clientPress}
                anim={clientAnim}
              />

              <Tile
                type="pro"
                label={t("register.professional")}
                IconComp={ProfessionalIcon}
                press={proPress}
                anim={proAnim}
              />
            </View>

            {/* pager */}
            <View style={s.pager}>
              <PagerDots
                scrollX={pagerX}
                count={2}
                itemWidth={r.width}
                height={r.mScale(6)}
                widthActive={r.mScale(22)}
                gap={r.mScale(8)}
                activeColor={ACTIVE}
                inactiveColor="#A4A4A4"
              />
            </View>

            <View style={s.actions}>
              <AppButton
                label={t("common.next", "Next")}
                onPress={goNext}
                disabled={!canNext}
                size="md"
                enabledBg={ACTIVE}
                disabledBg="#A4A4A4"
                enabledText="#494949"
                disabledText="#FFFFFF"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
