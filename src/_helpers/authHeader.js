import VueCookies from "vue-cookies";

export function authHeader() {
  const data = VueCookies.get("data");

  if (data && data.token) {
    return { Authorization: "Bearer_" + data.token };
  } else {
    return {};
  }
}
