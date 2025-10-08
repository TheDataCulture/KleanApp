import { useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewToken,
  Animated,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";
import ArrowRightIcon from "@/components/ArrowRightIcon";
import TutorialOverlayGradient from "../../../components/TutorialOverlayGradient";
import gardeningImg from "@/assets/images/tutorials/gardening.png";
import cleaningImg from "@/assets/images/tutorials/cleaning.png";
import junkImg from "@/assets/images/tutorials/junk.png";

type Slide = {
  key: string;
  titleKey: string;
  descKey: string;
  image: number;
};

const SLIDES: Slide[] = [
  {
    key: "gardening",
    titleKey: "tutorials.gardening.title",
    descKey: "tutorials.gardening.desc",
    image: gardeningImg,
  },
  {
    key: "cleaning",
    titleKey: "tutorials.cleaning.title",
    descKey: "tutorials.cleaning.desc",
    image: cleaningImg,
  },
  {
    key: "junk",
    titleKey: "tutorials.junk.title",
    descKey: "tutorials.junk.desc",
    image: junkImg,
  },
];

export default function Tutorials() {
  const { t } = useTranslation();
  const r = useResponsive();
  const insets = useSafeAreaInsets();

  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<Animated.FlatList<Slide>>(null);
  const [idx, setIdx] = useState(0);

  // Alturas/anchos de los indicadores
  const DOT_H = r.mScale(8);
  const DOT_W = r.mScale(28);
  const DOT_GAP = r.mScale(10);

  // Offsets inferiores que respetan el safe area
  const CTA_BOTTOM = Math.max(insets.bottom, r.mScale(24)) + r.mScale(54);
  const DOTS_BOTTOM = CTA_BOTTOM + r.mScale(66);

  const s = useMemo(
    () =>
      StyleSheet.create({
        root: { flex: 1, backgroundColor: "#00140B" },
        safe: { flex: 1 },

        slide: { width: r.width, height: r.height },
        imageWrap: { ...StyleSheet.absoluteFillObject, overflow: "hidden" },
        image: { width: "110%", height: "110%" },

        header: {
          position: "absolute",
          top: insets.top + r.mScale(14),
          left: r.mScale(16),
          right: r.mScale(16),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
        },
        backBtn: {
          width: r.mScale(44),
          height: r.mScale(44),
          borderRadius: r.mScale(22),
          borderWidth: r.mScale(1.5),
          borderColor: "rgba(60,60,60,0.55)",
          backgroundColor: "rgba(255,255,255,0.1)",
          alignItems: "center",
          justifyContent: "center",
        },
        backIcon: {
          color: "rgba(60,60,60,0.7)",
          fontSize: r.mScale(20),
          fontWeight: "600",
          lineHeight: r.mScale(20),
          marginBottom: 6,
        },

        txtWrap: {
          position: "absolute",
          left: r.mScale(24),
          right: r.mScale(24),
          top: r.mScale(120),
        },
        title: {
          fontSize: r.mScale(30),
          lineHeight: r.mScale(32),
          fontWeight: "700",
          color: "#494949",
        },
        desc: {
          marginTop: r.mScale(10),
          color: "#3A3A3A",
          fontSize: r.mScale(14),
          lineHeight: r.mScale(18),
        },

        dotsRow: {
          position: "absolute",
          bottom: DOTS_BOTTOM,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },

        dotSlot: {
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        },
        dotCircle: {
          position: "absolute",
          backgroundColor: "rgba(255,255,255,0.55)",
        },
        dotTrack: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(255,255,255,0.35)",
          transform: [{ scaleX: 0.01 }],
        },
        dotFill: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "#B0F200",
          transform: [{ scaleX: 0.01 }],
        },

        cta: {
          position: "absolute",
          bottom: CTA_BOTTOM,
          alignSelf: "center",
          backgroundColor: "#B0F200",
          borderRadius: r.mScale(24),
          paddingVertical: r.mScale(5),
          paddingHorizontal: r.mScale(28),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: r.mScale(15),
          minWidth: r.mScale(160),
        },
        ctaText: {
          color: "#494949",
          fontWeight: "700",
          fontSize: r.mScale(20.48),
        },
      }),
    [r, insets.top, insets.bottom, CTA_BOTTOM, DOTS_BOTTOM]
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const first = viewableItems.find((v) => v.isViewable);
      if (first?.index != null) setIdx(first.index);
    }
  ).current;

  const goBack = () => router.back();

  const goToSlide = (index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
  };

  const onNext = () => {
    const next = idx + 1;
    if (next < SLIDES.length) {
      goToSlide(next);
    } else {
      router.replace("/onboarding/access");
    }
  };

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safe}>
        {/* Carrusel animado con parallax */}
        <Animated.FlatList
          ref={listRef}
          data={SLIDES}
          keyExtractor={(it) => it.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
          getItemLayout={(_, index) => ({
            length: r.width,
            offset: r.width * index,
            index,
          })}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * r.width,
              index * r.width,
              (index + 1) * r.width,
            ];

            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [r.mScale(40), 0, -r.mScale(40)],
              extrapolate: "clamp",
            });
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [r.mScale(12), 0, -r.mScale(12)],
              extrapolate: "clamp",
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1.02, 1, 1.02],
              extrapolate: "clamp",
            });

            const textOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.2, 1, 0.2],
              extrapolate: "clamp",
            });
            const textTranslateY = scrollX.interpolate({
              inputRange,
              outputRange: [8, 0, 8],
              extrapolate: "clamp",
            });

            return (
              <View style={s.slide}>
                <Animated.View
                  style={[
                    s.imageWrap,
                    { transform: [{ translateX }, { translateY }, { scale }] },
                  ]}
                  pointerEvents="none"
                >
                  <Image
                    source={item.image}
                    style={s.image}
                    contentFit="cover"
                  />
                </Animated.View>

                <TutorialOverlayGradient />

                <Animated.View
                  style={[
                    s.txtWrap,
                    {
                      opacity: textOpacity,
                      transform: [{ translateY: textTranslateY }],
                    },
                  ]}
                >
                  <Text style={s.title}>{t(item.titleKey)}</Text>
                  <Text style={s.desc}>{t(item.descKey)}</Text>
                </Animated.View>
              </View>
            );
          }}
        />

        {/* Header */}
        <View style={s.header}>
          <Pressable onPress={goBack} style={s.backBtn} hitSlop={10}>
            <View style={{ transform: [{ scaleX: -1 }] }}>
              <ArrowRightIcon size={r.mScale(18)} color="rgba(60,60,60,0.7)" />
            </View>
          </Pressable>
        </View>

        {/* Dots animados y clicables */}
        <View style={s.dotsRow}>
          {SLIDES.map((_, i) => {
            const inputRange = [
              (i - 1) * r.width,
              i * r.width,
              (i + 1) * r.width,
            ];

            const active = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: "clamp",
            });

            const slotWidth = active.interpolate({
              inputRange: [0, 1],
              outputRange: [DOT_H, DOT_W],
              extrapolate: "clamp",
            });

            const circleOpacity = active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            });

            const trackOpacity = active;
            const scaleX = active.interpolate({
              inputRange: [0, 1],
              outputRange: [0.01, 1],
              extrapolate: "clamp",
            });

            return (
              <Pressable
                key={i}
                onPress={() => goToSlide(i)}
                hitSlop={10}
                style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
              >
                <Animated.View
                  style={[
                    s.dotSlot,
                    {
                      width: slotWidth,
                      height: DOT_H,
                      marginHorizontal: DOT_GAP / 2,
                      borderRadius: DOT_H / 2,
                    },
                  ]}
                >
                  <Animated.View
                    style={[
                      s.dotCircle,
                      {
                        width: DOT_H,
                        height: DOT_H,
                        borderRadius: DOT_H / 2,
                        opacity: circleOpacity,
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      s.dotTrack,
                      { borderRadius: DOT_H / 2, opacity: trackOpacity },
                    ]}
                  />
                  <Animated.View
                    style={[
                      s.dotFill,
                      {
                        borderRadius: DOT_H / 2,
                        opacity: trackOpacity,
                        transform: [{ scaleX }],
                      },
                    ]}
                  />
                </Animated.View>
              </Pressable>
            );
          })}
        </View>

        <Pressable onPress={onNext} style={s.cta}>
          <ArrowRightIcon size={r.mScale(35)} color="#1C1C1C" />
          <Text style={s.ctaText}>
            {idx < SLIDES.length - 1
              ? t("tutorials.skip")
              : t("tutorials.finish")}
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
