import en from './en.json'
import th from './th.json'

export const defaultLocale = 'th-TH'

export const languages = {
  en: en,
  th: th
}
export const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2
    }
  },
  'th-TH': {
    currency: {
      style: 'currency', currency: 'THB', minimumFractionDigits: 2, currencyDisplay: 'symbol'
    }
  }
}
