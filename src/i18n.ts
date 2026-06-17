import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import de from "./locales/de.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import pt from "./locales/pt.json";
import zh from "./locales/zh.json";

export type AppLang = "en" | "es" | "fr" | "pt" | "zh" | "de";
const VALID_LANGS: AppLang[] = ["en", "es", "fr", "pt", "zh", "de"];

export async function initI18n() {
  if (i18n.isInitialized) return;

  // 1) Intentar idioma guardado
  const saved = (await AsyncStorage.getItem("prefLang")) as AppLang | null;
  const savedValid = saved && VALID_LANGS.includes(saved) ? saved : null;

  // 2) Idioma del dispositivo ("en-US" -> "en")
  const deviceLang =
    Localization.getLocales?.()[0]?.languageCode ?? "en";
  const deviceValid = (VALID_LANGS as readonly string[]).includes(deviceLang)
    ? (deviceLang as AppLang)
    : null;

  const lng: AppLang = savedValid || deviceValid || "en";

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      pt: { translation: pt },
      zh: { translation: zh },
      de: { translation: de },
    } as const,
    lng,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      skipOnVariables: false,
      defaultVariables: { brand: "Klean" },
    },
  });
}

export { i18n };
export default i18n;
