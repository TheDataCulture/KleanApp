// app/_layout.tsx
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Stack, SplashScreen } from "expo-router";
import { Asset } from "expo-asset";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";

// Usa tu ruta real de i18n.
// Si tu i18n está en src/i18n.ts, esta ruta es correcta:
import { initI18n } from "../src/i18n";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#00140B");

    (async () => {
      // 1) Precarga assets críticos (evita parpadeos)
      await Asset.loadAsync([
        require("../assets/images/bg-onboarding.png"),
        require("../assets/images/logo-icon.png"),
      ]);

      // 2) Inicializa i18n antes del primer render
      await initI18n();

      setReady(true);
    })();
  }, []);

  // Oculta el splash solo cuando el primer frame del layout ya se pintó
  const onLayout = useCallback(() => {
    if (ready) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => SplashScreen.hideAsync())
      );
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#00140B" }} onLayout={onLayout}>
      <StatusBar style="light" backgroundColor="#00140B" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: { backgroundColor: "#00140B" },
        }}
      />
    </View>
  );
}
