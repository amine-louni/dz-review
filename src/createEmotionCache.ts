import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';



// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCacheRTL() {
  return createCache({ key: 'muirtl', prepend: true, stylisPlugins: [prefixer, rtlPlugin] });
}
export function createEmotionCache() {
  return createCache({ key: 'muiltr', prepend: true, stylisPlugins: [prefixer] });
}
