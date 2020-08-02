export const isIE: () => boolean = () => {
  if (typeof window === "undefined") {
    return false
  }
  return window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1
}
