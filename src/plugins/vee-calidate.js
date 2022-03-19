import Vue from "vue"
import { ValidationObserver, ValidationProvider, extend, localize } from "vee-validate"
import {
  // eslint-disable-next-line camelcase
  alpha, alpha_dash, digits, email, confirmed, max, min, required
} from "vee-validate/dist/rules"

import ru from "vee-validate/dist/locale/ru.json"

// Register it globally
Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)

extend("alpha", alpha)
extend("alpha_dash", alpha_dash)
extend("confirmed", confirmed)
extend("digits", digits)
extend("email", email)
extend("max", max)
extend("min", min)
extend("required", required)

localize("ru", ru)

let LOCALE = "ru"

Object.defineProperty(Vue.prototype, "locale", {
  get () {
    return LOCALE
  },
  set (val) {
    LOCALE = val
    localize(val)
  }
})
