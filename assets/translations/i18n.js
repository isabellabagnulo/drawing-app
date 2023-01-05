import * as Localization from "expo-localization"
import { I18n } from "i18n-js"

import it from "./it.json"
import en from "./en.json"


const translations = {
    it: it,
    en: en,
}

const i18n = new I18n(translations)
i18n.enableFallback = true
i18n.locale = "en"

export default i18n