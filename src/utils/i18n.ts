/**
 * Created by Widiana Putra on 18/06/2022
 * Copyright (c) 2022 - Made with love
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from "../assets/locale/en.json";
import itJson from "../assets/locale/it.json";

const resources = {
  en: enJson,
  it: itJson,
};

i18n.use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
