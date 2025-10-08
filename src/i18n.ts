import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import de from "./locales/de.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import pt from "./locales/pt.json";
import zh from "./locales/zh.json";

export type AppLang = "en" | "es" | "fr" | "pt" | "zh" | "de";

export async function initI18n() {
  if (i18n.isInitialized) return;

  // idioma guardado por el usuario
  const saved = (await AsyncStorage.getItem("prefLang")) as AppLang | null;

  // idioma del dispositivo (p.ej. "es", "en", "pt", "fr", "de", "zh")
  const device = (RNLocalize.getLocales()[0]?.languageCode ?? "en") as AppLang;

  const lng: AppLang = saved || device || "en";

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      pt: { translation: pt },
      zh: { translation: zh },
      de: { translation: de }
    },
    lng,
    fallbackLng: "en",
    interpolation: { 
      escapeValue: false,
      skipOnVariables: false, 
      defaultVariables: { brand: "Klean" },
    }
  });
}

export { i18n };

