import { isSSR } from "./isSSR"

export const isIE: () => boolean = () => {
  if (isSSR()) {
    return false
  }
  return window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1
}
