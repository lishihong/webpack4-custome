
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './language/en'
import zh from './language/zh'

Vue.use(VueI18n)
let language = localStorage.getItem('language')
language = language || 'zh'

export const i18n = new VueI18n({
    locale: language,
    messages: {
        en: {
            ...en,
        },
        zh: {
            ...zh,
        },
    },

})

